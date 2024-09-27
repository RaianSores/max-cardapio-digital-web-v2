import React from "react";
import { formatPrice } from "../../utils/format";
import {
  ProductCardContainer,
  ProductCardPhoto,
  ProductCardInfo,
  ProductCardTitle,
  ProductCardAbout,
  PriceContainer,
  PriceDiscount,
  PriceFinal,
} from "./styles";

type ProductCardProps = {
  image: string;
  title: string;
  priceFinal: number;
  priceDiscount?: number;
};

const defaultImage = require("../../assets/img/sem-foto.jpg");

const ProductCard: React.FC<ProductCardProps> = ({
  image,
  title,
  priceFinal,
  priceDiscount,
}) => {
  const renderImage = () => {
    if (image) {
      const base64Clean = image.replace(/\r?\n|\r/g, "");
      return (
        <ProductCardPhoto
          src={`data:image/png;base64,${base64Clean}`}
          alt={title}
        />
      );
    } else {
      return <ProductCardPhoto src={defaultImage} alt="default" />;
    }
  };

  const temPromocao = !!priceDiscount;
  return (
    <ProductCardContainer>
      <div>{renderImage()}</div>
      <ProductCardInfo>
        <ProductCardTitle>{title}</ProductCardTitle>
        <PriceContainer>
          <PriceFinal>
            {temPromocao ? (
              <PriceDiscount>{formatPrice(priceFinal)}</PriceDiscount>
            ) : (
              <>{formatPrice(priceFinal)}</>
            )}
          </PriceFinal>
          {priceDiscount && <PriceFinal>{formatPrice(priceDiscount)}</PriceFinal>}
        </PriceContainer>
      </ProductCardInfo>
    </ProductCardContainer>
  );
};

export default ProductCard;
