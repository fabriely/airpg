'use client';

import React, { useState, useEffect } from "react";
import { Header, Maincard } from "components/index";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { Card } from 'components/ui/card';
import ModalJoinCampaign from 'components/modalJoinCampaign';
import api from "services/api"; 

export default function Menu() {
  const session = useSession();
  const router = useRouter();

  // Se o usuário não estiver autenticado, redireciona para a página inicial
  if (session.status === 'unauthenticated') {
    redirect('/');
  }

  const [isOpen, setIsOpen] = useState(false);
  const [code, setCode] = useState('');
  const [campaigns, setCampaigns] = useState([]); // Estado para armazenar as campanhas

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await api.get('/users-campaigns', {
          params: { user_email: session.data?.user?.email } // Usando o email do usuário logado
        });
        setCampaigns(response.data); 
        console.log(response.data)// Armazenando as campanhas no estado
      } catch (error) {
        console.error("Erro ao buscar campanhas:", error);
      }
    };

    if (session.status === 'authenticated') {
      fetchCampaigns(); // Buscar as campanhas quando o usuário estiver autenticado
    }
  }, [session.status, session.data?.user?.email]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Código para processar a entrada na campanha
  };

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false);
    setCode('');
  };

  return (
    <div className="bg-[#F2F2F2] w-full h-full px-[160px]">
      <Header />
      <div className="mt-[80px] py-[32px]">
        <h1 className="flex justify-between items-center text-[#191919] font-bold font-grenzen text-[40px]"> 
          Suas Campanhas
        </h1>
      </div>

      <div className="grid grid-cols-4 grid-flow-row grid-rows-[208px] gap-8">
        {campaigns.length > 0 ? (
          campaigns.map((campaign: any) => (
            <Maincard
                key={campaign.id}
                campaignName={campaign.name}
                systemRPG={campaign.system_rpg}
                is_master={campaign.is_master}
                className="col-span-1 col-start-1" 
            />
          ))
        ) : (
          <p>Nenhuma campanha encontrada.</p>
        )}
        
        <Card className="flex justify-center items-center w-full h-full bg-[#E3E3E3] shadow-lg col-span-1 col-start-4 rounded-2xl">
          <div className="flex flex-col justify-between items-center w-full h-full px-4 py-4 gap-4">
            <button onClick={openModal} className="w-full h-full bg-gradient-to-r from-[#B81414] to-[#8A0F0F] font-crimson font-bold text-[#F2F2F2] text-[20px] rounded-[8px] hover:bg-gradient-to-r hover:from-[#EB4747] hover:to-[#E51919]">
              Entrar Em Uma Campanha
            </button>
            <button onClick={() => router.push('/create-campaign')} className="w-full h-full bg-gradient-to-r from-[#B81414] to-[#8A0F0F] font-crimson font-bold text-[#F2F2F2] text-[20px] rounded-[8px] hover:bg-gradient-to-r hover:from-[#EB4747] hover:to-[#E51919]">
              Criar Uma Nova Campanha
            </button>
          </div>
        </Card>
        
        {/* Modal */}
        <ModalJoinCampaign
          isOpen={isOpen}
          closeModal={closeModal}
          handleSubmit={handleSubmit}
          code={code}
          setCode={setCode}
        />
      </div>
    </div>
  );
}
