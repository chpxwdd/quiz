import {
	CATEGORY_CREATE,
	CATEGORY_UPDATE,
	CATEGORY_DELETE,
	CATEGORY_SET_CURRENT,
	CATEGORY_LIST_LOADED,
	CATEGORY_TREEVIEW_LOADED,
} from '../constants/category-constants'

export default (state = { categories: [], categoriesTreeView: [] }, action) => {
	switch (action.type) {
		case CATEGORY_TREEVIEW_LOADED:
			return {
				...state,
				categoriesTreeView: action.payload.categoriesTreeView,
			}
		case CATEGORY_LIST_LOADED:
			return {
				...state,
				categories: action.payload.categories,
			}
		case CATEGORY_CREATE:
			return {
				...state,
				categories: [action.payload.category].concat(state.categories),
			}
		case CATEGORY_DELETE:
			return {
				...state,
				categories: state.categories.filter(category => category._id !== action.payload),
				currentCategory: undefined,
			}
		case CATEGORY_SET_CURRENT:
			return {
				...state,
				currentCategory: action.payload,
			}
		case CATEGORY_UPDATE:
			return {
				...state,
				categories: state.categories.map(category => {
					if (category._id === action.payload.category._id) {
						return {
							...action.payload.category,
						}
					}
					return category
				}),
				currentCategory: undefined,
			}
		default:
			return state
	}
}
