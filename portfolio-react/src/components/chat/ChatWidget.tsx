/**
 * ChatWidget Component
 * Floating chat interface with WebSocket connection
 * Collapsible, message history, typing indicator
 */

import { useState, useRef, useEffect } from 'react';
import {
  ChatBubbleLeftRightIcon,
  XMarkIcon,
  PaperAirplaneIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { useChat } from '../../context/ChatContext';
import { Card } from '../shared/Card';
import { Button } from '../shared/Button';

export const ChatWidget = () => {
  const { messages, isConnected, isTyping, sendMessage, clearHistory } = useChat();
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (isOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage.trim() && !isTyping) {
      sendMessage(inputMessage);
      setInputMessage('');
    }
  };

  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear the chat history?')) {
      clearHistory();
    }
  };

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Chat button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="
            p-4 rounded-full
            bg-primary text-background
            dark:bg-primary-dark dark:text-background-dark
            shadow-lg hover:shadow-xl
            transition-all duration-200
            cursor-pointer
            min-h-[56px] min-w-[56px]
            flex items-center justify-center
            group
          "
          aria-label="Open chat"
        >
          <ChatBubbleLeftRightIcon className="w-7 h-7 group-hover:scale-110 transition-transform" />
          {!isConnected && (
            <div className="absolute top-0 right-0 w-3 h-3 rounded-full bg-red-500 border-2 border-white dark:border-background-dark" />
          )}
        </button>
      )}

      {/* Chat interface */}
      {isOpen && (
        <Card
          variant="elevated"
          noPadding
          className="
            w-96 h-[600px]
            flex flex-col
            animate-slide-up
            shadow-2xl
          "
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border dark:border-border-dark bg-surface/50 dark:bg-surface-dark/50">
            <div className="flex items-center gap-3">
              <div className="relative">
                <ChatBubbleLeftRightIcon className="w-6 h-6 text-primary dark:text-primary-dark" />
                <div
                  className={`
                    absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-white dark:border-surface-dark
                    ${isConnected ? 'bg-green-500' : 'bg-red-500'}
                  `}
                />
              </div>
              <div>
                <h3 className="font-semibold text-text dark:text-text-dark">
                  AI Assistant
                </h3>
                <p className="text-xs text-text-secondary dark:text-text-dark-secondary">
                  {isConnected ? 'Online' : 'Offline'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {messages.length > 0 && (
                <button
                  onClick={handleClearHistory}
                  className="
                    p-2 rounded-lg
                    text-text-secondary hover:text-text
                    dark:text-text-dark-secondary dark:hover:text-text-dark
                    hover:bg-surface dark:hover:bg-elevated-dark
                    transition-colors duration-200
                    cursor-pointer
                    min-h-[44px] min-w-[44px]
                    flex items-center justify-center
                  "
                  aria-label="Clear chat history"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="
                  p-2 rounded-lg
                  text-text-secondary hover:text-text
                  dark:text-text-dark-secondary dark:hover:text-text-dark
                  hover:bg-surface dark:hover:bg-elevated-dark
                  transition-colors duration-200
                  cursor-pointer
                  min-h-[44px] min-w-[44px]
                  flex items-center justify-center
                "
                aria-label="Close chat"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-text-secondary dark:text-text-dark-secondary text-center text-sm">
                  No messages yet. Start a conversation!
                </p>
              </div>
            ) : (
              <>
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`
                      flex gap-2
                      ${message.role === 'user' ? 'justify-end' : 'justify-start'}
                    `}
                  >
                    <div
                      className={`
                        max-w-[80%] rounded-lg p-3
                        ${
                          message.role === 'user'
                            ? 'bg-primary text-background dark:bg-primary-dark dark:text-background-dark'
                            : 'bg-surface dark:bg-surface-dark text-text dark:text-text-dark'
                        }
                      `}
                    >
                      <p className="text-sm whitespace-pre-wrap break-words">
                        {message.content}
                      </p>
                      <p
                        className={`
                          text-xs mt-1 opacity-70
                          ${message.role === 'user' ? 'text-right' : 'text-left'}
                        `}
                      >
                        {formatTime(message.timestamp)}
                      </p>
                      {message.toolsUsed && message.toolsUsed.length > 0 && (
                        <div className="mt-2 pt-2 border-t border-white/20 dark:border-black/20">
                          <p className="text-xs opacity-70">
                            Tools: {message.toolsUsed.join(', ')}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {/* Typing indicator */}
                {isTyping && (
                  <div className="flex gap-2 justify-start">
                    <div className="bg-surface dark:bg-surface-dark rounded-lg p-3">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 rounded-full bg-text-secondary dark:bg-text-dark-secondary animate-bounce" />
                        <div className="w-2 h-2 rounded-full bg-text-secondary dark:bg-text-dark-secondary animate-bounce [animation-delay:0.2s]" />
                        <div className="w-2 h-2 rounded-full bg-text-secondary dark:bg-text-dark-secondary animate-bounce [animation-delay:0.4s]" />
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border dark:border-border-dark bg-surface/50 dark:bg-surface-dark/50">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message..."
                disabled={!isConnected || isTyping}
                className="
                  flex-1 px-4 py-2.5 rounded-lg
                  bg-background dark:bg-background-dark
                  border border-border dark:border-border-dark
                  text-text dark:text-text-dark
                  placeholder:text-text-secondary dark:placeholder:text-text-dark-secondary
                  focus:outline-none focus:ring-2 focus:ring-primary
                  disabled:opacity-50 disabled:cursor-not-allowed
                  transition-colors duration-200
                "
              />
              <Button
                type="submit"
                variant="primary"
                disabled={!isConnected || isTyping || !inputMessage.trim()}
                className="flex-shrink-0"
              >
                <PaperAirplaneIcon className="w-5 h-5" />
              </Button>
            </form>
          </div>
        </Card>
      )}
    </div>
  );
};

export default ChatWidget;
