const rtmpServer = require('rtmp-server');


/** RTMP server object */
class RTMPServer {
    server: any;


    constructor() {
        this.server = new rtmpServer();
        this.configure_rtmp_server();
    }


    /** Configures rtmpServer object */
    private configure_rtmp_server() {
        this.server.on('error', err => {
            throw err;
        });
          
        this.server.on('client', client => {
            //client.on('command', command => {
            //  console.log(command.cmd, command);
            //});
          
            client.on('connect', () => {
                console.log('connect', client.app);
            });
            
            client.on('play', ({ streamName }) => {
                console.log('PLAY', streamName);
            });
            
            client.on('publish', ({ streamName }) => {
                console.log('PUBLISH', streamName);
            });
            
            client.on('stop', () => {
                console.log('client disconnected');
            });
        });
        return;
    }

    
    /** Run RTMPServer */
    public run() {
        try {
            this.server.listen(1935);
            return;
        }

        catch(e) {
            console.error(e);
            return;
        }
    }
}


export = RTMPServer;