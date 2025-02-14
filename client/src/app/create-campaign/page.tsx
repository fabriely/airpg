'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default function createCampaign() {

    /* Descomentar quando a parte de login estiver ok

    const session = useSession();
    if (session.status === 'unauthenticated') {
      redirect('/login');
    }
    */

    return (
    <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">Pagina de criar a campanha</h1>
    </div>

  );
}