import { ethers } from 'ethers';
import getDaiContract from './artifacts/cDai';
//(provider)

async function mintDai(signerAddress, signer, amount) {
  if (!signerAddress) {
    console.error("Can't mint with no account");
    return;
  }

  if (amount === 0) {
    console.error("Can't mint 0 DAI");
    return;
  }

  let contract: any = await getDaiContract(signer);
  let data = await contract.mint(ethers.utils.parseUnits(amount.toString()));

  return data;
}

async function borrowDai(signerAddress, signer, amount) {
  if (!signerAddress) {
    console.error("Can't borrow with no account");
    return;
  }

  if (amount === 0) {
    console.error("Can't borrow 0 DAI");
    return;
  }

  // TODO: check if amount is valid

  let contract: any = await getDaiContract(signer);
  let data = await contract.borrow(ethers.utils.parseUnits(amount.toString()));

  return data;
}

export { borrowDai, mintDai };
