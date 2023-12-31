export interface User {
    id: string;
    avatar: string;
    name: string;
  }
  export interface Message {
    id: string;
    userId: string;
    createdAt: Date;
    text: string;
  }

export interface Payload{
  url: string
  temperature: number
}