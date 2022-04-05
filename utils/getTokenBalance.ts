import { ethers } from 'ethers';

async function getTokenBalance(signerAddress, contract, decimal): Promise<string> {
  if (!signerAddress) {
    console.error("Can't get balance with no account");
    return;
  }

  let tokenBalanceBigNum = await contract.balanceOf(signerAddress);
  let tokenBalance = ethers.utils.formatUnits(tokenBalanceBigNum, decimal);

  return tokenBalance;
}

export default getTokenBalance;
