import React from 'react';
import { connect, ConnectedProps, useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { closePopup } from '../../redux/popup/actions';
import { PopupStatus } from '../../redux/popup/types';
import { RootState } from '../../redux/store';
import TodoForm from '../pages/home/TodoForm';

const PopupWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
`;

const mapState = (state: RootState) => ({
  todo: state.popup.todo,
  status: state.popup.status
});

const connector = connect(mapState);

type Props = ConnectedProps<typeof connector>;

const Popup: React.FC<Props> = ({todo, status}) => {
  const dispatch = useDispatch();
  const selectedTodo = useSelector((state: RootState) => {
    return state.todo.todoList.filter(t => t.id === todo?.id)[0];
  });

  const handleClosePopup = (e: React.MouseEvent) => {
    const target: HTMLElement = e.target as HTMLElement;
    if (target.id === 'popup') {
      dispatch(closePopup());
    }
  }

  return status === PopupStatus.Close ? (
    <></>
  ) : (
    <PopupWrapper id="popup">
      <TodoForm selectedTodo={selectedTodo} />
    </PopupWrapper>
  );
};

export default connector(Popup);