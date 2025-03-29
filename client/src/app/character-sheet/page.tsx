'use client';

import Image from 'next/image';
import { Button } from 'components/ui/button';
import { Input } from 'components/ui/input';
import { Label } from 'components/ui/label';
import { useState } from 'react';
import { User } from 'lucide-react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardFooter
} from 'components/ui/card';

interface Character {
    name: string;
    classLevel: string;
    background: string;
    playerName: string;
    raceSize: string;
    alignment: string;
    experiencePoints: string;
    strength: string;
    dexterity: string;
    constitution: string;
    intelligence: string;
    wisdom: string;
    charisma: string;
    initiative: string;
    hitPoints: string;
    temporaryHitPoints: string;
    weapons: string;
    armor: string;
    characterImage: File | null
}

export default function CharacterSheet() {

    const [character, setCharacter] = useState({
        name: '',
        classLevel: '',
        background: '',
        playerName: '',
        raceSize: '',
        alignment: '',
        experiencePoints: '',
        strength: '',
        dexterity: '',
        constitution: '',
        intelligence: '',
        wisdom: '',
        charisma: '',
        initiative: '',
        hitPoints: '',
        temporaryHitPoints: '',
        weapons: '',
        armor: '',
        characterImage: null
    });

    const handleChange = <T extends keyof Character>(field: T, value: Character[T]) => {
        setCharacter({ ...character, [field]: value });
    };

    const handleSubmit = async () => {
            // e.preventDefault();
            // if (!character) {
            //     alert("Por favor, preencha todos os campos obrigatórios.");
            //     return;
            // }
            // try {
            //     // Enviar dados para o backend
            //     const response = await api.post('/newcharacter/', {
            //         name: name
            //     });
            //     if (response.status === 200) {
            //         alert(`Personagem criado com sucesso! Bom jogo, ${character.name}!`);
            //         setCharacter(character);
            //     } else {
            //         console.error(response.statusText);
            //         alert("Erro ao criar personagem.");
            //     }
            // } catch (error) {
            //     console.error(error);
            //     alert("Ocorreu um erro ao tentar criar o personagem.");
            // }
        };

    return (
        <div className="min-h-screen flex justify-center items-start gap-4 bg-gradient p-4 md:p-8">
            <Card className="flex-1 w-full max-w-2xl border-0 bg-[#f2f2f2]">
                <CardHeader>
                    <CardTitle className="text-5xl text-black font-grenze text-center">Ficha de Personagem</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                <div className="grid gap-2">
                        <Label htmlFor="characterImage" className='text-black font-crimson text-xl font-bold'>Imagem do personagem</Label>
                        <div 
                            className="w-32 h-32 border rounded-md flex items-center justify-center bg-gray-200 cursor-pointer"
                            onClick={() => document.getElementById('characterImage')?.click()}
                        >
                            {character.characterImage ? (
                                <Image 
                                    src={URL.createObjectURL(character.characterImage)}
                                    alt="Personagem"
                                    width={128}
                                    height={128}
                                    className="object-cover rounded-md"
                                />
                            ) : (
                                <div className="text-gray-500">
                                    <User className='w-16 h-16'/>
                                </div>
                            )}
                        </div>
                        <Input id="characterImage" type="file" accept="image/*" className="hidden" onChange={(e) => handleChange('characterImage', e.target.files ? e.target.files[0] : null)} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="name" className='text-black font-crimson text-xl font-bold'>Nome</Label>
                        <Input id="name" className="h-9 rounded-md text-base font-medium transition-colors font-crimson"
                            required value={character.name} onChange={(e) => handleChange('name', e.target.value)} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="classLevel" className='text-black font-crimson text-xl font-bold'>Classe e Nível</Label>
                        <Input id="classLevel" value={character.classLevel} onChange={(e) => handleChange('classLevel', e.target.value)} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="raceSize" className='text-black font-crimson text-xl font-bold'>Raça e Tamanho</Label>
                        <Input id="raceSize" value={character.raceSize} onChange={(e) => handleChange('raceSize', e.target.value)} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="alignment" className='text-black font-crimson text-xl font-bold'>Alinhamento</Label>
                        <Input id="alignment" value={character.alignment} onChange={(e) => handleChange('alignment', e.target.value)} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="experiencePoints" className='text-black font-crimson text-xl font-bold'>Pontos de Experiência</Label>
                        <Input id="experiencePoints" type="number" value={character.experiencePoints} onChange={(e) => handleChange('experiencePoints', e.target.value)} />
                    </div>
                    <Card className="p-4">
                        <CardTitle className="text-xl font-crimson font-bold text-black">Atributos</CardTitle>
                        <div className="grid grid-cols-3 gap-4 mt-4">
                            {["força", "Destreza", "Constituição", "Inteligência", "Sabedoria", "Carisma"].map(attr => (
                                <div key={attr} className="flex flex-col gap-1">
                                    <Label htmlFor={attr} className="text-lg font-semibold font-crimson text-black">
                                        {attr.charAt(0).toUpperCase() + attr.slice(1)}
                                    </Label>
                                    <Input
                                        id={attr}
                                        type="number"
                                        value={character[attr as keyof Character] ?? ""}
                                        onChange={(e) => handleChange(attr as keyof Character, e.target.value)}
                                        className="w-full"
                                    />
                                </div>
                            ))}
                        </div>
                    </Card>
                </CardContent>
                <CardFooter>
                    <Button variant="destructive" type="submit" onClick={handleSubmit} className="mx-auto w-fit px-8">Criar Personagem</Button>
                </CardFooter>
            </Card>
        </div>
    );
}
