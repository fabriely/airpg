import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { RectangleHorizontal } from 'lucide-react';
import ModalLogin from 'components/modal/ModalLogin';

const Header: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false); 
    const { data: session } = useSession();
    const router = useRouter();

    const openModal = () => setIsOpen(true);  // Função para abrir o modal
    const onClose: () => void = () => {
      setIsOpen(false);
    };  

    return(
        <header className="fixed top-0 left-0 w-full h-[60px] flex justify-between items-center px-4 md:px-[160px] py-[12px] bg-[#191919] ">
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
                            onClick={openModal}
                            className="w-[130px] h-[35px] md:w-[150px] md:h-[40px] rounded-[8px] bg-gradient-to-r from-[#F2F2F2] to-[#D4D4D4] text-[#191919] font-crimson font-bold text-[16px] md:text-[20px] hover:bg-gradient-to-r hover:from-[#D4D4D4] hover:to-[#B5B5B5] col-span-1 col-start-1"
                        > Fazer Login
                        </button>
                        <button
                            onClick={() => router.push('/signup')}
                            className="w-[130px] h-[35px] md:w-[150px] md:h-[40px] rounded-[8px] bg-gradient-to-r from-[#B81414] to-[#8A0F0F] text-[#F2F2F2] font-crimson font-bold text-[16px] md:text-[20px] hover:bg-gradient-to-r hover:from-[#EB4747] hover:to-[#E51919] col-span-1 col-start-2"
                        > Cadastrar-se
                        </button>   
                        <ModalLogin isOpen={isOpen} onClose={onClose} /> 
                    </>
                )}
            </div>
        </header>
    )
};

export default Header;