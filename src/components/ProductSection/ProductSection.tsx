import React, { useState, useEffect, useContext } from 'react';
import {
    ConfirmButton,
    Container,
    ContentInfoActions,
    DecreaseButton,
    IncreaseButton,
    InputQtde,
    PriceContainer,
    PriceFinal,
    QuantityInput,
    Title,
} from './styles';
import { formatPrice } from '@/utils/format';
import StorageService from '@/utils/StorageService';
import { CartContext } from '@/context/CartContext';

type ProductProps = {
    proID: number;
    descricao: string;
    priceFinal: number;
    priceDiscount?: number;
};

type CartItem = {
    id: number;
    quantity: number;
    price: number;
    description: string;
    image?: string;
};

const ProductSection: React.FC<ProductProps> = ({
    proID,
    descricao,
    priceFinal,
    priceDiscount,
}) => {
    const [quantity, setQuantity] = useState(1);
    const [totalPrice, setTotalPrice] = useState(priceDiscount && priceDiscount < priceFinal
        ? priceDiscount
        : priceFinal);
    const { setCartItems, setIsModalOpen } = useContext(CartContext);

    useEffect(() => {
        const calculateTotalPrice = () => {
            const finalPrice = priceDiscount && priceDiscount < priceFinal
                ? priceDiscount
                : priceFinal;
            setTotalPrice(finalPrice * quantity);
        };

        calculateTotalPrice();
    }, [quantity, priceDiscount, priceFinal]);

    const increaseQuantity = () => setQuantity((prev) => prev + 1);

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity((prev) => prev - 1);
        }
    };

    const addToCart = async ({ id, quantity, price, description, image }: CartItem) => {
        const newItem = {
            id: id,
            quantity,
            price,
            description,
            image
        };

        try {
            const existingItems = await StorageService.getItem("cartItems");
            const cartItems = existingItems ? JSON.parse(existingItems) : [];
            cartItems.push(newItem);
            await StorageService.setItem("cartItems", JSON.stringify(cartItems));
            setCartItems(cartItems);
            setIsModalOpen(false);
        } catch (error) {
            console.error("Erro ao adicionar item ao carrinho:", error);
        }
    };

    return (
        <Container>
            <ContentInfoActions>
                <Title>{descricao}</Title>
                <PriceContainer>
                    <PriceFinal>{formatPrice(totalPrice)}</PriceFinal>
                </PriceContainer>
            </ContentInfoActions>

            <InputQtde>
                <DecreaseButton onClick={decreaseQuantity}>-</DecreaseButton>
                <QuantityInput type="number" value={quantity} readOnly />
                <IncreaseButton onClick={increaseQuantity}>+</IncreaseButton>
                <ConfirmButton
                    onClick={() => {
                        const price = priceDiscount && priceDiscount < priceFinal
                            ? priceDiscount
                            : priceFinal;
                        addToCart({
                            id: proID,
                            quantity,
                            price: price,
                            description: descricao,
                        });
                    }}
                >
                    Pedir
                </ConfirmButton>
            </InputQtde>
        </Container>
    );
};

export default ProductSection;
