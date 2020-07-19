import Head from 'next/head';

import { Container } from '../components';

export default function Home() {
  return (
    <>
      <Head>
        <title>Next.js News &bull; News By Topic</title>
      </Head>

      <Container currentTab={2}>
        <p>News By Topic</p>
      </Container>
    </>
  );
}
