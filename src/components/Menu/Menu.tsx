import React, { useEffect, useState, useContext } from "react";
import Image from 'next/image';
import { Smile, Home } from "react-feather";
import { getGrupos } from "../../services/grupoService";
import { Grupo } from "../../@types/Grupo";

import ProductList from "../ProductList/ProductList";
import { MenuContainer, MenuItem, MenuText, MenuTextHome, MenuTextPromo } from "./styles";

import defaultImage from "../../assets/img/sem-foto.jpg";
import { CartContext } from "@/context/CartContext";

interface MenuProps {
  onGrupoSelect: (groupId: number) => void;
  activeGroupId: number | null;
}

const Menu: React.FC<MenuProps> = ({ onGrupoSelect, activeGroupId }) => {
  const [grupos, setGrupos] = useState<Grupo[]>([]);
  const { isConfigurationsLoaded } = useContext(CartContext);

  useEffect(() => {
    if (isConfigurationsLoaded) {
      fetchGrupos();
    }
  }, [isConfigurationsLoaded]);

  const fetchGrupos = async () => {
    try {
      const response = await getGrupos();
      setGrupos(response);
    } catch (error) {
      console.error("Erro ao carregar grupos:", error);
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
        <React.Fragment key={item.Id}>
          <MenuItem onClick={() => onGrupoSelect(item.GdpID)}>
            <Image
              src={
                item.Foto
                  ? `data:image/png;base64,${item.Foto}`
                  : defaultImage
              }
              alt={item.Nome}
              width={50}
              height={50}
              style={{ 
                objectFit: "cover",
                borderRadius: "9px",
                marginRight: "5px"
              }}
            />
            <MenuText>{item.Nome}</MenuText>
          </MenuItem>
          {activeGroupId === item.GdpID && <ProductList selectedGroupId={item.GdpID} />}
        </React.Fragment>
      ))}
    </MenuContainer>
  );
};

export default Menu;
