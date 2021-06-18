const getLogger = require('webpack-log');
const log = getLogger({ name: 'About logs' });

import React, { Component} from "react";
import { Dimensions } from "../statics"


class About extends Component {

    constructor(props)
    {
        super(props);
        this.state = { width: 0, height: 0 };
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

    
    render() 
    {
        return (
            <div>
                <div><h1>About</h1></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        )
    }
}

export { About }

