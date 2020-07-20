export default async (req, res) => {
  res.statusCode = 200;
  res.json({
    status: 'ok',
    categories: [
      { name: 'Entertainment', id: 'entertainment' },
      { name: 'General', id: 'general' },
      { name: 'Health', id: 'health' },
      { name: 'Science', id: 'science' },
      { name: 'Sports', id: 'sports' },
      { name: 'Technology', id: 'technology' },
    ],
  });
};
