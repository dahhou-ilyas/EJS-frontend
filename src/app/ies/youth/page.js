import Csidebar from '@/components/auth/Csidebar';
import Header from '@/components/auth/Header';
import Youth_Dashboard from '@/components/ies/dashboards/youth-dashboard';

export default function Home() {
  const name = "Leila Mourad";
  const role = "Jeune";

  return (
    <>
      <Header />
      <Csidebar/>
      <div className='page-wrapper'>
      <div style={{ paddingTop: '50px' }} className='content'>
        <Youth_Dashboard name={name} />
      </div>
      </div>
    </>
  );
}
