'use client';
import React from 'react';
import { Header } from 'components';
import ModalLogin from 'components/modal/ModalLogin';
import redDragon from 'assets/red-dragon.jpg';

export default function Home() {
  return (
    <div className="relative flex flex-1 flex-col h-full justify-around items-center overflow-hidden">
      <div
        className="absolute -z-10"
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          height: '116vh',         
          width: '116vw',
          backgroundImage: `url(${redDragon.src})`,
          backgroundPosition: 'top right', 
          backgroundSize: 'cover',
          transform: 'scaleX(-1)',
        }}
      ></div>
      <Header />
      <ModalLogin isOpen={true} onClose={() => {}} />
    </div>
  );
}