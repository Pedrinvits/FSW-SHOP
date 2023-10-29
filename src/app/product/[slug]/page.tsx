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
        <div className="flex flex-col gap-8 pb-8 lg:container lg:mx-auto lg:gap-10 lg:py-10">
            <div className="flex flex-col gap-8 lg:flex-row lg:gap-9  lg:px-5">
                <ProductImage imageUrls={product.imageUrls} name={product.name}/>
                <ProductsInfo product={computeProductTotalPrice(product)}/>
            </div>
            <div className="flex flex-col gap-5">
                <SectionTitle>Produtos Recomendados</SectionTitle>
                <ProductList products={product.category.products}/>
            </div>
        </div>
    )
}
export default ProductDetailsPage