import Head from 'next/head';
import Markdown from 'react-markdown';

import { Container } from '../components';
import { getAPIBaseURL } from '../lib/getAPIBaseURL';

export default function Home(props) {
  return (
    <>
      <Head>
        <title>Newsify &bull; About</title>
        <link rel='shortcut icon' href='/favicon.png' />
      </Head>

      <Container currentTab={3} APIBaseURL={props.APIBaseURL}>
        <div className='text-section'>
          <Markdown>{`
        
# About Newsify

The news of today comes from a vast array of sources, for a variety of categories and interests.

Newsify is a simple tool that allows you to collect, sort and share articles, in a more objective manner.

**Newsify is based on curation, not recommendation.** It is not your typical news aggregator, it is not a social network, and it is not a feed aggregator.

We don't use an elusive recommendation algorithm that decides what news to show you. Instead, we collect all the news from the sources and categories you want to read, sort them by their freshness and share them with you.

News is available from over 150 popular publications, in a wide range of languages, in real time. You'll also be able to search our database of tens of thousands of recent articles, to instantly find what you're looking for.

And finally, our homepage gives a brief overview of latest news from many of our sources, in a readable and simple format, available on all devices.

Take a look at our [Latest News](/) page and see what you can do with Newsify.

## Credits & Open Source

Newsify is a project by [Gabriel Romualdo](https://xtrp.io/).

It is open sourced and licensed under the [MIT License](https://opensource.org/licenses/MIT). Check out the [GitHub repo](https://github.com/xtrp/newsify) for more information.

## Technologies

Newsify is built with Next.js and some Tailwind.css too. Most of the styles are custom made, and you can easily find them in the components folder.
        
        `}</Markdown>
        </div>
      </Container>
    </>
  );
}

export async function getServerSideProps() {
  return { props: { APIBaseURL: getAPIBaseURL() } };
}
