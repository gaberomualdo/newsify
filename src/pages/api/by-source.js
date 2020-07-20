import { addToCache, getFromCache } from '../../lib/cache';
import { getNewsAPIKey } from '../../lib/getNewsAPIKey';

export default async (req, res) => {
  const sources = req.query.sources.split(',');
  const sourcesStr = sources.join(',');
  const responseFromAPI = await fetch(`https://newsapi.org/v2/everything?pageSize=100&page=1&sources=${sourcesStr}&apiKey=${getNewsAPIKey()}`);

  if (responseFromAPI.status === 429) {
    // attempt get from cache
    const cachedResp = getFromCache(`by-source--${sourcesStr}`);
    if (cachedResp) {
      res.statusCode = 200;
      return res.json(cachedResp);
    }
  }

  res.statusCode = responseFromAPI.status;

  const respJSON = await responseFromAPI.json();

  // add to cache if success
  if (responseFromAPI.status === 200) {
    addToCache(`by-source--${sourcesStr}`, respJSON);
  }

  res.json(respJSON);
};
