import React, { Component, Fragment } from 'react';

import './App.css';
import { async } from 'q';

class App extends Component{
	state = {
		url: 'https://api.github.com/users/',
		clientId: '00244b17a2ec647fe639',
		clientSecret: '4925ec68e9463b84e4214a271d9ed1a7af0eb063',
		input:'',
		data:null
	}
	getUser = async(e)=>{
		let self = this.state;
		fetch(`${self.url}${e}?client_id=${self.clientId}&clien_secret=${self.clientSecret}`)
		.then((response)=>{
			return response.json();
		})
		.then((json)=>{
			this.setState({data:json});
		});
	}
	handleChange = e =>{
		let self = this.state;
		console.log(e.target.value, self);
		this.getUser(e.target.value);
	}
	componentDidMount(){
		console.log(this.state.url)
	}

	render(){
		console.log('ronals', this.state.data);
		return <Fragment>
				<input defaultValue={this.state.input} onChange={this.handleChange} />
			</Fragment>
	}
}

export default App;
