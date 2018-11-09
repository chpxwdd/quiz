import React, { Component } from 'react'
import axios from 'axios'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
	actionCategoryCreate,
	actionCategoryUpdate,
	actionCategoryDelete,
	actionCategoryTreeViewLoaded,
	actionCategoryListLoaded,
	actionCategorySetCurrent,
} from '../../../actions/actionCategories'
import Form from '../../components/Form'
import List from '../../components/List'
import TreeView from '../../components/TreeView'

class Category extends Component {
	componentDidMount() {
		const { actionCategoryListLoaded, actionCategoryTreeViewLoaded } = this.props

		axios('http://localhost:3333/api/categories').then(res => {
			actionCategoryListLoaded(res.data)
		})
		axios('http://localhost:3333/api/categories/children/root').then(res => {
			actionCategoryTreeViewLoaded(res.data)
		})
	}

	render() {
		// console.log(this.props)
		const { currentCategory, categories, categoriesTreeView } = this.props

		return <div>{/* <Form />
				<List /> */}</div>
	}
}
const mapStateToProps = state => ({
	currentCategory: state.category.currentCategory,
	categories: state.category.categories,
	categoriesTreeView: state.category.categoriesTreeView,
})

const mapDispatchToProps = dispatch => ({
	actionCategoryCreate: bindActionCreators(actionCategoryCreate, dispatch),
	actionCategoryUpdate: bindActionCreators(actionCategoryUpdate, dispatch),
	actionCategoryDelete: bindActionCreators(actionCategoryDelete, dispatch),
	actionCategorySetCurrent: bindActionCreators(actionCategorySetCurrent, dispatch),
	actionCategoryListLoaded: bindActionCreators(actionCategoryListLoaded, dispatch),
	actionCategoryTreeViewLoaded: bindActionCreators(actionCategoryTreeViewLoaded, dispatch),
})
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Category)
