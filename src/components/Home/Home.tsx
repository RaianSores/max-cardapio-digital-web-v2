import React, { useState, useContext, useEffect } from "react";
import Header from "../../components/Header/Header";
import { Container, Content } from "./styles";
import Menu from "../Menu/Menu";
import { CartContext } from "@/context/CartContext";
import StorageService from "@/utils/StorageService";
import axios from "axios";
import { useRouter } from "next/router";  // Importando useRouter para capturar parâmetros da URL

const Home: React.FC = () => {
  const [activeGroupId, setActiveGroupId] = useState<number | null>(null);
  const { setNumMesa, setAtendente, setEmpId } = useContext(CartContext);
  const router = useRouter();
  const { numMesa } = router.query;  // Capturando o parâmetro numMesa da URL

  useEffect(() => {
    if (numMesa) {  // Certificando-se que o numMesa está disponível antes de continuar
      fetchConfigurations(numMesa as string);  // Passando numMesa como argumento
    }
  }, [numMesa]);

  const fetchConfigurations = async (numMesa: string) => {
    const ipUrl = "192.168.0.231";
    const porta = "9999";
    const idEmpresa = "1";
    const idVendedor = "7";

    // Armazenando as configurações e o numMesa
    await StorageService.setItem("ipUrl", ipUrl);
    await StorageService.setItem("porta", porta);
    await StorageService.setItem("idEmpresa", idEmpresa);
    await StorageService.setItem("idVendedor", idVendedor);
    await StorageService.setItem("numMesa", numMesa);

    // Atualizando o contexto com o numMesa, atendente e id da empresa
    setNumMesa(parseInt(numMesa));
    setAtendente(parseInt(idVendedor));
    setEmpId(idEmpresa);

    // Fazendo a requisição de autenticação
    try {
      const response = await axios.get(`http://${ipUrl}:${porta}/v2/auth`);
      await StorageService.setItem("token", response.data.token);
    } catch (error) {
      console.error("Erro ao autenticar", error);
    }
  };

  const handleGrupoSelect = (groupId: number) => {
    setActiveGroupId(groupId === activeGroupId ? null : groupId);
  };

  return (
    <Container>
      <Header />
      <Content>
        <Menu onGrupoSelect={handleGrupoSelect} activeGroupId={activeGroupId} />
      </Content>
    </Container>
  );
};

export default Home;
