import config from 'config';

export default async (req, res) => {
  const responseFromAPI = await fetch(`https://newsapi.org/v2/sources?apiKey=${config.get('newsAPIKey')}`);
  res.statusCode = responseFromAPI.status;
  res.json(await responseFromAPI.json());
};
