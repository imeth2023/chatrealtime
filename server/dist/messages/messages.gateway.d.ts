import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { Server, Socket } from 'socket.io';
export declare class MessagesGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private readonly messagesService;
    server: Server;
    private onlineUsers;
    constructor(messagesService: MessagesService);
    create(createMessageDto: CreateMessageDto, client: Socket): Promise<import("./entities/message.entity").Message>;
    findAll(room: string): import("./entities/message.entity").Message[];
    joinRoom(name: string, room: string, client: Socket): import("./entities/message.entity").Message[];
    leaveRoom(room: string, client: Socket): void;
    typing(isTyping: boolean, room: string, client: Socket): Promise<void>;
    findMessagesBetweenUsers(senderName: string, recipientName: string): import("./entities/message.entity").Message[];
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    private getSocketIdByName;
}
