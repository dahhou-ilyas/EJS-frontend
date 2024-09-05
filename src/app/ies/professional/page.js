import Header from '@/components/espaceMedecin/Header';
import Sidebar from '@/components/espaceMedecin/Sidebar1';
import Professional_Dashboard from '@/components/ies/dashboards/professional-dashboard';

export default function Home() {
  return (
    <>
      <Header />
      <Sidebar activeClassName="ies" />
      <div style={{ paddingTop: '70px' }}>
        <Professional_Dashboard />
      </div>
    </>
  );
}
