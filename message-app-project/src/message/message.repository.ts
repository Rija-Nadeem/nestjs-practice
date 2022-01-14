import { readFile, writeFile } from "fs/promises";
import { Injectable } from "@nestjs/common";

@Injectable()
export class MessageRepository{
 async findOne(id: string){
  const content = await readFile('messagesDB.json', "utf-8");
  const messages = JSON.parse(content);
  return messages[id];
 }
 async getAll() {
  const content = await readFile('messagesDB.json', "utf-8");
  return JSON.parse(content);
 }

 async createMessage(content: string){
  const fileContent = await readFile('messagesDB.json', "utf-8");
  const messages = JSON.parse(fileContent);
  const id = Math.floor(Math.random()*999);
  messages[id] = {id, content}
  await writeFile('messagesDB.json', JSON.stringify(messages));
 }
}