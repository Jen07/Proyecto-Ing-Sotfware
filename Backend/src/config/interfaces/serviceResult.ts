/**
  *  Contiene la estructura de datos que será retornada al cliente.
  */
interface ServiceResult<T> {
  status: number,
  message?: string,
  list?: Array<T>,
  item?: T,
};