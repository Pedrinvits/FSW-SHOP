import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion";

  import { Card } from "@/components/ui/card";
  import { Order, Prisma } from "@prisma/client";
  import { format } from "date-fns";
  import { Separator } from "@/components/ui/separator";
  import { useMemo } from "react";
  import { computeProductTotalPrice } from "@/helpers/product";
  import OrderProductsItem from "./order-product-item";
  import { getOrderStatus } from "../helpers/status";

// usamos essa funcao do prisma para ele conseguir tipar duas tabelas ao mesmo tempo
interface OrderItemProps {
    order: Prisma.OrderGetPayload<{
      include: {
        orderProducts: {
          include: { product: true };
        };
      };
    }>;
}

const   OrderItem = ({ order }: OrderItemProps) => {
  const subtotal = useMemo(() => {
    return order.orderProducts.reduce((acc, orderProduct) => {
      return (
        acc + Number(orderProduct.product.basePrice) * orderProduct.quantity
      );
    }, 0);
  }, [order.orderProducts]);

  const total = useMemo(() => {
    return order.orderProducts.reduce((acc, product) => {
      const productWithTotalPrice = computeProductTotalPrice(product.product);

      return acc + productWithTotalPrice.totalPrice * product.quantity;
    }, 0);
  }, [order.orderProducts]);

  const totalDiscounts = subtotal - total;

    return ( 
        <Card className="px-5">
            <Accordion type="single" className="w-full" collapsible>
                    <AccordionItem value={order.id}>
                        <AccordionTrigger>
                            <div className="flex flex-col gap-1 text-left">
                              {order.orderProducts.length == 1 ? 
                                ( <h2 className="font-bold text-sm">Pedido com {order.orderProducts.length} produto</h2> )
                                  :
                                ( <h2 className="font-bold text-sm">Pedido com {order.orderProducts.length} produtos</h2> )
                              }
                               <p className="text-xs opacity-60">Feito em {format(order.createdAt, "d/MM/y 'ás'  HH:mm" )}</p>
                            </div>
                        </AccordionTrigger>

                        <AccordionContent>
                            <div className="flex flex-col gap-4">
                                <div className="flex justify-between items-center">
                                    <div className="font-bold">
                                        <p>Status</p>
                                       
                                       <p className=" text-[#8162FF]">{getOrderStatus(order.status)}</p>
                                       
                                    </div>

                                     <div>
                                        <p className="font-bold">Data</p>
                                        <p className="opacity-60">{format(order.createdAt , "d/MM/y")}</p>
                                     </div>

                                     <div>
                                        <p className="font-bold">Pagamento</p>
                                        <p className="opacity-60">Cartão</p>
                                     </div>

                                </div>

                                {order.orderProducts.map(orderProduct => (
                                     <OrderProductsItem orderProduct={orderProduct} key={orderProduct.id}/>
                                ))}
                                
                                <div className="flex flex-col gap-1 text-xs">

                                    <Separator/>

                                    <div className="flex justify-between w-full py-3">
                                      <p className="">Subtotal</p>
                                      <p>R$ {subtotal.toFixed(2)}</p>
                                    </div>

                                    <Separator/>

                                    <div className="flex justify-between w-full py-3">
                                      <p className="">Entrega</p>
                                      <p>Grátis</p>
                                    </div>

                                    <Separator/>

                                    <div className="flex justify-between w-full py-3">
                                      <p className="">Descontos</p>
                                      <p>R$ {totalDiscounts.toFixed(2)}</p>
                                    </div>

                                    <Separator/>

                                    <div className="flex justify-between w-full py-3 text-sm font-bold">
                                      <p className="">Total</p>
                                      <p>R$ {total.toFixed(2)}</p>
                                    </div>
                                </div>

                            </div>
                        </AccordionContent>

                    </AccordionItem>
            </Accordion>
        </Card>
     );
}
 
export default OrderItem;