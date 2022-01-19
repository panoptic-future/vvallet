import Link from 'next/link'
import Router from 'next/router'
import useSWR from 'swr'
import { FC, useMemo, useState } from 'react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'

import styles from './index.module.css'
import {
  airdropToWallet,
  fetchIdentities,
  isKeyRegistered,
  registerAccount,
  useVVallet,
} from 'lib/VVallet'
import { IdCard } from './IdCard'

// TODO: move to utils
const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then(response => response.json());
const useUser = (id: string) => {
  const { data, error } = useSWR(`/api/im/${id}`, fetcher)

  console.log(data)
  console.log(error)

  return {
    user: data,
    isLoading: !error && !data,
    isError: error
  }
}

export const ProfileView: FC<{ alias: string }> = ({ alias }) => {
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
      await fetchIdentities(wallet)
      setIsWaiting(false)
    }
  }

  return (
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

        <div className='flex mb-16 border-solid border-2'>
          <Profile alias={alias} />
          <IdCard />
        </div>

      </div>
    </div>
  )
}

const Profile: FC<{ alias: string }> = ({ alias }) => {
  const { user, isLoading } = useUser(alias)
  if (isLoading) return <button className="btn btn-lg loading">loading</button>
  return <h1>Welcome back, {user.name}</h1>
}
