const  Dimensions = function Dimensions()
{
        this.setState({width: window.innerWidth, height: window.innerWidth , maxWidth: window.visualViewport.width, maxHeight: window.visualViewport.height });
}

export { Dimensions };  