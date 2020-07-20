import { addToCache, getFromCache } from '../../lib/cache';
import { getNewsAPIKey } from '../../lib/getNewsAPIKey';

export default async (req, res) => {
  const responseFromAPI = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${getNewsAPIKey()}`);

  if (responseFromAPI.status === 429) {
    // attempt get from cache
    const cachedResp = getFromCache(`latest-news`);
    if (cachedResp) {
      res.statusCode = 200;
      return res.json(cachedResp);
    }
  }

  res.statusCode = responseFromAPI.status;

  const respJSON = await responseFromAPI.json();

  // add to cache if success
  if (responseFromAPI.status === 200) {
    addToCache(`latest-news`, respJSON);
  }

  res.json(respJSON);
};
