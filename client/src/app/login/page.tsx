'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { Button } from 'components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from 'components/ui/card';
import { Input } from 'components/ui/input';
import { Label } from 'components/ui/label';

export default function Login() {
  const session = useSession();

  if (session.status === 'authenticated') {
    redirect('/');
  }

  return (
    <div className="flex flex-1 flex-col h-full justify-around items-center">
      <Card className="w-full max-w-sm h-1/2 px-4 py-6">
        <CardHeader>
          <CardTitle className="font-skranji text-3xl flex justify-center">Login</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-8 pt-6">
          <div className="grid gap-2">
            <Label htmlFor="email" className='font-crimson text-lg font-semibold'>Email</Label>
            <Input
              id="email"
              type="email"
              className=' font-crimson text-md bg-[#E3E3E3] shadow-[inset_5px_5px_10px_rgba(0,0,0,0.1)]'
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="grid gap-2 mb-6">
            <Label htmlFor="password" className='font-crimson text-lg font-semibold'>Senha</Label>
            <Input id="password" type="password" className='bg-[#E3E3E3] shadow-[inset_5px_5px_10px_rgba(0,0,0,0.1)] font-crimson text-md' placeholder='Digite sua senha' required />
          </div>
        </CardContent>
        <CardFooter className='flex justify-center'>
          <Button className="title font-crimson font-medium text-xl bg-gradient-to-r from-[#B81414] to-[#8A0F0F] px-8 py-5">Fazer login</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
