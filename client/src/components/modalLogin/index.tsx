'use client';
import { FC } from 'react';
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

interface ModalLoginProps {
  isOpen: boolean;
  onClose: () => void;
}


const ModalLogin: FC<ModalLoginProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null; // Se não estiver aberto, não renderiza o modal

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <Card className="w-full max-w-sm h-1/2 px-4 py-6 bg-white relative">
        <button
            onClick={onClose}
            className="absolute top-2 right-2 text-black text-2xl font-bold"
        >
            &times;
        </button>
        <CardHeader>
          <CardTitle className="font-crimson text-3xl flex justify-center">Login</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-8 pt-6">
          <div className="grid gap-2">
            <Label htmlFor="email" className="font-crimson text-lg font-semibold">Email</Label>
            <Input
              id="email"
              type="email"
              className="font-crimson text-md bg-[#E3E3E3] shadow-[inset_5px_5px_10px_rgba(0,0,0,0.1)]"
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="grid gap-2 mb-6">
            <Label htmlFor="password" className="font-crimson text-lg font-semibold">Senha</Label>
            <Input
              id="password"
              type="password"
              className="bg-[#E3E3E3] shadow-[inset_5px_5px_10px_rgba(0,0,0,0.1)] font-crimson text-md"
              placeholder="Digite sua senha"
              required
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-center -mt-4">
          <Button className="title font-crimson font-medium text-xl bg-gradient-to-r from-[#B81414] to-[#8A0F0F] text-[#F2F2F2] text-[20px] hover:bg-gradient-to-r hover:from-[#EB4747] hover:to-[#E51919] px-8 py-5 h-9">
            Fazer login
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default ModalLogin;