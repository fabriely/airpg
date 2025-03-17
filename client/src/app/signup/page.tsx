'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
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
import api from 'services/api';
import { verifyExistingEmail } from 'services/verifyExistingEmail';
import { FiEye, FiEyeOff } from 'react-icons/fi';

export default function Login() {
  const router = useRouter();
  const session = useSession();
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  if (session.status === 'authenticated') {
    router.replace('/');
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

  const handleEmailVerification = async () => {
    const emailVerification = await verifyExistingEmail(email);
    if (!emailVerification.success) {
      setErrorMessage(emailVerification.message);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    const isEmailValid = await handleEmailVerification();
    if (!isEmailValid) {
      return;
    }

    if (isFormValid()) {
      try {
        const response = await api.post("/users/", {
          username: userName,
          email,
          password,
        });

        if (response.status === 200) {
          alert('Cadastro realizado com sucesso! Faça Login para continuar.');
          router.replace('/');
        }
      } catch (error) {
        setErrorMessage("Um erro inesperado ocorreu. Por favor, tente novamente.");
        console.error(error);
      }
    }
  };

  return (
    <div className="flex flex-1 flex-col h-full justify-around items-center bg-[#F2F2F2] text-black">
      <Card className="w-full max-w-sm bg-white shadow-2xl">
        <CardHeader className='text-center'>
          <CardTitle className="font-crimson text-3xl text-black font-bold">Cadastro</CardTitle>
          <CardDescription className='font-crimson text-md font-bold text-center'>
            Insira seus dados abaixo para se cadastrar
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 text-black">
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label className='font-crimson text-lg font-semibold' htmlFor="email">Nome Usuário</Label>
              <Input 
                className='font-crimson text-md bg-[#E3E3E3] shadow-[inset_5px_5px_10px_rgba(0,0,0,0.1)]'
                id="nameUser"
                type="string"
                placeholder="Digite seu nome"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label className='font-crimson text-lg font-semibold' htmlFor="email">Email</Label>
              <Input 
                className='font-crimson text-md bg-[#E3E3E3] shadow-[inset_5px_5px_10px_rgba(0,0,0,0.1)]'
                id="email"
                type="email"
                placeholder="exemplo@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label className='font-crimson text-lg font-semibold' htmlFor="password">Senha</Label>
              <div className="relative">
                <Input 
                  id="password" 
                  type={showPassword ? "text" : "password"}
                  className='font-crimson text-md bg-[#E3E3E3] shadow-[inset_5px_5px_10px_rgba(0,0,0,0.1)] pr-10'
                  required
                  placeholder="Digite sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                >
                  {showPassword ? <FiEyeOff className="h-5 w-5" /> : <FiEye className="h-5 w-5" />}
                </button>
              </div>
            </div>
            <div className="grid gap-2">
              <Label className='font-crimson text-lg font-semibold' htmlFor="password2">Confirmar Senha</Label>
              <div className="relative">
                <Input 
                  id="password2" 
                  type={showConfirmPassword ? "text" : "password"}
                  className='font-crimson text-md bg-[#E3E3E3] shadow-[inset_5px_5px_10px_rgba(0,0,0,0.1)] pr-10'
                  required
                  placeholder="Confirme sua senha"
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  aria-label={showConfirmPassword ? "Ocultar senha" : "Mostrar senha"}
                >
                  {showConfirmPassword ? <FiEyeOff className="h-5 w-5" /> : <FiEye className="h-5 w-5" />}
                </button>
              </div>
            </div>
            {errorMessage && (
              <div className="text-red-500 font-crimson text-md font-bold text-center">{errorMessage}</div>
            )}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label className='font-crimson text-base font-semibold' htmlFor="verification">Código de Verificação</Label>
                <Input 
                  id="verification" 
                  type="text" 
                  className='font-crimson text-md bg-[#E3E3E3] shadow-[inset_5px_5px_10px_rgba(0,0,0,0.1)]'
                  required 
                  placeholder="Insira o código"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                />
              </div>
              <div className='flex items-end'>
                <Button id="verificationButton" className="title font-crimson font-bold text-lg w-full h-[41px] rounded-[8px]">
                  Enviar
                </Button>
              </div>
            </div>
            <div className="grid gap-2 text-[#70b055] text-center">
              <a className="font-crimson text-sm font-bold w-full">
                Clique em &quot;Enviar&quot; para receber o código por email
              </a>
            </div>
            <CardFooter>
              <Button 
                type="submit" 
                className={`title w-full font-crimson font-bold text-xl bg-gradient-to-r from-[#B81414] to-[#8A0F0F] text-[#F2F2F2] text-[20px] hover:bg-gradient-to-r hover:from-[#EB4747] hover:to-[#E51919] px-8 py-5 h-9 ${
                  isFormValid() ? '' : 'opacity-50 cursor-not-allowed'
                }`}
                disabled={!isFormValid()}
              >
                Cadastrar-se
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}