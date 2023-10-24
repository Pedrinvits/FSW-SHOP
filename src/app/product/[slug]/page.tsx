import { prismaClient } from "@/lib/prisma"
import ProductImage from "./components/products-images"
import ProductsInfo from "./components/products-info"
import { computeProductTotalPrice } from "@/helpers/product"
import ProductList from "@/components/ui/product-list"
import SectionTitle from "@/components/ui/section-title"

interface ProductDetailsPage {
    params : {
        slug : string
    }
}

const ProductDetailsPage = async ( { params : {slug} } : ProductDetailsPage) => {
    const product = await prismaClient.product.findFirst({
        where : {
           slug : slug
        },
        include : {
            category : {
                include : {
                    products : {
                        where : {
                            slug : {
                                not : slug
                            }
                        }
                    }
                }
            }
        }
    })
    //  colocar um loading aqui dps
    if (!product) return null
    return (
        <div className="flex flex-col gap-8 pb-8">
            <ProductImage imageUrls={product.imageUrls} name={product.name}/>
            <ProductsInfo product={computeProductTotalPrice(product)}/>
            <div className="">
                <SectionTitle>Produtos Recomendados</SectionTitle>
                <ProductList products={product.category.products}/>
            </div>
        </div>
    )
}
export default ProductDetailsPage