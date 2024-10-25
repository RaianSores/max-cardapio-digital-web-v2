import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import Header from "../../components/Header/Header";
import Menu from "../Menu/Menu";
import { CartContext } from "@/context/CartContext";
import { Container, Content } from "./styles";

const Home: React.FC = () => {
  const [activeGroupId, setActiveGroupId] = useState<number | null>(null);
  const { numMesa, fetchConfigurations } = useContext(CartContext);

  useEffect(() => {
    if (numMesa) {
      fetchConfigurations();
    }
  }, [numMesa]);

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
