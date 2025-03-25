'use client';
import { FC, useState } from 'react';
import { Button } from 'components/ui/button';
import { Input } from 'components/ui/input';
import { Label } from 'components/ui/label';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from 'components/ui/card';
import api from 'services/api';

interface ModalProps {
    isOpen: boolean;
    closeModal: () => void;
    userEmail: string;
}

const ModalJoinCampaign: FC<ModalProps> = ({ isOpen, closeModal, userEmail }) => {
    const [code, setCode] = useState('');
    const [characterName, setCharacterName] = useState('');
    const [characterClass, setCharacterClass] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(1); 

    const handleValidateCode = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await api.post('/validate-campaign/', {
               code, user_email: userEmail 
            });
            
            const data = response.data

            if (!response.status) {
                throw new Error(data.detail || 'Código inválido');
            }

            setStep(2); // Avançar para a etapa de inserir o personagem
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleJoinCampaign = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await api.post('/join-campaign/', {
                    code, 
                    user_email: userEmail,
                    character_name: characterName, 
                    character_class: characterClass 
            });

            const data = response.data

            if (!response.status) {
                throw new Error(data.detail || 'Código inválido');
            }

            alert('Você entrou na campanha com sucesso!');
            closeModal();
            setCode('');
            setCharacterName('');
            setCharacterClass('');
            setStep(1); // Resetar para a primeira etapa
        } catch (err: any) {
            if (err.response && err.response.status === 409) {
                setError("Usuário já está na campanha");
            } else {
                setError(err.message);
            }
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <Card className="w-full max-w-sm border-0 bg-white relative">
                <button onClick={closeModal} className="absolute top-2 right-4 text-[#191919] text-2xl font-bold">
                    &times;
                </button>

                <form onSubmit={step === 1 ? handleValidateCode : handleJoinCampaign} className="flex flex-col items-center">
                    <CardHeader>
                        <CardTitle className="text-2xl text-[#191919] font-crimson">Entrar em Campanha</CardTitle>
                    </CardHeader>

                    <CardContent className="grid gap-4 w-full">
                        {step === 1 ? (
                            <>
                                <div className="grid gap-2 w-full text-center">
                                    <Label 
                                    htmlFor="code" 
                                    className="text-[#191919] font-crimson text-xl">Código da Campanha</Label>
                                    <Input 
                                    id="code"
                                    value={code} 
                                    onChange={(e) => setCode(e.target.value)} 
                                    placeholder="aBc123"
                                    className="w-48 h-9 rounded-lg font-medium transition-colors bg-gray-200 text-zinc-900 px-4 py-2 mx-auto focus:ring-0 focus:border-transparent" 
                                    />
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="grid gap-2 w-full text-center">
                                    <Label 
                                    htmlFor="characterName"
                                    className="text-[#191919] font-crimson text-xl">Nome do Personagem</Label>
                                    <Input 
                                    id="characterName" 
                                    value={characterName} 
                                    onChange={(e) => setCharacterName(e.target.value)} 
                                    placeholder="Exemplo: Aragorn" 
                                    className="w-48 h-9 rounded-lg font-medium transition-colors bg-gray-200 text-zinc-900 px-4 py-2 mx-auto focus:ring-0 focus:border-transparent" 
                                    />
                                </div>

                                <div className="grid gap-2 w-full text-center">
                                    <Label 
                                    htmlFor="characterClass"
                                    className="text-[#191919] font-crimson text-xl">Classe do Personagem</Label>
                                    <Input 
                                    id="characterClass" 
                                    value={characterClass} 
                                    onChange={(e) => setCharacterClass(e.target.value)} 
                                    placeholder="Exemplo: Guerreiro" 
                                    className="w-48 h-9 rounded-lg font-medium transition-colors bg-gray-200 text-zinc-900 px-4 py-2 mx-auto focus:ring-0 focus:border-transparent" 
                                    />
                                </div>
                            </>
                        )}

                        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                    </CardContent>

                    <CardFooter className="w-full text-center">
                        <Button type="submit" className="mx-auto w-fit px-8 h-9" disabled={loading}>
                            {loading ? 'Carregando...' : step === 1 ? 'Validar Código' : 'Entrar Na Partida'}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}

export default ModalJoinCampaign;
