const API_KEY = "416d30b79fmsh9193a7a7316be03p102e1fjsnf47a48146a41";
const API_HOST = "deezerdevs-deezer.p.rapidapi.com";

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": API_KEY,
    "X-RapidAPI-Host": API_HOST,
  },
};

// Example: Get top tracks
export const getPopular = async () => {
  try {
    const res = await fetch(
      "https://deezerdevs-deezer.p.rapidapi.com/search?q=top+hits",
      options
    );
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching top tracks:", error);
    return [];
  }
};

export const getBollywoodTracks = async () => {
  try {
    const res = await fetch(
      "https://deezerdevs-deezer.p.rapidapi.com/search?q=himesh+reshammiya",
      options
    );
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching bollywood tracks:", error);
    return [];
  }
};

export const getHits = async () => {
  try {
    const res = await fetch(
      "https://deezerdevs-deezer.p.rapidapi.com/search?q=the+weeknd",
      options
    );
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching tracks:", error);
    return [];
  }
};

export const getTopAlbums = async () => {
  try {
    const res = await fetch(
      "https://deezerdevs-deezer.p.rapidapi.com/chart/0/albums",
      options
    );
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching top albums:", error);
    return [];
  }
};

export const getSearch = async (tag) => {
  try {
    const res = await fetch(
      `https://deezerdevs-deezer.p.rapidapi.com/search?q=${tag}`,
      options
    );
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.log("Error searching..", error);
    return [];
  }
};
