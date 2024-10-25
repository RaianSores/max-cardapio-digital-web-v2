import { GetServerSidePropsContext } from 'next';
import { decryptBase64, encryptBase64 } from './hash';

export const handleMesaRedirect = async (context: GetServerSidePropsContext) => {
  const { id } = context.query;

  if (id && typeof id === 'string') {
    try {
      const numeroMesa = decryptBase64(id);

      if (!isNaN(parseInt(numeroMesa))) {
        return {
          props: {
            numMesa: parseInt(numeroMesa),
          },
        };
      }
    } catch (error) {

    }

   // const encryptedMesa = encryptBase64(id);

    return {
      redirect: {
        destination: `/cardapio/`,
        permanent: false,
      },
    };
  }

  return {
    redirect: {
      destination: '/error',
      permanent: false,
    },
  };
};
