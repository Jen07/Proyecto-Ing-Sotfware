import jwt_decode from 'jwt-decode';

/**
 * Esta clase tiene los métodos necesarios 
 * para codificar y decodificar tokens.
 */
export default class Tokenizer {
  
  /**
   * 
   * @param token [string] Token almacenado o enviado por el servidor,
   * @returns [payload] Contenido decodificado del token.
   */
  public static decode(token: string) {
    try {
      const payload:any = jwt_decode(token);
      return { state: 'success', payload };
    } catch (InvalidTokenError) {
      return { state: 'error' };
    }
  }
}