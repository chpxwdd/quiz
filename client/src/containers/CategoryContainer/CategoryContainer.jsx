import React, { Component } from 'react'
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
import { Category } from '../components/Category'

class CategoryContainer extends Component {
	render() {
		const { categories, actionCategoryListLoaded, actionCategoryTreeViewLoaded } = this.props
		return (
			<div>
				<Category categories={categories} />
			</div>
		)
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
)(CategoryContainer)
