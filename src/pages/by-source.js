import Head from 'next/head';
import Select from 'react-select';
import { Container, ErrorMessage, Article, Loading } from '../components';
import { useState } from 'react';
import { getAPIBaseURL } from '../lib/getAPIBaseURL';

export default function Home(props) {
  const [articles, setArticles] = useState(props.articles);
  const [errorCode, setErrorCode] = useState(props.errorCode);
  const [hasSelectedSources, setHasSelectedSources] = useState(true);

  const updateArticles = async (sources) => {
    sources = sources || [];

    setArticles([]);
    setErrorCode(undefined);

    if (sources.length > 0) {
      setHasSelectedSources(true);

      const data = await getArticlesFromSources(sources, props.APIBaseURL);
      const newArticles = data.props.articles;
      const newErrorCode = data.props.errorCode;

      setArticles(newArticles);
      setErrorCode(newErrorCode);
    } else {
      setHasSelectedSources(false);
    }
  };

  return (
    <>
      <Head>
        <title>Next.js News &bull; News By Source</title>
      </Head>

      <Container currentTab={1} APIBaseURL={props.APIBaseURL}>
        <div style={{ marginBottom: '2rem' }}>
          <Select
            defaultValue={props.presetSources}
            placeholder='Choose a Source...'
            noOptionsMessage={() => 'No Sources Available. This is Likely an Internal Server Error.'}
            options={props.sources}
            onChange={(selectedOptions) => {
              updateArticles(selectedOptions);
            }}
            isMulti
            instanceId={1}
          />
        </div>
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
        {!((articles && articles.length > 0) || errorCode || !hasSelectedSources) ? <Loading /> : null}
      </Container>
    </>
  );
}

const getArticlesFromSources = async (sources, APIBaseURL = getAPIBaseURL()) => {
  let sourceValues = [];
  sources.forEach((source) => {
    sourceValues.push(source.value);
  });
  const sourceListStr = sourceValues.join(',');

  const responseFromAPI = await fetch(`${APIBaseURL}/api/by-source?sources=${sourceListStr}`);
  if (responseFromAPI.status === 200) {
    return { props: { articles: (await responseFromAPI.json()).articles } };
  } else {
    return { props: { errorCode: responseFromAPI.status } };
  }
};

export async function getServerSideProps() {
  let presetSources = [];

  let sources = [];
  const sourcesResponseFromAPI = await fetch(`${getAPIBaseURL()}/api/sources`);
  if (sourcesResponseFromAPI.status === 200) {
    sources = (await sourcesResponseFromAPI.json()).sources.map((e) => {
      return { value: e.id, label: e.name };
    });
  }

  // a few preset famous sources ---> array is of source IDs (or values, as named in the select component)
  ['bloomberg', 'cnn', 'reuters', 'the-washington-post'].forEach((sourceValue) => {
    sources.forEach((source) => {
      if (source.value === sourceValue) {
        presetSources.push(source);
      }
    });
  });

  let returnVal = await getArticlesFromSources(presetSources);
  returnVal.props.sources = sources;
  returnVal.props.presetSources = presetSources;

  returnVal.props.APIBaseURL = getAPIBaseURL();

  return returnVal;
}
