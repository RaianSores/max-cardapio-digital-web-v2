import React, { useEffect, useState, useCallback } from "react";

import { getProdutos, getProdutosPromocoes } from "../../services/produtoService";
import { IProduto } from "../../@types/Produto";
import { LoadingContainer, ProductListContainer, ProductListContent } from "./styles";
import ProductCard from "../ProductCard/ProductCard";

interface ProductListProps {
  selectedGroupId: number;
}

const ProductList: React.FC<ProductListProps> = ({ selectedGroupId }) => {
  const [produtos, setProdutos] = useState<IProduto[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const pedidoConta = false;

  const fetchProdutos = useCallback(async () => {
    setIsLoading(true);
    try {
      const produtosData = await getProdutos(selectedGroupId);
      setProdutos(produtosData);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [selectedGroupId]);

  const fetchProdutosHome = useCallback(async () => {
    setIsLoading(true);
    try {
      const produtosData = await getProdutos(0);
      setProdutos(produtosData);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchProdutosPromocoes = useCallback(async () => {
    setIsLoading(true);
    try {
      const produtosData = await getProdutosPromocoes();
      setProdutos(produtosData);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (selectedGroupId === 10000) {
      fetchProdutosPromocoes();
    } else if (selectedGroupId === 10001) {
      fetchProdutosHome();
    } else {
      fetchProdutos();
    }
  }, [selectedGroupId, fetchProdutos, fetchProdutosHome, fetchProdutosPromocoes]);

  return (
    <ProductListContainer pedidoConta={pedidoConta}>
      {isLoading ? (
        <LoadingContainer>Carregando...</LoadingContainer>
      ) : (
        <ProductListContent pedidoConta={pedidoConta}>           
          {produtos.map((produto) => (
            <ProductCard
              key={produto.ID}
              proID={produto.proId}
              foto={produto.Foto}
              descricao={produto.Descricao}
              priceFinal={produto.PrecoNormal}
              priceDiscount={produto.PrecoPromo}
            />
          ))}
        </ProductListContent>
      )}
    </ProductListContainer>
  );
};

export default ProductList;
