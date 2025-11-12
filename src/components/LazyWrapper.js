import { Suspense } from "react";
import FallbackLoader from "./FallbackLoader";

const LazyWrapper = ({ children }) => {
 return <Suspense fallback={<FallbackLoader />}>{children}</Suspense>;
};

export default LazyWrapper;