import Layout from "@/components/auth/Layout";
import { useTranslations } from 'next-intl';

const Confirmation = () => {
  const t = useTranslations('Confirmation');

  return ( 
    <Layout 
      title={t('title')} 
      subtitle={t('subtitle')} 
    />
  );
}

export default Confirmation;
