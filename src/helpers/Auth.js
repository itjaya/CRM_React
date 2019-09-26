import $ from 'jquery';
import * as url from '../urlConstants';

class Auth {

    constructor () {
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
      
    }
    login = (loginInfo) => {
         return (
            $.post(url.url + "userLogin", loginInfo, (result) => {
                if(result.condition) {
                    sessionStorage.setItem("loggedIn", true)
                    sessionStorage.setItem("userData", JSON.stringify(result))
                }
            })
        )
    }

    logout = () => {
        sessionStorage.removeItem("loggedIn");
        sessionStorage.removeItem("userData")
    }

    getToken = () => {
        sessionStorage.getItem('loggedIn')
    }
}

export default Auth;