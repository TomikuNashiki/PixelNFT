export interface Pixel {
  owner: string;
  color: number;
  lastUpdate: number;
}

export interface User {
  availablePixels: number;
  lastAdReward: number;
  isRegistered: boolean;
}

export interface ContractError {
  code: number;
  message: string;
}

export interface PixelGameContract {
  address: string;
  register(): Promise<void>;
  claimAdReward(): Promise<void>;
  updatePixel(x: number, y: number, color: number): Promise<void>;
  getPixel(x: number, y: number): Promise<Pixel>;
  getUserData(address: string): Promise<User>;
  mintCanvas(): Promise<void>;
  getAllPixels(): Promise<Pixel[]>;
}