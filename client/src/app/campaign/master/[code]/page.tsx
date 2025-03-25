'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';
import { CampaignPanel } from 'components/campaign/CampaignPanel';
import { Button } from 'components/ui/button';
import { Card } from 'components/ui/card';
import { PdfReader } from 'components/campaign/PdfReader';
import { ChatBot } from 'components/campaign/ChatBot';
import PlayerList from 'components/campaign/CampaignPlayersCard';
import { RollDice } from 'components/campaign/RollDice';
import RichTextEditor from 'components/rich-text-editor/RichTextEditor';
import { 
    CircleUserRound,
    NotebookPen,
    BookMarked,
    Dices,
    Bot
} from 'lucide-react';
import api from 'services/api';
import { Header } from 'components';
import background from 'assets/background.svg'; // Ensure your asset is imported

interface Player {
    character_name: string;
    character_class: string;
    player_id: string; 
    is_master: boolean;
}

interface Campaign {
    name: string;
    image: string;
    code: string;
    description: string;
    players: Player[];
}

const isUserMaster = (campaign: Campaign, userId: string): boolean => {
    const player = campaign.players.find(player => player.player_id === userId);
    return player ? player.is_master : false;
};

export default function CampaignMaster({ params }: { params: { code: string } }) {
    const { code } = params;  
    const session = useSession();

    const [campaign, setCampaign] = useState<Campaign | null>(null);
    const [loading, setLoading] = useState(true); 
    const [isChatBotVisible, setIsChatBotVisible] = useState(false); 
    const [isPlayersVisible, setPlayersVisible] = useState(false);
    const [isJournalVisible, setJournalVisible] = useState(false);
    const [isDiceVisible, setIsDiceVisible] = useState(false);
    const [isRolesVisible, setRolesVisible] = useState(false);

    useEffect(() => {
        if (session.status === 'unauthenticated') {
            redirect('/');
        }

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
    }, [session.status, code]);// Exibe um loading até os dados da campanha serem cars

    // Exibe um loading até os dados da campanha serem carregados
    if (loading) {
        return <div>Carregando...</div>;
    }

    if (!campaign) {
        return <div>Campanha não encontrada.</div>; 
    }

    const handleChatBotToggle = () => {
        setIsChatBotVisible(prev => !prev);
        setPlayersVisible(false);
        setIsDiceVisible(false); 
        setRolesVisible(false);
        setJournalVisible(false);
    };

    const handlePlayersToggle = () => {
        setPlayersVisible(prev => !prev); 
        setIsChatBotVisible(false);
        setIsDiceVisible(false);
        setRolesVisible(false);
        setJournalVisible(false);
    };

    const handleDiceToggle = () => {
        setIsDiceVisible(prev => !prev);
        setIsChatBotVisible(false);
        setPlayersVisible(false);
        setRolesVisible(false);
        setJournalVisible(false);
    };

    const handleRolesToggle = () => {
        setRolesVisible(prev => !prev);
        setPlayersVisible(false);
        setIsChatBotVisible(false);
        setIsDiceVisible(false);
        setJournalVisible(false);
    };

    const handleJournalToggle = () => {
        setJournalVisible(prev => !prev);
        setRolesVisible(false);
        setPlayersVisible(false);
        setIsChatBotVisible(false);
        setIsDiceVisible(false);
    };

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
                <span className="font-grenze font-bold text-[40px] leading-[1.2]">
                    {campaign?.name || 'Nome da campanha não encontrado'}
                </span>
            </div>
            <div className="col-span-1 row-start-2 flex flex-col items-center">
                <Card className="w-full p-6 shadow-lg mb-4">
                    <div className="text-xl font-semibold font-crimson text-gray-700">
                        Código da Campanha
                    </div>
                    <div className="text-2xl font-bold font-crimson text-gray-900 mt-2">
                        {campaign?.code}
                    </div>
                </Card>
                <div className="flex flex-col space-y-4 w-full">
                    <Button className="w-full justify-between" onClick={handlePlayersToggle}>
                        <div className="flex items-center gap-x-6">
                            <CircleUserRound className="h-5" />
                            Fichas dos Personagens
                        </div>
                    </Button>
                    <Button className="w-full justify-between" onClick={handleJournalToggle}>
                        <div className="flex items-center gap-x-6 text-[#191919]">
                            <NotebookPen className="h-5 text-[#191919]" />
                            Livro de Anotações
                        </div>
                    </Button>
                    <Button className="w-full justify-between" onClick={handleRolesToggle}>
                        <div className="flex items-center gap-x-6 text-[#191919]">
                            <BookMarked className="h-5 text-[#191919]" />
                            Livros de Regra
                        </div>
                    </Button>
                    <Button className="w-full justify-between" onClick={handleDiceToggle}>
                        <div className="flex items-center gap-x-6 text-[#191919]">
                            <Dices className="h-5 text-[#191919]" />
                            Rolar Dados
                        </div>
                    </Button>
                    <Button className="w-full justify-between" onClick={handleChatBotToggle}>
                        <div className="flex items-center gap-x-6 text-[#191919]">
                            <Bot className="h-5 text-[#191919]" />
                            Chatbot
                        </div>
                    </Button>
                </div>
            </div>
            <CampaignPanel className="col-span-2">
                {isPlayersVisible && <PlayerList code={code} />}
                {isJournalVisible && <RichTextEditor />}
                {isRolesVisible && <PdfReader master={isUserMaster(campaign, session.data?.user?.id || '')} />}
                {isDiceVisible && <RollDice />}
                {isChatBotVisible && <ChatBot isMaster={true} />}
            </CampaignPanel>
        </div>
        </div>
    );
}
