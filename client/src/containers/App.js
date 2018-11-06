import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import { BrowserRouter, Route } from 'react-router-dom'
import Home from '../components/Home'
import List from '../components/Category/List'
import Topnavbar from '../components/Topnavbar'

class App extends Component {
	render() {
		return (
			<div className="app">
				<BrowserRouter>
					<div>
						<Topnavbar />
						<Grid>
							<Row>
								<Col sm={8} smOffset={2}>
									<Route path="/" component={() => <Home />} exact />
									<Route path="/quiz" component={() => <List />} />
								</Col>
							</Row>
						</Grid>
					</div>
				</BrowserRouter>
			</div>
		)
	}
}

export default App
