import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


class App extends React.Component{

    
    // in this case App is a child of the parent component "react"
    render() {
        let location = "no state selected"
        return(
            <div>
                <h1>What Up Rep?</h1>
                <Description/>
            </div>
        )
    }
}

class Description extends React.Component {

constructor (props){
    super(props)
    this.state = {
        location: "AL",
        rollCallNumber: null,
        questionText: null,
        result: null,
        description: null
    }
    this.handleChange = this.handleChange.bind(this);
 }

 handleChange(event) {
     this.setState({location: event.target.value});
 }

    componentDidMount (){ 
        fetch('https://api.propublica.org/congress/v1/senate/votes/recent.json', {
            headers: new Headers({
            'x-api-key': 'PLACE KEY HERE'    
            })    
        })
        // fetch ('/express')
        .then(res => res.json())
        .then(data => this.setState({ 
            rollCallNumber:data.results.votes[0].roll_call, 
            description:data.results.votes[0].description,
            result:data.results.votes[0].result, 
            questionText:data.results.votes[0].question_text 
        }))
        .catch(err => console.log(err))
        // console.log("Location before passed as props", this.state.location);
    }

    render() {
        return(     
        <div>
            <div>
                <h2>Representatives for the state of:</h2>
                <select value={this.state.location} onChange={this.handleChange}>
                    <option value="AL">Alabama</option>
                    <option value="AK">Alaska</option>
                    <option value="AZ">Arizona</option>
                    <option value="AR">Arkansas</option>
                    <option value="CA">California</option>
                    <option value="CO">Colorado</option>
                    <option value="CT">Connecticut</option>
                    <option value="DE">Delaware</option>
                    <option value="FL">Florida</option>
                    <option value="GA">Georgia</option>
                    <option value="HI">Hawaii</option>
                    <option value="ID">Illinois</option>
                    <option value="IN">Indiana</option>
                    <option value="IA">Iowa</option>
                    <option value="MD">Maryland</option>
                    <option value="KS">Kansas</option>
                    <option value="KY">Kentucky</option>
                    <option value="LA">Louisiana</option>
                    <option value="ME">Maine</option>
                    <option value="MD">Maryland</option>
                    <option value="MA">Massachusetts</option>
                    <option value="MI">Michigan</option>
                    <option value="MN">Minnesota</option>
                    <option value="MS">Mississippi</option>
                    <option value="MO">Missouri</option>
                    <option value="MT">Montana</option>
                    <option value="NE">Nebraska</option>
                    <option value="NV">Nevada</option>
                    <option value="NH">New Hampshire</option>
                    <option value="NJ">New Jersey</option>
                    <option value="NM">New Mexico</option>
                    <option value="NY">New York</option>
                    <option value="NC">North Carolina</option>
                    <option value="ND">North Dakota</option>
                    <option value="OH">Ohio</option>
                    <option value="OK">Oklahoma</option>
                    <option value="OR">Oregon</option>
                    <option value="PA">Pennsylvania</option>
                    <option value="RI">Rhode Island</option>
                    <option value="SC">South Carolina</option>
                    <option value="SD">South Dakota</option>
                    <option value="TN">Tennessee</option>
                    <option value="TX">Texas</option>
                    <option value="UT">Utah</option>
                    <option value="VT">Vermont</option>
                    <option value="VA">Virginia</option>
                    <option value="WA">Washington</option>
                    <option value="WV">West Virginia</option>
                    <option value="WI">Wisconsin</option>
                    <option value="WY">Wyoming</option>
                </select>
            </div>
            <h3>{this.state.questionText}</h3>
            <h3>{this.state.description}</h3>
            <h3>{this.state.result}</h3>
            <RepresentativesDisplay
                rollCallNumber={this.state.rollCallNumber}
                location={this.state.location}
            />
        </div>
        )}
}

class RepresentativesDisplay extends React.Component {
    constructor (props){
        super(props)
        this.state = {
            nameOne: {},
            nameTwo: {},
            positionsArr: []
        }
     }
     componentDidUpdate(prevProps){
         //Lifecycle update, did the props change? If they changed, update stuff
        if(this.props.rollCallNumber !== prevProps.rollCallNumber){
            //set number from props, this is the rollCallNumber from the previous fetch
            let number = this.props.rollCallNumber
            console.log("Location after passing as props:", this.props.location)
            // console.log("This is what I'm fetching:")
            // console.log("https://api.propublica.org/congress/v1/116/senate/sessions/1/votes/" + number+".json")
            fetch("https://api.propublica.org/congress/v1/116/senate/sessions/1/votes/" + number+".json", {
                headers: new Headers({
                'x-api-key': 'PLACE KEY HERE'    
                })    
            })
            // fetch ('/express')
            .then(res => res.json())
            .then(data => this.setState({ 
                positionsArr:data.results.votes.vote.positions
            }))
            .catch(err => console.log(err))
        }

        }

    render() { 
        // console.log("This is my number", this.props.rollCallNumber);
        const resultArr = this.state.positionsArr.filter(position=>
           position.state == this.props.location)
        console.log("The results array is:", resultArr);
        this.state.nameOne = resultArr[0]; 
        this.state.nameTwo = resultArr[1];

     return(
         <div className = "resultsContainer">
            {resultArr[0] != undefined && <RepresentativeCard
            rollCallNumber={resultArr[0]}
            />}
            {resultArr[1] != undefined && <RepresentativeCard
            rollCallNumber={resultArr[1]}
            />}   
         </div>
     )
    }   
}

const RepresentativeCard = (props) => {
    // const rollCallNumber = props.rollCallNumber; 
    // console.log("This is what the props are", props)
    return (
        <div className={ "repCard " + (props.rollCallNumber.party === 'R' ? "isRep" : props.rollCallNumber.party === 'D' ? "isDem" : null ) }>
        <p>Senator: {props.rollCallNumber.name}</p>
        <p>Party: {props.rollCallNumber.party}</p>
        <p>Voted: {props.rollCallNumber.vote_position}</p>
        </div>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('app')   
)