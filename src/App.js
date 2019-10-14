import React, { Component, Fragment } from 'react';
import './App.css';

import "../node_modules/bulma/css/bulma.css";

class App extends Component{
	state = {
		url: 'https://api.github.com/users/',
		clientId: '00244b17a2ec647fe639',
		clientSecret: '4925ec68e9463b84e4214a271d9ed1a7af0eb063',
		input:'',
		data:null,
		loading:false,
		error:false
	}
	getUser = async(e)=>{
		let self = this.state;
		fetch(`${self.url}${e}?client_id=${self.clientId}&clien_secret=${self.clientSecret}`)
		.then((response)=>{
			return response.json();
		})
		.then((json)=>{
			if(json.message){
				this.setState({data:null,loading:false, error:true});
			}else{
				this.setState({data:json,loading:false, error:false});
			}
		});
	}
	handleChange = e =>{
		this.setState({loading:true});
		this.getUser(e.target.value);
	}
	componentDidMount(){
		console.log(this.state.url)
	}

	render(){
		return (
			<Fragment>
				<div className="container">
					<div className="column is-full">
						<input type="text" className="input" defaultValue={this.state.input} onChange={this.handleChange} placeholder="Busca tu usuario" />
					</div>
					<div className="column is-full">
						{this.state.error ?
							<article class="message is-danger">
								<div class="message-header">
									<p>El usuario no éxiste</p>
									<button class="delete" aria-label="delete"></button>
								</div>
						  </article>:null
						}
						{this.state.data ? <div className="card">
  							<div className="card-image">
							  	<figure className="image is-4by3">
									<img src={this.state.data.avatar_url} alt="Placeholder image" />
								</figure>
							</div>
							<div className="card-content">
								<div className="media">
									<div className="media-left">
										<figure className="image is-48x48">
											<img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image" />
										</figure>
									</div>
									<div className="media-content">
										<p className="title is-4">John Smith</p>
										<p className="subtitle is-6">@johnsmith</p>
									</div>
								</div>
								<div className="content">
								<span>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
								Phasellus nec iaculis mauris. <a>@bulmaio</a>.
								<a href="#">#css</a> <a href="#">#responsive</a>
								</span>
								</div>
							</div>
						</div>: this.state.loading ? <progress className="progress is-small is-primary" max="100">100%</progress>:null}
					</div>
				</div>
			</Fragment>)
	}
}

export default App;
