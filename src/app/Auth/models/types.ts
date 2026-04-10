export interface LoginResponse {
  user: {
    id: number | string;
    name: string;
    email: string;
  };
  token: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface GoogleLoginResponse {
  token: string;
}

export interface GoogleLoginRequest {
  idToken: string;
}

export interface RegistrationRequest {
  name: string;
  email: string;
  password: string;
}
