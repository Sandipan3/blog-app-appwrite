import { Account, Client, ID } from "appwrite";
import conf from "../conf/conf";

export class AuthService{
    client = new Client();
    account;

    constructor(){
        this.client.setEndpoint(conf.appwriteURL).setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async creteAccount ({email, password, name}){
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name );
            if (userAccount){
                //login
                return this.login({email,password});
            }
            else{
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({email, password}){
        try {
            const loginSession = await this.account.createEmailPasswordSession(email,password);
            return loginSession;
        } catch (error) {
            throw error;
        }
    }
    async getCurrentUser(){
        try {
            const currentUser = await this.account.get();
            return currentUser;
        } catch (error) {
            throw error;
        }
    }

    async logout(){
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            throw error;
        }
    }
}

const authService = new AuthService();
export default authService;