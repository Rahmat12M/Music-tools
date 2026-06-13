import users from "../../../../data/users.json"
function findUserByName (userName:string){
    const user = users.find(u => u.username === userName)
    if(!user) throw new Error ("User is undefined")
    return user.id
}
export default findUserByName