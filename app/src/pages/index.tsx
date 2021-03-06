import type { NextPage } from 'next'
import Head from 'next/head'
import { HomeView } from '../views'

const Home: NextPage = props => {
  return (
    <div>
      <link
        rel="preload"
        href="/fonts/Quinlliyk/Quinlliyk.ttf"
        as="font"
        crossOrigin=""
      />
      <link
        rel="preload"
        href="/fonts/JetBrainsMono/JetBrainsMono-Regular.ttf"
        as="font"
        crossOrigin=""
      />
      <link
        rel="preload"
        href="/fonts/JetBrainsMono/JetBrainsMonoNL-SemiBold.ttf"
        as="font"
        crossOrigin=""
      />
      <Head>
        <title>vvallet.me</title>
        <meta name="description" content="vvallet - decentralized proof of identity" />
      </Head>
      <HomeView />
    </div>
  )
}

export default Home
