'use client'

import Header from '@/components/ies/ui/header';
import Live_Planification_Form from "@/components/ies/ui/forms/live-planification-form";

export default function Home() {
  const name = "Mohamed Hani";
  const role = "Admin";

  return (
    <>
      <Header name={name} role={role} />
      <div style={{ paddingTop: '70px' }}>
        <Live_Planification_Form toDashboard="/ies/admin" />
      </div>
    </>
  );
}
