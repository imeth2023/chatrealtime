import { Message } from '../entities/message.entity';
export declare class CreateMessageDto extends Message {
    recipientId?: string;
    recipientName?: string;
    senderId: string;
}
