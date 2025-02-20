'use client';
import { useState } from 'react';
import { Button } from 'components/ui/button';
import { Input } from 'components/ui/input';
import { Label } from 'components/ui/label';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from 'components/ui/card';
import { cn } from 'lib/utils';

export default function JoinCampaign() {
    /* Descomentar quando a parte de login estiver ok

    const session = useSession();
    if (session.status === 'unauthenticated') {
      redirect('/login');
    }
    */

    const [code, setCode] = useState('');
    const [link, setLink] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        //code e link para valores
    };

    return (
        <div className="min-h-screen flex justify-left items-start gap-2 bg-[#f2f2f2] pl-24">
            <Card className="flex-1 w-full max-w-xl border-0 bg-[#f2f2f2]">
                <form onSubmit={handleSubmit}>

                    <CardHeader>
                        <CardTitle className="text-2xl text-black">// Entrar Em Uma Campanha</CardTitle>
                    </CardHeader>

                    <CardContent className="grid gap-4">

                        <div className="grid gap-2">
                        <Label htmlFor="code" className="text-black">Entrar com Código</Label>
                        <Input
                            id="campaignCode"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            placeholder="Exemplo"
                            className={cn(
                            "h-9 rounded-md text-sm font-medium transition-colors",
                            "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950",
                            "disabled:pointer-events-none disabled:opacity-50",
                            "dark:focus-visible:ring-zinc-300 bg-gray-200 text-zinc-900",
                            "dark:bg-zinc-900 dark:text-zinc-50 border-2 border-zinc-300",
                            "dark:border-zinc-700 shadow hover:border-zinc-500",
                            "dark:hover:border-zinc-400 px-4 py-2 w-full"
                            )}
                            required={!link}
                        />
                        </div>

                        <div className="grid gap-2">
                        <Label htmlFor="link" className="text-black">Entrar com Link</Label>
                        <Input
                            id="campaignLink"
                            value={link}
                            onChange={(e) => setLink(e.target.value)}
                            placeholder="Exemplo"
                            className={cn(
                            "h-9 rounded-md text-sm font-medium transition-colors",
                            "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950",
                            "disabled:pointer-events-none disabled:opacity-50",
                            "dark:focus-visible:ring-zinc-300 bg-gray-200 text-zinc-900",
                            "dark:bg-zinc-900 dark:text-zinc-50 border-2 border-zinc-300",
                            "dark:border-zinc-700 shadow hover:border-zinc-500",
                            "dark:hover:border-zinc-400 px-4 py-2 w-full"
                            )}
                            required={!code}
                        />
                        </div>

                    </CardContent>

                    <CardFooter>
                        <Button
                        variant="destructive" type="submit" className="mx-auto w-fit px-8 color-red">
                        Entrar na Campanha
                        </Button>
                    </CardFooter>

                </form>
            </Card>
        </div>
    );
}