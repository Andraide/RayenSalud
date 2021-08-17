const getLogger = require('webpack-log');
const log = getLogger({ name: 'About logs' });

import React from 'react'
import { Dimensions } from "../statics"
//import { history} from '@/statics'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import { authenticationService } from '@/services'
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
            borderRadius: '6px',
            width: '35vw', 
            height: '10vh'         
        }

        const buttonSignUp = {

            borderRadius: "14px",
            marginLeft: "2vh" ,
            backgroundImage: "linear-gradient( #00b8ff , #00719c)" ,
            borderColor: "transparent",
        }

        const title = {
            fontSize: "5vw",
            color: 'blue',
            backgroundColor: 'transparent'
        }

        const subtitle = {
            fontSize: "3vw"
        }

        const validationSchema = Yup.object().shape({
                                        username: Yup.string()
                                                    .required('Username is required')
                                                    .test('initials', 'Ingrese usuario', function(username){
                                                        if(username == 'Ingrese su usuario')
                                                        {
                                                            return false;
                                                        }else {
                                                            return true;
                                                        }
                                                    }),
                                        password: Yup.string()
                                                    .required('Password is required')
                                                    .min(4 , 'La contraseña debe tener minimo 4 caracteres')
                                                    .test('initials', 'Ingrese clave', function(password){
                                                        if(password == 'Ingrese su clave')
                                                        {
                                                            return false;
                                                        }else {
                                                            return true;
                                                        }
                                                    })
                                 })

        return ( 
            <div style={{ backgroundColor: '#FFFFFF', width: '100vw', height: '100vh', display: 'flex', flexDirection : 'column', flex: '1 1 auto', alignItems : 'center' }}>
                <div style={{ backgroundColor: 'transparent', width: '100vw', minHeight: '10vh', display: 'flex', flex: 1/10, alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}>
                </div>
                <div style={{ backgroundColor: 'red', width: '100vw', height: '15vh', display: 'flex', flex: 1.5/10, alignSelf: 'center', justifyContent: 'center', alignItems: 'center', borderStyle: 'solid', borderTopWidth: '10px', borderBottomWidth: '10px', borderColor: '#000000' }}>
                    <h2 style={title}>XCARS</h2> 
                </div>
                <div style={{ backgroundColor: 'transparent', width: '100vw', minHeight: '5vh', display: 'flex', flex: 0.5/10, alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}>
                </div>
                <div style={{ backgroundColor: 'transparent', width: '100vw', height: '65vh', minHeight: '65vh', maxHeight: '65vh', display: 'flex', flex: 6.5/10, alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Formik
                    initialValues={{
                        username: 'Ingrese su usuario',
                        password: 'Ingrese su clave'
                    }}
                    isInitialValid = {() => (validationSchema ? validationSchema.isValidSync({ user : '' , password : '' }) : true  )}
                    validationSchema={validationSchema}
                    validateOnMount={true}
                    validateOnBlur={false}
                    enableReinitialize={true}
                    onSubmit={({ username, password }, { setStatus, setSubmitting }) => {
                        setStatus();
                        authenticationService.login(username, password)
                            .then( ({ user })  => {
                                this.props.history.push({ pathname: "/UserInformation", search: '?user='+username });
                            }).catch( ({ error }) => {
                                console.log("Error")
                                setSubmitting(false);
                                setStatus(error);
                            });
                        
                    }}
                    render={({ errors, status, isValid, touched, isSubmitting , setFieldValue }) => (
                        <div style={{ backgroundColor : 'transparent', display: 'flex', flex: 1, flexDirection: 'column', alignSelf: 'stretch', alignItems: 'center', justifyContent: 'center' }}>
                        <Form>
                            <div style={{ backgroundColor : 'transparent', width: '100vw', minHeight: '65vh', display: 'flex', flex: 1, flexDirection: 'column', alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }}>    
                                <div style={{ backgroundColor: 'transparent', display: "flex", flex : 1/5, minWidth: '100vw', minHeight: '10vh', maxHeight: '10vh', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'  }}>
                                </div>
                                <div style={{ backgroundColor: 'transparent', display: "flex", flex : 1/5, minHeight: '20vh', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                                    <div style={{ backgroundColor: 'transparent', display: 'flex', flex : 1/2, justifyContent: 'center', alignItems: 'center', minWidth: '45vw', minHeight: '10vh', maxHeight: '10vh' }}>
                                        <label htmlFor="username"></label>
                                        <Field name="username" type="text" onClick={(values)=>{ setFieldValue('username', '')}} style={{ backgroundColor: 'white', width: '25vw', height: '7.5vh', display: "flex", flex : 1, alignSelf: 'center', borderRadius: '6px', fontSize: '2vw', color: '#000000' }}/>
                                    </div>
                                    <div style={{backgroundColor: 'transparent', display: 'flex', flex : 1/2, justifyContent: 'center' , alignItems: 'center', minWidth: '25vw', minHeight: '10vh', maxHeight: '10vh' }}>
                                        {errors && <ErrorMessage name="username" component="div" style={{ display: 'flex' , flex : 1 , justifyContent: 'center', alignItems: 'center', color: 'red', fontSize: '2vw' }} />}
                                    </div>
                                </div>
                                <div style={{ backgroundColor: 'transparet', minHeight: '20vh', maxHeight: '20vh', display: "flex", flex : 1/5, flexDirection: 'column', alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}>
                                    <div style={{  display: 'flex', flex : 1/2, justifyContent: 'center', minWidth: '45vw', minHeight: '10vh', maxHeight: '10vh', justifyContent: 'center', alignItems: 'center' }}>
                                        <label htmlFor="password"></label>
                                        <Field name="password" type="password" onClick={(values)=>{setFieldValue('password', '')}} style={{ backgroundColor: 'white', width: '25vw', height: '8vh', display: "flex", flex : 1, borderRadius: '6px', fontSize: '2vw', color: '#000000' }} />
                                    </div>
                                    <div style={{ display: 'flex', flex : 1/2, justifyContent: 'center', minWidth: '25vw', minHeight: '10vh', maxHeight: '10vh', alignItems: 'center' }}>
                                        <ErrorMessage name="password" component="div" className="invalid-feedback" style={{ display: 'flex' ,flex : 1 , width: '25vw', height: '5vh', justifyContent: 'center', alignItems: 'center', color: 'red', fontSize: '2vw' }}/>
                                    </div>
                                    
                                </div>
                                <div style={{ backgroundColor: 'white', minHeight: '5vh', display: "flex", flex : 1/5, justifyContent: 'center', alignItems: 'center' }}>
                                    <button type="submit" className="btn btn-light hovact" style={buttonSignIn} disabled={!isValid || isSubmitting} ><span style={{ color: (!isValid || isSubmitting) ? 'grey' : 'white' }}>Ingresar</span></button>
                                </div>
                                {status &&  <div>{status}</div>}
                                </div>
                                <div style={{ backgroundColor: 'transparent', display: "flex", flex : 1/5, minWidth: '100vw', minHeight: '10vh', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'  }}>
                            </div>
                        </Form>
                        </div>
                    )}
                    />
                </div>
                <div style={{ backgroundColor: 'transparent', width: '100vw', height: '5vh', display: 'flex', flex: 0.5/10, alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                </div>
            </div>
        )
    }
}

export { Login };


