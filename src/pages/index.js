import Head from 'next/head';
import { Article, Container, ErrorMessage } from '../components';
import { getAPIBaseURL } from '../lib/getAPIBaseURL';

export default function Home({ errorCode, articles, APIBaseURL }) {
  return (
    <>
      <Head>
        <title>Next.js News</title>
        <link rel='shortcut icon' href='/favicon.png' />
      </Head>

      <Container currentTab={0} APIBaseURL={APIBaseURL}>
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

  let returnVal;

  if (responseFromAPI.status === 200) {
    returnVal = { props: { articles: (await responseFromAPI.json()).articles } };
  } else {
    returnVal = { props: { errorCode: responseFromAPI.status } };
  }

  returnVal.props.APIBaseURL = getAPIBaseURL();

  return returnVal;
}
