import Header from '@/components/ies/ui/header';
import List_Lives from "@/components/ies/ui/list-lives";

export default function Home() {
  const name = "Leila Mourad";
  const role = "Jeune";

  return (
    <>
      <Header name={name} role={role} />
      <div style={{ paddingTop: '70px' }}>
      <List_Lives toDashboard="/ies/youth" />
      </div>
    </>
  );
}
