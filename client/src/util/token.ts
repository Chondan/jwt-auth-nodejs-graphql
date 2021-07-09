import jwtDecode from 'jwt-decode';

// Access token
export class AccessToken {
  static get(): string {
    return localStorage.getItem('token') || '';
  }

  static set(token: string) {
    localStorage.setItem('token', token);
  }

  static isExpired(token: string) {
    const decoded: any = jwtDecode(token);
    const { exp: expInSecond } = decoded;
    const expInMilliSecond = expInSecond * 1e3;
    return Date.now() > expInMilliSecond;
  }
}

export const getRefreshTokenEndpoint = () => 'http://localhost:3001/refresh_token';
