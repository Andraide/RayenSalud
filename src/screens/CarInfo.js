const getLogger = require('webpack-log');
const log = getLogger({ name: 'About logs' });

import React from 'react'
import { Dimensions } from "../statics"
//import { history} from '@/statics'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import { authenticationService, formService } from '@/services'
import * as Yup from 'yup'
import Style from 'style-it';


class CarInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  
            width: window.innerWidth, height: 
            window.innerHeight,
            maxHeight: window.visualViewport.height,
            maxWidth: window.visualViewport.width,
            year: null,
            plate: null,
            carType: null,
            isSet: false
        };
        this.Dimensions = Dimensions.bind(this)

    }
    
    componentDidMount()
    {
        window.addEventListener('resize', this.Dimensions);

        this.subscription = formService.currentCarData.subscribe( ({ year, plate, carType }) => {
            if(year && plate && carType)
            {
                this.setState({ year, plate, carType, isSet: true })
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

        const { isSet } = this.state;

        const buttonSignIn = {

            backgroundImage: "linear-gradient(#00b8ff, #00719c)" ,
            borderColor: "transparent",
            borderRadius: '6px',
            width: '15vw', 
            height: '10vh'         
        }


        const title = {
            fontSize: "5vw",
            color: 'blue',
            backgroundColor: 'transparent'
        }

        

        const validationSchema = Yup.object().shape({
                                        year: Yup.string()
                                                    .required('Username is required')
                                                    .test('initials', 'Ingrese usuario', function(year){
                                                        if(year == 'Ingrese su usuario')
                                                        {
                                                            return false;
                                                        }else {
                                                            return true;
                                                        }
                                                    }),
                                        plate: Yup.string()
                                                    .required('Password is required')
                                                    .min(4 , 'La contraseña debe tener minimo 4 caracteres')
                                                    .test('initials', 'Ingrese clave', function(plate){
                                                        if(plate == 'Ingrese su clave')
                                                        {
                                                            return false;
                                                        }else {
                                                            return true;
                                                        }
                                                    }),
                                        carType: Yup.string()
                                                    .required('Car type is required')
                                                    .test('initials', 'Seleccione tipo de vehiculo', function(carType){
                                                        if(carType == 'Seleccione tipo de vehiculo')
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
                <div style={{ backgroundColor: 'transparent', width: '100vw', height: '15vh', display: 'flex', flex: 1.5/10, alignSelf: 'center', justifyContent: 'center', alignItems: 'center', borderStyle: 'solid', borderWidth: '10px', borderColor: '#000000' }}>
                    <h2 style={title}>Ingrese los datos de su vehiculo</h2> 
                </div>
                <div style={{ backgroundColor: 'transparent', width: '100vw', minHeight: '5vh', display: 'flex', flex: 0.5/10, alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}>
                </div>
                <div style={{ backgroundColor: 'transparent', width: '100vw', height: '65vh', minHeight: '65vh', maxHeight: '65vh', display: 'flex', flex: 6.5/10, alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Formik
                    initialValues={{
                        year: this.state.year || '',
                        plate: this.state.plate || '',
                        carType: this.state.carType || 'Seleccione tipo de vehiculo'
                    }}
                    isInitialValid = {() => (validationSchema ? validationSchema.isValidSync({ user : '' , telefono : '' }) : true  )}
                    validationSchema={validationSchema}
                    validateOnMount={true}
                    validateOnBlur={false}
                    enableReinitialize={true}
                    onSubmit={({ year, plate, carType }, { setStatus, setSubmitting }) => {
                        setStatus();
                        formService.setCarData(year, plate, carType)
                            .then( ()  => {
                                this.props.history.push("/CarPhotos");
                            }).catch( ({ error }) => {
                                console.log("Error")
                                setSubmitting(false);
                                setStatus(error);
                            });
                        
                    }}
                    render={({ errors, status, isValid, touched, isSubmitting , setFieldValue, values, handleChange, handleBlur }) => (
                        <div style={{ backgroundColor : 'transparent', display: 'flex', flex: 1, flexDirection: 'column', alignSelf: 'stretch', alignItems: 'center', justifyContent: 'center' }}>
                        <Form>
                            <div style={{ backgroundColor : 'transparent', width: '100vw', minHeight: '75vh', display: 'flex', flex: 1, flexDirection: 'column', alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }}>    
                                <div style={{ backgroundColor: 'transparent', display: "flex", flex : 1/5, minWidth: '100vw', minHeight: '10vh', maxHeight: '10vh', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'  }}>
                                </div>
                                <div style={{ backgroundColor: 'transparent', display: "flex", flex : 1/5, minHeight: '20vh', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                                    <div style={{ backgroundColor: 'transparent', display: 'flex', flex : 1/2, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minWidth: '45vw', minHeight: '10vh', maxHeight: '10vh' }}>
                                        <div style={{ flex: 1/2, justifyContent: 'center', alignItems: 'center' }}>
                                            <label htmlFor="carType">Tipo de automovil:</label>
                                        </div>
                                        <div style={{ flex: 1/2, justifyContent: 'center', alignItems: 'center' }}>
                                            <Field as="select" name="carType" style={{ backgroundColor: 'white', width: '25vw', height: '5.5vh', display: "flex", flex : 1, alignSelf: 'center', borderRadius: '6px', fontSize: '2vw', color: '#000000', justifyContent: 'center' }}>
                                                <option value="Seleccione tipo de vehiculo">Seleccione</option>
                                                <option value="City car">City car</option>
                                                <option value="Camioneta">Camioneta</option>
                                                <option value="SUV">SUV</option>    
                                            </Field>
                                        </div>
                                    </div>
                                    <div style={{backgroundColor: 'transparent', display: 'flex', flex : 1/2, justifyContent: 'center' , alignItems: 'center', minWidth: '25vw', minHeight: '10vh', maxHeight: '10vh' }}>
                                        {errors && <ErrorMessage name="carType" component="div" style={{ display: 'flex' , flex : 1 , justifyContent: 'center', alignItems: 'center', color: 'red', fontSize: '2vw' }} />}
                                    </div>
                                </div>
                                <div style={{ backgroundColor: 'transparent', display: "flex", flex : 1/5, minHeight: '20vh', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                                    <div style={{ backgroundColor: 'transparent', display: 'flex', flex : 1/2, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minWidth: '45vw', minHeight: '10vh', maxHeight: '10vh' }}>
                                        <div style={{ flex: 1/2, justifyContent:'center', alignItems:'center' }}>
                                            <label htmlFor="year">Año</label>
                                        </div>
                                        <div style={{ flex: 1/2, justifyContent:'center', alignItems:'center' }}>
                                            <Field name="year" type="text" onClick={(values)=>{ setFieldValue('year', '')}} style={{ backgroundColor: 'white', width: '25vw', height: '7.5vh', display: "flex", flex : 1, alignSelf: 'center', borderRadius: '6px', fontSize: '2vw', alignItems: 'center', textAlign: 'center', color: '#000000' }}/>
                                        </div>
                                    </div>
                                    <div style={{backgroundColor: 'transparent', display: 'flex', flex : 1/2, justifyContent: 'center' , alignItems: 'center', minWidth: '25vw', minHeight: '10vh', maxHeight: '10vh' }}>
                                        {errors && <ErrorMessage name="year" component="div" style={{ display: 'flex' , flex : 1 , justifyContent: 'center', alignItems: 'center', color: 'red', fontSize: '2vw' }} />}
                                    </div>
                                </div>
                                <div style={{ backgroundColor: 'transparet', minHeight: '20vh', maxHeight: '20vh', display: "flex", flex : 1/5, flexDirection: 'column', alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}>
                                    <div style={{  display: 'flex', flex : 1/2, flexDirection:'column', justifyContent: 'center', minWidth: '45vw', minHeight: '10vh', maxHeight: '10vh', justifyContent: 'center', alignItems: 'center' }}>
                                        <div style={{ flex: 1/2, justifyContent:'center', alignItems:'center' }}>
                                            <label htmlFor="plate">Patente</label>
                                        </div>
                                        <div style={{ flex: 1/2, justifyContent:'center', alignItems:'center' }}>
                                            <Field name="plate" type="plate" onClick={(values)=>{setFieldValue('plate', '')}} style={{ backgroundColor: 'white', width: '25vw', height: '8vh', display: "flex", flex : 1, borderRadius: '6px', fontSize: '2vw', textAlign: 'center', color: '#000000' }} />
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', flex : 1/2, justifyContent: 'center', minWidth: '25vw', minHeight: '10vh', maxHeight: '10vh', alignItems: 'center' }}>
                                        <ErrorMessage name="plate" component="div" className="invalid-feedback" style={{ display: 'flex' ,flex : 1 , width: '25vw', height: '5vh', justifyContent: 'center', alignItems: 'center', color: 'red', fontSize: '2vw' }}/>
                                    </div>
                                    
                                </div>
                                <div style={{ backgroundColor: 'white', minHeight: '5vh', display: "flex", flex : 1/5, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <div style={{ flex: 1/3, justifyContent: 'center' }}>
                                        <button type="button" onClick={() => {this.props.history.goBack()}} className="btn btn-light hovact" style={buttonSignIn} >Anterior</button>
                                    </div>
                                    <div style={{ flex: 1/3, width: '2vw' }}>
                                    </div>
                                    <div style={{ flex: 1/3, justifyContent: 'center' }}>
                                        <button type="submit" className="btn btn-light hovact" style={buttonSignIn} disabled={ isSet ? false : !isValid || isSubmitting }><span style={{ color : (!isSet && (!isValid || isSubmitting)) ? 'grey' : 'white' }}>Siguiente</span></button>
                                    </div>
                                </div>
                                {status &&  <div>{status}</div>}
                                </div>
                                <div style={{ backgroundColor: 'transparent', display: "flex", flex : 1/5, minWidth: '100vw', minHeight: '10vh', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'  }}></div>
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

export { CarInfo };


