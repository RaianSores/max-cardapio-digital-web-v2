import React, { 
  useEffect, 
  useState, 
  useCallback, 
  useContext 
} from "react";
import { getProdutos, getProdutosPromocoes } from "../../services/produtoService";
import { IProduto } from "../../@types/Produto";
import { 
  LoadingContainer, 
  ProductListContainer, 
  ProductListContainerConta, 
  ProductListContent 
} from "./styles";
import ProductCard from "../ProductCard/ProductCard";
import { CartContext } from "@/context/CartContext";

interface ProductListProps {
  selectedGroupId: number;
};

const ProductList: React.FC<ProductListProps> = ({ selectedGroupId }) => {
  const [produtos, setProdutos] = useState<IProduto[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { isContaSolicitada } = useContext(CartContext);

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

  const ContainerToUse = isContaSolicitada ? ProductListContainerConta : ProductListContainer;

  return (
    <ContainerToUse>
      {isLoading ? (
        <LoadingContainer>Carregando...</LoadingContainer>
      ) : (
        <ProductListContent>           
          {produtos.map((produto) => (
            <ProductCard
              key={produto.ID}
              proID={produto.ProID}
              foto={produto.Foto}
              descricao={produto.Descricao}
              priceFinal={produto.PrecoNormal}
              priceDiscount={produto.PrecoPromo}
            />
          ))}
        </ProductListContent>
      )}
    </ContainerToUse>
  );
};

export default ProductList;
