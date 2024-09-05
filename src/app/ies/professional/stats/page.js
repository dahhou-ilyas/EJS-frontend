import Header from '@/components/espaceMedecin/Header';
import Stats_Page from '@/components/ies/ui/tables/stats-page';

export default function Home() {
  return (
    <>
      <Header />
      <div style={{ paddingTop: '70px' }}>
        <Stats_Page />
      </div>
    </>
  );
}
