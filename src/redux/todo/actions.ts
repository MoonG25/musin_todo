import { ThunkAction } from "redux-thunk";
import { RootState } from "../store";
import {
  ADD_TODO,
  COMPLETE_TODO,
  DELETE_TODO,
  EDIT_TODO,
  LOAD_TODO,
  Todo,
  TodoActionTypes,
} from "./types";

export const loadTodoList = (): ThunkAction<
  void,
  RootState,
  unknown,
  TodoActionTypes
> => async (dispatch) => {
  try {
    const response = await fetch('http://localhost:3001/todoList');
    const todoList: Todo[] = await response.json();

    dispatch({
      type: LOAD_TODO,
      payload: {todoList},
    });
  } catch (e) {
    console.error(e);
  }
};

export const addTodo = (
  todo: Omit<Todo, 'id'>
): ThunkAction<void, RootState, unknown, TodoActionTypes> => async (
  dispatch
) => {
  try {
    const response = await fetch(`http://localhost:3001/todoList`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo),
    });

    const addedTodo: Todo = await response.json();

    dispatch({
      type: ADD_TODO,
      payload: {todo: addedTodo},
    });
  } catch (e) {
    console.error(e);
  }
};

export const editTodo = (
  todo: Todo
): ThunkAction<void, RootState, unknown, TodoActionTypes> => async (
  dispatch
) => {
  try {
    const response = await fetch(`http://localhost:3001/todoList/${todo.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo),
    });

    const updatedTodo: Todo = await response.json();
    
    dispatch({
      type: EDIT_TODO,
      payload: {todo: updatedTodo},
    });
  } catch (e) {
    console.error(e);
  }
};

export const deleteTodo = (
  id: Todo['id']
): ThunkAction<void, RootState, unknown, TodoActionTypes> => async (
  dispatch
) => {
  try {
    const response = await fetch(`http://localhost:3001/todoList/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      dispatch({
        type: DELETE_TODO,
        payload: { id },
      });
    }
  } catch (e) {
    console.error(e);
  }
};

export const completeTodo = (
  todo: Todo
): ThunkAction<void, RootState, unknown, TodoActionTypes> => async (
  dispatch
) => {
  try {
    const response = await fetch(`http://localhost:3001/todoList/${todo.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo),
    });

    const completedTodo: Todo = await response.json();
    
    dispatch({
      type: COMPLETE_TODO,
      payload: {todo: completedTodo},
    });
  } catch (e) {
    console.error(e);
  }
};