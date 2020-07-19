import Head from 'next/head';

import { Container } from '../components';

export default function Home() {
  return (
    <>
      <Head>
        <title>Next.js News &bull; News By Source</title>
      </Head>

      <Container currentTab={1}>
        <p>By Source</p>
      </Container>
    </>
  );
}
