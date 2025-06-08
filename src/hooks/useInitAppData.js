import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getHits, getPopular, getSearch } from "../services/deezerAPI";
import { setData } from "../reduxStore/apiSlice";

const useInitAppData = ()=>{
    const dispatch = useDispatch();
    useEffect(()=>{

    const FetchData = async ()=>{
        const topTracks = await getSearch("Top Genres");
        const trendingTracks = await getSearch("Trending Now");
        const newReleases = await getSearch("New Releases");
        const mostPopular = await getPopular();
        const hits = await getHits();
        dispatch(setData({topTracks,trendingTracks,newReleases,mostPopular, hits}));
    };
        FetchData();
    },[dispatch]);
};

export default useInitAppData;