'use client'

import Header from '@/components/ies/ui/header';
import List_Lives from "@/components/ies/ui/list-lives";

export default function Home() {
  const name = "Mohamed Hani";
  const role = "Admin";

  return (
    <>
      <Header name={name} role={role} />
      <div style={{ paddingTop: '70px' }}>
        <List_Lives toDashboard="/ies/admin" />
      </div>
    </>
  );
}
