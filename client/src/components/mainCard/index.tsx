import { Button } from 'components/ui/button';
import React from 'react';
import { Car, RectangleHorizontal } from 'lucide-react';
import { Card, CardContent } from 'components/ui/card';
import { cn } from 'lib/utils'

const Maincard = React.forwardRef <HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>
    (({ className, ...props}, ref) => (
        <div ref={ref} className={cn(className)} {...props}>
            <button className='flex flex-col space-y-1 w-full h-full bg-[#191919] shadow-[4px_4px_4px_hsla(0, 0, 0, 25%)] rounded-2xl bg-clip-content'>
                <div className='w-full h-full bg-[#E3E3E3] rounded-t-2xl'>

                </div>
                <Card className='w-full h-[84px] bg-gradient-to-r from-[#B81414] to-[#8A0F0F] px-2xl pt-2 pb-4 rounded-b-2xl border-none rounded-t-none shadow-none'>
                    <CardContent className='flex flex-col items-start'>
                        <h2 className='font-grenzen font-bold text-[#F2F2F2] text-2xl'>
                            Nome da Campanha
                        </h2>
                        <p className='font-crimson text-[#F2F2F2] text-[16px]'>
                            Sistema de RPG | Mestre | 4 Jogadores
                        </p>
                    </CardContent>
                </Card>
            </button>
        </div>
    )
)
Maincard.displayName = 'Maincard'

export {Maincard};
