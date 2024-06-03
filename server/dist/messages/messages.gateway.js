"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagesGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const messages_service_1 = require("./messages.service");
const create_message_dto_1 = require("./dto/create-message.dto");
const socket_io_1 = require("socket.io");
let MessagesGateway = class MessagesGateway {
    constructor(messagesService) {
        this.messagesService = messagesService;
        this.onlineUsers = new Map();
    }
    async create(createMessageDto, client) {
        const senderName = this.messagesService.getClientName(client.id);
        const message = await this.messagesService.create(createMessageDto, senderName, createMessageDto.room);
        if (createMessageDto.recipientName) {
            const recipientSocketId = this.getSocketIdByName(createMessageDto.recipientName);
            if (recipientSocketId) {
                this.server.to(recipientSocketId).emit('privateMessage', message);
                this.server.to(client.id).emit('privateMessage', message);
                if (!client.rooms.has(recipientSocketId)) {
                    this.server
                        .to(recipientSocketId)
                        .emit('newDirectMessageNotification', {
                        message: message.text,
                        from: senderName,
                    });
                }
            }
        }
        else if (createMessageDto.room) {
            this.server.to(createMessageDto.room).emit('message', message);
        }
        return message;
    }
    findAll(room) {
        return this.messagesService.findAll(room);
    }
    joinRoom(name, room, client) {
        this.messagesService.identify(name, client.id);
        client.join(room);
        this.onlineUsers.set(client.id, name);
        this.server.emit('onlineUsers', Array.from(this.onlineUsers.entries()).map(([id, name]) => ({
            id,
            name,
        })));
        console.log(`User ${name} joined room ${room} with socket ID ${client.id}`);
        return this.messagesService.findAll(room);
    }
    leaveRoom(room, client) {
        client.leave(room);
        this.onlineUsers.delete(client.id);
        this.server.emit('onlineUsers', Array.from(this.onlineUsers.entries()).map(([id, name]) => ({
            id,
            name,
        })));
    }
    async typing(isTyping, room, client) {
        const name = this.messagesService.getClientName(client.id);
        client.to(room).emit('typing', { name, isTyping });
    }
    findMessagesBetweenUsers(senderName, recipientName) {
        return this.messagesService.findMessagesBetweenUsers(senderName, recipientName);
    }
    handleConnection(client) {
        console.log(`Client connected: ${client.id}`);
    }
    handleDisconnect(client) {
        this.onlineUsers.delete(client.id);
        this.server.emit('onlineUsers', Array.from(this.onlineUsers.entries()).map(([id, name]) => ({
            id,
            name,
        })));
        console.log(`Client disconnected: ${client.id}`);
    }
    getSocketIdByName(name) {
        for (const [id, userName] of this.onlineUsers.entries()) {
            if (userName === name) {
                return id;
            }
        }
        return undefined;
    }
};
exports.MessagesGateway = MessagesGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], MessagesGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('createMessage'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_message_dto_1.CreateMessageDto,
        socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], MessagesGateway.prototype, "create", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('findAllMessages'),
    __param(0, (0, websockets_1.MessageBody)('room')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MessagesGateway.prototype, "findAll", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('join'),
    __param(0, (0, websockets_1.MessageBody)('name')),
    __param(1, (0, websockets_1.MessageBody)('room')),
    __param(2, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], MessagesGateway.prototype, "joinRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('leaveRoom'),
    __param(0, (0, websockets_1.MessageBody)('room')),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], MessagesGateway.prototype, "leaveRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('typing'),
    __param(0, (0, websockets_1.MessageBody)('isTyping')),
    __param(1, (0, websockets_1.MessageBody)('room')),
    __param(2, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean, String, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], MessagesGateway.prototype, "typing", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('findMessagesBetweenUsers'),
    __param(0, (0, websockets_1.MessageBody)('senderName')),
    __param(1, (0, websockets_1.MessageBody)('recipientName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], MessagesGateway.prototype, "findMessagesBetweenUsers", null);
exports.MessagesGateway = MessagesGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: '*',
        },
    }),
    __metadata("design:paramtypes", [messages_service_1.MessagesService])
], MessagesGateway);
//# sourceMappingURL=messages.gateway.js.map