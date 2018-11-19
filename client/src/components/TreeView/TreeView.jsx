import React, { Component } from 'react'
// import { FormGroup, FormControl, ControlLabel, HelpBlock, Button } from 'react-bootstrap'

import axios from 'axios'

class TreeView extends Component {
	constructor(props) {
		super(props)

		this.state = {
			items: [],
			tree: [],
			idKey: '_id',
			parentKey: 'parent',
		}
	}

	render() {
		const { tree } = this.props

		return <div>Categories</div>
	}
}
export default TreeView
