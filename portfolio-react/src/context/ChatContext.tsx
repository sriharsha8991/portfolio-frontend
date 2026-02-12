/**
 * Chat Context
 * Manages WebSocket connection, message history, and backend communication
 * Handles navigation actions from backend responses
 */

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import CONFIG from '../config';
import type {
  ChatMessage,
  ChatContextValue,
  ConnectionStatus,
  ChatResponse,
  NavigationAction,
} from '../types/chat';

const ChatContext = createContext<ChatContextValue | undefined>(undefined);

export const useChat = (): ChatContextValue => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within ChatProvider');
  }
  return context;
};

interface ChatProviderProps {
  children: ReactNode;
}

export const ChatProvider = ({ children }: ChatProviderProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  // @ts-expect-error - connectionStatus is set but not currently used in UI
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('disconnected');
  const [ws, setWs] = useState<WebSocket | null>(null);

  const config = CONFIG.getConfig();

  // Handle navigation actions from backend
  const handleNavigationAction = useCallback((action: NavigationAction) => {
    const section = document.getElementById(action.section_id);
    if (section) {
      // Smooth scroll to section with offset for floating navbar
      const offsetTop = section.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });

      // Add highlight glow effect (2s duration)
      section.classList.add('highlight-glow');
      setTimeout(() => {
        section.classList.remove('highlight-glow');
      }, 2000);
    }
  }, []);

  // Send message via HTTP (fallback)
  const sendMessageHTTP = useCallback(async (message: string): Promise<ChatResponse> => {
    const response = await fetch(`${config.apiUrl}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        conversation_history: messages.map((msg) => ({
          user: msg.role === 'user' ? msg.content : undefined,
          assistant: msg.role === 'assistant' ? msg.content : undefined,
        })),
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }, [config.apiUrl, messages]);

  // Send message (WebSocket or HTTP fallback)
  const sendMessage = useCallback(async (message: string) => {
    if (!message.trim()) return;

    // Add user message immediately
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: message,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    try {
      let response: ChatResponse;

      if (ws && ws.readyState === WebSocket.OPEN) {
        // WebSocket send
        ws.send(JSON.stringify({
          message,
          conversation_history: messages.map((msg) => ({
            user: msg.role === 'user' ? msg.content : undefined,
            assistant: msg.role === 'assistant' ? msg.content : undefined,
          })),
        }));
        return; // Response will come via WebSocket message handler
      } else {
        // HTTP fallback
        response = await sendMessageHTTP(message);
      }

      // Add assistant response
      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: response.response,
        timestamp: new Date(response.timestamp),
        toolsUsed: response.tools_used,
      };

      setMessages((prev) => [...prev, assistantMessage]);

      // Handle navigation actions
      if (response.actions) {
        response.actions.forEach((action) => {
          if (action.type === 'navigate') {
            handleNavigationAction(action);
          }
        });
      }
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Add error message
      const errorMessage: ChatMessage = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  }, [ws, messages, sendMessageHTTP, handleNavigationAction]);

  // Initialize WebSocket connection
  useEffect(() => {
    if (!config.features.chatEnabled) {
      return;
    }

    let websocket: WebSocket | null = null;
    let reconnectTimeout: number;

    const connect = () => {
      setConnectionStatus('connecting');
      
      try {
        websocket = new WebSocket(`${config.wsUrl}/ws/chat`);

        websocket.onopen = () => {
          console.log('✅ WebSocket connected');
          setIsConnected(true);
          setConnectionStatus('connected');
          setWs(websocket);

          // Send welcome message
          const welcomeMessage: ChatMessage = {
            id: `welcome-${Date.now()}`,
            role: 'assistant',
            content: 'Hi! I\'m your AI assistant. Ask me about Sriharsha\'s experience, skills, or projects!',
            timestamp: new Date(),
          };
          setMessages([welcomeMessage]);
        };

        websocket.onmessage = (event) => {
          try {
            const data: ChatResponse = JSON.parse(event.data);
            
            const assistantMessage: ChatMessage = {
              id: `assistant-${Date.now()}`,
              role: 'assistant',
              content: data.response,
              timestamp: new Date(data.timestamp),
              toolsUsed: data.tools_used,
            };

            setMessages((prev) => [...prev, assistantMessage]);
            setIsTyping(false);

            // Handle navigation actions
            if (data.actions) {
              data.actions.forEach((action) => {
                if (action.type === 'navigate') {
                  handleNavigationAction(action);
                }
              });
            }
          } catch (error) {
            console.error('Error parsing WebSocket message:', error);
          }
        };

        websocket.onerror = (error) => {
          console.error('❌ WebSocket error:', error);
          setConnectionStatus('error');
        };

        websocket.onclose = () => {
          console.log('🔌 WebSocket disconnected');
          setIsConnected(false);
          setConnectionStatus('disconnected');
          setWs(null);

          // Attempt reconnect after 5s
          reconnectTimeout = setTimeout(() => {
            console.log('🔄 Attempting to reconnect...');
            connect();
          }, 5000);
        };
      } catch (error) {
        console.error('Error creating WebSocket:', error);
        setConnectionStatus('error');
      }
    };

    connect();

    return () => {
      if (reconnectTimeout) {
        clearTimeout(reconnectTimeout);
      }
      if (websocket && websocket.readyState === WebSocket.OPEN) {
        websocket.close();
      }
    };
  }, [config.features.chatEnabled, config.wsUrl, handleNavigationAction]);

  const clearHistory = useCallback(() => {
    setMessages([]);
  }, []);

  const value: ChatContextValue = {
    messages,
    isConnected,
    isTyping,
    sendMessage,
    clearHistory,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export default ChatContext;
