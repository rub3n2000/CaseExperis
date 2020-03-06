import axios from '../axios-api';
import jwt_decode from 'jwt-decode';

const AuthenticationService = {
    login: async function(data : any) {
        let theResponse = {status: 401};
        await axios.post("/auth/login", data).then(response => {
            if(response.status === 200 && response.data.token) {
                let jwt = response.data.token;
                theResponse.status = response.status;
                
                localStorage.setItem("access_token", jwt);
            }
        }).catch((error) => {
            console.log(error);
        })
        console.log(theResponse.status);
        if(theResponse && theResponse.status === 200)
        {
            return true;
        }
        else {
            return false;
        }
    },
    register: async function(data: any) {
        await axios({method: 'post', url: "/auth/register", data: data, responseType: 'json'}).then(response => {
            console.log(response);
        }).catch((error) => {
            console.log(error);
        });
    },
    logout: async function() {
        localStorage.removeItem("access_token");
    },
    fetchCurrentUser: async function()
    {
        let theResponse;
        await axios.get("/users/" + (jwt_decode(localStorage.getItem("access_token") as string) as any).nameid).then(response => {
            theResponse = response.data;
        }).catch((error) => {
            console.log(error);
        });
        return theResponse;
    }
};

export default AuthenticationService;