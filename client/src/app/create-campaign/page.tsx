'use client';

import Image from 'next/image';
import { Button } from 'components/ui/button';
import { Input } from 'components/ui/input';
import { Label } from 'components/ui/label';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle
  } from 'components/ui/card';
import { Textarea } from 'components/ui/textarea';

export default function createCampaign() {

    /* Descomentar quando a parte de login estiver ok

    const session = useSession();
    if (session.status === 'unauthenticated') {
      redirect('/login');
    }
    */

    return (
    <div>
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle className="text-2xl">// Criação de Campanha</CardTitle>
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
                    <Label htmlFor="name">Nome da Camapanha</Label>
                    <Input
                        id="campaignName"
                        placeholder="The Rise of Tiamat"
                        required
                    />
                </div>

                <div>
                    <Button type="submit" className="w-full flex justify-between items-center">
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

                <div className="grid gap-2">
                    <Label htmlFor="description">Sinopse da Campanha</Label>
                    <Textarea
                        id="campaignDescription"
                        placeholder="Um novo perigo está surgindo em Forgotten Realms"
                        required
                    />
                </div>
            </CardContent>

            <CardFooter>
                    <Button type="submit" className="mx-auto w-fit px-8">Criar Campanha</Button>
            </CardFooter>

        </Card>
    </div>
  );
}