import { Badge } from "@/components/ui/badge";
import { prismaClient } from "@/lib/prisma";
import { ShapesIcon } from "lucide-react";
import CategoryItem from "./components/category-item";

const CatalogPage = async () => {
  const categories = await prismaClient.category.findMany({});
 
  
  return (
    <div className="p-5 gap-8 flex flex-col">
      <Badge className="inline-flex items-center rounded-full font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground w-fit gap-1 border-2 border-primary px-3 py-[0.375rem] text-base lg:text-lg uppercase" variant={"outline"}>
        <ShapesIcon/>
        Catálogo
      </Badge>

      <div className="grid lg:grid-cols-2 gap-8 lg:container lg:gap-10">
        {categories.map(category => (
          <CategoryItem category={category} key={category.id} />
        ))}
      </div>
    </div>
  );
};

export default CatalogPage;
