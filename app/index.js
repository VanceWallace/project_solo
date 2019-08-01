import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


class App extends React.Component{


    // in this case App is a child of the parent component "react"
    render() {
        return(
            <div>
                <h1>Most Recent Vote of the U.S. Senate</h1>
                {/* These are all of the child components of the App component.   */}
                <Description/>
            </div>
        )
    }
}

class Description extends React.Component {

constructor (props){
    super(props)
    this.state = {
        rollCallNumber: null,
        questionText: null,
        description: null
    }
 }
    componentDidMount (){ 
        fetch('https://api.propublica.org/congress/v1/senate/votes/recent.json', {
            headers: new Headers({
            'x-api-key': 'wkton7932mou5NQLIHL0BMzxIMYdyzSCQ8i2xJqk'    
            })    
        })
        // fetch ('/express')
        .then(res => res.json())
        .then(data => this.setState({ 
            rollCallNumber:data.results.votes[0].roll_call, 
            description:data.results.votes[0].description, 
            questionText:data.results.votes[0].question_text 
        }))
        .catch(err => console.log(err))
    }
    
    render() {

        return(
        <div>
            <p>{this.state.questionText}</p>
            <p>{this.state.description}</p>
            <RepresentativesDisplay
            rollCallNumber={this.state.rollCallNumber}
            />
        </div>
        )}
}

class RepresentativesDisplay extends React.Component {
    constructor (props){
        super(props)
        this.state = {
            status: null,
            copyright: null
        }
     }
     componentDidUpdate(prevProps){
         //Lifecycle update, did the props change? If they changed, update stuff
        if(this.props.rollCallNumber !== prevProps.rollCallNumber){
            //set number from props, this is the rollCallNumber from the previous fetch
            let number = this.props.rollCallNumber
            console.log("This is what I'm fetching:")
            console.log("https://api.propublica.org/congress/v1/116/senate/sessions/1/votes/" + number+".json")
        
            fetch("https://api.propublica.org/congress/v1/116/senate/sessions/1/votes/" + number+".json", {
                headers: new Headers({
                'x-api-key': 'wkton7932mou5NQLIHL0BMzxIMYdyzSCQ8i2xJqk'    
                })    
            })
            // fetch ('/express')
            .then(res => res.json())
            .then(data => this.setState({ 
                status:data.results.votes.vote.positions[0].name,
                copyright:data.results.votes.vote.positions[1].name,
            }))
            .catch(err => console.log(err))
        }

        }

    render() { 
        console.log("This is my number", this.props.rollCallNumber);

    //  const rollCallNumber = this.props.rollCallNumber;
    //  const { rollCallNumber } = this.props;
     return(
         <div>
            <RepresentativeCard
            rollCallNumber={this.state.status}
            />
            <RepresentativeCard
            rollCallNumber={this.state.copyright}
            />   
         </div>
     )
    }   
}

const RepresentativeCard = (props) => {
    // const rollCallNumber = props.rollCallNumber; 
    // console.log("This is what the props are", props)
    return (
        <div>
        <h3>Representative name:</h3>
        <h4>{props.rollCallNumber}</h4>
        </div>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('app')   
)