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
import { cn } from 'lib/utils';

export default function createCampaign() {
    /* Descomentar quando a parte de login estiver ok

    const session = useSession();
    if (session.status === 'unauthenticated') {
      redirect('/login');
    }
    */

    return (
    <div className="min-h-screen flex justify-left items-start gap-2 bg-[#f2f2f2] pl-24">
        <Card className=" flex-1 w-full max-w-xl border-0 bg-[#f2f2f2]">

            <CardHeader>
                <CardTitle className="text-2xl text-black">// Entrar Em Uma Campanha</CardTitle>
            </CardHeader>

            <CardContent className="grid gap-4">
        
                <div className="grid gap-2">
                    <Label htmlFor="code" className="text-black">Entrar com Código</Label>
                    <Input
                        id="campaignCode"
                        placeholder="Exemplo"
                        className={cn(
                            "h-9 rounded-md text-sm font-medium transition-colors",
                            "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950",
                            "disabled:pointer-events-none disabled:opacity-50",
                            "dark:focus-visible:ring-zinc-300 bg-gray-200 text-zinc-900", // Fundo branco e texto preto
                            "dark:bg-zinc-900 dark:text-zinc-50 border-2 border-zinc-300", // Borda cinza claro
                            "dark:border-zinc-700 shadow hover:border-zinc-500", // Hover mais claro
                            "dark:hover:border-zinc-400 px-4 py-2 w-full"
                          )}
                        required //Se o input debaixo for preenchido, não é required
                    />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="link" className="text-black">Entrar com Link</Label>
                    <Input
                        id="campaignLink"
                        placeholder="Exemplo"
                        className={cn(
                            "h-9 rounded-md text-sm font-medium transition-colors",
                            "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950",
                            "disabled:pointer-events-none disabled:opacity-50",
                            "dark:focus-visible:ring-zinc-300 bg-gray-200 text-zinc-900", // Fundo branco e texto preto
                            "dark:bg-zinc-900 dark:text-zinc-50 border-2 border-zinc-300", // Borda cinza claro
                            "dark:border-zinc-700 shadow hover:border-zinc-500", // Hover mais claro
                            "dark:hover:border-zinc-400 px-4 py-2 w-full"
                          )}
                        required //Se o input de cima for preenchido, não é required
                    />
                </div>          

            </CardContent>

            <CardFooter>
                    <Button variant="destructive" type="submit" className="mx-auto w-fit px-8 color-red">Entrar na Campanha</Button>
            </CardFooter>

        </Card>
    
    </div>
  );
}