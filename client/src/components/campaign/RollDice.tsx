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
    const [result, setResult] = useState<Array<string>>([]);
    
    const addRoll = () => {
        setResult([]);
        if (rollsChosen.length < 6) {
            setRollsChosen([...rollsChosen, `${diceQnt}d${diceSides}${bonus >= 0 ? ` + ${bonus}` : ` - ${Math.abs(bonus)}`}`]);
            setDiceQnt(1);
            setDiceSides(20);
            setBonus(0);
        } else {
            alert('Você só pode adicionar até 6 rolagens por vez.');
        }
    };

    const handleRollDice = () => {
        const results = [];
        for (let i = 0; i < rollsChosen.length; i++) {
            const [qnt, sidesAndBonus] = rollsChosen[i].split('d');
            const [sides, bonus] = sidesAndBonus.split(/[+-]/).map(Number);
            const isBonusPositive = sidesAndBonus.includes('+');
            const bonusValue = isBonusPositive ? bonus : -bonus;
            let total = 0;
            for (let j = 0; j < Number(qnt); j++) {
                total += (Math.floor(Math.random() * sides) + 1);
            }
            total += bonusValue;
            results.push(`${rollsChosen[i]} = ${total}`);
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
            <div className="flex space-x-6 align-middle justify-center -mt-8">
                <Label className="font-crimson font-bold text-[16px] md:text-[20px] text-[#F2F2F2]"
                > Dado selecionado:
                </Label>
                <select
                    className="flex md:w-[90px] md:h-[56px] rounded-[8px] font-crimson font-bold text-[20px] md:text-[24px] text-[#191919]"
                    value={diceSides}
                    onChange={(e) => setDiceSides(Number(e.target.value))}>
                    <option value={2}>D2</option>
                    <option value={3}>D3</option>
                    <option value={4}>D4</option>
                    <option value={6}>D6</option>
                    <option value={8}>D8</option>
                    <option value={10}>D10</option>
                    <option value={12}>D12</option>
                    <option value={20}>D20</option>
                    <option value={100}>D100</option>
                </select>
                <Label className="font-crimson font-bold text-[16px] md:text-[20px] text-[#F2F2F2]"
                > Número de dados:
                </Label>
                <Input className="flex md:w-[60px] md:h-[56px] rounded-[8px] font-crimson font-bold text-[20px] md:text-[24px] text-[#191919]"
                    type="number"
                    value={diceQnt}
                    onChange={(e) => {
                        const value = Number(e.target.value);
                        if (value > 0 && Number.isInteger(value)) {
                            setDiceQnt(value);
                        }
                    }}
                    step="1"
                    min="1"
                ></Input>
                <Label className="font-crimson font-bold text-[16px] md:text-[20px] text-[#F2F2F2]"
                > Bônus:
                </Label>
                <Input
                    type="number"
                    className="flex md:w-[60px] md:h-[56px] rounded-[8px] font-crimson font-bold text-[20px] md:text-[24px] text-[#191919]"
                    value={bonus}
                    onChange={(e) => setBonus(Number(e.target.value))}
                    step="1"
                ></Input>
                <button className="font-crimson font-bold text-[16px] md:text-[20px] md:w-[178px] md:h-[56px] rounded-[8px] bg-gradient-to-r from-[#FFBF00] to-[#CC9900] hover:from-[#CC9900] hover:to-[#FFBF00] text-[#F2F2F2]"
                onClick={addRoll}
                > Adicionar
                </button>
            </div>
            <div className="flex flex-col space-y-4 p-4 bg-[#e3e3e3] mb-4 rounded-lg min-w-0 min-h-[400px]">
                {rollsChosen.map((roll, index) => (
                    <div
                        key={index}
                        className={`p-3 rounded-lg break-words bg-white`}
                    >
                        {roll}
                    </div>
                ))}
                {result.map((value, index) => (
                    <div
                        key={index}
                        className={`p-3 rounded-lg break-words bg-white`}
                    >
                        {value}
                    </div>
                ))}
            </div>
            <div className="flex justify-center">
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