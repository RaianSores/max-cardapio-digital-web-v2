import React, { useEffect, useState } from "react";
import { Smile, Home } from "react-feather";
import { getGrupos } from "../../services/grupoService";
import { Grupo } from "../../@types/Grupo";

import ProductList from "../ProductList/ProductList";
import { MenuContainer, MenuImage, MenuItem, MenuText, MenuTextHome, MenuTextPromo } from "./styles";

interface MenuProps {
  onGrupoSelect: (groupId: number) => void;
  activeGroupId: number | null;
}

const Menu: React.FC<MenuProps> = ({ onGrupoSelect, activeGroupId }) => {
  const [grupos, setGrupos] = useState<Grupo[]>([]);

  useEffect(() => {
    fetchGrupos();
  }, []);

  const fetchGrupos = async () => {
    try {
      const gruposData = await getGrupos();
      setGrupos(gruposData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <MenuContainer>
      <MenuItem onClick={() => onGrupoSelect(10000)} className="promotion">
        <Smile size={40} color="#FFF" />
        <MenuTextPromo>Promoções</MenuTextPromo>
      </MenuItem>
      {activeGroupId === 10000 && <ProductList selectedGroupId={10000} />}
      
      <MenuItem onClick={() => onGrupoSelect(10001)} className="home">
        <Home size={40} color="#46423F" />
        <MenuTextHome>HOME</MenuTextHome>
      </MenuItem>
      {activeGroupId === 10001 && <ProductList selectedGroupId={10001} />}
      
      {grupos.map((item) => (
        <React.Fragment key={item.id}>
          <MenuItem onClick={() => onGrupoSelect(item.id)}>
            <MenuImage
              src={
                item.imagem
                  ? `data:image/png;base64,${item.imagem}`
                  : "./assets/sem-foto.jpg"
              }
              alt={item.nome}
            />
            <MenuText>{item.nome}</MenuText>
          </MenuItem>
          {activeGroupId === item.id && <ProductList selectedGroupId={item.id} />}
        </React.Fragment>
      ))}
    </MenuContainer>
  );
};

export default Menu;
