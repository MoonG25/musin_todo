import React, { useEffect } from 'react';
import {useDispatch} from 'react-redux';
import styled from 'styled-components';
import { openPopup } from '../../../redux/popup/actions';
import { PopupStatus } from '../../../redux/popup/types';
import { deleteTodo, editTodo } from '../../../redux/todo/actions';
import { Todo } from '../../../redux/todo/types';
import cx from 'classnames';
import { checkDeadline, stringDeadline } from '../../../lib/utils';

const TodoItemWrapper = styled.div<{level: number, isFailed: boolean}>`
  display: flex;
  width: 100%;
  min-width: 400px;
  padding: 8px;
  background-color: ${p => p.isFailed ? '#fd0909' : '#38ada9'};
  color: white;
  border-radius: 7px;
  position: relative;
  box-sizing: border-box;
  box-shadow: 5px 5px 0px -1px rgba(0,0,0,0.62);
  transition: box-shadow 100ms ease-in-out, transform 100ms ease-in-out;
  cursor: pointer;

  &:hover {
    box-shadow: none;
    background-color: #3c6382;
  }

  &.todo-completed {
    background-color: #eee;
    color: black;
    box-shadow: none;
    cursor: unset;
  }

  .todo-level {
    width: 45px;
    background-color: ${p => 
      p.level === 0 ? '#eee'
      : p.level === 1 ? p.theme.colors.yellow
      : p.level === 2 ? p.theme.colors.orange
      : p.theme.colors.red
    };
    margin-right: 1em;
    border-radius: 5px;
  }

  .todo-title {
    display: block;
    font-size: 24px;
  }

  .todo-enddate {
    font-size: 12px;
  }

  .todo-delete {
    border: none;
    cursor: pointer;
    background: none;
    font-size: 18px;
    outline: none;
  }

  .todo-actions {
    position: absolute;
    top: 5px;
    right: 5px;
    color: black;
  }
`;

type Props = {
  todo: Todo
};

const useNotification = (title: string, options?: NotificationOptions) => {
  if (!('Notification' in window)) {
    return;
  }

  const fireNotif = () => {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          new Notification(title, options);
        }
      })
    } else {
      new Notification(title, options);
    }
  };
  return fireNotif;
};

const useTimeout = (callback: any, count: number) => {
  useEffect(() => {
    const timeout = setTimeout(callback, count);
    return () => clearTimeout(timeout);
  }, []);
};

const TodoItem: React.FC<Props> = ({ todo }) => {
  const dispatch = useDispatch();

  const handleDeleteTodo = (event: React.MouseEvent) => {
    event.preventDefault();
    if(!window.confirm('정말 지우시겠습니까?')) return;
    dispatch(deleteTodo(todo.id));
  }
  
  const handleActionTodo = (event: React.MouseEvent) => {
    const { classList } = event.target as HTMLElement;
    if (classList.contains('todo-wrapper') && !classList.contains('todo-completed')) {
      dispatch(openPopup(PopupStatus.Open, todo));
    }
  }

  const handleRemind = () => {
    // 완료됐는지 확인
    // 마감기한이 있는지 확인
    // 마감기한이 지났는지 확인
    // 알림이 있는지 확인
    if (todo && !todo.isCompleted && todo.endDate && !checkDeadline(todo.endDate) && todo.remind) {

      const tDate = new Date();
      const eDate = new Date(todo.endDate);
      const diff = eDate.getTime() - tDate.getTime();
      const diffSec = Math.floor(diff / 1000);
      const remindCount = parseInt(todo.remind.toString());
      const count = diffSec - remindCount;

      console.log(diffSec, remindCount, count);

      if (count > 0) {
        const timeout = setTimeout(() => {
          if (!('Notification' in window)) {
            return;
          }

          const fireNotif = () => {
            if (Notification.permission !== 'granted') {
              Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                  new Notification('마감알림', {
                    body: `${todo.title} 마감이 ${remindCount/60}분 남았습니다.`
                  });
                }
              })
            } else {
              new Notification('마감알림', {
                body: `${todo.title} 마감이 ${remindCount/60}분 남았습니다.`
              });
            }
          };

          fireNotif();
          dispatch(editTodo({
            ...todo,
            remind: 0
          }));
        }, count*1000);
        return () => clearTimeout(timeout);

        // useTimeout(useNotification('마감알림', {
        //   body: `${todo.title} 마감이 ${todo.remind/60}분 남았습니다.`
        // }), count);
      }
    }
  }

  useEffect(() => {
    handleRemind();
  }, []);
  
  return (
    <TodoItemWrapper className={
      cx('todo-wrapper', {'todo-completed': todo.isCompleted})} 
      level={todo.level} 
      isFailed={checkDeadline(todo.endDate)}
      onClick={handleActionTodo}
    >
      <div className="todo-level"></div>
      <div>
        <span className="todo-title">{todo.title}</span>
        <span className="todo-enddate">
          {stringDeadline(todo.endDate)}
        </span>
      </div>
      <div className="todo-actions">
        <button className="todo-delete" onClick={handleDeleteTodo}>
          &times;
        </button>
      </div>
    </TodoItemWrapper>
  )
}

export default TodoItem;