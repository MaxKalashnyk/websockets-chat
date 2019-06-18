import { Username } from "./modules/username.js";
import { Socket } from "./modules/socket.js";
import { Messages } from "./modules/messages.js";
import { MessageForm } from "./modules/message-form.js";

document.addEventListener("DOMContentLoaded", () => {
    const username = new Username("#username");
    const socket = new Socket();
    const messages = new Messages("#messages");
    const messageForm = new MessageForm("#messageForm");
    socket.onSetUsername(name => {
        username.render(name);
        messages.renderSystemMessage(`${name} assigned to you.`);
    });
    socket.onUserJoined(name => {
        messages.renderSystemMessage(`${name} joined.`);
    });
    socket.onUserLeft(name => {
        messages.renderSystemMessage(`${name} left.`);
    });
    socket.onChatMessage(({ name, message }) => {
        messages.renderMessage(name, message);
    });

    messageForm.onSubmit(socket.emitChatMessage);
});
