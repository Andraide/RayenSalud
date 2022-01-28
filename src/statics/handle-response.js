export function handleResponse(response) {
  
    
    return response.text().then(text => {
        
        console.log("STATUS",response.status , [ 200 ].indexOf(response.status) !== -1)
        const data = JSON.parse(text) ? text && JSON.parse(text) : null
        
        if( [ 200, 201 ].indexOf(response.status) !== -1 ) {
            console.log("Seeing trace" , response.status)
            return Promise.resolve(data)

        }else {

            if ([ 403 , 400 , 404 ].indexOf(response.status) !== -1) {
                
                console.log("Seeing trace 403 , 400 , 404" , response.status)
                return Promise.reject({error : response.status });
                
            } else if([ 500 , 502 , 503 ].indexOf(response.status) !== -1) {
            
                console.log("Seeing trace 500 , 502 , 503" , response.status)
                return Promise.reject({error : response.status })
                    
            } else if( [ 401 ].indexOf(response.status) !== -1 ) {
                
                console.log("Seeing trace 401" , response.status)
                return Promise.reject({ error : response.status , status: response.status })

            } else 

                console.log("Seeing trace other error" , response.status)
                return Promise.reject({error : response.status });

            }    

        });


}