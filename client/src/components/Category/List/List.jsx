import React, { Component } from 'react'
import axios from 'axios'
import { ListGroupItem, ListGroup, Glyphicon, Button } from 'react-bootstrap'
import { bindActionCreators } from 'redux'
// import moment from 'moment'
import { connect } from 'react-redux'
import {
	actionCategoryDelete,
	actionCategoryTreeViewLoaded,
	actionCategoryListLoaded,
	actionCategorySetCurrent,
} from '../../../actions/actionCategories'
import Form from '../Form'

// import { CATEGORY_LIST_LOADED, CATEGORY_DELETE, CATEGORY_SET_CURRENT } from '../../../constants/category'

class List extends Component {
	constructor(props) {
		super(props)
		this.handleDelete = this.handleDelete.bind(this)
		this.handleEdit = this.handleEdit.bind(this)
	}

	componentDidMount() {
		var treeView = []

		const { actionCategoryListLoaded, actionCategoryTreeViewLoaded } = this.props

		axios('http://localhost:3333/api/categories').then(res => {
			actionCategoryListLoaded(res.data)
		})
		// axios('http://localhost:3333/api/categories/children/root').then(res => {
		// 	actionCategoryTreeViewLoaded(res.data)
		// })
	}

	handleDelete(id) {
		const { actionCategoryDelete } = this.props
		return axios.delete(`http://localhost:3333/api/categories/${id}`).then(() => actionCategoryDelete(id))
	}

	handleEdit(category) {
		const { actionCategorySetCurrent } = this.props
		actionCategorySetCurrent(category)
	}

	render() {
		const { categories, categoriesTreeView, actionCategoryCreate } = this.props
		return (
			<div>
				<Form categories={categories} actionCategoryCreate={actionCategoryCreate} />
				<br />
				<ListGroup componentClass="div">
					{categoriesTreeView.map((category, key) => {
						return (
							<ListGroupItem key={'item' + key} header={category.title}>
								{category.description}

								<Button
									componentClass="a"
									bsSize="sm"
									bsStyle="default"
									onClick={() => {
										this.handleEdit(category)
									}}
								>
									<Glyphicon glyph="edit" />
									&nbsp; Edit
								</Button>
								<Button
									componentClass="a"
									bsSize="sm"
									bsStyle="danger"
									onClick={() => {
										if (window.confirm('Are you sure you wish to delete this item?')) this.handleDelete(category._id)
									}}
								>
									<Glyphicon glyph="trash" />
									&nbsp; Delete
								</Button>
							</ListGroupItem>
						)
					})}
				</ListGroup>
			</div>
		)
	}
}

export default List
