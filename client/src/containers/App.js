import React, { Component } from 'react'
import { Grid, Row } from 'react-bootstrap'
import { BrowserRouter, Route } from 'react-router-dom'
import Topnavbar from './Topnavbar'

class App extends Component {
	render() {
		return (
			<div className="app">
				<BrowserRouter>
					<div className="main">
						<Topnavbar />
						<Grid>
							<Row>
								<Route path="/" exact render={() => <div>MAINPAGE</div>} />
							</Row>
						</Grid>
					</div>
				</BrowserRouter>
			</div>
		)
	}
}

export default App
