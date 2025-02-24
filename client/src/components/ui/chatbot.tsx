'use client';

import { useState } from 'react';
import { CampaignPanel } from 'components/ui/campaign-panel';
import { Textarea } from 'components/ui/textarea';
import { Button } from 'components/ui/button';

export const ChatBot = () => {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Array<{ content: string; isUser: boolean }>>([]);

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
    <CampaignPanel className="flex flex-col h-[600px] w-full max-w-md">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg ${
              message.isUser
                ? 'ml-auto bg-blue-500 text-white max-w-[80%]'
                : 'mr-auto bg-gray-100 dark:bg-gray-800 max-w-[80%]'
            }`}
          >
            {message.content}
          </div>
        ))}
      </div>
      
      <div className="flex gap-2 bg-[#f2f2f2]">
        <Textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Digite sua mensagem"
          className="resize-none flex-1 bg-[#f2f2f2]"
          onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
        />

        <Button onClick={handleSendMessage}>
          Enviar
        </Button>

        
      </div>

    </CampaignPanel>
  );
};