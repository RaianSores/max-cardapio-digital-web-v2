import React, { useEffect, useState } from "react";
import { getProdutos, getProdutosPromocoes } from "../../services/produtoService";
import { Produto } from "../../@types/Produto";
import { LoadingContainer, ProductListContainer, ProductListContent } from "./styles";
import ProductCard from "../ProductCard/ProductCard";

interface ProductListProps {
  selectedGroupId: number;
}

const ProductList: React.FC<ProductListProps> = ({ selectedGroupId }) => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const pedidoConta = false;

  useEffect(() => {
    if (selectedGroupId === 10000) {
      fetchProdutosPromocoes();
    } else if (selectedGroupId === 10001) {
      fetchProdutosHome();
    } else {
      fetchProdutos();
    }
  }, [selectedGroupId]);

  const fetchProdutos = async () => {
    setIsLoading(true);
    try {
      const produtosData = await getProdutos(selectedGroupId);
      setProdutos(produtosData);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchProdutosHome = async () => {
    setIsLoading(true);
    try {
      const produtosData = await getProdutos(0);
      setProdutos(produtosData);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchProdutosPromocoes = async () => {
    setIsLoading(true);
    try {
      const produtosData = await getProdutosPromocoes();
      setProdutos(produtosData);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ProductListContainer pedidoConta={pedidoConta}>
      {isLoading ? (
        <LoadingContainer>Carregando...</LoadingContainer>
      ) : (
        <ProductListContent pedidoConta={pedidoConta}>           
           {produtos.map((produto) => (
            <ProductCard
                key={produto.proId}
                image={produto.imagem}
                title={produto.descricao}
                priceFinal={produto.valorVenda}
                priceDiscount={produto.valorPromocao}
            />
          ))} 
        </ProductListContent>
      )}
    </ProductListContainer>
  );
};

export default ProductList;
