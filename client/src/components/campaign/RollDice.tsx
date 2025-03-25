'use client';

import * as React from 'react';
import { useState } from 'react';
import { Label } from 'components/ui/label';
import { Input } from 'components/ui/input';
import { Button } from 'components/ui/button';

const RollDice: React.FC = () => {
    const [diceQnt, setDiceQnt] = useState<string>('1');
    const [diceSides, setDiceSides] = useState(20);
    const [bonus, setBonus] = useState<string>('0');
    const [isKH, setIsKH] = useState(false);
    const [isKL, setIsKL] = useState(false);
    const [keepQnt, setKeepQnt] = useState<string>('1');
    const [rollsChosen, setRollsChosen] = useState<Array<{ roll: string, isKH: boolean, isKL: boolean }>>([]);
    const [tempRollsChosen, setTempRollsChosen] = useState<Array<{ roll: string, isKH: boolean, isKL: boolean }>>([]);
    const [result, setResult] = useState<Array<string>>(["Adicione o tipo de dado, a quantidade de dados e o bonûs para essa rolagem.", "Você também pode ativar KH e KL, para manter os maiores ou menores resultados.", "Você pode adicionar até 6 rolagens com 15 dados cada."]);
    
    const cleanRolls = () => {
        setRollsChosen([]);
        setTempRollsChosen([]);
        setResult([]);
        setBonus('0');
        setDiceQnt('1');
        setIsKH(false);
        setIsKL(false);
        setKeepQnt('1');
        setResult(["Adicione o tipo de dado, a quantidade de dados e o bonûs para essa rolagem.", "Você também pode ativar KH e KL, para manter os maiores ou menores resultados.", "Você pode adicionar até 6 rolagens com 15 dados cada."]);
    };

    const addRoll = () => {
        setResult([]);
                setRollsChosen([...rollsChosen, { roll: `${diceQnt}d${diceSides}${Number(bonus) >= 0 ? ` + ${bonus}` : ` - ${Math.abs(Number(bonus))}`}`, isKH, isKL }]);
    };

    const handleRollDice = () => {
        const rollsToProcess = rollsChosen.length > 0 ? rollsChosen : tempRollsChosen;
        if (rollsChosen.length > 0) {
            setTempRollsChosen([...rollsChosen]);
            setRollsChosen([]);
        }
        const results = [];
        for (let i = 0; i < rollsToProcess.length; i++) {
            const { roll, isKH, isKL } = rollsToProcess[i];
            const [qnt, sidesAndBonus] = roll.split('d');
            const [sides, bonus] = sidesAndBonus.split(/[+-]/).map(Number);
            const isBonusPositive = sidesAndBonus.includes('+');
            const bonusValue = isBonusPositive ? bonus : -bonus;
            let total = 0;
            const individualRolls = [];
            for (let j = 0; j < Number(qnt); j++) {
                const roll = Math.floor(Math.random() * sides) + 1;
                individualRolls.push(roll);
                total += roll;
            }
            total += bonusValue;

            // Process KH and KL
            let rollsString = individualRolls.map(roll => {
                if (roll === 1) return `<span style="color: red;">${roll}</span>`;
                if (roll === sides) return `<span style="color: green;">${roll}</span>`;
                return roll;
            }).join(' + ');

            if (isKH || isKL) {
                const sortedRolls = [...individualRolls].sort((a, b) => a - b);
                const keepCount = Math.min(Number(keepQnt), individualRolls.length);
                const discardCount = individualRolls.length - keepCount;
                const discardedRolls = isKH ? sortedRolls.slice(0, discardCount) : sortedRolls.slice(-discardCount);
                const keptRolls = isKH ? sortedRolls.slice(discardCount) : sortedRolls.slice(0, keepCount);
                total = keptRolls.reduce((acc, roll) => acc + roll, 0) + bonusValue;
                let discardCounter = 0;
                rollsString = individualRolls.map(roll => {
                    if (discardedRolls.includes(roll) && discardCounter < discardCount) {
                        discardCounter++;
                        return `<span style="color: yellow;">${roll}</span>`;
                    }
                    if (roll === 1) return `<span style="color: red;">${roll}</span>`;
                    if (roll === sides) return `<span style="color: green;">${roll}</span>`;
                    return roll;
                }).join(' + ');
            }

            if (Number(qnt) === 1 && bonusValue === 0) {
                const singleRoll = individualRolls[0];
                const singleRollString = singleRoll === 1 ? `<span style="color: red;">${singleRoll}</span>` : singleRoll === sides ? `<span style="color: green;">${singleRoll}</span>` : singleRoll;
                results.push(`${roll} = ${singleRollString}`);
            } else {
                const khklString = isKH ? `(KH: ${keepQnt})` : isKL ? `(KL: ${keepQnt})` : '';
                results.push(`${roll} ${khklString} = ${rollsString} <span style="color: blue;">${bonusValue !== 0 ? (isBonusPositive ? `+ ${bonusValue}` : `- ${Math.abs(bonusValue)}`) : ''}</span> = ${total}`);
            }
        }
        setResult(results);
    };

    return (
        <div className="flex flex-col max-h-[606px] w-full h-full space-y-4">
            <div className="flex items-center space-x-8 space-y-4 align-middle justify-center -mt-8">
                <div className="flex items-center space-x-6">
                    <Label className="font-crimson font-bold text-[16px] md:text-[20px] text-[#F2F2F2] mt-4">Dado:</Label>
                    <select
                        className="flex md:w-[80px] md:h-[40px] rounded-[8px] font-crimson font-bold text-[20px] md:text-[24px] text-[#191919] mt-4"
                        value={diceSides}
                        onChange={(e) => setDiceSides(Number(e.target.value))}>
                        <option value={2}>D2</option>
                        <option value={4}>D4</option>
                        <option value={6}>D6</option>
                        <option value={8}>D8</option>
                        <option value={10}>D10</option>
                        <option value={12}>D12</option>
                        <option value={20}>D20</option>
                        <option value={100}>D100</option>
                    </select>
                </div>
                <div className="flex items-center space-x-6">
                    <Label className="font-crimson font-bold text-[16px] md:text-[20px] text-[#F2F2F2]">Quantidade:</Label>
                    <Input
                        className="flex md:w-[50px] md:h-[40px] rounded-[8px] font-crimson font-bold text-[20px] md:text-[24px] text-[#191919]"
                        type="text"
                        value={diceQnt}
                        onChange={(e) => {
                            const value = e.target.value;
                            if (/^-?\d*$/.test(value)) {
                                setDiceQnt(value);
                            } else {
                                setDiceQnt('1');
                            }
                        }}
                        onBlur={() => {
                            if (diceQnt === '' || Number(diceQnt) < 1 || Number(diceQnt) > 15) {
                                setDiceQnt('1');
                            }
                        }}
                    ></Input>
                </div>
                <div className="flex items-center space-x-6">
                    <Label className="font-crimson font-bold text-[16px] md:text-[20px] text-[#F2F2F2]">Bônus:</Label>
                    <Input
                        type="text"
                        className="flex md:w-[70px] md:h-[40px] rounded-[8px] font-crimson font-bold text-[20px] md:text-[24px] text-[#191919]"
                        value={bonus}
                        onChange={(e) => {
                            const value = e.target.value;
                            if (/^-?\d*$/.test(value)) {
                                setBonus(value);
                            } else {
                                setBonus('0');
                            }
                        }}
                        onBlur={() => {
                            if (bonus === '' || Number(bonus) < -999 || Number(bonus) > 999 || ['', '-', '+'].includes(bonus)) {
                                setBonus('0');
                            }
                        }}
                    ></Input>
                </div>
                <div className="flex items-center space-x-6">
                    <div className="flex flex-row space-x-2">
                        <div className="flex flex-col space-y-2">
                            <Label className="font-crimson font-bold text-[16px] md:text-[20px] text-[#F2F2F2]">KH</Label>
                            <Label className="font-crimson font-bold text-[16px] md:text-[20px] text-[#F2F2F2]">KL</Label>
                        </div>
                        <div className="flex flex-col space-y-6">
                            <Input
                                type="checkbox"
                                className="w-[20px] h-[20px]"
                                checked={isKH}
                                disabled={Number(diceQnt) <= 1}
                                onClick={() => {
                                    setIsKH(!isKH);
                                    setIsKL(false);
                                }}
                            ></Input>
                            <Input
                                type="checkbox"
                                className="w-[20px] h-[20px]"
                                checked={isKL}
                                disabled={Number(diceQnt) <= 1}
                                onClick={() => {
                                    setIsKL(!isKL);
                                    setIsKH(false);
                                }}
                            ></Input>
                        </div>
                    </div>
                    <div className="flex items-center space-x-6">
                        <Label className="font-crimson font-bold text-[16px] md:text-[20px] text-[#F2F2F2]">Quantidade:</Label>
                        <Input
                            className="flex md:w-[50px] md:h-[40px] rounded-[8px] font-crimson font-bold text-[20px] md:text-[24px] text-[#191919]"
                            type="text"
                            value={keepQnt}
                            disabled={!isKH && !isKL}
                            onChange={(e) => {
                                const value = e.target.value;
                                if (/^-?\d*$/.test(value)) {
                                    setKeepQnt(value);
                                } else {
                                    setKeepQnt('1');
                                }
                            }}
                            onBlur={() => {
                                if (keepQnt === '' || Number(keepQnt) < 1 || Number(keepQnt) > Number(diceQnt)) {
                                    setKeepQnt('1');
                                }
                            }}
                        ></Input>
                    </div>
                </div>
            </div>
            <div className="flex flex-col p-4 bg-[#e3e3e3] mb-4 rounded-lg min-w-0 min-h-[400px] h-full gap-4">
                {rollsChosen.map((roll, index) => (
                    <div
                        key={index}
                        className={`p-3 rounded-lg break-words bg-white h-[48px] flex items-center justify-center font-crimson font-bold text-[16px] md:text-[20px]`}
                    >
                        {roll.roll}
                    </div>
                ))}
                {result.map((value, index) => (
                    <div
                        key={index}
                        className={`p-3 rounded-lg break-words bg-white h-[48px] flex items-center justify-center font-crimson font-bold text-[20px] md4text-[20px]`}
                        dangerouslySetInnerHTML={{ __html: value }}
                    >
                    </div>
                ))}
            </div>
            <div className="flex space-x-[200px] justify-center">
                <Button
                    type='button'
                    className="font-crimson font-bold text-[16px] md:text-[20px] md:w-[178px] md:h-[56px] rounded-[8px] bg-gradient-to-r from-[#F2F2F2] to-[#D4D4D4] hover:bg-gradient-to-r hover:from-[#D4D4D4] hover:to-[#B5B5B5]"
                    onClick={cleanRolls}
                    disabled={tempRollsChosen.length <=0 && rollsChosen.length <= 0}
                >
                    Limpar
                </Button>
                
                <Button
                    type='button'
                    className="font-crimson font-bold text-[16px] md:text-[20px] md:w-[178px] md:h-[56px] rounded-[8px] bg-gradient-to-r from-[#FFBF00] to-[#CC9900] hover:bg-gradient-to-r hover:from-[#CC9900] hover:to-[#FFBF00] text-[#F2F2F2]"
                    onClick={handleRollDice}
                    disabled={tempRollsChosen.length <=0 && rollsChosen.length <= 0}
                >
                    Rolar
                </Button>

                <Button className="font-crimson font-bold text-[16px] md:text-[20px] md:w-[178px] md:h-[56px] rounded-[8px] bg-gradient-to-r from-[#F2F2F2] to-[#D4D4D4] hover:bg-gradient-to-r hover:from-[#D4D4D4] hover:to-[#B5B5B5]"
                    onClick={addRoll}
                    disabled={rollsChosen.length >= 6 || Number(diceQnt) > 15 || Number(bonus) < -999 || Number(bonus) > 999 || ['', '-', '+'].includes(bonus) || diceQnt === ''}
                > Adicionar
                </Button>
            </div>
        </div>
    );
};

RollDice.displayName = "RollDice";
export { RollDice };