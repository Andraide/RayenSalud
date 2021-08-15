const getLogger = require('webpack-log');
const log = getLogger({ name: 'About logs' });

import React from 'react'
import { Dimensions } from "../statics"
import { history} from '@/statics'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import Style from 'style-it';


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  width: window.innerWidth, height: 
                        window.innerHeight,
                        maxHeight: window.visualViewport.height,
                        maxWidth: window.visualViewport.width
                     };
        this.Dimensions = Dimensions.bind(this)

    }
    
    componentDidMount()
    {
        window.addEventListener('resize', this.Dimensions);
    }

    componentWillUnmount()
    {
        window.removeEventListener('resize', this.Dimensions);
    }

    componentDidUpdate()
    {
        log.info("Dimensions", this.state.width, this.state.height);
    }

    onClearChanges() {
      const { reset, onClearChanges, InitialValues } = this.props;
      reset();
      onClearChanges(InitialValues);
    }

    signup() {
        history.push('/signup');
    }



    render() {

        const mobile = this.state.width < 500 ? true : false; 
 
        const buttonSignIn = {

            backgroundImage: "linear-gradient(#00b8ff, #00719c)" ,
            borderColor: "transparent",
            width: this.state.width * 1/4, 
            height: this.state.height * 8/100         
        }

        const buttonSignUp = {

            borderRadius: "14px",
            marginLeft: "2vh" ,
            backgroundImage: "linear-gradient( #00b8ff , #00719c)" ,
            borderColor: "transparent"   
            
        }

        const title = {
            fontSize: "6vw",
            backgroundColor: 'transparent'
        }

        const subtitle = {
            fontSize: "3vw"
        }

        return ( 
            <div style={{ backgroundColor: 'black', width: '100vw', height: '100vh', display: 'flex', flexDirection : 'column', flex: '1 1 auto', alignItems : 'center' }}>
                <div style={{ backgroundColor: 'blue', width: '100vw', minHeight: '10vh', display: 'flex', flex: 1/10, alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}>
                </div>
                <div style={{ backgroundColor: 'blue', width: '100vw', height: '15vh', display: 'flex', flex: 1.5/10, alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}>
                    <h2 style={title}>XCARS</h2> 
                </div>
                <div style={{ backgroundColor: 'blue', width: '100vw', minHeight: '5vh', display: 'flex', flex: 0.5/10, alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}>
                </div>
                <div style={{ backgroundColor: 'red', width: '100vw', height: '65vh', minHeight: '65vh', maxHeight: '65vh', display: 'flex', flex: 6.5/10, alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Formik
                    initialValues={{
                        username: 'Ingrese su usuario',
                        password: 'Ingrese su clave'
                    }}
                    validationSchema={Yup.object().shape({
                        username: Yup.string().required('Username is required'),
                        password: Yup.string().required('Password is required')
                    })}
                    onSubmit={({ username, password }, { setStatus, setSubmitting }) => {
                        setStatus();
                        authenticationService.login(username, password)
                            .then(
                                user => {
                                    const { from } = this.props.location.state || { from: { pathname: "/" } };
                                    this.props.history.push(from);
                                },
                                error => {
                                    setSubmitting(false);
                                    setStatus(error);
                                }
                            );
                        
                    }}
                    render={({ errors, status, touched, isSubmitting , setFieldValue }) => (
                        <div style={{ backgroundColor : 'transparent', display: 'flex', flex: 1, flexDirection: 'column', alignSelf: 'stretch', alignItems: 'center', justifyContent: 'center' }}>
                        <Form>
                            <div style={{ backgroundColor : 'brown', width: '100vw', minHeight: '65vh', display: 'flex', flex: 1, flexDirection: 'column', alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }}>    
                                <div style={{ backgroundColor: 'pink', display: "flex", flex : 1/5, minWidth: '100vw', minHeight: '10vh', maxHeight: '10vh', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'  }}>
                                </div>
                                <div style={{ backgroundColor: 'yellow', display: "flex", flex : 1/5, minHeight: '20vh', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                                    <div style={{ backgroundColor: 'blue', display: 'flex', flex : 1/2, justifyContent: 'center', alignItems: 'center', minWidth: '45vw', minHeight: '10vh', maxHeight: '10vh' }}>
                                        <label htmlFor="username"></label>
                                        <Field name="username" type="text" onClick={(values)=>{setFieldValue('username', '')}} style={{ backgroundColor: 'white', width: '25vw', height: '7.5vh', display: "flex", flex : 1, alignSelf: 'center', fontSize: '2vw' }}/>
                                    </div>
                                    <div style={{backgroundColor: 'green', display: 'flex', flex : 1/2, justifyContent: 'center' , alignItems: 'center', minWidth: '25vw', minHeight: '10vh', maxHeight: '10vh' }}>
                                        <ErrorMessage name="username" component="div" style={{ display: 'flex' , flex : 1 , justifyContent: 'center', alignItems: 'center', color: 'red', fontSize: '2vw' }} />
                                    </div>
                                </div>
                                <div style={{ backgroundColor: 'transparet', minHeight: '20vh', maxHeight: '20vh', display: "flex", flex : 1/5, flexDirection: 'column', alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}>
                                    <div style={{  display: 'flex', flex : 1/2, justifyContent: 'center', minWidth: '45vw', minHeight: '10vh', maxHeight: '10vh', justifyContent: 'center', alignItems: 'center' }}>
                                        <label htmlFor="password"></label>
                                        <Field name="password" type="password" onClick={(values)=>{setFieldValue('password', '')}} style={{ backgroundColor: 'white', width: '25vw', height: '8vh', display: "flex", flex : 1 }} />
                                    </div>
                                    <div style={{ display: 'flex', flex : 1/2, justifyContent: 'center', minWidth: '25vw', minHeight: '10vh', maxHeight: '10vh', alignItems: 'center' }}>
                                        <ErrorMessage name="password" component="div" className="invalid-feedback" style={{ display: 'flex' ,flex : 1 , width: '25vw', height: '5vh', justifyContent: 'center', alignItems: 'center', color: 'red', fontSize: '2vw' }}/>
                                    </div>
                                    
                                </div>
                                <div style={{ backgroundColor: 'white', minHeight: '5vh', display: "flex", flex : 1/5, justifyContent: 'center', alignItems: 'center' }}>
                                    <button type="submit" className="btn btn-light hovact" style={buttonSignIn} disabled={isSubmitting}>Ingresar</button>
                                </div>
                                {status &&  <div>{status}</div>}
                                </div>
                                <div style={{ backgroundColor: 'pink', display: "flex", flex : 1/5, minWidth: '100vw', minHeight: '10vh', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'  }}>
                            </div>
                        </Form>
                        </div>
                    )}
                    />
                </div>
                <div style={{ backgroundColor: 'yellow', width: '100vw', height: '5vh', display: 'flex', flex: 0.5/10, alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                </div>
            </div>
        )
    }
}

export { Login };


