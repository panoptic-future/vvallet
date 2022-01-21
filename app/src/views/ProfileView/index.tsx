import Link from 'next/link'
import Router from 'next/router'
import { FC, useMemo, useState } from 'react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'

import styles from './index.module.css'
import {
  fetchAllIdentities,
  isKeyRegistered,
  useVVallet,
} from 'lib/VVallet'
import { IdCard } from './IdCard'
import { useIdentity } from 'utils/fetcher'

export const ProfileView: FC<{ alias: string }> = ({ alias }) => {
  const { identity, isLoading, error } = useIdentity(alias)
  const [isWaiting, setIsWaiting] = useState(false)
  const wallet = useVVallet()

  useMemo(() => {
    if (wallet?.local?.publicKey && !isKeyRegistered(wallet.local.publicKey)) {
      Router.push('/register')
    }
  }, [wallet])

  const identities = async () => {
    if (wallet) {
      setIsWaiting(true)
      await fetchAllIdentities(wallet)
      setIsWaiting(false)
    }
  }

  if (isLoading) return (
    <div className="container mx-auto max-w-6xl p-8 2xl:px-0">
      <div className={styles.container}>
        <div className="navbar mb-2 shadow-lg text-neutral-content rounded-box">
          <div className="flex-none">
            <Link href="/">
              <a className="logo text-4xl">vvallet</a>
            </Link>
          </div>
          <div className="flex-1 px-2 mx-2" />

          <div className="flex-none">
            <WalletMultiButton className="btn btn-ghost" />
          </div>
        </div>

        <div className="hero min-h-screen">
          <div className="text-center hero-content">
            <div className="max-w-md">
              <h1 className="mb-5 text-5xl">
                💽
              </h1> 
              {/* <h1 className="mb-5 text-3xl">
                identity not found
              </h1> */}
              <button className="btn btn-lg loading">loading</button> 
            </div>
          </div>
        </div>
      </div>
    </div>
  )
  else if (error) return (
    <div className="container mx-auto max-w-6xl p-8 2xl:px-0">
      <div className={styles.container}>
        <div className="navbar mb-2 shadow-lg text-neutral-content rounded-box">
          <div className="flex-none">
            <Link href="/">
              <a className="logo text-4xl">vvallet</a>
            </Link>
          </div>
          <div className="flex-1 px-2 mx-2" />

          <div className="flex-none">
            <WalletMultiButton className="btn btn-ghost" />
          </div>
        </div>

        <div className="hero min-h-screen">
          <div className="text-center hero-content">
            <div className="max-w-md">
              <h1 className="mb-5 text-5xl">
                💽
              </h1> 
              <h1 className="mb-5 text-3xl">
                identity not found
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
  else return (
    <div className="container mx-auto max-w-6xl p-8 2xl:px-0">
      <div className={styles.container}>
        <div className="navbar mb-2 shadow-lg text-neutral-content rounded-box">
          <div className="flex-none">
            <Link href="/">
              <a className="logo text-4xl">vvallet</a>
            </Link>
          </div>
          <div className="flex-1 px-2 mx-2" />

          <div className="flex-none">
            <WalletMultiButton className="btn btn-ghost" />
          </div>
        </div>

        <div className="flex mb-16">
          <div className="mr-4">
            <div>
              {wallet?.local?.publicKey ? (
                <>Your address: {wallet.local.publicKey.toBase58()}</>
              ) : null}
            </div>
            <div>
              <button className="btn" onClick={identities}>
                get vvallet identities
              </button>
              <div>
                {isWaiting ? (
                  <button className="btn btn-lg loading">loading</button>
                ) : null}
              </div>
            </div>
          </div>
        </div>

        <div className="flex mb-16 border-solid border-2">
          <IdCard identity={identity} />
        </div>
      </div>
    </div>
  )
}
