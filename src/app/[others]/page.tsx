import { redirect } from "next/navigation";
import NotFoundPage from "@/components/ui/notFoundPage";
import LoadingPage from "@/components/ui/loading";

export default async function NotFound() {
    return (
      <>
        <NotFoundPage/>
      </>
    )
}