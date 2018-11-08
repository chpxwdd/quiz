import React, { Component } from 'react'
import { Col } from 'react-bootstrap'

class Admin extends Component {
	render() {
		return (
			<div className="container-admin">
				<Col xs={1} sm={2} md={3} lg={4}>
					side
				</Col>
				<Col xs={11} sm={10} md={9} lg={8}>
					content
				</Col>
			</div>
		)
	}
}

export default Admin
