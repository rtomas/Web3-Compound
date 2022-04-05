import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import styles from '../styles/Home.module.css';

import Login from '../components/Login';
import WalletToken from '../components/WalletToken';
import ListBorrow from '../components/ListBorrow';
import Address from '../components/Address';

import getcDaiContract from '../utils/artifacts/cDai';
import getDaiContract from '../utils/artifacts/dai';
import getTokenBalance from '../utils/getTokenBalance';
import { borrowDai, mintDai } from '../utils/interactDai';

import { ethers } from 'ethers';
import { Button } from '@mui/material';

import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql } from '@apollo/client';

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_APIGraphQLCompound,
  cache: new InMemoryCache(),
});

let provider: any;
let signer: any;

interface Window {
  ethereum: any;
}

export default function Home() {
  const [state, setState] = useState({
    account: null,
    daiBalance: '-',
    cDaiBalance: '-',
    connectButton: false,
    hasMetaMask: true,
  });

  useEffect(() => {
    if (typeof window.ethereum === 'undefined') {
      window.alert('You must install MetaMask to use this website');
      setState({ ...state, hasMetaMask: false });
      return;
    }

    provider = new ethers.providers.Web3Provider(window.ethereum, 'any');

    if (sessionStorage['SandboxMetaAlreadyConnected']) {
      connectMeta();
    } else setState({ ...state, connectButton: true });

    window.ethereum.on('accountsChanged', () => {
      connectMeta();
    });

    window.ethereum.on('chainChanged', () => {
      document.location.reload();
    });

    window.ethereum.on('disconnect', () => {
      sessionStorage['SandboxMetaAlreadyConnected'] = false;
      setState({ ...state, connectButton: true });
      document.location.reload();
    });
  }, [state.connectButton]);

  async function connectMeta() {
    if (typeof window.ethereum === 'undefined') {
      window.alert('You must install MetaMask to use this website');
      return;
    }

    let network = await provider.getNetwork();
    if (network.chainId !== 42) {
      window.alert('This website only supports Kovan testnet');
      return;
    }
    try {
      await provider.send('eth_requestAccounts', []);
      signer = provider.getSigner();
      sessionStorage['SandboxMetaAlreadyConnected'] = true;

      const [signerAddress, daiContract, cDaiContract] = await Promise.all([
        signer.getAddress(),
        getDaiContract(provider),
        getcDaiContract(provider),
      ]);

      const [singerDai, singerCDai] = await Promise.all([
        getTokenBalance(signerAddress, daiContract, 18),
        getTokenBalance(signerAddress, cDaiContract, 8),
      ]);

      setState({
        ...state,
        account: signerAddress,
        cDaiBalance: singerCDai,
        daiBalance: singerDai,
        connectButton: false,
      });
    } catch (e) {
      sessionStorage['SandboxMetaAlreadyConnected'] = false;
      setState({ ...state, connectButton: true });
    }
  }

  const MintDAI = async () => {
    let resul = await mintDai(state.account, signer, 1);
  };

  const BorrowDAI = async () => {
    let resul = await borrowDai(state.account, signer, 1);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Compound App</title>
        <meta name="description" content="cDAI " />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Compound App</h1>
        <p className={styles.description}>Interact with cDAI smart contract.</p>
        {(state.connectButton || !state.hasMetaMask) && (
          <Login
            connectButton={state.connectButton}
            hasMetaMask={state.hasMetaMask}
            connectMetaMask={connectMeta}
          />
        )}
        {!state.connectButton && state.hasMetaMask && (
          <div className={styles.grid}>
            <Address account={state.account} />
            <br />
            <WalletToken Token="cDAI" value={state.cDaiBalance} />
            <br />
            <WalletToken Token="DAI" value={state.daiBalance} />
            <br />
            <Button variant="outlined" onClick={MintDAI}>
              Mint 1 DAI
            </Button>
            <Button variant="outlined" onClick={BorrowDAI}>
              Borrow 1 DAI
            </Button>
            <br />
            <ApolloProvider client={client}>
              <ListBorrow account={state.account} />
            </ApolloProvider>
          </div>
        )}
      </main>
    </div>
  );
}
