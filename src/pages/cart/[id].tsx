import Cart from '@/components/Cart/Cart';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const CartId: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      console.log('Mesa selecionada:', id);
    }
  }, [id]);
  return (
    <Cart />
  );
};

export default CartId;