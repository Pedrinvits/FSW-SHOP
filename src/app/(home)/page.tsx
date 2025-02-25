
import Image from "next/image";
import Categories from "./components/categories";
import { prismaClient } from "@/lib/prisma";
import ProductList from "@/components/ui/product-list";
import SectionTitle from "@/components/ui/section-title";
import PromoBanner from "./components/promo-banner";
import Link from "next/link";
export default async function Home() {

  const deals = await prismaClient.product.findMany({
    
    where : {
      discountPercentage : {
        gt : 0,
      },
    },
  })
  
  const keyboards = await prismaClient.product.findMany({
    where : {
      category : {
        slug : 'keyboards',
      }
    }
  })

  const mouses = await prismaClient.product.findMany({
    where : {
      category : {
        slug : 'mouses',
      }
    }
  })

  return (
    <>
    <div className="mx-auto flex flex-col gap-8 py-8 lg:container lg:gap-10">
      <Link href={'/deals'} className="flex justify-center">
        <PromoBanner 
          src='/banner-home-01.png' 
          alt="Até 55% de desconto"
          className="w-[96%]"
        />
      </Link>
      <div className="p-5">
        <Categories/>
      </div>

       <div className="">
          <SectionTitle>Ofertas</SectionTitle>
          <ProductList products={deals}/>
       </div>
       <Link href={'/deals'}>
        <PromoBanner 
          src='/banner-home-02.png' 
          alt="Até 55% de desconto em mouses"
        />
      </Link>
      <div className="">
          <SectionTitle>Teclados</SectionTitle>
          <ProductList products={keyboards}/>
       </div>
       <Link href={'/deals'}>
        <PromoBanner 
          src='/banner-home-03.png' 
          alt="Até 55% de desconto em mouses"
        />
      </Link>
      <div className="">
          <SectionTitle>Mouses</SectionTitle>
          <ProductList products={mouses}/>
       </div>
    </div>
    </>
  )
 
}
