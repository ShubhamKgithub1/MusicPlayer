import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTrending, getPopular, getSearch } from "../services/deezerAPI";
import { setData } from "../reduxStore/apiSlice";

const useInitAppData = () => {
  const dispatch = useDispatch();
  const loaded = useSelector((state) => state.api.loaded);

  useEffect(() => {
    if (loaded) return;

    const FetchData = async () => {
      try {
        const [topTracks, trendingTracks, newReleases, mostPopular, hits] = await Promise.all([
          getSearch("Atif Aslam Sad").catch(() => []),
          getSearch("Vishal Mishra").catch(() => []),
          getSearch("Bollywood Lo-Fi").catch(() => []),
          getPopular().catch(() => []),
          getTrending().catch(() => []),
        ]);

        dispatch(setData({ topTracks, trendingTracks, newReleases, mostPopular, hits }));
      } catch (error) {
        console.error("App data fetch failed:", error);
        dispatch(setData({ topTracks: [], trendingTracks: [], newReleases: [], mostPopular: [], hits: [] }));
      }
    };

    FetchData();
  }, [dispatch, loaded]);
};

export default useInitAppData;