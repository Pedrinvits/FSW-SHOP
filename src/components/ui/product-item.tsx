import { ProductWithTotalPrice } from "@/helpers/product";

import Image from "next/image";
import Link from "next/link";
import { Badge } from "./badge";
import { ArrowDownIcon } from "lucide-react";
import DiscountBagde from "./discount-badge";
import { cn } from "@/lib/utils";
// import DiscountBadge from "./discount-badge";

interface ProductItemProps {
  product: ProductWithTotalPrice;
}

const ProductItem = ({ product }: ProductItemProps) => {
  return (
    <Link href={`/product/${product.slug}`}>
      <div className="flex flex-col gap-4">
        <div className="relative flex h-[170px] w-full items-center justify-center rounded-lg bg-accent">
          <Image
            src={product.imageUrls[0]}
            height={0}
            width={0}
            sizes="100vw"
            className="h-auto max-h-[70%] w-auto max-w-[80%] object-contain"
            alt={product.name}
          />
         {product.discountPercentage > 0 && (
          <DiscountBagde className="absolute left-3 top-3">
            {product.discountPercentage}
          </DiscountBagde>
        )}
        </div>
            
        <div className="flex flex-col gap-1"> 
          <p className="overflow-hidden text-ellipsis whitespace-nowrap text-sm">
            {product.name}
          </p>
          <div className="flex items-center gap-2">
            {product.discountPercentage > 0 
            ? 
              (
                <>
                  <p className="font-semibold text-ellipsis whitespace-nowrap">
                    R$ {product.totalPrice.toFixed(2)}
                </p>

                <p className="oppacity-75 line-through text-xs text-ellipsis whitespace-nowrap">R$ {Number(product.basePrice).toFixed(2)}</p>
                </>
              )
            : 
              (
                <p className="oppacity-75 text-xm text-ellipsis whitespace-nowrap">R$ {Number(product.basePrice).toFixed(2)}</p>
              )
            }
             
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;
