import Csidebar from '@/components/auth/Csidebar';
import Header from '@/components/auth/Header';
import Youth_Dashboard from '@/components/ies/dashboards/youth-dashboard';

export default function Home() {
  return (
    <>
      <Header />
      <Csidebar/>
      <div className='page-wrapper'>
      <div style={{ paddingTop: '0px' }} className='content'>
        <Youth_Dashboard />
      </div>
      </div>
    </>
  );
}
