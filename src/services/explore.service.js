import { handleResponse } from '../statics'
import { authenticationService } from "./authentication.service"

export const exploreService = {
    explore,
};

function explore() {

    const url = "http://localhost:3000/api/usuarios/explore"

    const access_token = authenticationService.currentToken.token
    
    console.log("Access token", access_token)
    const requestOptions = {
        method: 'GET',
         headers: { 'Accept' : 'application/json, text/plain, */*', "Accept-Encoding": "gzip, deflate, br", 'Authorization' : `bearer ${access_token}`, "Host": 'localhost:3000'  }
         
    }

    console.log("RequestedOptions" + requestOptions)

    return fetch( url , requestOptions )
            .then(handleResponse)
            .then(x => {
                console.log("Explore data", x)
                return Promise.resolve(x);
            }).catch((err)=>{
                const { status } = err
                const error = { error : status }
                return Promise.reject(error)    
            }); 
}
/*
Authorization: bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNTRjMTQzO
TA1YmE3NjBmNDk1MjUzYSIsImlhdCI6MTYzMjk0NjI0MCwiZXhwIjoxNjMzMDMyNjQwfQ.
bI94qhsoXKG5IE_up8blCoZ4l9Kqb1tHWO2DhnGG4Ws
*/
