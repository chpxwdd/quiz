import { combineReducers } from 'redux'
import { default as category } from '../reducers/reducerCategories'

export const rootReducer = combineReducers({
	category,
})
