import { addToCache, getFromCache } from '../../lib/cache';
import { getNewsAPIKey } from '../../lib/getNewsAPIKey';

export default async (req, res) => {
  const category = req.query.category;
  const responseFromAPI = await fetch(
    `https://newsapi.org/v2/top-headlines?country=us&pageSize=100&page=1&category=${category}&apiKey=${getNewsAPIKey()}`
  );

  if (responseFromAPI.status === 429) {
    // attempt get from cache
    const cachedResp = getFromCache(`by-category--${category}`);
    if (cachedResp) {
      res.statusCode = 200;
      return res.json(cachedResp);
    }
  }

  res.statusCode = responseFromAPI.status;

  const respJSON = await responseFromAPI.json();

  // add to cache if success
  if (responseFromAPI.status === 200) {
    addToCache(`by-category--${category}`, respJSON);
  }

  res.json(respJSON);
};
