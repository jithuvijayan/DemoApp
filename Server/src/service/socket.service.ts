export class  SocketService {
    private socket: any;
    constructor() {
      }
    emitData(data: any) {
        this.socket = (global as any).socket;
        this.socket.emit('token', data);
    }
}
