/**
 * Chat-related TypeScript interfaces
 */

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  toolsUsed?: string[];
}

export interface NavigationAction {
  type: 'navigate';
  section_id: string;
  reason?: string;
}

export interface ChatResponse {
  response: string;
  timestamp: string;
  tools_used?: string[];
  actions?: NavigationAction[];
}

export interface ChatRequest {
  message: string;
  conversation_history?: ConversationHistory[];
}

export interface ConversationHistory {
  user?: string;
  message?: string;
  assistant?: string;
}

export interface ChatContextValue {
  messages: ChatMessage[];
  isConnected: boolean;
  isTyping: boolean;
  sendMessage: (message: string) => Promise<void>;
  clearHistory: () => void;
}

export type ConnectionStatus = 'disconnected' | 'connecting' | 'connected' | 'error';
