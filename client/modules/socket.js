/* global io */

export class Socket {
    constructor() {
        this.socket = io();
    }

    onSetUsername = handler => {
        this.socket.on("set username", handler);
    };

    onUserJoined = handler => {
        this.socket.on("user joined", handler);
    };

    onUserLeft = handler => {
        this.socket.on("user left", handler);
    };

    onChatMessage = message => {
        this.socket.on("chat message", message);
    };

    emitChatMessage = message => {
        this.socket.emit("chat message", message);
    };
}
