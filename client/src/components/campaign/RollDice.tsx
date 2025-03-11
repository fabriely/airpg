'use client';

import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import { CampaignPanel } from 'components/campaign/CampaignPanel';
import { Textarea } from 'components/ui/textarea';
import { Button } from 'components/ui/button';
import { Send } from 'lucide-react';
import { Label } from 'components/ui/label';
import { cn } from 'lib/utils';
import { Input } from 'components/ui/input';

const RollDice = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
    const [diceQnt, setDiceQnt] = useState(1);
    const [diceSides, setDiceSides] = useState(20);
    const [bonus, setBonus] = useState(0);
    const [rollsChosen, setRollsChosen] = useState<Array<string>>([]);
    const [result, setResult] = useState<Array<number>>([]);
    
    const addRoll = () => {
            setRollsChosen([...rollsChosen, `${diceQnt}d${diceSides} + ${bonus}`]);// resolver problema com + e -
            setDiceQnt(1);
            setDiceSides(20);
            setBonus(0);
        };

    const handleRollDice = () => {
        var total = 0;
        const results = [];
        for (let i = 0; i < rollsChosen.length; i++) {
            const [qnt, sides] = rollsChosen[i].split('d').map(Number); //consertar esse split
            for (let j = 0; j < qnt; j++) {
                total += (Math.floor(Math.random() * sides) + 1);
            }
            total += bonus;
            results.push(total);
            total = 0;
        }
        setResult(results);
        setRollsChosen([]);
    };

    return (
        <CampaignPanel
            ref={ref}
            className="flex flex-col max-h-[550px] w-full space-y-4"
            {...props}
        >
            <div className="flex space-x-8 align-middle justify-center">
                <Label className="font-crimson font-bold text-[16px] md:text-[20px] text-[#F2F2F2]"
                > Dado selecionado:
                </Label>
                <Input className="flex md:w-[60px] md:h-[56px] rounded-[8px] font-crimson font-bold text-[20px] md:text-[24px] text-[#191919]"
                    value={diceSides}
                    onChange={(e) => setDiceSides(Number(e.target.value))}
                ></Input>
                <Label className="font-crimson font-bold text-[16px] md:text-[20px] text-[#F2F2F2]"
                > Número de dados:
                </Label>
                <Input className="flex md:w-[60px] md:h-[56px] rounded-[8px] font-crimson font-bold text-[20px] md:text-[24px] text-[#191919]"
                    value={diceQnt}
                    onChange={(e) => setDiceQnt(Number(e.target.value))}
                ></Input>
                <Label className="font-crimson font-bold text-[16px] md:text-[20px] text-[#F2F2F2]"
                > Bônus:
                </Label>
                <Input className="flex md:w-[60px] md:h-[56px] rounded-[8px] font-crimson font-bold text-[20px] md:text-[24px] text-[#191919]"
                    value={bonus}
                    onChange={(e) => setBonus(Number(e.target.value))}
                ></Input>
                <button className="font-crimson font-bold text-[16px] md:text-[20px] md:w-[178px] md:h-[56px] rounded-[8px] bg-gradient-to-r from-[#FFBF00] to-[#CC9900] hover:from-[#CC9900] hover:to-[#FFBF00] text-[#F2F2F2]"
                onClick={addRoll}
                > Adicionar
                </button>
            </div>
            <div className="flex flex-col space-y-4 p-4 bg-[#e3e3e3] mb-4 rounded-lg min-w-0 min-h-[440px]">
                {result.map((value, index) => (
                    <div
                        key={index}
                        className={`p-3 rounded-lg break-words bg-white`}
                    >
                        {value}
                    </div>
                ))}
            </div>
            <div className='relative flex gap-2 bg-[#e3e3e3] p-2 rounded-lg'>
                <button
                    onClick={handleRollDice}
                    className="font-crimson font-bold text-[16px] md:text-[20px] md:w-[178px] md:h-[56px] rounded-[8px] bg-gradient-to-r from-[#FFBF00] to-[#CC9900] hover:from-[#CC9900] hover:to-[#FFBF00]"
                >
                    Rolar
                </button>
            </div>
        </CampaignPanel>
    );
});

RollDice.displayName = "RollDice";
export { RollDice };