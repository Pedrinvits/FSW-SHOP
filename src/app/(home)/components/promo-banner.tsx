import Image, { ImageProps } from "next/image";
import { cn } from "@/lib/utils";

const PromoBanner = ({ alt, className, ...props }: ImageProps) => {
  return (
    <Image
    height={0}
    width={0}
    className={cn("h-auto w-full", className)}
    sizes="100vw"
    alt={alt}
    {...props}
    unoptimized
  />
  );
};

export default PromoBanner;
