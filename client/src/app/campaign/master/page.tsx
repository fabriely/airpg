'use client'

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { CampaignPanel } from 'components/ui/campaign-panel'
import { Button } from 'components/ui/button';
import { 
    CircleUserRound,
    NotebookPen,
    BookMarked,
    Dices,
    Bot
} from 'lucide-react';



export default function Campaign() {
    const session = useSession();
    
    if (session.status === 'unauthenticated') {
        redirect('/campaign')
    }

    return (
        <div className="grid grid-cols-3 grid-rows-[48px_1fr] gap-y-8 gap-x-16 w-full px-40 pt-28 pb-[72px] h-full">
            <div className="col-span-3 row-start-1 h-full flex items-center justify-start">
                <span className="font-grenze font-bold text-[40px] leading-[1.2]">// Nome da Campanha</span>
            </div>
            <div className="col-span-1 row-start-2 flex flex-col items-center">
                <div className="relative w-full pb-[50%] border-4 border-yellow-500 mb-4 rounded-[8px]">
                    <img src="/path/to/your/image.jpg" alt="Campaign Image" className="w-full h-full object-cover rounded-[8px]" />
                </div>
                <div className="flex flex-col space-y-4 w-full">
                    <Button className="w-full justify-between">
                        <div className="flex items-center gap-x-6">
                            <CircleUserRound className="h-5" />
                            Fichas dos Personagens
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
                    <Button className="w-full justify-between">
                        <div className="flex items-center gap-x-6 text-[#191919]">
                            <Bot className="h-5 text-[#191919]" />
                            Chatbot
                        </div>
                    </Button>
                </div>
            </div>
            <CampaignPanel className="col-span-2"/>
        </div>
    )
}