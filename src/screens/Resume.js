const getLogger = require('webpack-log');
const log = getLogger({ name: 'About logs' });

import React from 'react'
import { Dimensions } from "../statics"
import moment from 'moment';
import { DatePicker, Space } from 'antd';
import { RangePicker } from 'antd';
import 'antd/dist/antd.css';
//import 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/es_ES';
//import { history} from '@/statics'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import { authenticationService, formService } from '@/services'
import * as Yup from 'yup'
import Style from 'style-it';


class Resume extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  
            width: window.innerWidth, height: 
            window.innerHeight,
            maxHeight: window.visualViewport.height,
            maxWidth: window.visualViewport.width,
            name: null,
            phone: null,
            year: null,
            plate: null,
            carType: null,
            file: null,
            dateIn: null,
            dateOut: null,
        
        };
        this.Dimensions = Dimensions.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.disabledDateOut = this.disabledDateOut.bind(this)

    }
    
    componentDidMount()
    {
        console.log("Mound CarPhotos")
        window.addEventListener('resize', this.Dimensions);

        this.dateSubscription = formService.currentDate.subscribe( ({ dateIn, dateOut }) => {
            console.log("Seting dates")
            const { _d } = dateIn
            console.log("_D", moment(_d).date(), moment(_d).month(), moment(_d).year())
            if(dateIn && dateOut)
            {
                console.log(Object.keys(dateIn))
                this.setState({ dateIn: moment(dateIn._d).date() + "/" + (parseInt(moment(dateIn._d).month()) + parseInt(1)).toString() + "/" + moment(dateIn._d).year() , dateOut: moment(dateOut._d).date() + "/" + (parseInt(moment(dateOut._d).month()) + parseInt(1)).toString() + "/" + moment(dateOut._d).year() })
            }
        })

        this.userSubscription = formService.currentUserData.subscribe( ({ name, phone }) => {
            console.log("Observable", name, phone)
            if(name && phone)
            {
                this.setState({ name, phone, isSet: true })
            }
        })

        this.carSubscription = formService.currentCarData.subscribe( ({ year, plate, carType }) => {
            if(year && plate && carType)
            {
                this.setState({ year, plate, carType, isSet: true })
            }
        })

        this.fileSubscription = formService.currentCarPhotos.subscribe( ( photo ) => {
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

    disabledDateIn(current) {
        return current && current < moment().endOf('day');
    }

    disabledDateOut(current) {
        return current && current < this.state.dateIn 
    }

    render() {

        const mobile = this.state.width < 500 ? true : false; 

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
            <div style={{ backgroundColor: '#FFFFFF', width: '100vw', height: '100vh', display: 'flex', flexDirection : 'column', flex: '1 1 auto', alignItems : 'center', justifyContent: 'center' }} onMouseOver = {() => console.log("On mouse over")}>
                <div style={{ backgroundColor: 'transparent', width: '100vw', minHeight: '10vh', display: 'flex', flex: 1/10, alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}>
                </div>
                <div style={{ backgroundColor: 'transparent', width: '100vw', height: '15vh', display: 'flex', flex: 1.5/10, alignSelf: 'center', justifyContent: 'center', alignItems: 'center', borderStyle: 'solid', borderTopWidth: '10px', borderBottomWidth: '10px', borderColor: '#000000' }}>
                    <h2 style={title}>Resumen</h2> 
                </div>
                <div style={{ backgroundColor: 'transparent', width: '100vw', minHeight: '5vh', display: 'flex', flex: 0.5/10, alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}>
                </div>
                <div style={{ backgroundColor: 'transparent', width: '100vw', height: '65vh', minHeight: '65vh', maxHeight: '65vh', display: 'flex', flex: 6.5/10, alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    
                    <div style={{ backgroundColor: 'transparent', display: 'flex', flex: 1/3, width: '45vw', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <div style={{ flex: 1/3 }}>
                            <div style={{ flex: 1/4 }}>
                                <span style={{ fontSize: '2vw' }}>Nombre:</span>  
                            </div>
                            <div style={{ flex: 1/4 }}>
                                <span style={{ fontSize: '2vw' }}>{this.state.name}</span>  
                            </div>
                            <div style={{ flex: 1/4 }}>
                                <span style={{ fontSize: '2vw' }}>Telefono:</span>  
                            </div>
                            <div style={{ flex: 1/4 }}>
                                <span style={{ fontSize: '2vw' }}>{this.state.phone}</span>  
                            </div>
                        </div>
                        <div style={{ flex: 1/3, width: '2vw' }}></div>
                        <div style={{ flex: 1/3 }}>
                            <div style={{ flex: 1/4 }}>
                                <span style={{ fontSize: '2vw' }}>Placa patente:</span>  
                            </div>
                            <div style={{ flex: 1/4 }}>
                                <span style={{ fontSize: '2vw' }}>{this.state.plate}</span>  
                            </div>
                            <div style={{ flex: 1/4 }}>
                                <span style={{ fontSize: '2vw' }}>Tipo de vehiculo:</span>  
                            </div>
                            <div style={{ flex: 1/4 }}>
                                <span style={{ fontSize: '2vw' }}>{this.state.carType}</span>  
                            </div>
                        </div>
                    </div>
                    <div style={{ backgroundColor: 'transparent', display: 'flex', flex: 1/3, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} >
                        <div style={{ flex: 1/4 }}>
                            <span style={{ fontSize: '2vw' }}>Fecha ingreso:</span>  
                        </div>
                        <div style={{ flex: 1/4 }}>
                            <span style={{ fontSize: '2vw' }}>{this.state.dateIn}</span>  
                        </div>
                        <div style={{ flex: 1/4 }}>
                            <span style={{ fontSize: '2vw' }}>Fecha de retiro</span>  
                        </div>
                        <div style={{ flex: 1/4 }}>
                            <span style={{ fontSize: '2vw' }}>{this.state.dateOut}</span>  
                        </div>
                    </div>
                    <div style={{ display: 'flex', flex: 1/3, justifyContent: 'center', alignItems: 'center' }}>
                        <div style={{ display: 'flex', flex: 1/3, justifyContent: 'center' }}>
                            <button type='button' style={buttonSignIn} onClick={() => this.props.history.goBack()}>Regresar</button>
                        </div>
                        <div style={{ flex: 1/3, width: '2vw' }}></div>
                        <div style={{ display: 'flex', flex: 1/3, justifyContent: 'center' }}>
                            <button 
                            type='button' 
                            disabled={false} 
                            style={buttonSignIn} 
                            onClick={() => {
                                formService.sendFormData(this.state.name, this.state.phone, this.state.plate, this.state.carType, this.state.dateIn, this.state.dateOut, this.state.file)
                                .then(() => {
                                    this.props.history.push("/");
                                    formService.cleanStates();
                                })
                            }}>
                                <span 
                                style={{ color: !(this.state.dateIn&&this.state.dateOut) ? 'grey' : 'white' }}>Ingresar
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
                <div style={{ backgroundColor: 'transparent', width: '100vw', height: '5vh', display: 'flex', flex: 0.5/10, alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                </div>
            </div>
                  
           
        )
    }
}
/*
 name: null,
            phone: null,
            year: null,
            plate: null,
            carType: null,
            file: null,
            dateIn: null,
            dateOut: null,
*/
export { Resume };


/*
 <Space direction="vertical">
                    <DatePicker popupStyle={{ alignSelf: 'center', justifyContent: 'center' }}/>
                </Space> 
*/