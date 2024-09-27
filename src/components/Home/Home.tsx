import React, { useState } from "react";
import Header from "../../components/Header/Header";
import { Container, Content } from "./styles";
import Menu from "../Menu/Menu";

const Home: React.FC = () => {
  const [activeGroupId, setActiveGroupId] = useState<number | null>(null);

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
