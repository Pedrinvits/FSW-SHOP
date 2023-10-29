import { Skeleton } from "./skeleton";
import "../../app/loading.css";
const LoadingPage = () => {
  return (
    <div className="flex items-center p-[50%] px-20 justify-center">
      <div className="mt-12 w-[100%] flex-row items-center justify-center flex">
        <div className="three-body">
          <div className="three-body__dot"></div>
          <div className="three-body__dot"></div>
          <div className="three-body__dot"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;