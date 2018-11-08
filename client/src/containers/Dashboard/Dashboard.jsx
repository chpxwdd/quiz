import React, { Component } from 'react'
import { PageHeader, Glyphicon, Nav, NavItem, Clearfix } from 'react-bootstrap'
import { Route, Switch, Link } from 'react-router-dom'
import Quiz from './Quiz'
import Result from './Result'

const config = [
	{
		name: 'quiz',
		component: Quiz,
		route: '/dashboard/quiz',
		glyph: 'education',
		label: 'Quiz',
		title: 'Quiz list',
		lead: 'selected you quiz',
	},
	{
		name: 'result',
		component: Result,
		route: '/dashboard/result',
		glyph: 'stats',
		label: 'Results',
		title: 'Statistics & Results',
		lead: 'show all results for any quiz',
	},
]
export default class Dashboard extends Component {
	constructor(props) {
		super(props)
		this.config = config
		this.state = {
			current: config[0],
		}
		this.handleSelect = this.handleSelect.bind(this)
	}

	handleSelect(key) {
		this.setState({ current: config[key] })
	}
	render() {
		const { current } = this.state
		return (
			<div className="container-dasboard">
				<PageHeader>
					Dashboard <small>space for all residents</small>
				</PageHeader>
				<Nav bsStyle="tabs" activeKey={current.eventKey} pullRight>
					{this.config.map((item, key) => {
						return (
							<NavItem
								key={key}
								eventKey={key}
								componentClass={Link}
								to={item.route}
								href={item.route}
								active={window.location.pathname === item.route}
								onSelect={k => this.handleSelect(k)}
							>
								<Glyphicon glyph={item.glyph} /> {item.label}
							</NavItem>
						)
					})}
				</Nav>
				<Clearfix />
				<br />
				<Switch>
					{this.config.map((item, key) => {
						return <Route path={item.route} key={key} component={item.component} />
					})}
				</Switch>
			</div>
		)
	}
}
