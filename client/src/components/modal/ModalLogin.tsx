"use client";
import { FC, useState } from 'react';
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
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
import { validateEmail } from '../../services/valideEmail';

interface ModalLoginProps {
  isOpen: boolean;
  onClose: () => void;
}


const ModalLogin: FC<ModalLoginProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  if (!isOpen) return null; // Se não estiver aberto, não renderiza o modal
    
    const handleSubmit = async(e: { preventDefault: () => void; }) => {
        e.preventDefault();
        
        if (!email || !password) {
            setError('Por favor, preencha todos os campos.');
            return;
        }
        const emailValidation = await validateEmail(email);
        if (!emailValidation.success) { 
            setError(emailValidation.message);
            return;
        }

        if (emailValidation.success) {
          const result = await signIn("credentials", {
            redirect: false,
            email: email,
            password: password,
            username: "",
          });
        
        
        if (result?.error) {
          console.error("Falha no login:", result.error);
          setError("Email ou senha incorretos.");
        } else {
          router.replace("/menu");
          onClose();
        }
      };
    };

  return (
    <div className="fixed inset-0 flex justify-end items-center z-40 px-40">
      <Card className="w-full max-w-sm px-4 py-6 bg-white relative">
        <CardHeader>
          <CardTitle className="font-crimson text-3xl flex justify-center">Login</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 pt-6">
          <div className="grid gap-2">
            <Label htmlFor="email" className="font-crimson text-lg font-semibold">Email</Label>
            <Input
              id="email"
              type="email"
              className="font-crimson text-md bg-[#E3E3E3] shadow-[inset_5px_5px_10px_rgba(0,0,0,0.1)]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Insira seu email"
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          {error && (
              <div className="text-red-500 text-xs text-center">{error}</div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-center -mt-4">
          <Button onClick={handleSubmit} className="title font-crimson font-bold text-xl bg-gradient-to-r from-[#B81414] to-[#8A0F0F] text-[#F2F2F2] text-[20px] hover:bg-gradient-to-r hover:from-[#EB4747] hover:to-[#E51919] px-8 py-5 h-9">
            Fazer login
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default ModalLogin;