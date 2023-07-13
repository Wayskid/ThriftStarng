import "./skeletonLoader.scss";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function ItemInfoLoader() {
  return (
    <>
      <Skeleton className="itemInfoImgSkel" />
      <div className="itemInfoLoader">
        <Skeleton className="skelTitle" width="30%" />
        <Skeleton />
        <div className="skelTable">
          <div className="skelDetails">
            <div className="skelFlex">
              <Skeleton inline={true} width="28%" />
              <Skeleton inline={true} width="15%" />
            </div>
            <div className="skelFlex">
              <Skeleton inline={true} width="28%" />
              <Skeleton inline={true} width="15%" />
            </div>
            <div className="skelFlex">
              <Skeleton inline={true} width="28%" />
              <Skeleton inline={true} width="15%" />
            </div>
          </div>
          <Skeleton height="2rem" />
          <Skeleton height="2rem" />
        </div>
      </div>

      {/* <div className="productLoader">
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
      </div> */}
    </>
  );
}
