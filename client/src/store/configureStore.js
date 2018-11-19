import { createStore, applyMiddleware, compose } from 'redux'
import { rootReducer } from '../reducers'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

const enhancer = compose(
	applyMiddleware(thunk, logger),
	window.devToolsExtension ? window.devToolsExtension() : noop => noop
)

export const store = createStore(rootReducer, {}, enhancer)
