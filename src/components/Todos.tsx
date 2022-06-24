import React, { useState, SetStateAction } from "react";
import { CloseCircle, ArrowCircleDown, MinusCirlce } from "iconsax-react";

type Todo = {
  text: string;
  height: string;
  width: string;
  id: string;
  completed: string;
  timestamp: string;
};

const Text = ({
  todoList,
  setTodoList,
  text,
  setText,
  height,
  width,
  completed,
  id,
  timestamp,
}: {
  todoList: Todo[];
  setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>;
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  height: string;
  width: string;
  completed: string;
  id: string;
  timestamp: string;
}) => {
  const [newText, setNewText] = useState<string>(text);
  const [showSave, setShowSave] = useState<boolean>(false);
  const textOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewText(e.target.value);
  };
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
          // ref={textAreaRef}
          className="entered-item"
          style={{ height: `${height}`, width: `${width}`, textDecoration: `${completed}` }}
          spellCheck="false"
          onKeyDown={(e) => {
            enterTodo(e, id);
          }}
          value={newText}
          onChange={() => {
            textOnChange;
          }}
          onBlur={() => updatedTodo(id)}
        />
      </div>
    </>
  );
};
const Todos = ({
  todoList,
  setTodoList,
  setText,
  setTutorialStepThree,
  tutorialStepThree,
}: {
  todoList: Todo[];
  tutorialStepThree: boolean;
  setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>;
  setText: React.Dispatch<React.SetStateAction<string>>;
  setTutorialStepThree: React.Dispatch<SetStateAction<boolean>>;
}) => {
  // const [showTodo, setShowTodo] = useState<boolean>(false);
  // const [imageClasses, setImageClasses] = useState("d-none");
  const clearCompleted = () => {
    setTodoList(
      todoList.filter((todo) => {
        return todo.completed != "line-through";
      })
    );
  };
  const clearAll = () => {
    setTodoList(
      todoList.filter((todo) => {
        return todo.id != todo.id;
      })
    );
  };

  return (
    <>
      {todoList.find((todo) => todo.completed == "none") ? (
        <button
          style={{ marginTop: "20px" }}
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
          <Text
            key={id}
            id={id}
            todoList={todoList}
            setTodoList={setTodoList}
            text={text}
            setText={setText}
            height={height}
            width={width}
            completed={completed}
            timestamp={timestamp}
          />
        );
      })}
      {todoList.find((todo) => todo.completed == "line-through") ? (
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
export default Todos;
