import { combineReducers } from 'redux'
import { default as category } from '../reducers/category-reducer'

export const rootReducer = combineReducers({
	category,
})
