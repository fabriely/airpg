import React from 'react';
import { Card, CardContent } from 'components/ui/card';
import { cn } from 'lib/utils';

interface MaincardProps extends React.HTMLAttributes<HTMLDivElement> {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  campaignName: string;
  systemRPG: string;
  is_master?: boolean;
}

const Maincard = React.forwardRef<HTMLDivElement, MaincardProps>(
  ({ campaignName, systemRPG, is_master, onClick, className, ...props }, ref) => (
    <div ref={ref} className={cn(className)} {...props}>
      <button 
      onClick={onClick}
      className='flex flex-col  w-full h-full bg-[#191919] shadow-[4px_4px_4px_hsla(0, 0, 0, 25%)] rounded-2xl bg-clip-content'>
        <div className='w-full h-full bg-[#E3E3E3] rounded-t-2xl'>
          {/* Imagem ou algo mais pode ser adicionado aqui */}
        </div>
        <Card className='w-full h-[84px] bg-gradient-to-r from-[#B81414] to-[#8A0F0F] px-2xl pt-2 pb-4 rounded-b-2xl border-none rounded-t-none shadow-none'>
          <CardContent className='flex flex-col items-start'>
            <h2 className='font-grenze font-bold text-[#F2F2F2] text-2xl'>
              {campaignName}
            </h2>
            <div className='flex space-x-2'>
              <p className='font-crimson text-[#F2F2F2] text-[16px]'>
              {systemRPG}
              </p>
              <span className='text-[#F2F2F2]'>|</span>
              <p className='font-crimson text-[#F2F2F2] text-[16px]'>
              {is_master ? 'Mestre' : 'Jogador'}
              </p>
            </div>
          </CardContent>
        </Card>
      </button>
    </div>
  )
);

Maincard.displayName = 'Maincard';

export { Maincard };
