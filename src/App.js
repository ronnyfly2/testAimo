import React, { Component, Fragment } from 'react';

import './App.css';

class App extends Component{
	state = {
		url: 'https://api.github.com/users/',
		clientId: '00244b17a2ec647fe639',
		clientSecret: '4925ec68e9463b84e4214a271d9ed1a7af0eb063'
	}
	async getUser(e){

		const res = await fetch(`${this.state.url}${e}?client_id`);
	}
	componentDidMount(){
	}

	render(){
		return <Fragment>
				<input onChange={()=>this.getUser()} />
			</Fragment>
	}
}

export default App;
