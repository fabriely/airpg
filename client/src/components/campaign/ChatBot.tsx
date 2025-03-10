'use client';

import * as React from 'react';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { CampaignPanel } from 'components/campaign/CampaignPanel';
import { Textarea } from 'components/ui/textarea';
import { Button } from 'components/ui/button';
import { Send, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from 'lib/utils';
import api from 'services/api';

const ChatBot = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Array<{ content: React.ReactNode; isUser: boolean }>>([]);
  const [selectedOption, setSelectedOption] = useState('Ajuda por texto');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (inputValue.trim()) {
      setMessages(prev => [...prev, { content: inputValue, isUser: true }]);
      try {
        const endpoint = selectedOption === 'Ajuda por texto' ? '/chat' : '/generate-image';
        const response = await api.post(endpoint, { content: inputValue });
  
        if (selectedOption === 'Ajuda por texto') {
          setMessages(prev => [...prev, { content: response.data.bot_response, isUser: false }]);
        } else {
          // Verifica se o conteúdo é uma URL de imagem
          const imageUrl = response.data.image_url;

          setMessages(prev => [
            ...prev,
            { content: <Image src={imageUrl} alt="Generated"  width={256} height={256} />, isUser: false }
          ]);
        }
      } catch (error) {
        setMessages(prev => [...prev, { content: "Erro ao conectar com o servidor.", isUser: false }]);
      }
      setInputValue('');
    }
  };
  

  return (
    <CampaignPanel 
      ref={ref}
      className={cn("flex flex-col max-h-[550px] w-full", className)}
      {...props}
    >
      {/* Dropdown de seleção */}
      <div className="relative w-full mb-4">
        <div
          className="w-full rounded-lg px-4 py-2 bg-gradient-to-r from-[#F2F2F2] to-[#D4D4D4] shadow-md text-black text-lg font-semibold cursor-pointer flex items-center justify-between"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <span>{selectedOption}</span>
          {isDropdownOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
        {isDropdownOpen && (
          <div className="absolute top-full left-0 w-full bg-gradient-to-r from-[#F2F2F2] to-[#D4D4D4] shadow-lg rounded-lg mt-1 z-10">
            <div className="px-4 py-2 text-black cursor-pointer hover:bg-[#F2F2F2]" onClick={() => { setSelectedOption('Ajuda por texto'); setIsDropdownOpen(false); }}>
              Ajuda por texto
            </div>
            <div className="px-4 py-2 text-black cursor-pointer hover:bg-gray-100" onClick={() => { setSelectedOption('Gerar imagens'); setIsDropdownOpen(false); }}>
              Gerar imagens
            </div>
          </div>
        )}
      </div>

      <div 
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#e3e3e3] mb-4 rounded-lg min-w-0"
      >
        {messages.map((message, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg break-words ${
              message.isUser
                ? 'ml-auto bg-[#f3d477] text-black'
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

      <div className="relative flex gap-2 bg-[#e3e3e3] p-2 rounded-lg outline-none">
        <Textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Digite sua mensagem"
          className="resize-none flex-1 bg-[#e3e3e3] pr-12 rounded-lg outline-none focus:ring-0 resize-none"
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