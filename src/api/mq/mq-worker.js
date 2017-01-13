const amqp = require('amqplib');
// const amqpSugar = require('amqplib-sugar');
// const superagent = require('superagent-promise')(require('superagent'), Promise);
const GitHubProfile = require('./../modules/github/github.profile');
const gitHubProfileBL = require('./../modules/profile/profile.bl');

const uri = process.env.SAMMLER_RABBITMQ_URI;

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
            // eslint-disable-next-line quotes
            console.log(" [x] %s - %s:'%s'", '#', msg.fields.routingKey, msg.content.toString());

            // Mark job as running


            // Run the job
            this.gitHubProfile.getProfile()
              .then(result => console.log('gh.getProfile.result', result));

            // Mark job as finished

            // Notify RabbitMQ

            channel.ack(msg);
          }, {noAck: false})
        ]);
      });
  }
}

module.exports = MqWorker;
