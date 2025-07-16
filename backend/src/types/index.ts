export interface User {
  id: number;
  name: string;
  email: string;
  password?: string;
}

export interface DecodedToken {
  id: number;
  iat: number;
  exp: number;
}
