import Logger from 'sammler-nodelib-logger';
const amqp = require( 'amqplib' );
let logger = new Logger();
import Base from './../index';

export function listen() {

  if ( !process.env.SAMMLER_RABBITMQ_URL ) {
    let msg = 'SAMMLER_RABBITMQ_URL environment variable needs to be defined.';
    logger.error( msg );
    throw new Error( msg );
  }

  let open = amqp.connect( process.env.SAMMLER_RABBITMQ_URL );
  let queue = 'queue';

  open.then( ( conn ) => {
    return conn.createChannel();
  } )
    .then( ( ch ) => {
      return ch.assertQueue( queue )
        .then( () => {
          return ch.consume( queue, ( msg ) => {
            if ( msg !== null ) {
              logger.silly( 'Got message from MQ: ', JSON.parse( msg.content ) );
              ch.ack( msg );

              let base = new Base();
              base.profile.sync();

            }
          } );
        } );
    } ).catch( console.warn );
}
