import * as winston from 'winston';

export default class logger {
    constructor () {
        this.winston = new (winston.Logger)( {
            level: 'silly',
            transports: [
                new (winston.transports.Console)()
            ]
        } );
    }

    error ( err ) {
        this.winston.error( err );
    }

    warn ( message ) {
        this.winston.warn( message );
    }

    info ( message ) {
        this.winston.info( message );
    }

    verbose ( message ) {
        this.winston.verbose( message );
    }

    debug ( message ) {
        this.winston.debug( message );
    }

    silly ( message ) {
        this.winston.silly( message );
    }
}
