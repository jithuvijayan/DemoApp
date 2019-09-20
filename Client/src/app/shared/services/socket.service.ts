
import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
@Injectable()
export class SocketService {
    private socket: any;

    constructor() {
        this.connect();
    }

    connect() {
        if (this.socket && (this.socket.connected || !this.socket.disconnected)) {
            this.close();
        }
        this.socket = io({ path: '/ws', transports: ['websocket'], upgrade: false });
    }



    close() {
        if (this.socket) {
            this.socket.disconnect();
        }
    }

    // eventHandler() {
    //     this.socket.on('connect', function() {
    //         const sessionID = this.socket.sessionid;
    //         console.log(sessionID);
    //     });
    // }

    onConnection(onName: string): Observable<any> {
        const observable = new Observable(observer => {
            this.socket.emit('subscribe', onName);
            this.socket.on(onName, data => {
                observer.next(data);
            });
        });
        return observable;
    }
}
