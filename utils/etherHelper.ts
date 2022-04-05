import { ethers } from 'ethers';

export const formatResultCripto = (result: string): string => {
  let formatRes: number = parseFloat(result);

  formatRes = Math.round(formatRes * 1e4) / 1e4; // round to 4 decimal places
  return formatRes.toString();
};

export const formatTokenUnits = (result: string, decimal: number): string => {
  let tokenBalance = ethers.utils.formatUnits(result, decimal);

  return tokenBalance;
};

export const cropAddress = (address: string): string => {
  if (!address) return '';
  return address?.substring(2, 6) + ' ... ' + address?.substring(address.length - 4);
};
