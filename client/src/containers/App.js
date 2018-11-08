import React, { Component } from 'react'
import { Grid, Row } from 'react-bootstrap'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
import Dashboard from './Dashboard'
import Admin from './Admin'
import Topnavbar from './Topnavbar'

class App extends Component {
	// 	<NavItem componentClass={Link} href="/" to:"/" active={window.location.pathname === '/'}>
	// 	<Glyphicon glyph="home" /> Dashboard
	// </NavItem>
	constructor(props) {
		super(props)

		this.links = this.fetchLinks()
	}

	fetchLinks() {
		return [
			{ href: '/', to: '/', glyph: 'home', componentClass: Link, children: null, exact: true },
			{
				href: '/dashboard',
				to: '/dashboard',
				glyph: 'dashboard',
				componentClass: Link,
				children: [
					{ href: '/quiz', to: '/quiz', glyph: 'tasks', componentClass: Link, children: null, exact: false },
					{ href: '/result', to: '/result', glyph: 'stats', componentClass: Link, children: null, exact: false },
				],
				exact: false,
			},
		]
	}
	renderChildRoutes(route) {
		return '<div>sssss</div>'
	}

	render() {
		return (
			<div className="app">
				<BrowserRouter>
					<div className="main">
						<Topnavbar />
						<Grid>
							<Row>
								<Route path="/" exact render={() => <div>Main</div>} />
								<Route path="/dashboard" component={() => <Dashboard />} />
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
