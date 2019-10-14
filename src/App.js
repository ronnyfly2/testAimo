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
		dataRepo:null,
		loading:false,
		loadingRepo:false,
		error:false,
		errorRepo:false
	}
	getUser = async(e)=>{
		let word = e;
		let self = this.state;
		fetch(`${self.url}${word}?client_id=${self.clientId}&clien_secret=${self.clientSecret}`)
		.then((response)=>{
			return response.json();
		})
		.then((json)=>{
			if(json.message){
				this.setState({data:null,loading:false, error:true});
			}else{
				this.setState({data:json,loading:false, loadingRepo:true, error:false});
			}
		});
		this.getRepos(word);
	}
	getRepos = async (e)=>{
		let self = this.state;
		if(e.length > 0){
			fetch(`${self.url}${e}/repos?client_id=${self.clientId}&clien_secret=${self.clientSecret}`)
			.then((response)=>{
				return response.json();
			})
			.then((json)=>{
				if(json.message){
					this.setState({dataRepo:null,loadingRepo:false, errorRepo:true});
				}else{
					this.setState({dataRepo:json,loadingRepo:false, errorRepo:false});
				}
			});
		}else{
			this.setState({dataRepo:null,loadingRepo:false, errorRepo:false});
		}
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
							<article className="message is-danger">
								<div className="message-header">
									<p>El usuario no éxiste</p>
									<button className="delete" aria-label="delete"></button>
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
										<p className="title is-4">{this.state.data.name}</p>
										<p className="subtitle is-6">@{this.state.data.login}</p>
									</div>
								</div>
								<div className="content">
								<span>{this.state.data.location}</span>
								</div>
							</div>
						</div>: this.state.loading ? <progress className="progress is-small is-primary" max="100">100%</progress>:null}
						{this.state.dataRepo ? <nav className="panel">
							<p className="panel-heading">
								repositorios
							</p>
							<div className="panel-block">
								<p className="control has-icons-left">
								</p>
							</div>
							{this.state.dataRepo.map((ele, idx)=>{
								return (
									<a href="javascript:;" className="panel-block">
										<span className="panel-icon">
										<i className="fas fa-code-branch" aria-hidden="true"></i>
										</span>
										{ele.name}
									</a>
								)
							})}
						</nav>: this.state.errorRepo ?  <article className="message is-danger">
								<div className="message-header">
									<p>El usuario no tiene repositorios disponibles</p>
									<button className="delete" aria-label="delete"></button>
								</div>
						  </article>:null}
					</div>
				</div>
			</Fragment>)
	}
}

export default App;
