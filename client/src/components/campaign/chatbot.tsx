'use client';

import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import { CampaignPanel } from 'components/campaign/campaign-panel';
import { Textarea } from 'components/ui/textarea';
import { Button } from 'components/ui/button';
import { Send } from 'lucide-react';
import { cn } from 'lib/utils';

const ChatBot = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Array<{ content: string; isUser: boolean }>>([]);

  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (inputValue.trim()) {
    
      // inputValue é a mensagem que o usuário escreveu
      // TODO: mandar a mensagem para o backend, para o gemini
      setMessages(prev => [...prev, { content: inputValue, isUser: true }]);
      
      // "Resposta do gemini..." é a mensagem que o gemini respondeu no backend
      // TODO: pegar a mensagem do backend e substuir aqui
      setMessages(prev => [
        ...prev, 
        { content: "Resposta do gemini...", isUser: false }
      ]);
      setInputValue('');
    }
    
  };

  return (
    <CampaignPanel 
      ref={ref}
      className={cn("flex flex-col max-h-[550px] w-full", className)}
      {...props}
    >
      <div 
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#e3e3e3] mb-4 rounded-lg min-w-0"
      >
        {messages.map((message, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg break-words ${
              message.isUser
                ? 'ml-auto bg-blue-500 text-white'
                : 'mr-auto bg-gray-100 dark:bg-gray-800'
            }`}
            style={{
              maxWidth: '80%',
              minWidth: '20%',
              width: 'fit-content'
            }}
          >
            {message.content}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="relative flex gap-2 bg-[#e3e3e3] p-2 rounded-lg">
        <Textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Digite sua mensagem"
          className="resize-none flex-1 bg-[#e3e3e3] pr-12 rounded-lg"
          onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
        />

        <Button 
          onClick={handleSendMessage}
          className="rounded-full w-12 h-12 p-0 absolute bottom-2 right-2 bg-gradient-to-r from-[#FFBF00] to-[#CC9900] hover:from-[#CC9900] hover:to-[#FFBF00]"
        >
          <Send className="w-5 h-5 text-white" />
        </Button>
      </div>
    </CampaignPanel>
  );
});

ChatBot.displayName = 'ChatBot';

export { ChatBot };