import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Test from './test.js' 

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
    render() {
            return(<h1>"TestTwo text"</h1>)
    }
}


ReactDOM.render(
    <App />,
    document.getElementById('app')   
)