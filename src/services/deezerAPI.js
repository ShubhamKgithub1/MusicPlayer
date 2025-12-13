const API_KEY = "416d30b79fmsh9193a7a7316be03p102e1fjsnf47a48146a41";
const API_HOST = "deezerdevs-deezer.p.rapidapi.com";

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": API_KEY,
    "X-RapidAPI-Host": API_HOST,
  },
};

export const getPopular = async () => {
  try {
    const res = await fetch(
      "https://deezerdevs-deezer.p.rapidapi.com/search?q=bollywood-hits",
      options
    );
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching top tracks:", error);
    return [];
  }
};

export const getTrending = async () => {
  try {
    const res = await fetch(
      "https://deezerdevs-deezer.p.rapidapi.com/search?q=arijit-singh",
      options
    );
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching tracks:", error);
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
export const fetchFreshPreviewUrl = async (id, title, artist) => {
  try {
    const results = await getSearch(`${title} ${artist}`);
    return results.find((track) => track.id === id || track.title === title);
  } catch (err) {
    console.error("Error fetching fresh preview:", err);
    return null;
  }
};
