import { GetServerSidePropsContext } from 'next';
import { decryptBase64 } from './hash';

export const handleMesaRedirect = async (context: GetServerSidePropsContext) => {
  const { id } = context.query;

  if (id && typeof id === 'string') {
    try {
      const numeroMesa = decryptBase64(id);

      if (numeroMesa !== null && !isNaN(parseInt(numeroMesa))) {
        return {
          props: {
            numMesa: parseInt(numeroMesa),
          },
        };
      }
    } catch (error) {
      console.error("Erro ao decodificar o número da mesa:", error);
    }

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