import Header from '@/components/ies/ui/header';
import Admin_Dashboard from '@/components/ies/dashboards/admin-dashboard'

export default function Home() {
  const name = "Mohamed Hani";
  const role = "Admin";

  return (
    <>
      <Header name={name} role={role} />
      <div style={{ paddingTop: '70px' }}>
        <Admin_Dashboard name={name} />
      </div>
    </>
  );
}
