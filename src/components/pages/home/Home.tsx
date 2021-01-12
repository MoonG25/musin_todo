import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Layout, Popup } from '../../common';
import { connect, ConnectedProps, useDispatch } from 'react-redux';
import { loadTodoList } from '../../../redux/todo/actions';
import { RootState } from '../../../redux/store';

import TodoItem from './TodoItem';
import { Todo } from '../../../redux/todo/types';
import { openPopup } from '../../../redux/popup/actions';
import { PopupStatus } from '../../../redux/popup/types';
import { checkDeadline } from '../../../lib/utils';

const mapState = (state: RootState) => ({
  todoList: state.todo.todoList,
});

const mapDispatch = {
  loadTodoList
};

const connector = connect(mapState, mapDispatch);

type Props = ConnectedProps<typeof connector>;

const Contents = styled.div`
  width: 100%;
  min-width: 400px;
  box-sizing: border-box;
  /* border: 1px solid black;
  border-radius: 8px; */
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 16px 0;

  .sort-list {
    display: flex;
    gap: 10px;
  }
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  border-bottom: 1px solid black;
`;

const AddButton = styled.span`
  font-size: 14px;
  color: midnightblue;
  text-decoration: underline;
  margin-left: 1em;
  cursor: pointer;
`;

const SortButton = styled.div<{ isActive: boolean }>`
  cursor: pointer;
  font-weight: ${p => p.isActive ? 800 : 400};
  text-decoration: ${p => p.isActive ? 'underline' : 'none'};

  &:hover {
    opacity: 0.7;
  }
`;

enum TodoKey {
  All, Completed, Failed
}

const filterTodoList = (todoList: Todo[], todoKey: TodoKey) => {
  if (!todoList) return [];
  switch (todoKey) {
    case TodoKey.All:
      return todoList;
    case TodoKey.Completed:
      return todoList.filter(todo => todo.isCompleted === true);
    case TodoKey.Failed:
      return todoList.filter(todo => {
        if (!todo.isCompleted && checkDeadline(todo.endDate)) return todo;
      });
    default:
      return todoList;
  }
}

const Home: React.FC<Props> = ({ todoList, loadTodoList }) => {
  const [todoKey, setTodoKey] = useState(TodoKey.All);
  const dispatch = useDispatch();

  const handleChangeKey = (tk: TodoKey) => {
    setTodoKey(tk);
  }

  const handleOpenPopup = () => {
    dispatch(openPopup(PopupStatus.Open));
  }

  useEffect(() => {
    loadTodoList();
  }, []);

  return (
    <Layout>
      <h1>할 일 목록</h1>
      <p>잊지말고 합시다.<AddButton onClick={handleOpenPopup}>추가하기</AddButton></p>
      <Line />
      <Contents>
        <div className="sort-list">
          <SortButton isActive={todoKey === TodoKey.All}
            onClick={() => handleChangeKey(TodoKey.All)}>
            All
          </SortButton>
          <SortButton isActive={todoKey === TodoKey.Completed}
            onClick={() => handleChangeKey(TodoKey.Completed)}>
            Completed
          </SortButton>
          <SortButton isActive={todoKey === TodoKey.Failed} 
            onClick={() => handleChangeKey(TodoKey.Failed)}>
            Failed
          </SortButton>
        </div>
        {
          filterTodoList(todoList, todoKey).map((todo) =>
            <TodoItem key={todo.id} todo={todo} />).sort((a: any, b: any) => a.createdDate - b.createdDate ? 1 : -1)
        }
      </Contents>
      <Popup />
    </Layout>
  )
};

export default connector(Home);