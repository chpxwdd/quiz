import React, { Component } from 'react'
import { PageHeader, Glyphicon, Nav, NavItem, Clearfix } from 'react-bootstrap'
import axios from 'axios'

export default class Quiz extends Component {
	constructor(props) {
		super(props)
		this.state = {
			tree: [],
		}
	}
	componentDidMount() {
		var data = []
		axios.get('http://localhost:3333/api/categories').then(res => {
			// console.log(res.data.categories)
			setTimeout(() => {
				this.setState({ tree: this.buildTree(res.data.categories) })
			}, 500)
		})
		// console.log(data)
		console.log(this.state)
	}

	buildTree(list) {
		var _list = []
		list.map((item, key) => {
			_list[item._id] = key
			list[key].children = [] // initialize the children
		})

		var tree = []
		list.map((item, key) => {
			if (item.parent) {
				list[_list[item.parent]].children.push(item)
				return
			}
			tree.push(item)
		})

		return tree
	}

	render() {
		return (
			<div className="container-quiz">
				<PageHeader>
					Quiz <small>main app</small>
				</PageHeader>
			</div>
		)
	}
}
