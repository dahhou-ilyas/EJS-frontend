import Csidebar from '@/components/auth/Csidebar';
import Header from '@/components/auth/Header';
import Post_Live_Form from "@/components/ies/ui/forms/post-live-form";

export default function Home() {
  return (
    <>
      <Header/>
      <Csidebar/>
      <div className='page-wrapper'>
        <div style={{ paddingTop: '50px' }} className='content'>
          <Post_Live_Form />
        </div>
      </div>
    </>
  );
}
