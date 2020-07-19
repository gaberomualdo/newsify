import config from 'config';

export default async (req, res) => {
  const responseFromAPI = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${config.get('newsAPIKey')}`);
  res.statusCode = responseFromAPI.status;
  res.json(await responseFromAPI.json());
};
