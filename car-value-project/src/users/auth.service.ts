import { UsersService } from "./users.service";
import { BadRequestException, Injectable } from "@nestjs/common";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService{
    
    constructor(private service: UsersService){}

    async signUp(email: string, password: string){

        //check if email is in use
        const record = await this.service.find(email);
        if (record.length) {
            throw new BadRequestException('email in use');
          }
        
        // Hash the users password
            //create salt
            const salt = randomBytes(8).toString('hex');
            // Hash the salt and the password together
            const hash = (await scrypt(password, salt, 32)) as Buffer
            // Join the hashed result and the salt together
            const result = salt + "." + hash.toString('hex');

        //save user in db
        const user = await this.service.create(email, result)

        //return the user
        return user;

    }

    async signIn(email: string, password: string){

        //go to db and get password against the given email
        const [user] = await this.service.find(email);
        if(!user) throw new BadRequestException('email does not exists');

        //extract salt from password
        const [salt, dbHash] = user.password.split('.');

        //generate hash with the salt and user input password
        const hash = (await scrypt(password, salt, 32)) as Buffer

        //compare hashes
        if( dbHash !== hash.toString('hex') ) throw new BadRequestException('Incorrect password');

        return user;
    }

}