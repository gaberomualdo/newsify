import config from 'config';

export default async (req, res) => {
  const category = req.query.category;
  const responseFromAPI = await fetch(
    `https://newsapi.org/v2/top-headlines?country=us&pageSize=100&page=1&category=${category}&apiKey=${config.get('newsAPIKey')}`
  );
  res.statusCode = responseFromAPI.status;
  res.json(await responseFromAPI.json());
};
