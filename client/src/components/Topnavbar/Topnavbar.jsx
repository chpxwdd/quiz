import React, { Component } from 'react'
import { Navbar, Nav, NavItem, Glyphicon } from 'react-bootstrap'
import { Link } from 'react-router-dom'

class Topnavbar extends Component {
	render() {
		return (
			<div>
				<Navbar fixedTop inverse>
					<Navbar.Header>
						<Navbar.Brand>
							<a href="/">React-Bootstrap</a>
						</Navbar.Brand>
					</Navbar.Header>
					<Nav>
						<NavItem componentClass={Link} href="/" to="/" active={window.location.pathname === '/'}>
							<Glyphicon glyph="home" /> Home
						</NavItem>
						<NavItem componentClass={Link} href="/quiz" to="/quiz" active={window.location.pathname === '/quiz'}>
							Quiz
						</NavItem>
					</Nav>
				</Navbar>
			</div>
		)
	}
}

export default Topnavbar
