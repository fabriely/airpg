'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Button } from 'components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from 'components/ui/card';
import { Input } from 'components/ui/input';
import { Label } from 'components/ui/label';

export default function Login() {
  const session = useSession();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  if (session.status === 'authenticated') {
    redirect('/');
  }

  const validatePassword = () => {
    const specialCharRegex = /[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]/;
    if (password.length < 8) {
      setErrorMessage('A senha deve ter pelo menos 8 caracteres.');
    } else if (!specialCharRegex.test(password)) {
      setErrorMessage('A senha deve conter pelo menos um caractere especial.');
    } else if (password !== password2) {
      setErrorMessage('As senhas não coincidem.');
    } else {
      setErrorMessage('');
    }
  };

  useEffect(() => {
    validatePassword();
  }, [password, password2]);

  const isFormValid = () => {
    return (
      email.includes('@') && 
      password.length >= 8 && 
      /[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]/.test(password) && 
      password === password2 && 
      verificationCode.length > 0
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      alert('Cadastro realizado com sucesso!');
      // TODO: Chamar BACKEND para cadastrar usuário
    }
  };

  return (
    <div className="flex flex-1 flex-col h-full justify-around items-center bg-white text-black">
      <Card className="w-full max-w-sm bg-white">
        <CardHeader className='text-center'>
          <CardTitle className="text-2xl text-black font-bold">Cadastro</CardTitle>
          <CardDescription>Insira seus dados abaixo para se cadastrar</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 text-black">
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label className='font-bold' htmlFor="email">Email</Label>
              <Input 
                className='bg-gray-200 text-black'
                id="email"
                type="email"
                placeholder="exemplo@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label className='font-bold' htmlFor="password">Senha</Label>
              <Input 
                id="password" 
                type="password" 
                className='bg-gray-200' 
                required
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label className='font-bold' htmlFor="password2">Confirmar Senha</Label>
              <Input 
                id="password2" 
                type="password" 
                className='bg-gray-200' 
                required
                placeholder="Confirme sua senha"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
              />
            </div>   
            {errorMessage && (
              <div className="text-red-500 text-sm">{errorMessage}</div>
            )}       
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label className='font-bold' htmlFor="verification">Código de Verificação</Label>
                <Input 
                  id="verification" 
                  type="text" 
                  className='bg-gray-200' 
                  required 
                  placeholder="Insira o código"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                />
              </div>
              <div>
                <Button id="verificationButton" className="w-full h-full">Enviar</Button>
              </div>
            </div>                    
            <div className="grid gap-2 text-green-500 text-center">
              <a className="w-full">Clique em "Enviar" para receber o código por email</a>
            </div>
            <CardFooter>
              <Button 
                type="submit" 
                className={`w-full bg-red-500 ${isFormValid() ? '' : 'opacity-50 cursor-not-allowed'}`}
                disabled={!isFormValid()}
              >
                Cadastrar
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
