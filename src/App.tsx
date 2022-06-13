import React, { useEffect, useState, useRef, useCallback, SetStateAction } from "react";
import "./App.css";
import { nanoid } from "nanoid";
import { createPortal, findDOMNode } from "react-dom";
import { Setting2, Edit2, CloseCircle, ArrowCircleDown, MinusCirlce } from "iconsax-react";

type Todo = {
  text: string;
  height: string;
  id: string;
  completed: string;
  timestamp: string;
};
type Coordinates = {
  x: number;
  y: number;
};
// const ContextMenu = ({ cords1 }: { cords1: Coordinates }) => {
//   return (
//     <>
//       <div
//         className="menu"
//         style={{
//           top: cords1.y,
//           left: cords1.x,
//         }}
//       >
//         <textarea/>

//       </div>
//     </>
//   );
// };
const Settings = ({setMargin}:{setMargin: React.Dispatch<SetStateAction<string>>}) => {
  return (
    <>
      <p>theme </p>
      <div>
        <button>preset</button>
        <button>custom</button>
      </div>
      <p>placeholder</p>
      <p>time</p>
      <div>
        appearance<p>margin</p>
        <button onClick={()=>setMargin('App-left')}>left</button>
        <button onClick={()=>setMargin('App-center')}>center</button>
        <button onClick={()=>setMargin('App-right')}>right</button>
      </div>
      <div>
        preferences
        <p>organize completed</p>
        <p>font size</p>
        <p>font weight</p>
      </div>
    </>
  );
};
const Header = ({ isShowingSettings, setIsShowingSettings }: { isShowingSettings: boolean; setIsShowingSettings: React.Dispatch<SetStateAction<boolean>> }) => {
  return (
    <div className="nav">
      <Setting2 size="21" color="black" cursor="pointer" className="settings-button" onClick={() => setIsShowingSettings(!isShowingSettings)} />
    </div>
  );
};
const LocalTime = () => {
  const [time, setTime] = useState({ clock: new Date() }); //initial state is an object where clock is a new Date
  const [timeCycle, setTimeCycle] = useState<number>(Number(localStorage.getItem("time preference")) ?? 0);
  const [dateCycle, setDateCycle] = useState<number>(Number(localStorage.getItem("date preference")) ?? 0);

  const tick = () => {
    setTime({ clock: new Date() });
  }; // updates the state
  useEffect(() => {
    setInterval(() => tick(), 1000); //every second the state is updated
  }, []); //every update the useEffect renders again
  const timeFormats = [
    time.clock.toLocaleTimeString(),
    time.clock.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
    time.clock.toLocaleTimeString().replace("AM", "").replace("PM", ""),
    time.clock
      .toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
      .replace("AM", "")
      .replace("PM", ""),
    "",
  ];
  const dateFormats = [
    time.clock.toLocaleDateString([], {
      month: "long",
      day: "numeric",
      weekday: "long",
      year: "numeric",
    }),
    time.clock.toLocaleDateString([], {
      weekday: "long",
      month: "long",
      day: "numeric",
    }),
    time.clock.toLocaleDateString([], {
      month: "long",
      day: "numeric",
    }),
    time.clock.toLocaleDateString([], {
      day: "numeric",
      weekday: "long",
    }),
    time.clock.toLocaleDateString(),
    "",
  ];
  const changeTimeFormat = () => {
    setTimeCycle(timeCycle + 1);
  };
  useEffect(() => {
    timeCycle == 5 && setTimeCycle(0);
  }, [timeCycle]);
  const changeDateFormat = () => {
    setDateCycle(dateCycle + 1);
  };
  useEffect(() => {
    dateCycle == 6 && setDateCycle(0);
  }, [dateCycle]);
  useEffect(() => {
    localStorage.setItem("time preference", JSON.stringify(timeCycle));
  }, [timeCycle]);
  useEffect(() => {
    localStorage.setItem("date preference", JSON.stringify(dateCycle));
  }, [dateCycle]);
  return (
    <>
      <div className="clock">
        <p className="time" onClick={() => changeTimeFormat()}>
          {`${timeFormats[timeCycle]}`}
        </p>
        <p className="date" onClick={() => changeDateFormat()}>
          {`${dateFormats[dateCycle]}`}
        </p>
      </div>
    </>
  );
};
const ClickForInput = ({
  text,
  setText,
  setTodoList,
  cords,
  setShowTextArea,
}: {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  todoList: Todo[];
  setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>;
  cords: Coordinates;
  setShowTextArea: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  // const [greeting, setGreeting] = useState<string>("");
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const textOnChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };
  // useEffect(() => {
  //   if (textAreaRef && textAreaRef.current) {
  //     textAreaRef.current.style.height = "0px";
  //     const textAreaHeight = textAreaRef.current.scrollHeight + "px";
  //     textAreaRef.current.style.height = textAreaHeight;
  //   }
  // }, [text]);
  const enterTodo = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    const key = e.key;
    {
      if (key == "Enter" && !e.shiftKey && text.trim() != "") {
        setTodoList((todoList) => [
          ...todoList,
          {
            text: text.trim(),
            height: textAreaRef.current?.scrollHeight + "px",
            id: nanoid(),
            completed: "none",
            timestamp: new Date().toLocaleTimeString([], {
              hour: "numeric",
              minute: "2-digit",
            }),
          },
        ]);

        setText("");
      }
      if (key == "Enter" && !e.shiftKey) {
        e.preventDefault();
        e.currentTarget.blur();
      }
    }
  };
  // useEffect(() => {
  //   const d = new Date();
  //   if (d.getHours() < 12) {
  //     setGreeting("good morning");
  //   } else if (d.getHours() >= 12 && d.getHours() < 17) {
  //     //if it's after 12pm but before 5pm hehe
  //     setGreeting("good afternoon");
  //   } else if (d.getHours() >= 17) {
  //     setGreeting("good evening");
  //   }
  // }, []);
  /* if it's morning placeholder says good morning
   *  if it's afternoon placeholder says good afternoon
   *  if it's evening placeholder says good evening*/
  return (
    <>
      <textarea
        spellCheck="false"
        ref={textAreaRef}
        onChange={textOnChange}
        // placeholder={greeting}
        className="floating-enter-item"
        onKeyPress={(e) => {
          enterTodo(e);
        }}
        onBlur={() => setShowTextArea(false)}
        value={text}
        autoFocus
        style={{
          top: cords.y,
          left: cords.x,
          // height: textAreaRef.current?.scrollHeight + "px",
        }}
      />
    </>
  );
};
const Input = ({
  text,
  setText,
  setTodoList,
}: {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  todoList: Todo[];
  setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>;
}) => {
  const [greeting, setGreeting] = useState<string>("");
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const textOnChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };
  useEffect(() => {
    if (textAreaRef && textAreaRef.current) {
      textAreaRef.current.style.height = "0px";
      const textAreaHeight = textAreaRef.current.scrollHeight + "px";
      textAreaRef.current.style.height = textAreaHeight;
    }
  }, [text]);
  const enterTodo = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    const key = e.key;
    {
      if (key == "Enter" && !e.shiftKey && text.trim() != "") {
        setTodoList((todoList) => [
          ...todoList,
          {
            text: text.trim(),
            height: textAreaRef.current?.scrollHeight + "px",
            id: nanoid(),
            completed: "none",
            timestamp: new Date().toLocaleTimeString([], {
              hour: "numeric",
              minute: "2-digit",
            }),
          },
        ]);

        setText("");
      }
      if (key == "Enter" && !e.shiftKey) {
        e.preventDefault();
      }
    }
  };
  useEffect(() => {
    const d = new Date();
    if (d.getHours() < 12) {
      setGreeting("good morning");
    } else if (d.getHours() >= 12 && d.getHours() < 17) {
      //if it's after 12pm but before 5pm hehe
      setGreeting("good afternoon");
    } else if (d.getHours() >= 17) {
      setGreeting("good evening");
    }
  }, []);
  /* if it's morning placeholder says good morning
   *  if it's afternoon placeholder says good afternoon
   *  if it's evening placeholder says good evening*/
  return (
    <>
      <textarea
        spellCheck="false"
        ref={textAreaRef}
        onChange={textOnChange}
        placeholder={greeting}
        className="enter-item"
        onKeyPress={(e) => enterTodo(e)}
        value={text}
      />
    </>
  );
};
const Text = ({
  todoList,
  setTodoList,
  text,
  setText,
  height,
  completed,
  id,
  timestamp,
}: {
  todoList: Todo[];
  setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>;
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  height: string;
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
        <textarea
          // ref={textAreaRef}
          className="entered-item"
          style={{ height: `${height}`, textDecoration: `${completed}` }}
          spellCheck="false"
          onKeyDown={(e) => {
            enterTodo(e, id);
          }}
          value={newText}
          onChange={textOnChange}
          onBlur={() => updatedTodo(id)}
        />

        <div className="timestamp">～{timestamp}～</div>
        {showSave ? (
          <ArrowCircleDown
            className="save-button"
            onClick={() => {
              setShowSave(false);
              updatedTodo(id);
            }}
          >
            v
          </ArrowCircleDown>
        ) : (
          <ArrowCircleDown className="save-button-space">v</ArrowCircleDown>
        )}
        <MinusCirlce
          onClick={() => {
            completeTodo(id);
          }}
          className="complete-button"
        >
          o
        </MinusCirlce>
        <CloseCircle onClick={() => deleteTodo(id)} className="delete-button">
          x
        </CloseCircle>
      </div>
    </>
  );
};
const Todos = ({
  todoList,
  setTodoList,
  text,
  setText,
}: {
  todoList: Todo[];
  setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>;
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [showClear, setShowClear] = useState<boolean>(false);
  const clearCompleted = () => {
    setTodoList(
      todoList.filter((todo) => {
        return todo.completed != "line-through";
      })
    );
  };
  // const deleteTodo = (deleteTask: string) => {
  //   setTodoList(
  //     todoList.filter((todo) => {
  //       return todo.id != deleteTask;
  //     })
  //   );
  // };
  return (
    <>
      {todoList.map(({ text, height, id, completed, timestamp }) => {
        return (
          <Text
            key={id}
            id={id}
            todoList={todoList}
            setTodoList={setTodoList}
            text={text}
            setText={setText}
            height={height}
            completed={completed}
            timestamp={timestamp}
          />
        );
      })}
      {todoList.find((todo) => todo.completed == "line-through") && (
        <button
          onClick={() => {
            clearCompleted();
          }}
          style={{ border: "none", cursor: "pointer", width: "fit-content", margin: "auto", marginTop: "10px" }}
        >
          clear completed
        </button>
      )}
    </>
  );
};
function App() {
  const [text, setText] = useState<string>("");
  const [todoList, setTodoList] = useState<Todo[]>(JSON.parse(localStorage.getItem("todoList")!) ?? []);
  const [isShowingSettings, setIsShowingSettings] = useState<boolean>(false);
  // const [cords1, setCords1] = useState<Coordinates>({ x: 0, y: 0 });
  // const [menu, setMenu] = useState<boolean>(false);
  const [cords, setCords] = useState<Coordinates>({ x: 0, y: 0 });
  const [showTextArea, setShowTextArea] = useState<boolean>(false);
  const [margin, setMargin]=useState<string>('')

  const handleDoubleClick = useCallback(
    (event: MouseEvent) => {
      event.preventDefault();
      setCords({ x: event.pageX, y: event.pageY });
      setShowTextArea(true);
    },
    [setCords, setShowTextArea]
  );
  // const handleClick = useCallback(() => (showTextArea ? setShowTextArea(false) : null), [showTextArea]);
  // const handleContextMenu = useCallback(
  //   (event: any) => {
  //     event.preventDefault();
  //     setCords1({ x: event.pageX, y: event.pageY });
  //     setMenu(true);
  //   },
  //   [setCords1, setMenu]
  // );
  // const handleContextMenu = useCallback(
  //   (event: any) => {
  //     event.preventDefault();
  //     setCords({ x: event.pageX, y: event.pageY });
  //     setTextArea(true);
  //   },
  //   [setCords, setTextArea]
  // );

  useEffect(() => {
    document.addEventListener("dblclick", handleDoubleClick);
    return () => {
      document.removeEventListener("dblclick", handleDoubleClick);
    };
  });
  // useEffect(() => {
  //   document.addEventListener("click", handleClick);
  //   return () => {
  //     document.removeEventListener("click", handleClick);
  //   };
  // });

  // useEffect(() => {
  //   document.addEventListener("contextmenu", handleContextMenu);
  //   return () => {
  //     document.removeEventListener("contextmenu", handleContextMenu);
  //   };
  // });
  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }, [todoList]);
  return (
    <div className={margin}>
      {/* {menu && <ContextMenu cords1={cords1} />} */}
      {showTextArea && <ClickForInput cords={cords} setShowTextArea={setShowTextArea} text={text} setText={setText} todoList={todoList} setTodoList={setTodoList} />}
      <Header isShowingSettings={isShowingSettings} setIsShowingSettings={setIsShowingSettings} />
      {isShowingSettings && <Settings setMargin={setMargin}/>}
      {!isShowingSettings && (
        <>
          <div className="app">
            <LocalTime />
            {/* <Input text={text} setText={setText} todoList={todoList} setTodoList={setTodoList} /> */}
            <Todos todoList={todoList} setTodoList={setTodoList} text={text} setText={setText} />
          </div>
        </>
      )}
    </div>
  );
}
export default App;
// function id(id: any) {
//   throw new Error("Function not implemented.");
// }
