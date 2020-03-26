import axios from '../axios-api';
import jwt_decode from 'jwt-decode';

type user = {
    id: number,
    fornavn: string,
    etternavn: string,
    telefonNummer: string,
    email: string,
    antallFerieTatt: number,
    antallFerieIgjen: number,
    languageCode: string,
    ferier: object
}

type userFilter = user | undefined;


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
        }).catch((error) => {
            console.log(error);
        });
    },
    logout: function() {
        localStorage.removeItem("access_token");
    },
    fetchCurrentUser: async function()
    {
        let theResponse: any;
        theResponse = await axios.get("/users/" + (jwt_decode(localStorage.getItem("access_token") as string) as any).nameid);
        let user : userFilter = theResponse.data;
        return user as userFilter;
    },
    isLoggedIn: function() 
    {
        return  localStorage.getItem("access_token")?true:false;
    },
    isAdmin: function() 
    {
        return localStorage.getItem("access_token")?(jwt_decode(localStorage.getItem("access_token") as string) as any).role.includes("Admin"):false;
    }
};

export default AuthenticationService;