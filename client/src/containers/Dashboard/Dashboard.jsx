import React, { Component } from 'react'
import { PageHeader, Glyphicon, Nav, NavItem, Clearfix } from 'react-bootstrap'
import { Route, Switch, Link } from 'react-router-dom'
import Quiz from './Quiz'
import Result from './Result'

export default class Dashboard extends Component {
	render() {
		return (
			<div className="container-dasboard">
				<Nav bsStyle="tabs" activeKey="1" onSelect={k => this.handleSelect(k)} pullRight>
					<NavItem
						componentClass={Link}
						to="/dashboard/quiz"
						href="/dashboard/quiz"
						active={window.location.pathname === '/dashboard/quiz'}
					>
						<Glyphicon glyph="education" /> Quiz
					</NavItem>
					<NavItem
						componentClass={Link}
						to="/dashboard/result"
						href="/dashboard/result"
						active={window.location.pathname === '/dashboard/result'}
					>
						<Glyphicon glyph="stats" /> Results
					</NavItem>
				</Nav>
				<Clearfix />
				<PageHeader>
					title <small>Subtext for header</small>
				</PageHeader>
				<Switch>
					<Route path="/dashboard/quiz" component={() => <Quiz />} />
					<Route path="/dashboard/result" component={() => <Result />} />
				</Switch>
			</div>
		)
	}
}
