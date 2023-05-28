import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function SkeletonLoader() {
  return (
    <div className="skeletonLoader">
      <div className="imgSkeleton">
        <Skeleton height="100%" />
      </div>
      <div className="titleSkeleton">
        <Skeleton height="100%" />
      </div>
      <div className="priceSkeleton">
        <Skeleton height="100%" />
      </div>
    </div>
  );
}
