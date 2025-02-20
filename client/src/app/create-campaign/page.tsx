'use client';

import Image from 'next/image';
import { Button } from 'components/ui/button';
import { Input } from 'components/ui/input';
import { Label } from 'components/ui/label';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { redirect } from 'next/navigation';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle
  } from 'components/ui/card';
import { Textarea } from 'components/ui/textarea';
import { cn } from 'lib/utils';

export default function createCampaign() {
    /* Descomentar quando a parte de login estiver ok

    const session = useSession();
    if (session.status === 'unauthenticated') {
      redirect('/login');
    }
    */

    const [showSystems, setShowSystems] = useState(false);
    const [selectedSystem, setSelectedSystem] = useState<number | null>(null);
    const systems = [
        {id: 1, name: 'D&D', image: '/img/create-campaign-system-DeD.png' },
        {id: 2, name: 'D&D', image: '/img/create-campaign-system-DeD.png' },
        {id: 3, name: 'D&D', image: '/img/create-campaign-system-DeD.png' },
        {id: 4, name: 'D&D', image: '/img/create-campaign-system-DeD.png' },
        {id: 5, name: 'D&D', image: '/img/create-campaign-system-DeD.png' },
        {id: 6, name: 'D&D', image: '/img/create-campaign-system-DeD.png' }
      ];

    return (
    <div className="min-h-screen flex justify-center items-start gap-2 bg-[#f2f2f2]">
        <Card className=" flex-1 w-full max-w-xl border-0 bg-[#f2f2f2]">

            <CardHeader>
                <CardTitle className="text-2xl text-black">// Criação de Campanha</CardTitle>
            </CardHeader>

            <CardContent className="grid gap-4">
                <div className="border-4 border-orange-500 relative w-full aspect-video overflow-hidden rounded">
                    <Image
                        src="/img/create-campaign-mainDragon.jpg"
                        alt="Dragão da tela de criação de campanha"
                        width={300}
                        className="w-full"
                        height={168}
                        quality={100}
                    />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="name" className="text-black">Nome da Camapanha</Label>
                    <Input
                        id="campaignName"
                        placeholder="The Rise of Tiamat"
                        className={cn(
                            "h-9 rounded-md text-sm font-medium transition-colors",
                            "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950",
                            "disabled:pointer-events-none disabled:opacity-50",
                            "dark:focus-visible:ring-zinc-300 bg-zinc-900 text-zinc-50",
                            "dark:bg-zinc-50 dark:text-zinc-900 border-2 border-zinc-900",
                            "dark:border-zinc-50 shadow hover:border-zinc-900/90",
                            "dark:hover:border-zinc-50/90 px-4 py-2 w-full"
                          )}
                        required
                    />
                </div>

                <div>
                    <Button onClick={() => setShowSystems(prev => !prev)} type="submit" className="w-full flex justify-between items-center">
                        <span>Selecionar Sistema de RPG</span>
                        <span className="ml-2">→</span>
                    </Button>
                </div>

                <div>
                    <Button type="submit" className="w-full flex justify-between items-center">
                        <span>Selecionar Camapanha (Opcional)</span>
                        <span className="ml-2">→</span>
                    </Button>
                </div>

                <div className="grid gap-2 bg-[#f2f2f2]">
                    <Label htmlFor="description" className="text-black">Sinopse da Campanha</Label>
                    <Textarea
                        id="campaignDescription"
                        placeholder="Um novo perigo está surgindo em Forgotten Realms"
                        required
                        className={cn(
                            "h-9 rounded-md text-sm font-medium transition-colors",
                            "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950",
                            "disabled:pointer-events-none disabled:opacity-50",
                            "dark:focus-visible:ring-zinc-300 bg-zinc-900 text-zinc-50",
                            "dark:bg-zinc-50 dark:text-zinc-900 border-2 border-zinc-900",
                            "dark:border-zinc-50 shadow hover:border-zinc-900/90",
                            "dark:hover:border-zinc-50/90 px-4 py-2 w-full"
                          )}
                    />
                </div>
            </CardContent>

            <CardFooter>
                    <Button variant="destructive" type="submit" className="mx-auto w-fit px-8 color-red">Criar Campanha</Button>
            </CardFooter>

        </Card>

        
         <Card className="flex-1 w-full max-w-2xl border-0 mt-20">
         {showSystems && (
            <div className="bg-red-800 p-8 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {systems.map((system) => (
                    <Button
                        key={system.id}
                        type="submit"
                        onClick={() => setSelectedSystem(system.id)}
                        className={`h-64 relative group p-0 overflow-hidden border-4
                        ${selectedSystem === system.id 
                            ? 'border-orange-500' 
                            : 'border-gray-300'}`}>
                        <div className="absolute inset-0">
                            <Image
                                src={system.image}
                                alt={system.name}
                                fill
                                className="object-cover transform group-hover:scale-105 transition-transform"
                                quality={100}
                            />
                        </div>
                        
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                            <span className="text-white font-bold text-2xl drop-shadow-xl">
                                {system.name}
                            </span>
                        </div>
                    </Button>
                    ))}
                </div>
            </div>
            )}
         </Card>
        
    </div>
  );
}