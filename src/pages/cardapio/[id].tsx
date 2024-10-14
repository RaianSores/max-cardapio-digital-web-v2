import Home from '@/components/Home/Home';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const CardapioId: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      console.log('Mesa selecionada:', id);
    }
  }, [id]);
  return (
    <Home />
  );
};

export default CardapioId;