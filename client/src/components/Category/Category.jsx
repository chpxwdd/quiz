import React, { Component } from 'react'
import axios from 'axios'

export default class Category extends Component {
	componentDidMount() {
		// const { actionCategoryListLoaded, actionCategoryTreeViewLoaded } = this.props
		// axios('http://localhost:3333/api/categories').then(res => {
		// 	actionCategoryListLoaded(res.data)
		// })
		// axios('http://localhost:3333/api/categories/children/root').then(res => {
		// 	actionCategoryTreeViewLoaded(res.data)
		// })
	}

	render() {
		// console.log(this.props)
		// const { currentCategory, categories, categoriesTreeView } = this.props

		return <div>component Category Content</div>
	}
}
