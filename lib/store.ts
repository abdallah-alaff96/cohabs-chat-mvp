export type Role = "user" | "assistant";
export type Message = {
  role: Role;
  content: string;
  answered?: boolean;
  timestamp: number;
};
export type Conversation = { id: string; messages: Message[] };

const conversations = new Map<string, Conversation>();

export function getConversation(id: string): Conversation | undefined {
  return conversations.get(id);
}

export function createConversation(id: string): Conversation {
  const conv = { id, messages: [] as Message[] };
  conversations.set(id, conv);
  return conv;
}

export function appendMessage(id: string, msg: Message) {
  const conv = conversations.get(id);
  if (!conv) return;
  conv.messages.push(msg);
}
