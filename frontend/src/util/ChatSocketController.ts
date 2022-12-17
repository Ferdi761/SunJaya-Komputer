import { Socket } from "socket.io-client";

class ChatSocketController {
    socket : Socket

    constructor(socket : Socket) {
        this.socket = socket
    }

    init(id : number) {
        this.socket.emit("init", id.toString());
    }

    auth(auth : string) {
        this.socket.emit("auth", auth);
    }

    name(auth : string) {
        this.socket.emit("name", auth);
    }

    read(id : number) {
        this.socket.emit("read", id.toString());
    }

    addCallback(event : string, callback : Function) {
        this.socket.on(event, function(message) {
           callback(message); 
        });
    }

    sendMessage(message: string) {
        this.socket.emit("message to", message);
    }
}

export { ChatSocketController }