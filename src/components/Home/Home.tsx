import React, { useState, useContext, useEffect } from "react";
import Header from "../../components/Header/Header";
import Menu from "../Menu/Menu";
import { CartContext } from "@/context/CartContext";
import { Container, ContainerConta, Content } from "./styles";
import Modal from "../Modal/Modal";
import InputClient from "../InputClient/InputClient";

const Home: React.FC = () => {
  const [activeGroupId, setActiveGroupId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { 
    isContaSolicitada, 
    nomeCliente, 
    fetchConfigurations, 
    fetchItems, 
  } = useContext(CartContext);

  useEffect(() => {
    fetchConfigurations();
  }, [fetchConfigurations]);

  useEffect(() => {
    fetchItems();
    if (nomeCliente) {
      setIsModalOpen(true);
    }
  }, [nomeCliente]);

  const handleGrupoSelect = (groupId: number) => {
    setActiveGroupId(groupId === activeGroupId ? null : groupId);
  };

  const ContainerToUse = isContaSolicitada ? ContainerConta : Container;

  return (
    <ContainerToUse>
      <Header />
      <Content>
        <Menu onGrupoSelect={handleGrupoSelect} activeGroupId={activeGroupId} />
      </Content>
      {isModalOpen && !nomeCliente && !isContaSolicitada && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <InputClient closeModal={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </ContainerToUse>
  );
};

export default Home;
