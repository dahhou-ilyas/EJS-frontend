import Header from '@/components/ies/ui/header';
import Post_Live_Form from "@components/ies/ui/forms/post-live-form";

export default function Home() {
  const name = "Leila Mourad";
  const role = "Jeune";

  return (
    <>
      <Header name={name} role={role} />
      <div style={{ paddingTop: '70px' }}>
        <Post_Live_Form />
      </div>
    </>
  );
}
