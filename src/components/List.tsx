import { ListValue } from '../lib/theme/types';
import EnteredItem from './EnteredItem';

const List = ({ todoList, setTodoList }: ListValue) => {
  const clearCompleted = () => {
    setTodoList(
      todoList.filter((todo) => {
        return todo.completed != 'line-through';
      }),
    );
  };
  const clearAll = () => {
    setTodoList(
      todoList.filter((todo) => {
        return todo.id != todo.id;
      }),
    );
  };

  return (
    <>
      {todoList.find((todo) => todo.completed == 'none') ? (
        <button
          style={{ marginTop: '20px' }}
          onClick={() => {
            clearAll();
          }}
          className="clear-all-button"
        >
          clear all
        </button>
      ) : (
        <button className="clear-all-button-invisible">clear all</button>
      )}
      {todoList.map(({ text, height, width, id, completed, timestamp }) => {
        return (
          <EnteredItem
            key={id}
            id={id}
            todoList={todoList}
            setTodoList={setTodoList}
            text={text}
            height={height}
            width={width}
            completed={completed}
            timestamp={timestamp}
          />
        );
      })}
      {todoList.find((todo) => todo.completed == 'line-through') ? (
        <button
          onClick={() => {
            clearCompleted();
          }}
          className="clear-completed-button"
        >
          clear completed
        </button>
      ) : (
        <button className="clear-all-button-invisible">clear completed</button>
      )}
    </>
  );
};
export default List;
