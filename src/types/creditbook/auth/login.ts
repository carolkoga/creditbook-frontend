export type LoginParams = {
  password: string;
  email: string;
  role?: 'user' | 'admin';
  pathname?: string;
};
