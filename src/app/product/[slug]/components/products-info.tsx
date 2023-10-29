"use client"
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import DiscountBagde from "@/components/ui/discount-badge";
import { ProductWithTotalPrice } from "@/helpers/product";
import { CartContext } from "@/providers/cart";
import { Product } from "@prisma/client";
import { ArrowDownIcon, ArrowLeftIcon, ArrowRightIcon, TruckIcon } from "lucide-react";
import { useContext, useState } from "react";

interface ProductsInfoProps {
    product : ProductWithTotalPrice
}
  
const ProductsInfo = ( { product } : ProductsInfoProps) => {

    const {addProductToCart} = useContext(CartContext)

    const [quantity, setQuantity] = useState(1)

    const handleDecreaseQuantityClick = () =>{
        setQuantity((prev) => ( prev == 1 ? prev : prev - 1))
    }
    const handleIncreaseQuantityClick = () =>{
        setQuantity((prev) => (prev + 1))
    }

    const handleToCartClick = () => {
        addProductToCart({...product, quantity})
    }
    return ( 
        <div className="flex flex-col px-5 lg:w-[40%] lg:rounded-lg lg:bg-accent lg:p-10">
            <h2 className="text-lg lg:text-2xl">{product.name}</h2>
            <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold lg:text-3xl">R$ {product.totalPrice.toFixed(2)}</h1>
                {product.discountPercentage > 0 && (
                    <DiscountBagde className="lg:text-base">
                        {product.discountPercentage} 
                    </DiscountBagde>
                )}
            </div>
            {product.discountPercentage > 0 && (
                <p className="text-sm line-through opacity-75 lg:text-base">R$ {Number(product.basePrice).toFixed(2)}</p>
            )}

            <div className="flex items-center mt-4 gap-2">
                <Button size="icon" variant="outline" onClick={handleDecreaseQuantityClick}>
                    <ArrowLeftIcon size={16}/>
                </Button>

                <span>{quantity}</span>

                <Button size="icon" variant="outline" onClick={handleIncreaseQuantityClick}>
                    <ArrowRightIcon size={16}/>
                </Button>
            </div>

            <div className="flex flex-col gap-3 mt-8">
                <h3 className="font-bold">Descrição</h3>
                <p className="text-sm opacity-60 text-justify">{product.description}</p>
            </div>

            <Button className="mt-8 uppercase font-bold" onClick={handleToCartClick}>
                Adicionar ao carrinho
            </Button>

            <div className="mt-5 flex items-center justify-between rounded-lg bg-accent px-5 py-2 lg:bg-[#2A2A2A]">
                <div className="flex items-center gap-2">
                    <TruckIcon/>
                    <div className="flex flex-col">
                        <p className="text-xs">Entrega Via <span className="font-bold">FSPacket</span></p>
                        <p className="text-[#8162FF] text-xs">Envio para <span className="font-bold">todo Brasil</span></p>
                    </div>
                </div>
                <p className="text-xs font-bold">Frete Grátis</p>
            </div>
        </div>
     );
}
 
export default ProductsInfo;