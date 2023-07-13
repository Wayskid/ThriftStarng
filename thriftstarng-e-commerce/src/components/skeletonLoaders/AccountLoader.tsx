import "./skeletonLoader.scss";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function AccountLoader() {
  return (
    <div className="accountLoad">
      <div className="accountLoader">
        <div className="skelFlex">
          <Skeleton inline={true} width="28%" />
          <Skeleton inline={true} width="15%" />
        </div>
        <Skeleton width="50%" />
        <Skeleton width="30%" />
        <Skeleton width="25%" />
      </div>
      <div className="accountLoader">
        <div className="skelFlex">
          <Skeleton inline={true} width="28%" />
          <Skeleton inline={true} width="15%" />
        </div>
        <Skeleton width="50%" />
        <Skeleton width="30%" />
        <Skeleton width="25%" />
      </div>
      <div className="accountLoader">
        <div className="skelFlex">
          <Skeleton inline={true} width="28%" />
          <Skeleton inline={true} width="15%" />
        </div>
        <Skeleton width="50%" />
        <Skeleton width="30%" />
        <Skeleton width="25%" />
      </div>
      <div className="accountLoader">
        <div className="skelFlex">
          <Skeleton inline={true} width="28%" />
          <Skeleton inline={true} width="15%" />
        </div>
        <Skeleton width="50%" />
        <Skeleton width="30%" />
        <Skeleton width="25%" />
      </div>
    </div>
  );
}
