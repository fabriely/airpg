import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { RectangleHorizontal } from 'lucide-react';

const Header: React.FC = () => {
    const { data: session } = useSession();
    const router = useRouter();

    return(
        <header className="fixed top-0 left-0 w-full h-[64px] flex justify-between items-center px-4 md:px-[160px] py-[12px] bg-[#191919] z-50">
            <RectangleHorizontal className="text-[#F2F2F2] w-[30px] h-[30px] md:w-[40px] md:h-[40px]" />

            <div className="grid grid-cols-2 grid-flow-row gap-2 md:gap-4">
                {session ? (
                    <>  
                    <button
                        onClick={() => router.push('/menu')}
                        className="w-[130px] h-[35px] md:w-[150px] md:h-[40px] rounded-[8px] bg-gradient-to-r from-[#B81414] to-[#8A0F0F] text-[#F2F2F2] font-crimson font-bold text-[16px] md:text-[20px] hover:bg-gradient-to-r hover:from-[#EB4747] hover:to-[#E51919] col-span-1 col-start-1"
                    > Menu
                    </button>
                    <button
                        onClick={() => signOut()}
                        className="w-[130px] h-[35px] md:w-[150px] md:h-[40px] rounded-[8px] bg-gradient-to-r from-[#B81414] to-[#8A0F0F] text-[#F2F2F2] font-crimson font-bold text-[16px] md:text-[20px] hover:bg-gradient-to-r hover:from-[#EB4747] hover:to-[#E51919] col-span-1 col-start-2"
                    > Sair
                    </button>
                    </>
                ) : (
                    <>
                        <button
                            onClick={() => router.push('/signup')}
                            className="w-[130px] h-[35px] md:w-[150px] md:h-[40px] rounded-[8px] bg-gradient-to-r from-[#B81414] to-[#8A0F0F] text-[#F2F2F2] font-crimson font-bold text-[16px] md:text-[20px] hover:bg-gradient-to-r hover:from-[#EB4747] hover:to-[#E51919] col-span-1 col-start-2"
                        > Cadastrar-se
                        </button>   
                    </>
                )}
            </div>
        </header>
    )
};

export default Header;