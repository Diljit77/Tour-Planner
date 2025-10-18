import axios from "axios";


export const getWikipediaImage = async (place) => {
  try {
 
    const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(
      place
    )}&format=json&origin=*`;

    const searchRes = await axios.get(searchUrl);
    const pages = searchRes.data.query?.search;
    if (!pages || pages.length === 0) return null;

    const pageTitle = pages[0].title;

 
    const imageUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(
      pageTitle
    )}&prop=pageimages&format=json&pithumbsize=800&origin=*`;

    const imgRes = await axios.get(imageUrl);
    const pagesData = imgRes.data.query?.pages;
    const pageKey = Object.keys(pagesData)[0];
    const image = pagesData[pageKey]?.thumbnail?.source;

    return image || null;
  } catch (err) {
    console.error(`Wikipedia image fetch failed for "${place}":`, err.message);
    return null;
  }
};
