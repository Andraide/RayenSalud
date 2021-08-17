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


class Calendar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  
            width: window.innerWidth, height: 
            window.innerHeight,
            maxHeight: window.visualViewport.height,
            maxWidth: window.visualViewport.width,
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

        this.subscription = formService.currentDate.subscribe( ({ dateIn, dateOut }) => {
            if(dateIn && dateOut)
            {
                this.setState({ dateIn, dateOut })
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
        return current && current < moment(this.state.dateIn).add(7, 'days') 
    }

    render() {

        const mobile = this.state.width < 500 ? true : false; 

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
            <div style={{ backgroundColor: '#FFFFFF', width: '100vw', height: '100vh', display: 'flex', flexDirection : 'column', flex: '1 1 auto', alignItems : 'center', justifyContent: 'center' }} onMouseOver = {() => console.log("On mouse over")}>
                <div style={{ backgroundColor: 'transparent', width: '100vw', minHeight: '10vh', display: 'flex', flex: 1/10, alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}>
                </div>
                <div style={{ backgroundColor: 'transparent', width: '100vw', height: '15vh', display: 'flex', flex: 1.5/10, alignSelf: 'center', justifyContent: 'center', alignItems: 'center', borderStyle: 'solid', borderWidth: '10px', borderColor: '#000000' }}>
                    <h2 style={title}>Agende su visita</h2> 
                </div>
                <div style={{ backgroundColor: 'transparent', width: '100vw', minHeight: '5vh', display: 'flex', flex: 0.5/10, alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}>
                </div>
                <div style={{ backgroundColor: 'green', width: '100vw', height: '65vh', minHeight: '65vh', maxHeight: '65vh', display: 'flex', flex: 6.5/10, alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    
                    <div style={{ backgroundColor: 'red', display: 'flex', flex: 1/3, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <label>Elija una fecha de ingreso</label>
                        <Space direction="vertical">
                            <DatePicker 
                                value={this.state.dateIn}
                                locale={locale} 
                                popupStyle={{ alignSelf: 'center', justifyContent: 'center' }}
                                disabledDate={this.disabledDateIn}
                                onChange={val => this.setState({ dateIn: val })}
                            />
                        </Space>
                    </div>
                    <div style={{ backgroundColor: 'blue', display: 'flex', flex: 1/3, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} >
                      <label>Elija una fecha de retiro</label>
                        <Space direction="vertical">
                            <DatePicker
                                value={this.state.dateOut}
                                disabled={this.state.dateIn ? false : true}
                                disabledDate={this.disabledDateOut}
                                popupStyle={{ alignSelf: 'center', justifyContent: 'center' }}  
                                onChange={val => this.setState({ dateOut: val })}
                            />
                        </Space>      
                    </div>
                    <div style={{ display: 'flex', flex: 1/3, justifyContent: 'center', alignItems: 'center' }}>
                        <div style={{ display: 'flex', flex: 1/3, justifyContent: 'center' }}>
                            <button type='button' style={buttonSignIn} onClick={() => this.props.history.goBack()}>Regresar</button>
                        </div>
                        <div style={{ flex: 1/3, width: '2vw' }}></div>
                        <div style={{ display: 'flex', flex: 1/3, justifyContent: 'center' }}>
                            <button 
                            type='button' 
                            disabled={!(this.state.dateIn&&this.state.dateOut)} 
                            style={buttonSignIn} 
                            onClick={() => {
                                formService.setDate(this.state.dateIn, this.state.dateOut)
                                .then(() => { this.props.history.push("/Resume") })
                            }}>
                                <span 
                                style={{ color: !(this.state.dateIn&&this.state.dateOut) ? 'grey' : 'white' }}>Siguiente
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

export { Calendar };


/*
 <Space direction="vertical">
                    <DatePicker popupStyle={{ alignSelf: 'center', justifyContent: 'center' }}/>
                </Space> 
*/