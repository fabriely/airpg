'use client';
import { FC } from 'react';
import { Button } from 'components/ui/button';
import { Input } from 'components/ui/input';
import { Label } from 'components/ui/label';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from 'components/ui/card';

interface ModalProps {
    isOpen: boolean;
    closeModal: () => void;
    handleSubmit: (e: React.FormEvent) => void;
    code: string;
    setCode: React.Dispatch<React.SetStateAction<string>>;
}

const ModalJoinCampaign: FC<ModalProps> = ({ isOpen, closeModal, handleSubmit, code, setCode }) => {
    if (!isOpen) return null; // Não renderiza o modal se não estiver aberto

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <Card className="w-full max-w-xl border-0 bg-white relative">
                <button
                    onClick={closeModal}
                    className="absolute top-2 right-2 text-black text-2xl font-bold"
                >
                    &times;
                </button>
                <form onSubmit={handleSubmit} className="flex flex-col items-center">
                    <CardHeader>
                        <CardTitle className="text-2xl text-black font-crimson">Entrar Em Uma Campanha</CardTitle>
                    </CardHeader>

                    <CardContent className="grid gap-4 w-full">
                        <div className="grid gap-2 w-full text-center">
                            <Label htmlFor="code" className="text-black font-crimson font-normal text-base">
                                Insira o Código da campanha
                            </Label>
                            <Input
                                id="campaignCode"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                placeholder="Exemplo"
                                className="w-48 h-9 rounded-lg font-medium transition-colors bg-gray-200 text-zinc-900 px-4 py-2 mx-auto focus:ring-0 focus:border-transparent" 
                            />
                        </div>
                    </CardContent>

                    <CardFooter className="w-full text-center">
                        <Button
                            variant="destructive" type="submit" className="mx-auto w-fit px-8 color-red h-9">
                            Entrar
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}

export default ModalJoinCampaign;
