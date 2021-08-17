const getLogger = require('webpack-log');
const log = getLogger({ name: 'About logs' });

import React from 'react'
import { Dimensions, userContext } from "../statics"
//import { history} from '@/statics'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import { authenticationService,  formService } from '@/services'
import * as Yup from 'yup'
import Style from 'style-it';


class UserInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  width: window.innerWidth, height: 
                        window.innerHeight,
                        maxHeight: window.visualViewport.height,
                        maxWidth: window.visualViewport.width,
                        user: new URLSearchParams(this.props.location.search).get("user"),
                        name: null,
                        phone: null,
                        isSet: false
                     };
        this.Dimensions = Dimensions.bind(this)

    }
    
    componentDidMount()
    {
        window.addEventListener('resize', this.Dimensions);

        this.subscription = formService.currentUserData.subscribe( ({ name, phone }) => {
            console.log("Observable", name, phone)
            if(name && phone)
            {
                this.setState({ name, phone, isSet: true })
            }
        })
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

    

    render() {


        const { isSet } = this.state
        console.log("IsSet", isSet)
 
        const buttonSignIn = {

            backgroundImage: "linear-gradient(#00b8ff, #00719c)" ,
            borderColor: "transparent",
            borderRadius: '6px',
            width: '35vw', 
            height: '10vh'         
        }


        const title = {
            fontSize: "5vw",
            color: 'blue',
            backgroundColor: 'transparent',
        }

        

        const validationSchema = Yup.object().shape({
                                        name: Yup.string()
                                                    .required('Username is required')
                                                    .test('initials', 'Ingrese usuario', function(name){
                                                        if(name == 'Ingrese su nombre complete')
                                                        {
                                                            return false;
                                                        }else {
                                                            return true;
                                                        }
                                                    }),
                                        telefono: Yup.string()
                                                    .required('Password is required')
                                                    .min(4 , 'La contraseña debe tener minimo 4 caracteres')
                                                    .test('initials', 'Ingrese clave', function(telefono){
                                                        if(telefono == 'Ingrese su telefono')
                                                        {
                                                            return false;
                                                        }else {
                                                            return true;
                                                        }
                                                    })
                                 })

        return ( 
            <userContext.Provider value={this.state.user}>
                <div style={{ backgroundColor: '#FFFFFF', width: '100vw', height: '100vh', display: 'flex', flexDirection : 'column', flex: '1 0.1 auto', alignItems : 'center' }}>
                    <div style={{ backgroundColor: 'transparent', width: '100vw', minHeight: '10vh', display: 'flex', flex: '1/10 0.1 auto', alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}>
                    </div>
                    <div style={{ backgroundColor: 'transparent', width: '100vw', height: '15vh', display: 'flex', flex: "1.5/10 0.1 auto", alignSelf: 'center', justifyContent: 'center', alignItems: 'center', borderStyle: 'solid', borderTopWidth: '10px', borderBottomWidth: '10px', borderColor: '#000000' }}>
                        <h2 style={title}>Ingrese sus datos</h2> 
                    </div>
                    <div style={{ backgroundColor: 'transparent', width: '100vw', minHeight: '5vh', display: 'flex', flex: "0.5/10 0.1 auto", alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}>
                    </div>
                    <div style={{ backgroundColor: 'transparent', width: '100vw', height: '65vh', minHeight: '65vh', maxHeight: '65vh', display: 'flex', flex: "6.5/10 0.1 auto", alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <Formik
                        initialValues={{
                            name: this.state.name || 'Ingrese su nombre completo',
                            telefono: this.state.phone || 'Ingrese su telefono'
                        }}
                        isInitialValid = {() => (validationSchema ? validationSchema.isValidSync({ user : '' , telefono : '' }) : true  )}
                        validationSchema={validationSchema}
                        validateOnMount={true}
                        validateOnBlur={false}
                        enableReinitialize={true}
                        onSubmit={({ name, telefono, phone }, { setStatus, setSubmitting }) => {
                            setStatus();
                            formService.setUserData(name, telefono)
                                .then( ()  => {
                                    console.log("Saved to memory", phone)
                                    this.props.history.push("/CarInformation");
                                }).catch( error  => {
                                    console.log("Error", error)
                                    setSubmitting(false);
                                    setStatus(error);
                                });
                            
                        }}
                        render={({ errors, status, isValid, touched, isSubmitting , setFieldValue, handleChange, values }) => (
                            <div style={{ backgroundColor : 'transparent', display: 'flex', flex: "1 0.1 auto", flexDirection: 'column', alignSelf: 'stretch', alignItems: 'center', justifyContent: 'center' }}>
                            <Form>
                                <div style={{ backgroundColor : 'transparent', width: '100vw', minHeight: '65vh', display: 'flex', flex: "1 0.1 auto", flexDirection: 'column', alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }}>    
                                    <div style={{ backgroundColor: 'transparent', display: "flex", flex : 1/5, minWidth: '100vw', minHeight: '10vh', maxHeight: '10vh', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'  }}>
                                    </div>
                                    <div style={{ backgroundColor: 'transparent', display: "flex", flex : 1/5, minHeight: '20vh', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                                        <div style={{ backgroundColor: 'transparent', display: 'flex', flex : 1/2, justifyContent: 'center', alignItems: 'center', minWidth: '45vw', minHeight: '10vh', maxHeight: '10vh' }}>
                                            <label htmlFor="name"></label>
                                            <Field name="name" type="text" onClick={(values)=>{ setFieldValue('name', '')}} style={{ backgroundColor: 'white', width: '25vw', height: '7.5vh', display: "flex", flex : 1, alignSelf: 'center', borderRadius: '6px', fontSize: '2vw', color: '#000000' }}/>
                                        </div>
                                        <div style={{backgroundColor: 'transparent', display: 'flex', flex : 1/2, justifyContent: 'center' , alignItems: 'center', minWidth: '25vw', minHeight: '10vh', maxHeight: '10vh' }}>
                                            {errors && <ErrorMessage name="name" component="div" style={{ display: 'flex' , flex : 1 , justifyContent: 'center', alignItems: 'center', color: 'red', fontSize: '2vw' }} />}
                                        </div>
                                    </div>
                                    <div style={{ backgroundColor: 'transparet', minHeight: '20vh', maxHeight: '20vh', display: "flex", flex : 1/5, flexDirection: 'column', alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}>
                                        <div style={{  display: 'flex', flex : 1/2, justifyContent: 'center', minWidth: '45vw', minHeight: '10vh', maxHeight: '10vh', justifyContent: 'center', alignItems: 'center' }}>
                                            <label htmlFor="telefono"></label>
                                            <Field name="telefono" type="telefono" onClick={(values)=>{setFieldValue('telefono', '')}} style={{ backgroundColor: 'white', width: '25vw', height: '8vh', display: "flex", flex : 1, borderRadius: '6px', fontSize: '2vw', color: '#000000' }} />
                                        </div>
                                        <div style={{ display: 'flex', flex : 1/2, justifyContent: 'center', minWidth: '25vw', minHeight: '10vh', maxHeight: '10vh', alignItems: 'center' }}>
                                            <ErrorMessage name="telefono" component="div" className="invalid-feedback" style={{ display: 'flex' ,flex : 1 , width: '25vw', height: '5vh', justifyContent: 'center', alignItems: 'center', color: 'red', fontSize: '2vw' }}/>
                                        </div>
                                        
                                    </div>
                                    <div style={{ backgroundColor: 'white', minHeight: '5vh', display: "flex", flex : 1/5, justifyContent: 'center', alignItems: 'center' }}>
                                        <button type="submit" className="btn btn-light hovact" style={buttonSignIn} disabled={ isSet ? false : !isValid || isSubmitting }><span style={{ color: (isSet ? false : !isValid || isSubmitting ) ? 'grey' : 'white' }}>Siguiente</span></button>
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
            </userContext.Provider>
        )
    }
}

export { UserInfo };


