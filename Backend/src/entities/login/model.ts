/**
 * Modelo de Login.
 */
 interface LoginModel {
    email:string,
    password: string
}

interface CodeModel {
    code:string
}

interface UserModel {
    id: number,
    identification: string,
    name:string,
    surName:string,
    lastName:string,
    picture:string,
    birthdate:Date,
    email:string,
    phone:string,
    sex:number,
    department:string | number
}