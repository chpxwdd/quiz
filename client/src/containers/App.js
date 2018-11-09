import React, { Component } from 'react'
import { Grid, Row } from 'react-bootstrap'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'

import Quiz from './Quiz'
import Admin from './Admin'
import Topnavbar from './Topnavbar'
import TreeView from '../components/TreeView/TreeView'

import axios from 'axios'

class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			items: [],
		}
	}

	componentDidMount() {
		var data = []
		axios.get('http://localhost:3333/api/categories').then(res => {
			setTimeout(() => {
				this.setState({ items: this.buildTree(res.data.categories) })
			}, 500)
		})
		console.log(this.state)
	}

	render() {
		return (
			<div className="app">
				<BrowserRouter>
					<div className="main">
						<Topnavbar />
						<TreeView items={this.state.items} />
						<Grid>
							<Row>
								<Route path="/" exact render={() => <div>Main</div>} />
								<Route path="/quiz" component={() => <Quiz />} />
								<Route path="/admin" component={() => <Admin />} />
							</Row>
						</Grid>
					</div>
				</BrowserRouter>
			</div>
		)
	}
}

export default App
