import "./skeletonLoader.scss";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function ProductLoader() {
  return (
    <div className="productLoad">
      <div className="productLoader">
        <Skeleton className="imgSkeleton" />
        <Skeleton
          className="titleSkeleton"
          containerClassName="titleWrapper"
          inline={true}
        />
        <Skeleton
          className="priceSkeleton"
          containerClassName="priceWrapper"
          inline={true}
        />
      </div>
      <div className="productLoader">
        <Skeleton className="imgSkeleton" />
        <Skeleton
          className="titleSkeleton"
          containerClassName="titleWrapper"
          inline={true}
        />
        <Skeleton
          className="priceSkeleton"
          containerClassName="priceWrapper"
          inline={true}
        />
      </div>
      <div className="productLoader">
        <Skeleton className="imgSkeleton" />
        <Skeleton
          className="titleSkeleton"
          containerClassName="titleWrapper"
          inline={true}
        />
        <Skeleton
          className="priceSkeleton"
          containerClassName="priceWrapper"
          inline={true}
        />
      </div>
      <div className="productLoader">
        <Skeleton className="imgSkeleton" />
        <Skeleton
          className="titleSkeleton"
          containerClassName="titleWrapper"
          inline={true}
        />
        <Skeleton
          className="priceSkeleton"
          containerClassName="priceWrapper"
          inline={true}
        />
      </div>
    </div>
  );
}
