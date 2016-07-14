import { createStore, applyMiddleware, compose } from "redux"
import createDebounce from 'redux-debounced';
import thunkMiddleware from "redux-thunk"
import createLogger from "redux-logger"
import myReducer from "./reducers"

const loggerMiddleware = createLogger();

export default function configureStore(initialState) {
  return createStore(
    myReducer,
    initialState,
    compose(
      applyMiddleware(
        createDebounce(),
        thunkMiddleware,
        loggerMiddleware
      ),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  )
}
