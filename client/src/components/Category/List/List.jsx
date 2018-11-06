import React, { Component } from 'react'
import axios from 'axios'
import { ListGroupItem, ListGroup, ButtonToolbar, Button, ButtonGroup } from 'react-bootstrap'
import { bindActionCreators } from 'redux'
import moment from 'moment'
import { connect } from 'react-redux'
import jQuery from 'jquery'
import {
	actionCategoryDelete,
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
		const { actionCategoryListLoaded } = this.props

		axios('http://localhost:3333/api/categories').then(res => actionCategoryListLoaded(res.data))
	}

	handleDelete(id) {
		const { actionCategoryDelete } = this.props
		return axios.delete(`http://localhost:3333/api/categories/${id}`).then(() => actionCategoryDelete(id))
	}

	handleEdit(category, event) {
		// console.log(category)
		// console.log(event)
		const { actionCategorySetCurrent, categories } = this.props
		actionCategorySetCurrent(category)
	}

	render() {
		const { categories } = this.props

		return (
			<div>
				<Form />
				<ListGroup>
					{categories.map((category, key) => {
						return (
							<ListGroupItem
								key={'item' + key}
								className="list-group-item "
								onClick={event => this.handleEdit(category, event)}
							>
								<h4 className="list-group-item-heading">{category.title}</h4>
								<p className="list-group-item-text">{category.description}</p>
								<small className="pull-right">{moment(new Date(category.createdAt)).fromNow()}</small>
								<div className="clearfix" />
							</ListGroupItem>
						)
					})}
				</ListGroup>
			</div>
		)
	}
}
const mapStateToProps = state => ({
	categories: state.category.categories,
})

const mapDispatchToProps = dispatch => ({
	// onSubmit: data => dispatch(categoryCreate),
	// onEdit: data => dispatch(categoryUpdate),
	actionCategoryListLoaded: bindActionCreators(actionCategoryListLoaded, dispatch),
	actionCategoryDelete: bindActionCreators(actionCategoryDelete, dispatch),
	actionCategorySetCurrent: bindActionCreators(actionCategorySetCurrent, dispatch),
})
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(List)
