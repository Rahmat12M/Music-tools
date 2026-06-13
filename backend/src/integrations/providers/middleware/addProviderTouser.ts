import fs from "fs"
import users from "../../../../data/users.json"

interface User {
  id: number;
  username: string;
  passwordHash: string;
  provider: string[];
  providerUserID: string[];
}

function addProviderToUser(appUserID: number, provider: string){
//finde nutzer
const typedUsers: User[] = users;
const user = typedUsers.find(u => u.id === appUserID)
//schreibe provider rein
if(!user?.provider.includes(provider)){
    user?.provider.push(provider)
}


}

export default addProviderToUser