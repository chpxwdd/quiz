import React, { Component } from 'react'
import axios from 'axios'
import { FormGroup, FormControl, ControlLabel, HelpBlock, Button } from 'react-bootstrap'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
	actionCategoryCreate,
	actionCategoryUpdate,
	actionCategoryListLoaded,
	actionCategoryTreeViewLoaded,
} from '../../../actions/actionCategories'

class Form extends Component {
	constructor(props) {
		super(props)

		this.state = {
			title: '',
			description: '',
			parent: '',
		}
		this.handleChangeField = this.handleChangeField.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	componentDidMount() {
		const { actionCategoryListLoaded } = this.props
		axios('http://localhost:3333/api/categories').then(res => actionCategoryListLoaded(res.data))
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.currentCategory) {
			this.setState({
				// index: nextProps.currentCategory.index,
				title: nextProps.currentCategory.title,
				description: nextProps.currentCategory.description,
				parent: nextProps.currentCategory.parent,
			})
		}
	}

	handleSubmit() {
		const { actionCategoryCreate, actionCategoryUpdate, currentCategory } = this.props
		const { title, description, parent } = this.state

		if (!currentCategory) {
			return axios
				.post('http://localhost:3333/api/categories', {
					title,
					description,
					parent,
				})
				.then(res => actionCategoryCreate(res.data))
				.then(() => this.setState({ title: '', description: '', parent: '' }))
		} else {
			return axios
				.patch(`http://localhost:3333/api/categories/${currentCategory._id}`, {
					title,
					description,
					parent,
				})
				.then(res => actionCategoryUpdate(res.data))
				.then(() => this.setState({ title: '', description: '', parent: '' }))
		}
	}

	handleChangeField(key, event) {
		// if (key === 'parent') {
		// console.log(event.target)
		// }

		this.setState({
			[key]: event.target.value,
		})
	}

	render() {
		const { title, description, parent } = this.state
		const { currentCategory, categories } = this.props

		return (
			<form>
				<FormGroup controlId="parent">
					<ControlLabel>Parent Category</ControlLabel>
					<FormControl
						value={currentCategory ? currentCategory.parent : parent} // если чо нить выбрано то устанавливаем его парэнт иначе тот который выбрали
						componentClass="select"
						placeholder="Choose parent category"
						onChange={event => this.handleChangeField('parent', event)}
					>
						<option value="0">Корневая категория</option>
						{categories.map((category, key) => {
							return (
								<option
									value={category._id}
									key={'item' + key}
									// selected={currentCategory && currentCategory.parent === category._id ? 'selected' : ''}
								>
									{category.title}
								</option>
							)
						})}
					</FormControl>
				</FormGroup>
				<FormGroup controlId="title">
					<ControlLabel>Title</ControlLabel>
					<FormControl type="text" value={title} onChange={event => this.handleChangeField('title', event)} />
					<FormControl.Feedback />
					<HelpBlock />
				</FormGroup>
				<FormGroup controlId="description">
					<ControlLabel>Desctription</ControlLabel>
					<FormControl
						componentClass="textarea"
						value={description}
						onChange={event => this.handleChangeField('description', event)}
					/>
					<FormControl.Feedback />
					<HelpBlock />
				</FormGroup>
				<Button type="button" onClick={() => this.handleSubmit()} bsStyle="primary">
					{currentCategory ? 'Сохранить' : 'Создать'}
				</Button>
			</form>
		)
	}
}
// const mapStateToProps = state => ({
// 	currentCategory: state.category.currentCategory,
// 	categories: state.category.categories,
// 	categoriesTreeView: state.category.categoriesTreeView,
// })

// const mapDispatchToProps = dispatch => ({
// 	actionCategoryTreeViewLoaded: bindActionCreators(actionCategoryTreeViewLoaded, dispatch),
// 	actionCategoryListLoaded: bindActionCreators(actionCategoryListLoaded, dispatch),
// 	actionCategoryCreate: bindActionCreators(actionCategoryCreate, dispatch),
// 	actionCategoryUpdate: bindActionCreators(actionCategoryUpdate, dispatch),
// })

// export default connect(
// 	mapStateToProps,
// 	mapDispatchToProps
// )(Form)
export default Form
