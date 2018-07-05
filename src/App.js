import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class MyInput extends Component {
	constructor() {
		super(); //to pass any props from the parent to the child component
		this.state = { value: "" };
		this.handleChange = this.handleChange.bind(this);
	}
	handleChange(event) {
		this.setState({value: event.target.value});
		this.props.myCallback(event.target.value);
	}
	render() {
		return(
			<div>
				<label htmlFor="input">How many results do you want?</label>&nbsp;
				<input name="input" value={this.state.value} onChange={this.handleChange} />
			</div>
		)
	}
}

class MyData extends Component {
	constructor() {
		super(); //to pass any props from the parent to the child component
		this.state = { pictures: [] }
	}
	fetchData() {
		fetch('https://randomuser.me/api/?results='+this.props.nh)
		.then(myResults => {
		   return myResults.json();
		})
		.then(myJson => {
			let picturesArr = myJson.results.map((item) => { //top level of feed JSON is named 'results'
				return(
					<a href={'mailto:'+item.email} key={item.login.uuid}>
						<img src={item.picture.medium} alt={item.name.stringify} />
					</a>
				)
			})
			this.setState({pictures: picturesArr});
			console.log("state", this.state.pictures);
		})
	}
	componentDidMount() {
		this.fetchData();
	}
	componentDidUpdate(prevProps) {
		if (this.props.nh !== prevProps.nh) {
			this.fetchData();
		}
	}
	render() {
		return(
			<div className="API results">
				<h2>{'Displaying ' + this.state.pictures.length + ' random users'}</h2>
				{this.state.pictures}					
			</div>
		)
	}
};

class MyApp extends Component {
  constructor() {
        super();
        this.state = {
            nh: null
        };    
  }
  myCallback = (inputDataFromChild) => {
	this.setState({ nh: inputDataFromChild });
  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          I got started by editing <code>src/App.js</code>.
        </p>
		<MyInput myCallback={this.myCallback} />
		<MyData nh={this.state.nh} />
      </div>
    );
  }
}

export default MyApp;
