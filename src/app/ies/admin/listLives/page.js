'use client'

import Header from "@/components/auth/Header";
import List_Lives from "@/components/ies/ui/list-lives";

export default function Home() {
  return (
    <>
      <Header />
      <div style={{ paddingTop: '70px' }}>
        <List_Lives toDashboard="/ies/admin" />
      </div>
    </>
  );
}
