export interface User {
  username:string,
  password:string,
}

export interface AccessToken {
  access: string|null,
  refresh: string|null,   
}

export interface AuthState {
  isAuth: boolean,
  token: AccessToken,
  responseStatus: string|null
}