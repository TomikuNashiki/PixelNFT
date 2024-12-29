// src/services/contractService.ts

import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '../utils/data';
import { ContractError, Pixel, PixelGameContract, User } from '../utils/types';

export class ContractService implements PixelGameContract {
  private web3: Web3;
  private contract: Contract;
  public address: string;

  constructor() {
    if (window.ethereum) {
      this.web3 = new Web3(window.ethereum);
      this.contract = new this.web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
      this.address = CONTRACT_ADDRESS;
    } else {
      throw new Error('Web3 provider not found');
    }
  }

  private async getAccount(): Promise<string> {
    const accounts = await this.web3.eth.getAccounts();
    if (!accounts[0]) {
      throw new Error('No account connected');
    }
    return accounts[0];
  }

  async register(): Promise<void> {
    try {
      const account = await this.getAccount();
      await this.contract.methods.register().send({ from: account });
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  async claimAdReward(): Promise<void> {
    try {
      const account = await this.getAccount();
      await this.contract.methods.claimAdReward().send({ from: account });
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  async updatePixel(x: number, y: number, color: number): Promise<void> {
    try {
      const account = await this.getAccount();
      await this.contract.methods.updatePixel(x, y, color).send({ from: account });
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  async getPixel(x: number, y: number): Promise<Pixel> {
    try {
      return await this.contract.methods.getPixel(x, y).call();
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  async getUserData(address: string): Promise<User> {
    try {
      return await this.contract.methods.getUserData(address).call();
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  async mintCanvas(): Promise<void> {
    try {
      const account = await this.getAccount();
      await this.contract.methods.mintCanvas().send({ from: account });
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  async getAllPixels(): Promise<Pixel[]> {
    try {
      return await this.contract.methods.getAllPixels().call();
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  private handleError(error: any): ContractError {
    console.error('Contract error:', error);
    return {
      code: error.code || 5000,
      message: error.message || 'Contract operation failed'
    };
  }
}

export const contractService = new ContractService();