export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  expiresAtUtc: string;
  name: string;
  email: string;
  role?: string; // 👈 keep this
}
