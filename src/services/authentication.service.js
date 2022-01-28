import { handleResponse } from '../statics'

import { BehaviorSubject } from 'rxjs';

const currentUserSubject = new BehaviorSubject();
const currentToken = new BehaviorSubject()


export const authenticationService = {
    login,
    signUp,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue () { return currentUserSubject.value },
    get currentToken () { return currentToken.value },
  
};

function login(username, password) {

    const url = "http://localhost:3000/api/usuarios/login"

    let data = { email: username, password: password }

    console.log("Data", data)


    const requestOptions = {
        
         method: 'POST',
        headers: { 'Content-Type': 'application/json' , 'Accept' : 'application/json' },
        body : JSON.stringify(data)
        
    }

    return fetch( url , requestOptions )
            .then(handleResponse)
            .then(x => {
                currentToken.next(x)
                return Promise.resolve(x);
            }).catch((err)=>{
                const { status } = err
                const error = { error : status }
                return Promise.reject(error)    
            }); 
}

function signUp(username, password, email, nombre, bio) {

    const url = "http://localhost:3000/api/usuarios/signup"

    let data = { username: username, password: password, email: email, nombre: nombre, bio : bio }

    const requestOptions = {
        
         method: 'POST',
        headers: { 'Content-Type': 'application/json' , 'Accept' : 'application/json' },
         body : JSON.stringify(data)
        
    }

    return fetch( url , requestOptions )
            .then(handleResponse)
            .then(x => {
                currentToken.next(x)
                console.log("Resolved", x)
                return Promise.resolve(x);

            }).catch((err)=>{
                const { status } = err
                const error = { error : status }
                return Promise.reject(error)    
            }); 
}

