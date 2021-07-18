import { useState } from 'react';

import Head from 'next/head';
import Select from 'react-select';

import {
  Article,
  Container,
  ErrorMessage,
  LinedHeader,
  Loading,
} from '../components';
import { getAPIBaseURL } from '../lib/getAPIBaseURL';

export default function Home(props) {
  const [articles, setArticles] = useState(props.articles);
  const [errorCode, setErrorCode] = useState(props.errorCode);

  const updateArticles = async (category) => {
    setArticles([]);
    setErrorCode(undefined);

    const data = await getArticlesFromCategory(category, props.APIBaseURL);
    const newArticles = data.props.articles;
    const newErrorCode = data.props.errorCode;

    setArticles(newArticles);
    setErrorCode(newErrorCode);
  };

  return (
    <>
      <Head>
        <title>Newsify &bull; News By Topic</title>
        <link rel='shortcut icon' href='/favicon.png' />
      </Head>

      <Container currentTab={2} APIBaseURL={props.APIBaseURL}>
        <div className='select-section'>
          <LinedHeader>Choose a Category</LinedHeader>
          <Select
            defaultValue={props.presetCategory}
            placeholder='Choose a Category...'
            noOptionsMessage={() => 'No categories found.'}
            options={props.categories}
            onChange={(selectedOptions) => {
              updateArticles(selectedOptions);
            }}
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
        {!((articles && articles.length > 0) || errorCode) ? <Loading /> : null}
      </Container>
    </>
  );
}

const getArticlesFromCategory = async (category, APIBaseURL = getAPIBaseURL()) => {
  const responseFromAPI = await fetch(`${APIBaseURL}/api/by-category?category=${category.value}`);
  if (responseFromAPI.status === 200) {
    return { props: { articles: (await responseFromAPI.json()).articles } };
  } else {
    return { props: { errorCode: responseFromAPI.status } };
  }
};

export async function getServerSideProps() {
  let categories = [];
  const categoriesResponseFromAPI = await fetch(`${getAPIBaseURL()}/api/categories`);
  if (categoriesResponseFromAPI.status === 200) {
    categories = (await categoriesResponseFromAPI.json()).categories.map((e) => {
      return { value: e.id, label: e.name };
    });
  }

  let presetCategory = categories[0] || null;

  let returnVal = await getArticlesFromCategory(presetCategory);
  returnVal.props.categories = categories;
  returnVal.props.presetCategory = presetCategory;

  returnVal.props.APIBaseURL = getAPIBaseURL();

  return returnVal;
}
