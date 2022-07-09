import jwt from 'jsonwebtoken'

export function jwtGenerator(_id:string){
    const payload = {
        id: _id
    }
    return jwt.sign(payload, process.env.SECRET_KEY as string,{
        expiresIn:'24h'
    })
}
