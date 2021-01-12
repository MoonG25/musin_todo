export interface Todo {
  id: number;
  title: string;
  contents: string;
  level: number;
  remind: number;
  endDate: string;
  createdDate: number;
  isCompleted: boolean;
}

export interface TodoState {
  todoList: Todo[];
}

export const LOAD_TODO = 'todo/load';
export const ADD_TODO = 'todo/add';
export const EDIT_TODO = 'todo/edit';
export const DELETE_TODO = 'todo/delete';
export const COMPLETE_TODO = 'todo/complete';

interface LoadTodoAction {
  type: typeof LOAD_TODO;
  payload: {
    todoList: Todo[];
  };
}

interface AddTodoAction {
  type: typeof ADD_TODO;
  payload: {
    todo: Todo;
  };
}

interface EditTodoAction {
  type: typeof EDIT_TODO;
  payload: {
    todo: Todo;
  };
}

interface DeleteTodoAction {
  type: typeof DELETE_TODO;
  payload: {
    id: Todo['id'];
  }
}

interface CompleteTodoAction {
  type: typeof COMPLETE_TODO;
  payload: {
    todo: Todo;
  }
}

export type TodoActionTypes 
  = LoadTodoAction 
  | AddTodoAction 
  | DeleteTodoAction 
  | EditTodoAction
  | CompleteTodoAction;