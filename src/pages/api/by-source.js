import config from 'config';

export default async (req, res) => {
  const sources = req.query.sources.split(',');
  const responseFromAPI = await fetch(
    `https://newsapi.org/v2/everything?pageSize=100&page=1&sources=${sources.join(',')}&apiKey=${config.get('newsAPIKey')}`
  );
  res.statusCode = responseFromAPI.status;
  res.json(await responseFromAPI.json());
};
