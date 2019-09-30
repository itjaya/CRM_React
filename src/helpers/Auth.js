import $ from 'jquery';
import * as url from '../urlConstants';
import { async } from 'q';

class Auth {

    constructor () {
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.getToken = this.getToken.bind(this);
      
    }
    login = async(loginInfo) => {
         return (
            await $.post(url.url + "userLogin", loginInfo, async(result) => {
                if(result.condition) {
                    await sessionStorage.setItem("loggedIn", true)
                    await sessionStorage.setItem("userData", JSON.stringify(result))
                }
            })
        )
    }

    logout = async() => {
        await sessionStorage.removeItem("loggedIn");
        await sessionStorage.removeItem("userData")
    }

    getToken = async() => {
        let userData = JSON.parse(sessionStorage.getItem('userData'));
        return await  { headers: { 'Authorization': userData.token  }}
    }
}

export default Auth;