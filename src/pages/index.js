import Head from 'next/head';
import { Article, Container, ErrorMessage } from '../components';
import { getAPIBaseURL } from '../lib/getAPIBaseURL';

export default function Home({ errorCode, articles }) {
  return (
    <>
      <Head>
        <title>Next.js News</title>
      </Head>

      <Container currentTab={0}>
        {articles && articles.length > 0 ? (
          <>
            {articles.map((article, idx) => (
              <Article key={idx} article={article} />
            ))}
          </>
        ) : null}

        {errorCode ? (
          <>
            <ErrorMessage>An error occurred while fetching articles with the status code {errorCode}.</ErrorMessage>
          </>
        ) : null}
      </Container>
    </>
  );
}

export async function getServerSideProps() {
  const responseFromAPI = await fetch(`${getAPIBaseURL()}/api/latest-news`);
  if (responseFromAPI.status === 200) {
    return { props: { articles: (await responseFromAPI.json()).articles } };
  } else {
    return { props: { errorCode: responseFromAPI.status } };
  }
}
