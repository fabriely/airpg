import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from 'components/ui/button';
import React from 'react';
import { RectangleHorizontal } from 'lucide-react';

const Header: React.FC = () => {
    const router = useRouter();

    return(
        <header className="fixed top-0 left-0 w-full h-[80px] flex justify-between items-center px-[160px] py-[12px] bg-[#191919] ">
            <RectangleHorizontal className='w-[317px] h-[56px] bg-[#FFFFFF]'></RectangleHorizontal>
            <div className="grid grid-cols-2 grid-flow-row gap-4">
                <button
                    className="w-[178px] h-[56px] rounded-[8px] bg-gradient-to-r from-[#F2F2F2] to-[#D4D4D4] text-[#191919] font-crimson font-bold text-[20px] hover:bg-gradient-to-r hover:from-[#D4D4D4] hover:to-[#B5B5B5] col-span-1 col-start-1"
                > Fazer Login
                </button>
                <button
                    onClick={() => router.push('/signup')}
                    className="w-[178px] h-[56px] rounded-[8px] bg-gradient-to-r from-[#B81414] to-[#8A0F0F] text-[#F2F2F2] font-crimson font-bold text-[20px] hover:bg-gradient-to-r hover:from-[#EB4747] hover:to-[#E51919] col-span-1 col-start-2"
                > Cadastre-se
                </button>    
            </div>
        </header>

    )
};

export default Header;