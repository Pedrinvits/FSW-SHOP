"use client"
import Image from "next/image";
import { useState } from "react";

interface ProductImageProps {
    imageUrls : string[],
    name : string
}

const ProductImage = ({imageUrls,name} : ProductImageProps) => {

    const [currentImage, setCurrentImage] = useState(imageUrls[0])

    function handleImageClick (imageUrls : string) {
        setCurrentImage(imageUrls)
    }

    return ( 
        <div className="flex flex-col">
            <div className="bg-accent items-center justify-center w-full flex h-[380px]">
                <Image 
                src={currentImage} 
                alt={name} 
                width={0} 
                height={0} 
                sizes="100vw" 
                className="h-auto max-h-[70%] w-auto max-w-[80%] object-contain"
                />
            </div>

            <div className="grid grid-cols-4 gap-4 m-8 px-5">
                {imageUrls.map(imageUrl => (
                    <button className={
                                
                        `bg-accent rounded-lg flex justify-center items-center h-[100px]
                                ${imageUrl == currentImage && 'border-2 border-solid border-primary'}`
                                
                            } key={imageUrl} onClick={()=>handleImageClick(imageUrl)}>
                            <Image
                                src={imageUrl} 
                                alt={name} 
                                width={0} 
                                height={0} 
                                sizes="100vw" 
                                className="h-auto max-h-[70%] w-auto max-w-[80%]" 
                            />
                            
                    </button>
                ))}
            </div>
        </div>
     );
}
 
export default ProductImage;