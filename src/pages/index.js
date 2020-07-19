import Head from 'next/head';

import { Container } from '../components';

export default function Home() {
  return (
    <>
      <Head>
        <title>Next.js News</title>
      </Head>

      <Container currentTab={0}>
        <p>Latest News</p>
      </Container>
    </>
  );
}
