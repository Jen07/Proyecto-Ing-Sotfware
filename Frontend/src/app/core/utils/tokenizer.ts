import jwt_decode from 'jwt-decode';

export default class Tokenizer {
    
  public static decode(token: string) {
    try {
      const payload:any = jwt_decode(token);
      return { state: 'success', payload };
    } catch (InvalidTokenError) {
      return { state: 'error' };
    }
  }
}