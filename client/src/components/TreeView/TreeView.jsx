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

	componentWillReceiveProps() {
		const { parentKey, idKey, items } = this.props

		if (idKey) {
			this.setState({ idKey: idKey })
		}

		if (parentKey) {
			this.setState({ parentKey: parentKey })
		}

		this.setState({ tree: this.buildTreeFromFlat(items) })
	}

	buildTreeFromFlat(flatMap, idKey = this.state.idKey, parentKey = this.state.parentKey) {
		var _flatMap = []
		flatMap.map((item, key) => {
			_flatMap[item[idKey]] = key
			flatMap[key].children = []
		})

		var treeMap = []
		flatMap.map((item, key) => {
			if (item[parentKey]) {
				flatMap[_flatMap[item[parentKey]]].children.push(item)
				return
			}
			treeMap.push(item)
		})

		return treeMap
	}

	render() {
		const { tree } = this.props

		return (
			<div>
				<ul>
					{tree.map((item, key) => {
						return (
							<li key={key}>
								{item.title}
								{item.children ? <TreeView tree={item.children} /> : <span />}
							</li>
						)
					})}
				</ul>
			</div>
		)
	}
}
export default TreeView
