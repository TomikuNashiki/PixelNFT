import { ethers } from 'ethers';

export interface WalletError {
  code: number;
  message: string;
}

export async function connectWallet(): Promise<string | WalletError> {
  try {
    if (!window.ethereum) {
      throw new Error('MetaMask not installed');
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const accounts = await provider.send('eth_requestAccounts', []);
    
    if (accounts.length === 0) {
      throw new Error('No accounts found');
    }

    return accounts[0];
  } catch (err: any) {
    if (err.code === 4001) {
      return {
        code: 4001,
        message: 'Please approve the connection request in MetaMask'
      };
    }
    if (err.message === 'MetaMask not installed') {
      return {
        code: 4100,
        message: 'Please install MetaMask to continue'
      };
    }
    return {
      code: 5000,
      message: 'Failed to connect wallet'
    };
  }
}