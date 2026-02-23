import { messages, type CreateMessageRequest, type MessageResponse } from "@shared/schema";
import { db } from "./db";

export interface IStorage {
  createMessage(message: CreateMessageRequest): Promise<MessageResponse>;
}

export class DatabaseStorage implements IStorage {
  async createMessage(insertMessage: CreateMessageRequest): Promise<MessageResponse> {
    const [message] = await db.insert(messages).values(insertMessage).returning();
    return message;
  }
}

export const storage = new DatabaseStorage();
