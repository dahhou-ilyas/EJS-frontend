'use client'

import Header from '@/components/auth/Header';
import Propostions from '@/components/ies/ui/propositions';

export default function Home() {
  return (
    <>
      <Header />
      <div style={{ paddingTop: '70px' }}>
        <Propostions toDashboard="/ies/admin" />
      </div>
    </>
  );
}
