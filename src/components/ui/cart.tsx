import { ShoppingCartIcon } from "lucide-react"
import { Badge } from "./badge"
import { useContext } from "react"
import { CartContext } from "@/providers/cart"
import CartItem from "./cart-item"
import { computeProductTotalPrice } from "@/helpers/product"
import { Separator } from "./separator"
import { ScrollArea } from "@radix-ui/react-scroll-area"
import { Button } from "./button"
import { createCheckout } from "@/actions/checkout"
import { loadStripe } from "@stripe/stripe-js"
import { useSession } from "next-auth/react";
import { CreateOrder } from "@/actions/order"
const Cart = () => {
    const { products, subtotal, total, totalDiscount } = useContext(CartContext)
    const { data } = useSession();

    const handleFinishPurchase = async () => {
        // criando o pedido antes de direcionar para o stripe
       if (!data?.user) {
            // usario nao esta autenticado e quer finalizar a compra
            // podemos redirecionar para o login
            return;
       }
       const order = await CreateOrder(products, (data?.user as any).id);
       
        const checkout = await createCheckout(products)
        const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)

        stripe?.redirectToCheckout({
            sessionId: checkout.id
        })
    }
   
    return (
        <div className="flex flex-col gap-8 h-full">
            <Badge className="gap-1 text-base uppercase border-primary px-3 py-[0.375rem] border-2 w-fit" variant={"outline"}>
                <ShoppingCartIcon/>
                Carrinho
            </Badge>
            <div className="flex flex-col gap-5 h-full overflow-hidden">
               <ScrollArea className="h-full gap-8">
               {products.length > 0 ? (
                    products.map(product => (
                        <CartItem product={computeProductTotalPrice(product) as any} key={product.id}/>
                    ))
                ) : (
                    <p className="text-center font-semibold">Sem Produtos no carrinho</p>
                )}
               </ScrollArea>
            </div>

            {products.length > 0 && (
                <div className="flex flex-col gap-3 ">
                    <Separator/>
                    <div className="flex items-center justify-between text-xs">
                        <p>Subtotal</p>
                        <p>R$ {subtotal.toFixed(2)}</p>
                    </div>
                    
                    <Separator/>
                    <div className="flex items-center justify-between text-xs">
                        <p>Entrega</p>
                        <p>Grátis</p>
                    </div>

                    <Separator/>
                    <div className="flex items-center justify-between text-xs">
                        <p>Descontos</p>
                        <p> - R$ {totalDiscount.toFixed(2)}</p>
                    </div>

                    <Separator/>
                    <div className="flex items-center justify-between text-sm font-bold">
                        <p>Total</p>
                        <p>R$ {total.toFixed(2)}</p>
                    </div>

                    <Button className="uppercase font-bold mt-7" onClick={handleFinishPurchase}>
                        Finalizar Compras
                    </Button>
                </div>
            )}
        </div>
    )
}

export default Cart 