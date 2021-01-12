import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import styled from 'styled-components';
import { closePopup } from '../../../redux/popup/actions';
import {addTodo, completeTodo, editTodo} from '../../../redux/todo/actions';
import { Todo } from '../../../redux/todo/types';
import {Button, Input, Select, Spinner} from '../../common';

const Form = styled.form`
  width: 100%;
  max-width: 400px;
  background: white;
  border: 1px solid #eee;
  padding: 16px;
  box-sizing: border-box;
  color: black;
  border-radius: 4px;

  .todo-delete {
    border: none;
    cursor: pointer;
    background: none;
    font-size: 18px;
    outline: none;
    margin-bottom: 1em;
    float: right;
  }
`;

const initialFields = {
  title: '',
  contents: '',
  remind: 0,
  level: 0,
  endDate: ''
};

type Props = {
  selectedTodo?: Todo;
};

const TodoForm: React.FC<Props> = ({selectedTodo}) => {
  const [fields, setFields] = useState({...initialFields});
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (fields.title === '') {
      alert('할 일을 입력해주세요');
      return;
    }

    dispatch(addTodo({
      ...fields,
      createdDate: Date.now(),
      isCompleted: false,
    }));
    handleClosePopup();
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement|HTMLSelectElement>) => {
    const {name, value} = event.target;
    setFields(s => ({
      ...s,
      [name]: (name === 'level') ? parseInt(value) : value
    }));
  }

  const handleCompleteTodo = () => {
    const completedTodo: any = {...fields};
    completedTodo.isCompleted = true;
    dispatch(completeTodo(completedTodo));
    handleClosePopup();
  }

  const handleEditTodo = () => {
    const editedTodo: any = {...fields};
    editedTodo.id = selectedTodo?.id;
    dispatch(editTodo(editedTodo));
    handleClosePopup();
  }

  const handleClosePopup = () => {
    dispatch(closePopup());
    setFields(initialFields);
  }

  useEffect(() => {
    if (selectedTodo) {
      setFields(s => ({
        ...s,
        ...selectedTodo
      }));
    }
  }, []);

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <button type="button" className="todo-delete" onClick={handleClosePopup}>&times;</button>
        <Input 
          disabled={loading}
          value={fields.title}
          onChange={handleInputChange}
          name="title" 
          type="text" 
          placeholder="할 일" 
        />
        <Input 
          disabled={loading}
          value={fields.contents}
          onChange={handleInputChange}
          name="contents" 
          type="text" 
          placeholder="내용" 
        />
        <Select
          name="remind"
          onChange={handleInputChange}>
          <option value={0}>없음</option>
          <option value={300}>5분</option>
          <option value={600}>10분</option>
          <option value={900}>15분</option>
          <option value={1800}>30분</option>
          <option value={3600}>60분</option>
        </Select>
        <Select 
          name="level"
          onChange={handleInputChange}>
          <option value={0}>없음</option>
          <option value={1}>조금 중요함</option>
          <option value={2}>중요함</option>
          <option value={3}>많이 중요함</option>
        </Select>
        <Input 
          disabled={loading}
          value={fields.endDate}
          onChange={handleInputChange}
          name="endDate" 
          type="datetime-local" 
          placeholder="종료일"
        />
        {
          selectedTodo ? (
            <>
              <Button type="button" onClick={handleCompleteTodo}>완료</Button>
              <Button type="button" onClick={handleEditTodo}>수정</Button>
            </>
          ) : (
            <Button disabled={loading}>{loading ? <Spinner /> : '저장' }</Button>
          )
        }
      </Form>
    </>
  )
}

export default TodoForm;