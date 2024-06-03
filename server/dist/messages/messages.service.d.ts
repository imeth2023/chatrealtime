import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './entities/message.entity';
export declare class MessagesService {
    messages: {
        [room: string]: Message[];
    };
    directMessages: {
        [key: string]: Message[];
    };
    clientToUser: {};
    create(createMessageDto: CreateMessageDto, senderName: string, room: string): Message;
    identify(name: string, id: string): unknown[];
    getClientName(clientId: string): any;
    findAll(room: string): Message[];
    findMessagesBetweenUsers(senderName: string, recipientName: string): Message[];
}
