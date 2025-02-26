'use client';

import React from "react";
import { Header } from "components/index";
import { Maincard } from "components/index"
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { Card } from 'components/ui/card';

export default function Menu() {
  const session = useSession();
  const router = useRouter();

  if (session.status === 'authenticated') {
    redirect('/menu')
  }

  return(
    <div className="bg-[#F2F2F2] w-full h-full px-[160px]">
      <Header />
      <div className="mt-[80px] py-[32px]">
        <h1 className="flex justify-between items-center text-[#191919] font-bold font-grenzen text-[40px]"> 
          //Suas Campanhas 
        </h1>
      </div>
      <div className="grid grid-cols-4 grid-flow-row grid-rows-[208px] gap-8 ">
        <Maincard className="col-span-1 col-start-1"/>
        <Maincard className="col-span-1 col-start-2"/>
        <Maincard className="col-span-1 col-start-3"/>
        <Card className="flex justify-center items-center w-full h-full bg-[#E3E3E3] shadow-lg relative col-span-1 col-start-4 rounded-2xl">
          <div className="flex flex-col justify-between items-center w-full h-full px-4 py-4 gap-4">
            <button     className="w-full h-full bg-gradient-to-r from-[#B81414] to-[#8A0F0F] font-crimson font-bold text-[#F2F2F2] text-[20px] rounded-[8px] hover:bg-gradient-to-r hover:from-[#EB4747] hover:to-[#E51919]"> Entrar Em Uma Campanha </button>  
            <button onClick={() => router.push('/create-campaign')} className="w-full h-full bg-gradient-to-r from-[#B81414] to-[#8A0F0F] font-crimson font-bold text-[#F2F2F2] text-[20px] rounded-[8px] hover:bg-gradient-to-r hover:from-[#EB4747] hover:to-[#E51919]"> Criar Uma Nova Campanha</button>  
          </div>
        </Card>
      </div>
    </div>
  )
}