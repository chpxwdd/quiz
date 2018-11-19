import {
	CATEGORY_CREATE,
	CATEGORY_UPDATE,
	CATEGORY_DELETE,
	CATEGORY_LIST_LOADED,
	CATEGORY_TREEVIEW_LOADED,
	CATEGORY_SET_CURRENT,
} from '../constants/category'

export const actionCategoryListLoaded = list => {
	return {
		type: CATEGORY_LIST_LOADED,
		payload: list,
	}
}

export const actionCategoryTreeViewLoaded = treeView => {
	return {
		type: CATEGORY_TREEVIEW_LOADED,
		payload: treeView,
	}
}

export const actionCategorySetCurrent = category => {
	return {
		type: CATEGORY_SET_CURRENT,
		payload: category,
	}
}

export const actionCategoryCreate = data => {
	return {
		type: CATEGORY_CREATE,
		payload: data,
	}
}

export const actionCategoryUpdate = data => {
	return {
		type: CATEGORY_UPDATE,
		payload: data,
	}
}

export const actionCategoryDelete = id => {
	return {
		type: CATEGORY_DELETE,
		payload: id,
	}
}
