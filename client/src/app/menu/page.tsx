'use client';

import React, { useState, useEffect } from "react";
import { Header, Maincard } from "components/index";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { Card } from 'components/ui/card';
import ModalJoinCampaign from 'components/modal/ModalJoinCampaign';
import api from "services/api"; 

interface Campaign {
  id: string;
  name: string;
  system_rpg: string;
  is_master: boolean;
  code: string;
}

export default function Menu() {
  const session = useSession();
  const router = useRouter();

  if (session.status === 'unauthenticated') {
    redirect('/');
  }

  const [isOpen, setIsOpen] = useState(false);
  const [campaigns, setCampaigns] = useState([]); 

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await api.get('/users-campaigns', {
          params: { user_email: session.data?.user?.email }
        });
        setCampaigns(response.data);
      } catch (error) {
        console.error("Erro ao buscar campanhas:", error);
      }
    };

    if (session.status === 'authenticated') {
      fetchCampaigns();
    }
  }, [session.status, session.data?.user?.email]);

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false);
  };

  const handleCardClick = (campaign: Campaign) => {
    // Verifique se o usuário é o mestre e redirecione conforme necessário
    if (campaign.is_master) {
      router.push(`/campaign/master/${campaign.code}`);  
    } else {
      router.push(`/campaign/player/${campaign.code}`); 
    }
  };

  return (
    <div className="bg-[#F2F2F2] w-full h-full px-[160px]">
      <Header />
      <div className="mt-[80px] py-[32px]">
        <h1 className="flex justify-between items-center text-[#191919] font-bold font-grenze text-[40px]"> 
         -- Suas Campanhas
        </h1>
      </div>

      <div className="grid grid-cols-2 grid-flow-row gap-8">
        {campaigns.length > 0 ? (
          campaigns.map((campaign: Campaign) => (
            <Maincard
              key={campaign.id}
              campaignName={campaign.name}
              systemRPG={campaign.system_rpg}
              is_master={campaign.is_master}
              onClick={() => handleCardClick(campaign)}
            />
          ))
        ) : (
          <p className="col-span-2">Nenhuma campanha encontrada.</p>
        )}
      </div>

      <div className="mt-8">
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
      </div>
        
      <ModalJoinCampaign
        isOpen={isOpen}
        closeModal={closeModal}
        userEmail={session.data?.user?.email ?? ''}
      />
    </div>
  );
}
