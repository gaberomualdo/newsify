import { addToCache, getFromCache } from '../../lib/cache';
import { getNewsAPIKey } from '../../lib/getNewsAPIKey';

export default async (req, res) => {
  const search = encodeURIComponent(req.query.q);
  const responseFromAPI = await fetch(`https://newsapi.org/v2/everything?pageSize=100&page=1&q=${search}&apiKey=${getNewsAPIKey()}`);

  if (responseFromAPI.status === 429) {
    // attempt get from cache
    const cachedResp = getFromCache(`search--${search}`);
    if (cachedResp) {
      res.statusCode = 200;
      return res.json(cachedResp);
    }
  }

  res.statusCode = responseFromAPI.status;

  const respJSON = await responseFromAPI.json();

  // add to cache if success
  if (responseFromAPI.status === 200) {
    addToCache(`search--${search}`, respJSON);
  }

  res.json(respJSON);
};
