const amqp = require('amqplib');
// const amqpSugar = require('amqplib-sugar');
const superagent = require('superagent-promise')(require('superagent'), Promise);
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
            logger.silly(" [x] %s - %s:'%s'", '#', msg.fields.routingKey, msg.content.toString());

            // Mark job as running
            const jobId = msgContent.job_id;
            logger.silly('JobId: %s', jobId);

            return superagent
              .patch(SAMMLER_JOBS_SERVICE + `/v1/jobs/${jobId}/status`)
              .send({status: 'running'})
              .then(() => {
                return this.gitHubProfile.getProfile()
                .then(result => {
                  logger.silly('GitHub meta: ', result.meta);
                  return result;
                })
                .then(result => gitHubProfileBL.save(result))
                .then(() => {
                  channel.ack(msg);
                  return Promise.resolve();
                })
              });

          }, {noAck: false})
        ]);
      });
  }
}

module.exports = MqWorker;
