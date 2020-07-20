import config from 'config';

export default async (req, res) => {
  const search = req.query.q;
  const responseFromAPI = await fetch(`https://newsapi.org/v2/everything?pageSize=100&page=1&q=${search}&apiKey=${config.get('newsAPIKey')}`);
  res.statusCode = responseFromAPI.status;
  res.json(await responseFromAPI.json());
};
