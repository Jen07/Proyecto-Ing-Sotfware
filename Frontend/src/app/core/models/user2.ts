export default interface UserModel{
    id?:number,
    identification?: string,
    name?:string,
    surName?:string,
    lastName?:string,
    email?:string,
    password?:string,
    picture?:string,
    birthdate?:Date,
    phone?:string,
    department?:number | string,
    id_sex?:number,
    id_district?:number
} 