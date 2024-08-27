import Header from '@/components/ies/ui/header';
import Youth_Dashboard from '@/components/ies/dashboards/youth-dashboard';

export default function Home() {
  const name = "Leila Mourad";
  const role = "Jeune";

  return (
    <>
      <Header name={name} role={role} />
      <div style={{ paddingTop: '70px' }}>
        <Youth_Dashboard name={name} />
      </div>
    </>
  );
}
