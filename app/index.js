import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


class App extends React.Component{


    // in this case App is a child of the parent component "react"
    render() {
        return(
            <div>
                Hello World!
                {/* These are all of the child components of the App component.   */}
                <TestTwo/>
            </div>
        )
    }
}

class TestTwo extends React.Component {

    
constructor (props){
    super(props)
    this.state = {
        text: null
    }
 }
    componentDidMount (){ 
        fetch('http://localhost:3000/express')
        // fetch ('/express')
        .then(res => res.json())
        .then(data => this.setState({ text:data }))
        .catch(err => console.log(err))
    }
    render() {
        return(<h1>{this.state.text}</h1>)
    }
}




ReactDOM.render(
    <App />,
    document.getElementById('app')   
)