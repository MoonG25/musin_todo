import {TodoState, TodoActionTypes, ADD_TODO, DELETE_TODO, LOAD_TODO, EDIT_TODO, Todo, COMPLETE_TODO} from './types';

const initialState: TodoState = {
  todoList: [],
};

export function todoReducer (
  state = initialState,
  action: TodoActionTypes
): TodoState {
  switch (action.type) {
    case LOAD_TODO:
      const {todoList} = action.payload;
      return {
        ...state,
        todoList 
      };
    case ADD_TODO: {
      const {todo} = action.payload;
      return {
        ...state,
        todoList: [
          ...state.todoList,
          todo
        ]
      };
    }
    case EDIT_TODO: {
      const {todo} = action.payload;
      return {
        ...state,
        todoList: state.todoList.map(t => {
          if (t.id === todo.id) t = todo;
          return t;
        })
      };
    }
    case DELETE_TODO:
      return {
        ...state,
        todoList: state.todoList.filter(
          todo => todo.id !== action.payload.id
        )
      };
    case COMPLETE_TODO: {
      const {todo} = action.payload;
      return {
        ...state,
        todoList: state.todoList.map(t => {
          if (t.id === todo.id) t = todo;
          return t;
        })
      }
    }
    default:
      return state;
  }
}