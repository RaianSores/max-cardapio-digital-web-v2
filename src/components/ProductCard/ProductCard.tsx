import React, { useContext } from "react";
import Image from 'next/image';
import {
  ProductCardContainer,
  ProductCardInfo,
  ProductCardTitle,
  PriceContainer,
  PriceDiscount,
  PriceFinal,
} from "./styles";
import { formatPrice } from "../../utils/format";
import Modal from "../Modal/Modal";
import ProductSection from "../ProductSection/ProductSection";
import { CartContext } from "@/context/CartContext";

import defaultImage from "../../assets/img/sem-foto.jpg";

type ProductCardProps = {
  proID: number;
  foto: string;
  descricao: string;
  priceFinal: number;
  priceDiscount: number;
};

const ProductCard: React.FC<ProductCardProps> = ({
  proID,
  foto,
  descricao,
  priceFinal,
  priceDiscount,
}) => {
  const {   
    selectedProduct, 
    isContaSolicitada, 
    setSelectedProduct, 
    isModalOpen, setIsModalOpen
  } = useContext(CartContext);
  const temPromocao = priceDiscount && priceDiscount < priceFinal;

  const toggleModal = () => {
    setSelectedProduct({
      proID,
      foto,
      descricao,
      priceFinal,
      priceDiscount,
    });
    setIsModalOpen(true);
  };

  return (
    <>
      <ProductCardContainer onClick={toggleModal}>
        <Image
          src={
            foto
              ? `data:image/png;base64,${foto}`
              : defaultImage
          }
          alt={descricao}
          width={75}
          height={75} 
          style={{ 
            objectFit: "cover",
            borderRadius: "9px" 
          }}
        />
        <ProductCardInfo>
          <ProductCardTitle>{descricao}</ProductCardTitle>
          <PriceContainer>
            {temPromocao ? (
              <>
                <PriceDiscount>{formatPrice(priceFinal)}</PriceDiscount>
                <PriceFinal>
                  {formatPrice(priceDiscount)}
                </PriceFinal>
              </>
            ) : (
              <PriceFinal>{formatPrice(priceFinal)}</PriceFinal>
            )}
          </PriceContainer>
        </ProductCardInfo>
      </ProductCardContainer>

      {isModalOpen && selectedProduct && !isContaSolicitada && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <ProductSection
            proID={selectedProduct.proID}
            descricao={selectedProduct.descricao}
            priceFinal={selectedProduct.priceFinal}
            priceDiscount={selectedProduct.priceDiscount}
          />
        </Modal>
      )}
    </>
  );
};

export default ProductCard;
