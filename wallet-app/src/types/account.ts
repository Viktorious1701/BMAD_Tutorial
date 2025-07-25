export interface Account {
  id: string;
  name: string;
  startingBalance: number;
  userId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface NewAccount {
  name: string;
  startingBalance: number;
}

export interface CreateAccountRequest {
  name: string;
  startingBalance: number;
}

export interface AccountResponse {
  id: string;
  name: string;
  startingBalance: number;
  createdAt: string;
  updatedAt: string;
}