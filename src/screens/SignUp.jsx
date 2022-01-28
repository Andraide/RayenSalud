const getLogger = require('webpack-log');
const log = getLogger({ name: 'About logs' });

import React from 'react'
import { Dimensions } from "../statics"
//import { history} from '@/statics'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import { authenticationService } from '@/services'
import * as Yup from 'yup'
import Style from 'style-it';
import { Link } from "react-router-dom";

class SignUp extends React.Component {
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
            width: '25vw', 
            height: '5vh'         
        }

        const buttonSignUp = {

            borderRadius: "14px",
            marginLeft: "2vh" ,
            backgroundImage: "linear-gradient( #00b8ff , #00719c)" ,
            borderColor: "transparent",
        }

        const title = {
            fontSize: "4vw",
            color: 'black',
            backgroundColor: 'transparent',
        }

        const subtitle = {
            fontSize: "3vw"
        }

        const validationSchema = Yup.object().shape({
                                        username: Yup.string()
                                                    .required('Usuario es requerido')
                                                    .test('initials', 'Ingrese usuario', function(username){
                                                        if(username == 'Ingrese su usuario')
                                                        {
                                                            return false;
                                                        }else {
                                                            return true;
                                                        }
                                                    }),
                                        email: Yup.string()
                                                    .required('Email es requerido')
                                                    .test('initials', 'Ingrese usuario', function(username){
                                                        if(username == 'Ingrese su usuario')
                                                        {
                                                            return false;
                                                        }else {
                                                            return true;
                                                        }
                                                    }),
                                        bio: Yup.string()
                                                    .required('Bio es requerida')
                                                    .test('initials', 'Ingrese usuario', function(username){
                                                        if(username == 'Ingrese su usuario')
                                                        {
                                                            return false;
                                                        }else {
                                                            return true;
                                                        }
                                                    }),
                                        name: Yup.string()
                                                    .required('Su nombre es requerido')
                                                    .test('initials', 'Ingrese usuario', function(username){
                                                        if(username == 'Ingrese su usuario')
                                                        {
                                                            return false;
                                                        }else {
                                                            return true;
                                                        }
                                                    }),
                                        password: Yup.string()
                                                    .required('La contraseña es requerida')
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
            <div style={{ backgroundColor: '#f8fafc', width: '100vw', height: '100vh', display: 'flex', flexDirection : 'column', flex: '1 1 auto', alignItems : 'center', justifyContent:'center' }}>
                <div style={{ width: '50vw', height: '70vh', backgroundColor: '#ecf0f3', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', flex: '0.7 0.7 auto' }}>
                    <div style={{ backgroundColor: 'transparent', width: '50vw', height: '15vh', display: 'flex', flex: 0.2, alignItems: 'center', justifyContent: 'center', alignItems: 'center' }}>
                        <h2 style={title}>Desafiogram</h2> 
                    </div>
                    
                    <div style={{ backgroundColor: 'transparent', width: '50vw', height: '100vh', minHeight: '65vh', maxHeight: '65vh', display: 'flex', flex: 0.8, alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <Formik
                        initialValues={{
                            username: 'Ingrese su usuario',
                            name: 'Ingrese su nombre',
                            email: 'Ingrese su email',
                            bio: 'Ingresa tu bio',
                            password: 'Ingrese su clave'
                        }}
                        isInitialValid = {() => (validationSchema ? validationSchema.isValidSync({ user : '' , password : '' }) : true  )}
                        validationSchema={validationSchema}
                        validateOnMount={true}
                        validateOnBlur={false}
                        enableReinitialize={true}
                        onSubmit={({ username, password, name, bio, email }, { setStatus, setSubmitting }) => {
                            setStatus();
                            authenticationService.signUp(username, password, email, name, bio)
                                .then( ({ user })  => {
                                    this.props.history.push({ pathname: "/", search: '?user='+username });
                                }).catch( ({ error }) => {
                                    console.log("Error")
                                    setSubmitting(false);
                                    setStatus(error);
                                });
                            
                        }}
                        render={({ errors, status, isValid, touched, isSubmitting , setFieldValue }) => (
                            <div style={{ backgroundColor : 'transparent', display: 'flex', flex: 1, flexDirection: 'column', alignSelf: 'stretch', alignItems: 'center', justifyContent: 'center' }}>
                            <Form>
                                <div style={{ backgroundColor : 'transparent', width: '100vw', minHeight: '65vh', maxHeight: '65vh', display: 'flex', flex: 1, flexDirection: 'column', alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }}>    
                                    
                                    <div style={{ backgroundColor: 'transparent', display: "flex", flex : 1/7, minHeight: '10vh', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                                        <div style={{ backgroundColor: 'transparent', display: 'flex', flex : 1/2, justifyContent: 'center', alignItems: 'center', minWidth: '45vw', minHeight: '10vh', maxHeight: '10vh' }}>
                                            <label htmlFor="username"></label>
                                            <Field name="username" type="text" onClick={(values)=>{ setFieldValue('username', '')}} style={{ backgroundColor: 'white', width: '25vw', height: '7.5vh', display: "flex", flex : 1, alignSelf: 'center', borderRadius: '6px', fontSize: '2vw', color: '#000000' }}/>
                                        </div>
                                        <div style={{backgroundColor: 'transparent', display: 'flex', flex : 1/2, justifyContent: 'center' , alignItems: 'center', minWidth: '25vw', minHeight: '5vh', maxHeight: '5vh' }}>
                                            {errors && <ErrorMessage name="username" component="div" style={{ display: 'flex' , flex : 1 , justifyContent: 'center', alignItems: 'center', color: 'red', fontSize: '1vw', marginBottom: '1vh' }} />}
                                        </div>
                                    </div>
                                    <div style={{ backgroundColor: 'transparent', display: "flex", flex : 1/7, minHeight: '10vh', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                                        <div style={{ backgroundColor: 'transparent', display: 'flex', flex : 1/2, justifyContent: 'center', alignItems: 'center', minWidth: '45vw', minHeight: '10vh', maxHeight: '10vh' }}>
                                            <label htmlFor="email"></label>
                                            <Field name="email" type="text" onClick={(values)=>{ setFieldValue('email', '')}} style={{ backgroundColor: 'white', width: '25vw', height: '7.5vh', display: "flex", flex : 1, alignSelf: 'center', borderRadius: '6px', fontSize: '2vw', color: '#000000' }}/>
                                        </div>
                                        <div style={{backgroundColor: 'transparent', display: 'flex', flex : 1/2, justifyContent: 'center' , alignItems: 'center', minWidth: '25vw', minHeight: '5vh', maxHeight: '5vh' }}>
                                            {errors && <ErrorMessage name="email" component="div" style={{ display: 'flex' , flex : 1 , justifyContent: 'center', alignItems: 'center', color: 'red', fontSize: '1vw', marginBottom: '1vh' }} />}
                                        </div>
                                    </div>
                                    <div style={{ backgroundColor: 'transparent', display: "flex", flex : 1/7, minHeight: '10vh', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                                        <div style={{ backgroundColor: 'transparent', display: 'flex', flex : 1/2, justifyContent: 'center', alignItems: 'center', minWidth: '45vw', minHeight: '10vh', maxHeight: '10vh' }}>
                                            <label htmlFor="bio"></label>
                                            <Field name="bio" type="text" onClick={(values)=>{ setFieldValue('bio', '')}} style={{ backgroundColor: 'white', width: '25vw', height: '7.5vh', display: "flex", flex : 1, alignSelf: 'center', borderRadius: '6px', fontSize: '2vw', color: '#000000' }}/>
                                        </div>
                                        <div style={{backgroundColor: 'transparent', display: 'flex', flex : 1/2, justifyContent: 'center' , alignItems: 'center', minWidth: '25vw', minHeight: '5vh', maxHeight: '5vh' }}>
                                            {errors && <ErrorMessage name="bio" component="div" style={{ display: 'flex' , flex : 1 , justifyContent: 'center', alignItems: 'center', color: 'red', fontSize: '1vw', marginBottom: '1vh' }} />}
                                        </div>
                                    </div>

                                    <div style={{ backgroundColor: 'transparent', display: "flex", flex : 1/7, minHeight: '10vh', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                                        <div style={{ backgroundColor: 'transparent', display: 'flex', flex : 1/2, justifyContent: 'center', alignItems: 'center', minWidth: '45vw', minHeight: '10vh', maxHeight: '10vh' }}>
                                            <label htmlFor="name"></label>
                                            <Field name="name" type="text" onClick={(values)=>{ setFieldValue('name', '')}} style={{ backgroundColor: 'white', width: '25vw', height: '7.5vh', display: "flex", flex : 1, alignSelf: 'center', borderRadius: '6px', fontSize: '2vw', color: '#000000' }}/>
                                        </div>
                                        <div style={{backgroundColor: 'transparent', display: 'flex', flex : 1/2, justifyContent: 'center' , alignItems: 'center', minWidth: '25vw', minHeight: '5vh', maxHeight: '5vh' }}>
                                            {errors && <ErrorMessage name="name" component="div" style={{ display: 'flex' , flex : 1 , justifyContent: 'center', alignItems: 'center', color: 'red', fontSize: '1vw', marginBottom: '1vh'}} />}
                                        </div>
                                    </div>
                                    <div style={{ backgroundColor: 'transparet', minHeight: '10vh', maxHeight: '20vh', display: "flex", flex : 1/7, flexDirection: 'column', alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}>
                                        <div style={{  display: 'flex', flex : 1/2, justifyContent: 'center', minWidth: '45vw', minHeight: '10vh', maxHeight: '10vh', justifyContent: 'center', alignItems: 'center' }}>
                                            <label htmlFor="password"></label>
                                            <Field name="password" type="password" onClick={(values)=>{setFieldValue('password', '')}} style={{ backgroundColor: 'white', width: '25vw', height: '8vh', display: "flex", flex : 1, borderRadius: '6px', fontSize: '1vw', color: '#000000' }} />
                                        </div>
                                        <div style={{ display: 'flex', flex : 1/2, justifyContent: 'center', minWidth: '25vw', minHeight: '5vh', maxHeight: '5vh', alignItems: 'center' }}>
                                            <ErrorMessage name="password" component="div" className="invalid-feedback" style={{ display: 'flex' ,flex : 1 , width: '25vw', height: '5vh', justifyContent: 'center', alignItems: 'center', color: 'red', fontSize: '1vw', marginBottom: '1vh' }}/>
                                        </div>
                                        
                                    </div>
                                    <div style={{ backgroundColor: 'white', minHeight: '5vh', maxHeight: '5vh', display: "flex", borderTop: '10vh', flex : 1/7, justifyContent: 'center', alignItems: 'center' }}>
                                        <button type="submit"  style={buttonSignIn} disabled={!isValid || isSubmitting} ><span style={{ color: (!isValid || isSubmitting) ? 'grey' : 'white' }}>Ingresar</span></button>
                                    </div>
                                    {status &&  <div>{status}</div>}
                                </div>
                            </Form>
                            </div>
                        )}
                        />
                    </div>
                    <div style={{ backgroundColor: 'transparent', width: '50vw', height: '5vh', display: 'flex', flex: 0.5/10, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <div style={{ display: 'flex', flex: 0.2, alignItems: 'center', justifyContent: 'center' }}>
                            <p style={{ marginTop: '2vh'}}>Ya tienes cuenta ?</p>
                        </div>
                        <div style={{ display: 'flex', flex: 0.1, alignItems: 'center', justifyContent: 'center'}}>
                            <Link to='/'>OnSignUp</Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export { SignUp };


