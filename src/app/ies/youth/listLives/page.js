import Csidebar from '@/components/auth/Csidebar';
import Header from '@/components/auth/Header';
import List_Lives from "@/components/ies/ui/list-lives";

export default function Home() {
  return (
    <>
      <Header/>
      <Csidebar/>
      <div className='page-wrapper'>
        <div style={{ paddingTop: '50px' }} className='content'>
          <List_Lives toDashboard="/ies/youth" />
        </div>
      </div>
    </>
  );
}
