import React from 'react';
import { useRouter } from 'next/router';

const ErrorPage: React.FC = () => {
  const router = useRouter();

  return (
    <div>
      <h1>Erro: Mesa não encontrada!</h1>
      <p>O número da mesa ou o link que você acessou é inválido.</p>
      <button onClick={() => router.push('/')}>Voltar à Home</button>
    </div>
  );
};

export default ErrorPage;
