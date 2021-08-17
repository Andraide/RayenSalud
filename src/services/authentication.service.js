import { BehaviorSubject } from 'rxjs';

const currentUserSubject = new BehaviorSubject();


export const authenticationService = {
    login,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue () { return currentUserSubject.value },
  
};

function login(username, password) {
    return new Promise (( resolve, reject ) => {
        if(username && password)
        {
            currentUserSubject.next(username)
            resolve({ user: username })
        }else
        {
            reject({ error : 'El usuario no es esta registrado' })
        }
    })
}

