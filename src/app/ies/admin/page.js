import Header from '@/components/auth/Header';
import Admin_Dashboard from '@/components/ies/dashboards/admin-dashboard'

export default function Home() {
  return (
    <>
      <Header />
      <div style={{ paddingTop: '70px' }}>
        <Admin_Dashboard />
      </div>
    </>
  );
}
