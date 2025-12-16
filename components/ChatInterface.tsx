import React, { useState, useRef, useEffect } from 'react';
import { Message, CatProfile } from '../types';
import { createCatChat, sendMessageToCat } from '../services/geminiService';
import { Send, Sparkles, X } from 'lucide-react';
import { Chat } from '@google/genai';

interface ChatInterfaceProps {
  profile: CatProfile;
  isOpen: boolean;
  onClose: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ profile, isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatInstance, setChatInstance] = useState<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize chat when component mounts or profile changes
  useEffect(() => {
    if (isOpen && !chatInstance) {
      const chat = createCatChat(profile.name, "Sassy, hungry, loves sleeping, playful but arrogant");
      setChatInstance(chat);
      // Add initial greeting
      setMessages([
        { role: 'model', content: `Meow? Who enters my domain? Oh, it's a human. I suppose you can speak to me, ${profile.name}. Do you have treats?` }
      ]);
    }
  }, [isOpen, profile, chatInstance]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!inputText.trim() || !chatInstance || isLoading) return;

    const userMessage = inputText;
    setInputText('');
    
    // Add user message immediately
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      // Create a placeholder for the model response
      setMessages(prev => [...prev, { role: 'model', content: '', isTyping: true }]);

      let accumulatedText = '';
      
      await sendMessageToCat(chatInstance, userMessage, (chunk) => {
        accumulatedText += chunk;
        setMessages(prev => {
          const newMessages = [...prev];
          const lastMsg = newMessages[newMessages.length - 1];
          if (lastMsg.role === 'model') {
            lastMsg.content = accumulatedText;
            lastMsg.isTyping = false; // It's starting to type real text
          }
          return newMessages;
        });
      });

    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { role: 'model', content: "*Hisses* (Something went wrong, try again!)" }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm transition-opacity duration-300">
      <div className="bg-white w-full max-w-lg h-[600px] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-float" style={{ animation: 'none' }}> {/* Override global float for modal */}
        
        {/* Header */}
        <div className="p-4 border-b border-stone-100 flex items-center justify-between bg-orange-50">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img src={profile.avatarUrl} alt={profile.name} className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm" />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <h3 className="font-bold text-stone-800">{profile.name}</h3>
              <p className="text-xs text-stone-500 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-orange-400" /> AI Powered
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-black/5 rounded-full text-stone-500 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-stone-50 scroll-smooth">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-stone-800 text-white rounded-tr-none' 
                  : 'bg-white text-stone-800 rounded-tl-none border border-stone-100'
              }`}>
                {msg.content || (msg.isTyping ? <span className="animate-pulse">Thinking about tuna...</span> : '')}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 bg-white border-t border-stone-100">
          <div className="flex items-center gap-2 bg-stone-100 rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-orange-200 transition-all">
            <input
              ref={inputRef}
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={`Say something to ${profile.name}...`}
              className="flex-1 bg-transparent border-none outline-none text-stone-800 placeholder-stone-400 text-sm py-1"
              disabled={isLoading}
            />
            <button 
              onClick={handleSend}
              disabled={isLoading || !inputText.trim()}
              className={`p-2 rounded-full transition-all ${
                inputText.trim() 
                  ? 'bg-orange-500 text-white hover:bg-orange-600 shadow-sm transform hover:scale-105 active:scale-95' 
                  : 'bg-stone-200 text-stone-400 cursor-not-allowed'
              }`}
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          {!process.env.API_KEY && (
            <p className="text-xs text-red-500 mt-2 text-center">API Key missing. Chat unavailable.</p>
          )}
        </div>

      </div>
    </div>
  );
};

export default ChatInterface;
