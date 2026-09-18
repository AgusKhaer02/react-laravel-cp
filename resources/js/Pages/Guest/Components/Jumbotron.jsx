import React from 'react';
import ReactDOM from 'react-dom/client';

class Jumbotron extends React.Component{
    constructor(props){
        super();
        this.welcomeText = props.welcome;
        this.companyName = props.companyName;
        this.paragraph = props.paragraph;
    }

    render(){
        return (
            <div className="jumbotron my-5 container text-center">
                <h4>{this.welcomeText}</h4>
                <h1>{this.companyName}</h1>
                <p>{this.paragraph}</p>
            </div>
        );
    }
}

export default Jumbotron;