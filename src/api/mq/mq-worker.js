const amqp = require('amqplib');
// const amqpSugar = require('amqplib-sugar');
const superagent = require('superagent-promise')(require('superagent'), Promise);
const moment = require('moment');

const GitHubProfile = require('./../modules/github/github.profile');
const gitHubProfileBL = require('./../modules/profile/profile.bl');
const logger = require('./../config/context').instance().logger;

const uri = process.env.SAMMLER_RABBITMQ_URI;
const SAMMLER_JOBS_SERVICE = process.env.SAMMLER_JOBS_SERVICE__URI;

// Todo: Remove, just a prototype
class MqWorker {
  constructor() {
    this.init();
    this.gitHubProfile = new GitHubProfile();
  }

  init() {
    this.listenProfileSyncRequested();
  }

  // Todo: Needs to be refactored and broken out to amqplib-sugar
  listenProfileSyncRequested() {
    const ex = 'github.profile-sync';
    const exchangeType = 'topic';
    const queueProfileSync = 'queue.github.profile-sync';

    amqp.connect(uri)
      .then(conn => {
        return conn.createChannel();
      })
      .then(channel => {
        return Promise.all([
          channel.assertExchange(ex, exchangeType),
          channel.assertQueue(queueProfileSync, {exclusive: false}),
          channel.bindQueue(queueProfileSync, ex, 'sync.requested'),
          channel.consume(queueProfileSync, msg => {

            const msgContent = JSON.parse(msg.content.toString());
            // eslint-disable-next-line quotes
            logger.trace(" [x] %s - %s:'%s'", '#', msg.fields.routingKey, msg.content.toString());

            // Mark job as running
            const jobId = msgContent.job_id;
            return superagent
              .patch(SAMMLER_JOBS_SERVICE + `/v1/jobs/${jobId}/status`)
              .send({status: 'running'})
              .then(() => {
                return this.gitHubProfile.getProfile()
                  .then(result => {
                    logger.trace('GitHub meta: ', result.meta);
                    // Todo: Something is wrong, the x-ratelimit-reset is always in the past
                    // Todo: Double-check again, in a US timezone I didn't have the problem ...
                    // https://developer.github.com/v3/#rate-limiting
                    logger.trace('Time to next reset: ', moment.utc(result.meta['x-ratelimit-reset'], 'X').format('DD-MM-YYYY HH:mm:ss'));
                    return result;
                  })
                  .then(result => gitHubProfileBL.save(result))
                  .then(() => {
                    logger.trace('Complete job', jobId);
                    return superagent
                      .patch(SAMMLER_JOBS_SERVICE + `/v1/jobs/${jobId}/status`)
                      .send({status: 'completed'});
                  })
                  // Todo: Delete, just for debugging purposes
                  .then(() => {
                    superagent
                      .get(SAMMLER_JOBS_SERVICE + `/v1/jobs/${jobId}`)
                      .then(result => {
                        logger.trace('response.body', result.body);
                        return Promise.resolve();
                      });
                  })
                  .then(() => {
                    logger.trace('OK, ack');
                    channel.ack(msg);
                    return Promise.resolve();
                  });
              })
              .catch(err => {
                logger.error('err', err);
              });

          }, {noAck: false})
        ]);
      })
      .catch(err => {
        // Todo: Should really be fatal, but fatal does not work ...
        logger.error('Cannot connect to RabbitMQ\r\n', err);
      });
  }
}

module.exports = MqWorker;
