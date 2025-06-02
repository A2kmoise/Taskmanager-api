import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {

getUserById(){
return 'Here is User'
}

deleteUserById(){
 return 'deleted successfully'
}
editUserById(){
    return 'edited successfully'
}
    
}
