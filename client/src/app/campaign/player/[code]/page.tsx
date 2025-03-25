'use client'

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Header } from 'components';
import { CampaignPanel } from 'components/campaign/CampaignPanel';
import { Button } from 'components/ui/button';
import { Card } from 'components/ui/card';

import { ChatBot } from 'components/campaign/ChatBot';
import { RollDice } from 'components/campaign/RollDice';
import { PdfReader } from 'components/campaign/PdfReader';
import RichTextEditor from 'components/rich-text-editor/RichTextEditor';

import api from 'services/api';
import { connectWebSocket } from 'services/ws';

import { NotebookPen, BookMarked, Dices, Bot } from 'lucide-react';
import background from 'assets/background.svg';

interface Player {
    character_name: string;
    character_class: string;
    player_id: string; 
    is_master: boolean;
}

interface Campaign {
    name: string;
    description: string;
    players: Player[];
}

const playSound = () => {
    const audio = new Audio('/notification.mp3'); // Caminho do som
    audio.play();
    setTimeout(() => {
        audio.pause();
        audio.currentTime = 0;
    }, 8000);
};

const isUserMaster = (campaign: Campaign, userId: string): boolean => {
    const player = campaign.players.find(player => player.player_id === userId);
    return player ? player.is_master : false;
};

type Panel = 'journal' | 'roles' | 'dice' | 'chatbot' | null;

export default function CampaignPlayer({ params }: { params: { code: string } }) {
    const { code } = params;  
    const session = useSession();

    const [campaign, setCampaign] = useState<Campaign | null>(null);
    const [loading, setLoading] = useState(true);
    const [visiblePanel, setVisiblePanel] = useState<Panel>(null);

    // Toggle function to manage panel visibility
    const togglePanel = (panel: Exclude<Panel, null>) => {
        setVisiblePanel(prev => (prev === panel ? null : panel));
    };

    useEffect(() => {
        const socket = connectWebSocket((message) => {
            if (message === "new_image") {
                playSound(); // Toca som quando uma nova imagem é gerada
            }
        });
        return () => socket.close();
    }, []);

    useEffect(() => {
        if (session.status === 'unauthenticated') {
            redirect('/');
        }

        if (code) {
            const fetchCampaignData = async () => {
                try {
                    const response = await api.get(`/campaign/${code}`);
                    setCampaign(response.data.data.campaign);
                    setLoading(false);
                } catch (error) {
                    console.error('Erro ao buscar a campanha:', error);
                    setLoading(false);
                }
            };
            fetchCampaignData();
        }
    }, [session.status, code]);

    if (loading) {
        return <div>Carregando...</div>;
    }

    // Find the logged in player's details
    const myPlayer = campaign?.players?.find(
        (player) => player.player_id === session.data?.user?.id
    );

    return (
        <div className="relative w-full h-full">
            <div
                className="absolute top-0 left-0 w-full h-full -z-10"
                style={{
                    backgroundImage: `url(${background.src})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'auto',
                    backgroundRepeat: 'repeat',
                }}
            ></div>
            <Header />
            <div className="grid grid-cols-3 grid-rows-[48px_1fr] gap-y-8 gap-x-16 w-full px-40 pt-28 pb-[72px] h-full">
                <div className="col-span-3 row-start-1 h-full flex items-center justify-start">
                    <span className="font-grenze font-bold text-[40px] text-[#191919] leading-[1.2]">
                        {campaign?.name || 'Nome da campanha não encontrado'}
                    </span>
                </div>
                <div className="col-span-1 row-start-2 flex flex-col items-center">
                    <Card className="w-full p-6 shadow-lg mb-4">
                        <div className="text-xl font-semibold font-crimson text-gray-700">
                            Descrição da Campanha
                        </div>
                        <div className="text-2xl font-bold font-crimson text-gray-900 mt-2">
                            {campaign?.description}
                        </div>
                    </Card>
                    <div className="flex flex-col space-y-4 w-full">
                        <Button className="w-full justify-between">
                            <div className="flex items-center gap-x-6 text-[#191919]">
                                <div className="w-20 h-12 rounded-full bg-black"></div>
                                <div className="flex flex-col text-[#191919] w-full h-full justify-center">
                                    <h2 className="text-2xl text-[#191919] text-left font-grenze">
                                        {myPlayer?.character_name || 'Nome do Personagem'}
                                    </h2>
                                    <p className="text-base text-[#191919] text-left font-crimson font-normal">
                                        {myPlayer?.character_class || 'Class'}
                                    </p>
                                </div>
                            </div>
                        </Button>
                        <Button className="w-full justify-between" onClick={() => togglePanel('journal')}>
                            <div className="flex items-center gap-x-6 text-[#191919]">
                                <NotebookPen className="h-5 text-[#191919]" />
                                Livro de Anotações
                            </div>
                        </Button>
                        <Button className="w-full justify-between" onClick={() => togglePanel('roles')}>
                            <div className="flex items-center gap-x-6 text-[#191919]">
                                <BookMarked className="h-5 text-[#191919]" />
                                Livros de Regra
                            </div>
                        </Button>
                        <Button className="w-full justify-between" onClick={() => togglePanel('dice')}>
                            <div className="flex items-center gap-x-6 text-[#191919]">
                                <Dices className="h-5 text-[#191919]" />
                                Rolar Dados
                            </div>
                        </Button>
                        <Button className="w-full justify-between" onClick={() => togglePanel('chatbot')}>
                            <div className="flex items-center gap-x-6 text-[#191919]">
                                <Bot className="h-5 text-[#191919]" />
                                Chatbot
                            </div>
                        </Button>
                    </div>
                </div>
                <CampaignPanel className="col-span-2">
                    {visiblePanel === 'journal' && <RichTextEditor />}
                    {visiblePanel === 'roles' && <PdfReader master={isUserMaster(campaign, session.data?.user?.id || '')} />}
                    {visiblePanel === 'dice' && <RollDice />}
                    {visiblePanel === 'chatbot' && <ChatBot isMaster={!!myPlayer?.is_master} />}
                </CampaignPanel>
            </div>
        </div>
    )
}