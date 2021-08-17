const getLogger = require('webpack-log');
const log = getLogger({ name: 'About logs' });

import React from 'react'
import { Dimensions } from "../statics"
//import { history} from '@/statics'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import { authenticationService, formService } from '@/services'
import * as Yup from 'yup'
import Style from 'style-it';


class CarPhotos extends React.Component {
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
            file: null,
            isSet: false,
            canDeleteImg1: false
        };
        this.Dimensions = Dimensions.bind(this)
        this.handleChange = this.handleChange.bind(this)

    }
    
    componentDidMount()
    {
        console.log("Mound CarPhotos")
        window.addEventListener('resize', this.Dimensions);

        this.subscription = formService.currentCarPhotos.subscribe( ( photo ) => {
            console.log("Photo", photo)
            if(photo)
            {
                this.setState({ file: URL.createObjectURL(photo), isSet: true })
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

    onClearChanges() 
    {
      const { reset, onClearChanges, InitialValues } = this.props;
      reset();
      onClearChanges(InitialValues);
    }

    handleChange(event) {
        this.setState({ file: URL.createObjectURL(event.target.files[0]) })
        formService.setCarPhotos(event.target.files[0]).then(() => console.log("Car photo saved"))
    }

    render() {

        const mobile = this.state.width < 500 ? true : false; 

        const { isSet } = this.state
 
        const buttonSignIn = {

            backgroundImage: "linear-gradient(#00b8ff, #00719c)" ,
            borderColor: "transparent",
            borderRadius: '6px',
            width: '15vw', 
            height: '10vh',
            fontSize: '2vw'         
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
            <div style={{ backgroundColor: '#FFFFFF', width: '100vw', height: '100vh', display: 'flex', flexDirection : 'column', flex: '1 1 auto', alignItems : 'center' }} onMouseOver = {() => console.log("On mouse over")}>
                <div style={{ backgroundColor: 'transparent', width: '100vw', minHeight: '10vh', display: 'flex', flex: 1/10, alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}>
                </div>
                <div style={{ backgroundColor: 'transparent', width: '100vw', height: '15vh', display: 'flex', flex: 1.5/10, alignSelf: 'center', justifyContent: 'center', alignItems: 'center', borderStyle: 'solid', borderTopWidth: '10px', borderBottomWidth: '10px', borderColor: '#000000' }}>
                    <h2 style={title}>Seleccione las imagenes del vehiculo</h2> 
                </div>
                <div style={{ backgroundColor: 'transparent', width: '100vw', minHeight: '5vh', display: 'flex', flex: 0.5/10, alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}>
                </div>
                <div style={{ backgroundColor: 'transparent', width: '100vw', height: '65vh', minHeight: '65vh', maxHeight: '65vh', display: 'flex', flex: 6.5/10, alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ backgroundColor: 'transparent', display: 'flex', flex: 1/4, justifyContent: 'center', alignItems: 'center', width: '100vw' }}>
                        <input name="files" style={{ backgroundColor: 'transparent', margin: 0, alignItems: 'center', justifyContent: 'center', textAlign: 'center' }} type='file' maxSize="15000" onChange={this.handleChange} accept="image/png, image/jpg, image/jpeg"/>
                    </div>
                    <div style={{ backgroundColor: 'transparent', display: 'flex', flex: 2/4, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} >
                            <img 
                                src={ this.state.file || "https://icon-library.com/images/add-image-icon-png/add-image-icon-png-14.jpg"} 
                                style={{ maxWidth: '20vw', maxHeight: '20vh', minWidth: '20vw', minHeight: '20vh' }} 
                            />
                            {this.state.file && <button onClick={() => this.setState({ file: null })} style={{  }}>X</button>}
                    </div>
                    <div style={{ display: 'flex', flex: 1/4, justifyContent: 'center', alignItems: 'center' }}>
                        <div style={{ display: 'flex', flex: 1/3, justifyContent: 'center' }}>
                            <button type='button' style={buttonSignIn} onClick={() => this.props.history.goBack()}>Regresar</button>
                        </div>
                        <div style={{ flex: 1/3, width: '2vw' }}></div>
                        <div style={{ display: 'flex', flex: 1/3, justifyContent: 'center' }}>
                            <button disabled={!isSet} type='button' style={buttonSignIn} onClick={() => this.props.history.push("/Calendar")}><span style={{ color: !isSet ? 'grey' : 'white' }}>Siguiente</span></button>
                        </div>
                    </div>
                </div>
                <div style={{ backgroundColor: 'transparent', width: '100vw', height: '5vh', display: 'flex', flex: 0.5/10, alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                </div>
            </div>
        )
    }
}

export { CarPhotos };


