import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';

interface LoginProps {
  connectButton: boolean;
  hasMetaMask: boolean;
  connectMetaMask: () => void;
}

function Login(props: LoginProps) {
  return (
    <div>
      {props.connectButton && (
        <Button variant="contained" size="large" onClick={props.connectMetaMask}>
          Connect your wallet
        </Button>
      )}
      {!props.hasMetaMask && <a href="https://metamask.io/">Install MetaMask</a>}
    </div>
  );
}

export default Login;
