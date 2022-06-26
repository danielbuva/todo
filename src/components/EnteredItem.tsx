import { CloseCircle, ArrowCircleDown, MinusCirlce } from "iconsax-react";
import { EnteredItemValue } from "../lib/theme/types";
import { useRef, useState } from "react";

const EnteredItem = ({ todoList, setTodoList, text, height, width, completed, id, timestamp }: EnteredItemValue) => {
  const [newText, setNewText] = useState<string>(text);
  const [showSave, setShowSave] = useState<boolean>(false);
  const textOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewText(e.target.value);
  };
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const completeTodo = (completedTask: string) => {
    setTodoList(
      todoList.map((todo) => {
        if (todo.id == completedTask) {
          if (todo.completed == "none") {
            return { ...todo, completed: `line-through` };
          } else if (todo.completed == "line-through") {
            return { ...todo, completed: `none` };
          } else return todo;
        } else {
          return todo;
        }
      })
    );
  };

  const updatedTodo = (updatedTask: string) => {
    if (newText.trim() != "") {
      const updatedTodo = todoList.map((todo) => {
        if (todo.id == updatedTask) {
          return { ...todo, text: newText.trim() };
        } else {
          return todo;
        }
      });

      setTodoList(updatedTodo);
    } else {
      deleteTodo(id);
    }

    setShowSave(false);
  };

  const enterTodo = (e: React.KeyboardEvent<HTMLTextAreaElement>, updatedTask: string): void => {
    const key = e.key;

    setShowSave(true);
    if (key == "Enter" && !e.shiftKey) {
      updatedTodo(updatedTask);
      e.preventDefault();
      e.currentTarget.blur();
      setShowSave(false);
    }
  };
  const deleteTodo = (deleteTask: string) => {
    setTodoList(
      todoList.filter((todo) => {
        return todo.id != deleteTask;
      })
    );
  };
  return (
    <>
      <div className="todo-container">
        <div className="extra">
          <p className="timestamp">～{timestamp}～</p>
          <div className="buttons">
            <CloseCircle onClick={() => deleteTodo(id)} className="delete-button" size={16} />{" "}
            <MinusCirlce
              onClick={() => {
                completeTodo(id);
              }}
              className="complete-button"
              size={16}
            />
            {showSave ? (
              <ArrowCircleDown
                className="save-button"
                onClick={() => {
                  setShowSave(false);
                  updatedTodo(id);
                }}
                size={15}
              />
            ) : (
              <ArrowCircleDown className="save-button-space" size={16} />
            )}
          </div>
        </div>
        <textarea
          ref={textAreaRef}
          className="entered-item"
          style={{ height: `${height}`, width: `${width}`, textDecoration: `${completed}` }}
          spellCheck="false"
          onKeyDown={(e) => {
            enterTodo(e, id);
          }}
          value={newText}
          onChange={textOnChange}
          onBlur={() => updatedTodo(id)}
        />
      </div>
    </>
  );
};
export default EnteredItem;
