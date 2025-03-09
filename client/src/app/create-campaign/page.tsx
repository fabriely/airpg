'use client';

import Image from 'next/image';
import { Button } from 'components/ui/button';
import { Input } from 'components/ui/input';
import { Label } from 'components/ui/label';
import { ArrowRight } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { useRouter, redirect } from 'next/navigation';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle
} from 'components/ui/card';
import { Textarea } from 'components/ui/textarea';
import api from 'services/api';

export default function CreateCampaign() {
    const session = useSession();
    if (session.status === 'unauthenticated') {
      redirect('/');
    }
    const router = useRouter();
    const [showSystems, setShowSystems] = useState(false);
    const [selectedSystem, setSelectedSystem] = useState<string | null | number>(null);
    const [campaignName, setCampaignName] = useState('');
    const [campaignDescription, setCampaignDescription] = useState('');

    const systems = [
        { id: 1, name: 'D&D', image: '/img/create-campaign-system-DeD.png' },
        { id: 2, name: 'D&D', image: '/img/create-campaign-system-DeD.png' },
        { id: 3, name: 'D&D', image: '/img/create-campaign-system-DeD.png' },
        { id: 4, name: 'D&D', image: '/img/create-campaign-system-DeD.png' },
        { id: 5, name: 'D&D', image: '/img/create-campaign-system-DeD.png' },
        { id: 6, name: 'D&D', image: '/img/create-campaign-system-DeD.png' }
    ];

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!campaignName || !selectedSystem || !campaignDescription) {
            alert("Por favor, preencha todos os campos obrigatórios.");
            return;
        }
        try {
            // Enviar dados para o backend
            const selectedSystemName = systems.find(system => system.id === selectedSystem)?.name;
            const response = await api.post('/newcampaign/', {
                name: campaignName,
                system_rpg: selectedSystemName,
                description: campaignDescription,
                user_email: session.data?.user?.email
            });
            if (response.status === 200) {
                alert(`Campanha criada com sucesso! Bom jogo, mestre ${session.data?.user?.username}!`);
                setCampaignName('');
                setSelectedSystem(null);
                setCampaignDescription('');
                router.replace("/menu")

            } else {
                console.error(response.statusText);
                alert("Erro ao criar a campanha.");
            }
        } catch (error) {
            console.error(error);
            alert("Ocorreu um erro ao tentar criar a campanha.");
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-start gap-4 bg-[#f2f2f2] p-4 md:p-8">
            <Card className="flex-1 w-full max-w-xl border-0 bg-[#f2f2f2]">
                <CardHeader>
                    <CardTitle className="text-5xl text-black font-grenze">// Criação de Campanha</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="border-4 border-orange-500 relative w-full aspect-video overflow-hidden rounded">
                        <Image
                            src="/img/create-campaign-mainDragon.jpg"
                            alt="Dragão da tela de criação de campanha"
                            width={300}
                            height={168}
                            quality={100}
                            className="w-full"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="name" className="text-black font-crimson text-xl font-bold">Nome da Campanha</Label>
                        <Input
                            id="campaignName"
                            placeholder="The Rise of Tiamat"
                            value={campaignName}
                            onChange={(e) => setCampaignName(e.target.value)}
                            className="h-9 rounded-md text-base font-medium transition-colors font-crimson"
                            required
                        />
                    </div>

                    <Button onClick={() => setShowSystems(prev => !prev)} type="button" className="w-full flex justify-between items-center text-xl">
                        <span>Selecionar Sistema de RPG</span>
                        <ArrowRight size={20} />
                    </Button>

                    <div className="grid gap-2 bg-[#f2f2f2]">
                        <Label htmlFor="description" className="text-black font-crimson font-bold text-xl">Sinopse da Campanha</Label>
                        <Textarea
                            id="campaignDescription"
                            placeholder="Um novo perigo está surgindo em Forgotten Realms"
                            value={campaignDescription}
                            onChange={(e) => setCampaignDescription(e.target.value)}
                            required
                            className="h-24 rounded-md text-base font-medium transition-colors font-crimson"
                        />
                    </div>
                </CardContent>

                <CardFooter>
                    <Button variant="destructive" type="submit" onClick={handleSubmit} className="mx-auto w-fit px-8">Criar Campanha</Button>
                </CardFooter>
            </Card>

            {showSystems && (
                <Card className="flex-1 w-full max-w-2xl border-0 mt-8 md:mt-20">
                    <div className="bg-red-800 p-8 rounded-lg">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {systems.map((system) => (
                                <Button
                                    key={system.id}
                                    type="button"
                                    onClick={() => setSelectedSystem(system.id)}
                                    className={`h-64 relative group p-0 overflow-hidden border-4
                                    ${selectedSystem === system.id ? 'border-orange-500' : 'border-gray-300'}`}
                                >
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
                </Card>
            )}
        </div>
    );
}
