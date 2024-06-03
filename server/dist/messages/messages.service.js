"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagesService = void 0;
const common_1 = require("@nestjs/common");
let MessagesService = class MessagesService {
    constructor() {
        this.messages = {};
        this.directMessages = {};
        this.clientToUser = {};
    }
    create(createMessageDto, senderName, room) {
        const message = {
            name: senderName,
            text: createMessageDto.text,
            recipientName: createMessageDto.recipientName,
            senderName: senderName,
            room: room,
            senderId: createMessageDto.senderId,
        };
        if (createMessageDto.recipientName) {
            const key = [senderName, createMessageDto.recipientName].sort().join('-');
            if (!this.directMessages[key]) {
                this.directMessages[key] = [];
            }
            this.directMessages[key].push(message);
        }
        else {
            if (!this.messages[room]) {
                this.messages[room] = [];
            }
            this.messages[room].push(message);
        }
        return message;
    }
    identify(name, id) {
        this.clientToUser[id] = name;
        return Object.values(this.clientToUser);
    }
    getClientName(clientId) {
        return this.clientToUser[clientId];
    }
    findAll(room) {
        return this.messages[room] || [];
    }
    findMessagesBetweenUsers(senderName, recipientName) {
        const key = [senderName, recipientName].sort().join('-');
        return this.directMessages[key] || [];
    }
};
exports.MessagesService = MessagesService;
exports.MessagesService = MessagesService = __decorate([
    (0, common_1.Injectable)()
], MessagesService);
//# sourceMappingURL=messages.service.js.map