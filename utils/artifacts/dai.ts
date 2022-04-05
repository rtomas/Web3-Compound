import { ethers } from 'ethers';

async function dai(provider) {
  let daiAddress = '0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa';
  let ABI = [
    'function balanceOf(address _owner) external view returns (uint256)',
    'function totalSupply() external view returns (uint256)',
  ];
  let contract = new ethers.Contract(daiAddress, ABI, provider);

  return contract;
}

export default dai;
