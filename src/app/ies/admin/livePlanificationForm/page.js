'use client'

import Header from "@/components/auth/Header";
import Live_Planification_Form from "@/components/ies/ui/forms/live-planification-form";

export default function Home() {
  return (
    <>
      <Header />
      <div style={{ paddingTop: '70px' }}>
        <Live_Planification_Form toDashboard="/ies/admin" />
      </div>
    </>
  );
}
