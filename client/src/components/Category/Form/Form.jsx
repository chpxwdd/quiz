import React, { Component } from 'react'
import axios from 'axios'
import { FormGroup, FormControl, ControlLabel, HelpBlock, Button, ButtonGroup } from 'react-bootstrap'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
	actionCategoryCreate,
	actionCategoryUpdate,
	actionCategoryDelete,
	actionCategoryListLoaded,
	actionCategorySetCurrent,
} from '../../../actions/actionCategories'

class Form extends Component {
	constructor(props) {
		super(props)

		this.state = {
			title: '',
			description: '',
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
			})
		}
	}

	handleSubmit() {
		const { actionCategoryCreate, actionCategoryUpdate, currentCategory } = this.props
		const { title, description } = this.state

		if (!currentCategory) {
			return axios
				.post('http://localhost:3333/api/categories', {
					title,
					description,
				})
				.then(res => actionCategoryCreate(res.data))
				.then(() => this.setState({ title: '', description: '' }))
		} else {
			return axios
				.patch(`http://localhost:3333/api/categories/${currentCategory._id}`, {
					title,
					description,
				})
				.then(res => actionCategoryUpdate(res.data))
				.then(() => this.setState({ title: '', description: '' }))
		}
	}

	handleChangeField(key, event) {
		this.setState({
			[key]: event.target.value,
		})
	}

	render() {
		const { title, description } = this.state
		const { currentCategory, categories } = this.props

		return (
			<form>
				<FormGroup controlId="parent">
					<ControlLabel>Parent</ControlLabel>
					<FormControl componentClass="select" placeholder="select">
						{categories.map((category, key) => {
							return (
								<option value={category._id} key={'item' + key}>
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
const mapStateToProps = state => ({
	currentCategory: state.category.currentCategory,
	categories: state.category.categories,
})

const mapDispatchToProps = dispatch => ({
	actionCategoryListLoaded: bindActionCreators(actionCategoryListLoaded, dispatch),
	actionCategoryCreate: bindActionCreators(actionCategoryCreate, dispatch),
	actionCategoryUpdate: bindActionCreators(actionCategoryUpdate, dispatch),
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Form)
