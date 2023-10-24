import { Badge } from "@/components/ui/badge";
import { prismaClient } from "@/lib/prisma";
import { ShapesIcon } from "lucide-react";
import CategoryItem from "./components/category-item";

const CatalogPage = async () => {
  const categories = await prismaClient.category.findMany({});
 
  
  return (
    <div className="p-5 gap-8 flex flex-col">
      <Badge className="gap-1 text-base uppercase border-primary px-3 py-[0.375rem] border-2 w-fit" variant={"outline"}>
        <ShapesIcon/>
        Catálogo
      </Badge>

      <div className="flex flex-col flex-wrap gap-8">
        {categories.map(category => (
          <CategoryItem category={category} key={category.id} />
        ))}
      </div>
    </div>
  );
};

export default CatalogPage;
