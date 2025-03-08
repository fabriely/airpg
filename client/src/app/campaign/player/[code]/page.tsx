'use client'

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CampaignPanel } from 'components/ui/campaign-panel'
import { Button } from 'components/ui/button';
import { ChatBot } from 'components/ui/chatbot';
import api from 'services/api'; 


import { 
    NotebookPen,
    BookMarked,
    Dices,
    Bot
} from 'lucide-react';
import { Header } from 'components';

interface Campaign {
    name: string;
    description: string;
}

export default function CampaignPlayer({ params }: { params: { code: string } }) {
    const session = useSession();
    const { code } = params;  

    const [campaign, setCampaign] = useState<Campaign | null>(null); // Estado para armazenar as informações da campanha
    const [isChatBotVisible, setIsChatBotVisible] = useState(false);
    const [loading, setLoading] = useState(true); 
    
    useEffect(() => {
        if (session.status === 'unauthenticated') {
            redirect('/');
        }

        // Verifica se o código foi obtido da URL
        if (code) {
            const fetchCampaignData = async () => {
                try {
                    const response = await api.get(`/campaign/${code}`); 
                    setCampaign(response.data.data.campaign)// Faz a requisição para obter os detalhes da campanha
                    setLoading(false); // Define o loading como falso quando os dados forem carregados
                } catch (error) {
                    console.error('Erro ao buscar a campanha:', error);
                    setLoading(false);
                }
            };

            fetchCampaignData();
        }
    }, [session.status, code]);

    // Exibe um loading até os dados da campanha serem carregados
    if (loading) {
        return <div>Carregando...</div>;
    }

    if (!campaign) {
        return <div>Campanha não encontrada.</div>; // Exibe uma mensagem caso não encontre a campanha
    }

    const handleChatBotToggle = () => {
        setIsChatBotVisible(prev => !prev); // Alterna a visibilidade do ChatBot
    };


    return (
        <div>

        <Header />
        <div className="grid grid-cols-3 grid-rows-[48px_1fr] gap-y-8 gap-x-16 w-full px-40 pt-28 pb-[72px] h-full">
            <div className="col-span-3 row-start-1 h-full flex items-center justify-start">
                <span className="font-grenze font-bold text-[40px] text-[#191919] leading-[1.2] ">
                {campaign?.name || 'Nome da campanha não encontrado'}
                </span>
            </div>
            <div className="col-span-1 row-start-2 flex flex-col items-center">
                <div className="relative w-full pb-[50%] border-4 border-yellow-500 mb-4 rounded-[8px]">
                    <img src="/path/to/your/image.jpg" alt="Campaign Image" className="w-full h-full object-cover rounded-[8px]" />
                </div>
                <div className="flex flex-col space-y-4 w-full">
                    <Button className="w-full justify-between">
                        <div className="flex items-center gap-x-6 text-[#191919]">
                            <img src="/path/to/your/image.jpg" alt="Character Picture" className="w-16 h-16 rounded-full bg-[#191919]" />
                            <div className="flex flex-col text-[#191919] w-full h-full justify-center">
                                <h2 className="text-2xl text-[#191919] text-left font-grenze">Nome do Personagem</h2>
                                <p className="text-base text-[#191919] text-left font-crimson font-normal">Race Class | Level ##</p>
                            </div>
                        </div>
                    </Button>
                    <Button className="w-full justify-between">
                        <div className="flex items-center gap-x-6 text-[#191919]">
                            <NotebookPen className="h-5 text-[#191919]" />
                            Livro de Anotações
                        </div>
                    </Button>
                    <Button className="w-full justify-between">
                        <div className="flex items-center gap-x-6 text-[#191919]">
                            <BookMarked className="h-5 text-[#191919]" />
                            Livros de Regra
                        </div>
                    </Button>
                    <Button className="w-full justify-between">
                        <div className="flex items-center gap-x-6 text-[#191919]">
                            <Dices className="h-5 text-[#191919]" />
                            Rolar Dados
                        </div>
                    </Button>
                    <Button className="w-full justify-between"
                            onClick={handleChatBotToggle}>
                        <div className="flex items-center gap-x-6 text-[#191919]">
                            <Bot className="h-5 text-[#191919]" />
                            Chatbot
                        </div>
                    </Button>
                </div>
            </div>
            <CampaignPanel className="col-span-2">
                {isChatBotVisible && <ChatBot />}

                </CampaignPanel>
        </div>
    </div>
    )
}