import React, { Component} from "react";
import { exploreService } from "../services"
class Explore extends Component {

    constructor(props) {
        super(props);
        this.state = {  
                        users: null, 
                     };
    }
    

    componentDidMount() 
    {
        exploreService.explore()
            .then( x => this.setState({ users: x }))
    }

    usersToFind()
    {

        const { users } = this.state
        return users.map((x,i) => {
            console.log("Keys", Object.keys(x))
            const { imagen, _id, email, username, password, bio, nombre, fecha_creado, fecha_actualizado, __v, siguiendo, id } = x 
            return (
                <div style={{ width: '10vw', heigth: '10vh', backgroundColor: 'grey', display: 'flex', flexDirection: 'row', flex: '1 1 auto', alignItems: 'center', justifyContent: 'center' }} key={i}>
                    <div style={{ display: 'flex', flex: '0.2' }}></div>
                    <div style={{ display: 'flex', flex: '0.8' }}>{username}</div>
                </div>
            )
        })

    }

    render() 
    {
        //console.log("Users", this.state.users)

        return (
            <div>
                <div style={{ display: 'flex', flexDirection: 'row', overflowX: 'scroll' }}>
                    {this.state.users && this.usersToFind()}
                </div>
            </div>
        )
    }
}

export { Explore }