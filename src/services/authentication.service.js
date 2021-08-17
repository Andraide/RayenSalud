export const authenticationService = {
    login
};

function login(username, password) {
    return new Promise (( resolve, reject ) => {
        if(username && password)
        {
            resolve({ user: username })
        }else
        {
            reject({ error : 'El usuario no es esta registrado' })
        }
    })
}

