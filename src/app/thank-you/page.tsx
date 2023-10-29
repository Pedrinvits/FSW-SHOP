"use client";
import { Badge } from "@/components/ui/badge";
import { PackageSearchIcon } from "lucide-react";
import {useSession } from "next-auth/react";
import Link from "next/link";
const ThankYou = () => {
    const { data } = useSession();
  
    return ( 
        <section className="mx-auto flex flex-col py-8 container gap-10 mt-8 rounded-lg border-primary border-2">
            <h1 className="text-xl font-bold lg:text-3xl">Obrigado, {data?.user.name} !</h1>
            <p className="text-sm opacity-75 lg:text-base">gostaríamos de agradecer imensamente pela confiança em nossos produtos! Esperamos que você esteja super feliz com a sua compra, assim como nós estamos. Confira seu pedido abaixo</p>
            <Link href={'/orders'} className="self-center">
                <Badge className="gap-1 text-base uppercase border-primary px-3 py-[0.375rem] border-2 w-fit hover:bg-primary" variant={"outline"}>
                    <PackageSearchIcon/>
                    Meus Pedidos
                </Badge>
            </Link>
            <p className="text-sm opacity-75 lg:text-base">Estamos sempre à disposição!</p>
            <p className="text-sm opacity-75 lg:text-base">Um grande abraço</p>

        </section>
     );
}
 
export default ThankYou;