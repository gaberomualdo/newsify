export const addToCache = (key, val) => {
  const cache = JSON.parse(process.env.APICache || '{}');
  cache[key] = val;
  process.env.APICache = JSON.stringify(cache);
};

export const getFromCache = (key) => {
  const cache = JSON.parse(process.env.APICache || '{}');
  return cache[key];
};
