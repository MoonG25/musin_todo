import {applyMiddleware, combineReducers, createStore} from 'redux';
import {todoReducer} from './todo/reducers';
import {popupReducer} from './popup/reducers';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  todo: todoReducer,
  popup: popupReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;