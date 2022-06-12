import React, { useEffect, useState, useRef, useCallback } from "react";
import "./App.css";
import { nanoid } from "nanoid";
import { createPortal } from "react-dom";

type Todo = {
  text: string;
  height: string;
  id: string;
  completed: string;
};
// type Coordinates = {
//   x: number;
//   y: number;
// };

// const ContextMenu = ({ cords }: { cords: Coordinates }) => {
//   return (
//     <>
//       <div
//         className="menu"
//         style={{
//           top: cords.y,
//           left: cords.x,
//         }}
//       >
//         <p>hi</p>
//         <p>hi</p>
//         <p>hi</p>
//         <p>hi</p>
//       </div>
//     </>
//   );
// };

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
    dateCycle == 3 && setDateCycle(0);
  }, [dateCycle]);
  useEffect(() => {
    localStorage.setItem("time preference", JSON.stringify(timeCycle));
  }, [timeCycle]);
  useEffect(() => {
    localStorage.setItem("date preference", JSON.stringify(dateCycle));
  }, [dateCycle]);
  return (
    <>
      <p className="time" onClick={() => changeTimeFormat()}>
        {`${timeFormats[timeCycle]}`}
      </p>
      <p className="date" onClick={() => changeDateFormat()}>
        {`${dateFormats[dateCycle]}`}
      </p>
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
  const enterTodo = (e: any): void => {
    const key = e.key;
    {
      if (key == "Enter" && !e.shiftKey) {
        setTodoList((todoList) => [
          ...todoList,
          {
            text: text,
            height: textAreaRef.current?.scrollHeight + "px",
            id: nanoid(),
            completed: "none",
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
    } else if (d.getHours() > 12 && d.getHours() < 17) {
      //if it's after 12pm but before 5pm hehe
      setGreeting("good afternoon");
    } else if (d.getHours() > 17) {
      setGreeting("good evening");
    } else {
      setGreeting("good afternoon");
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

// const Todos = ({
//   todoList,
//   setTodoList,
//   text,
//   setText,
// }: {
//   todoList: Todo[];
//   setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>;
//   text: string;
//   setText: React.Dispatch<React.SetStateAction<string>>;
// }) => {
//   // const [cleared, setCleared] = useState<string>();
//   // const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
//   // const textOnChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
//   //   setText(event.target.value);
//   // };
//   // useEffect(() => {
//   //   if (textAreaRef && textAreaRef.current) {
//   //     textAreaRef.current.style.minHeight = "0px";
//   //     const textAreaHeight = textAreaRef.current.scrollHeight + "px";
//   //     textAreaRef.current.style.minHeight = textAreaHeight;
//   //   }
//   // }, [text]);

//   // const enterTodo = (e: any): void => {
//   //   const key = e.key;
//   //   {
//   //     if (key == "Enter" && !e.shiftKey) {
//   //       setTodoList((todoList) => [
//   //         ...todoList,
//   //         {
//   //           text: text,
//   //           height: textAreaRef.current.scrollHeight + "px",
//   //           id: nanoid(),
//   //           completed: false,
//   //         },
//   //       ]);
//   //       setText("");
//   //     }
//   //     if (key == "Enter" && !e.shiftKey) {
//   //       e.preventDefault();
//   //     }
//   //   }
//   // };

//   //     for (const item of todoList) {
//   //       if (item.id == completedTask) { item.completed = 'line-through';
//   // break;
//   //     }}

//   //

//   // const editTodo = ( e: React.ChangeEvent<HTMLTextAreaElement>) => {
//   //  setNewText(e.target.value)};

//   // useEffect(() => {
//   //   if (textAreaRef && textAreaRef.current) {
//   //     textAreaRef.current.style.height = "0px";
//   //     const textAreaHeight = textAreaRef.current.scrollHeight + "px";
//   //     textAreaRef.current.style.height = textAreaHeight;
//   //   }
//   // }, [newText]);

//   // useEffect(() => {
//   //   localStorage.setItem("todoList", JSON.stringify(todoList.map((Todo)=>{ if (Todo.id ==)})));
//   // }, [newText]);
//   // const editTodo = ( event: React.ChangeEvent<HTMLTextAreaElement>) => {
//   //   setTodoList(
//   //     todoList.map((Todo) => {
//   //       if (Todo.text !== event.target.value) {
//   //       return {...Todo, setText(event.target.value)}
//   //       } else {return Todo}
//   //     })
//   //   );
//   // };

//   // const enterTodo = (e: any, editedTask: string): void => {
//   //   const key = e.key;
//   //   {
//   //     if (key == "Enter" && !e.shiftKey) {
//   //       editTodo(editedTask)
//   //         }
//   //       }if (key == "Enter" && !e.shiftKey) {
//   //       e.preventDefault();}}

//   //     }
//   //
//   //     }
//   //   }
//   // };
//   // const unCompleteTodo = (unCompletedTask: string) => {
//   //   setTodoList(
//   //     todoList.map((Todo) => {
//   //       if (Todo.id == unCompletedTask && !toggle) {
//   //         return { ...Todo, completed: "none" };
//   //       } else {
//   //         return Todo;
//   //       }
//   //     })
//   //   );
//   //   setToggle(!toggle);
//   // };
//   // // useEffect(()=>{ toggle && },[toggle])
//   // const [newText, setNewText] = useState<string>(text);
//   // const textOnChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
//   //   setNewText(event.target.value);
//   // };

//   // const enterTodo = (e: any, updatedTask: string): void => {
//   //   const key = e.key;
//   //   {
//   //     if (key == "Enter" && !e.shiftKey) {
//   //       updatedTodo(updatedTask);
//   //     }
//   //     if (key == "Enter" && !e.shiftKey) {
//   //       e.preventDefault();
//   //     }
//   //   }
//   // };

//   const completeTodo = (completedTask: string) => {
//     setTodoList(
//       todoList.map((todo) => {
//         if (todo.id == completedTask) {
//           if (todo.completed == "none") {
//             return { ...todo, completed: `line-through` };
//           } else if (todo.completed == "line-through") {
//             return { ...todo, completed: `none` };
//           } else return todo;
//         } else {
//           return todo;
//         }
//       })
//     );
//   };

//   // const updatedTodo = (updatedTask: string) => {
//   //   localStorage.setItem(
//   //     "todoList",
//   //     JSON.stringify(
//   //       todoList.map((todo) => {
//   //         if (todo.id == updatedTask) {
//   //           console.log({ ...todo, text: newText });
//   //           return { ...todo, text: newText };
//   //         } else {
//   //           return todo;
//   //         }
//   //       })
//   //     )
//   //   );
//   // };

//   const deleteTodo = (deleteTask: string) => {
//     setTodoList(
//       todoList.filter((todo) => {
//         return todo.id != deleteTask;
//       })
//     );
//   };

//   return (
//     <>
//       {todoList.map(({ text, height, id, completed }) => {
//               <div className="todo-container">
//               <textarea
//                 // ref={textAreaRef}
//                 className="entered-item"
//                 defaultValue={text}
//                 style={{ height: `${height}`, textDecoration: `${completed}` }}
//                 spellCheck="false"
//                 // onKeyPress={(e) => enterTodo(e, id)}
//                 // value={newText}
//                 // onChange={() => textOnChange}
//               />
//               <button
//                 onClick={() => {
//                   completeTodo(id);
//                 }}
//                 className="complete-button"
//               >
//                 o
//               </button>
//               <button onClick={() => deleteTodo(id)} className="delete-button">
//                 x
//               </button>
//             </div>
//       })}
//       {todoList.map(({text, id})=>{<input value={text} key={id}/>})}
//     </>
//   );
// };

const Text = ({
  todoList,
  setTodoList,
  text,
  setText,
  height,
  completed,
  id,
}: {
  todoList: Todo[];
  setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>;
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  height: string;
  completed: string;
  id: string;
}) => {
  const [newText, setNewText] = useState<string>(text);
  // const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
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
    localStorage.setItem(
      "todoList",
      JSON.stringify(
        todoList.map((todo) => {
          if (todo.id == updatedTask) {
            console.log({ ...todo, text: newText });
            return { ...todo, text: newText };
          } else {
            return todo;
          }
        })
      )
    );
  };

  const enterTodo = (e: any, updatedTask: string): void => {
    const key = e.key;
    {
      if (key == "Enter" && !e.shiftKey) {
        updatedTodo(updatedTask);
      }
      if (key == "Enter" && !e.shiftKey) {
        e.preventDefault();
      }
    }
  };

  const deleteTodo = (deleteTask: string) => {
    setTodoList(
      todoList.filter((todo) => {
        return todo.id != deleteTask;
      })
    );
  };
console.log(`hi` + newText)
  return (
    <>
      <div className="todo-container">
        <textarea
          // ref={textAreaRef}
          className="entered-item"
          style={{ height: `${height}`, textDecoration: `${completed}` }}
          spellCheck="false"
          onKeyPress={(e) => enterTodo(e, id)}
          value={newText}
          onChange={textOnChange}
        />
        <button
          onClick={() => {
            completeTodo(id);
          }}
          className="complete-button"
        >
          o
        </button>
        <button onClick={() => deleteTodo(id)} className="delete-button">
          x
        </button>
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
  // const [cleared, setCleared] = useState<string>();
  // const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  // const textOnChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
  //   setText(event.target.value);
  // };
  // useEffect(() => {
  //   if (textAreaRef && textAreaRef.current) {
  //     textAreaRef.current.style.minHeight = "0px";
  //     const textAreaHeight = textAreaRef.current.scrollHeight + "px";
  //     textAreaRef.current.style.minHeight = textAreaHeight;
  //   }
  // }, [text]);

  // const enterTodo = (e: any): void => {
  //   const key = e.key;
  //   {
  //     if (key == "Enter" && !e.shiftKey) {
  //       setTodoList((todoList) => [
  //         ...todoList,
  //         {
  //           text: text,
  //           height: textAreaRef.current.scrollHeight + "px",
  //           id: nanoid(),
  //           completed: false,
  //         },
  //       ]);
  //       setText("");
  //     }
  //     if (key == "Enter" && !e.shiftKey) {
  //       e.preventDefault();
  //     }
  //   }
  // };

  //     for (const item of todoList) {
  //       if (item.id == completedTask) { item.completed = 'line-through';
  // break;
  //     }}

  //

  // const editTodo = ( e: React.ChangeEvent<HTMLTextAreaElement>) => {
  //  setNewText(e.target.value)};

  // useEffect(() => {
  //   if (textAreaRef && textAreaRef.current) {
  //     textAreaRef.current.style.height = "0px";
  //     const textAreaHeight = textAreaRef.current.scrollHeight + "px";
  //     textAreaRef.current.style.height = textAreaHeight;
  //   }
  // }, [newText]);

  // useEffect(() => {
  //   localStorage.setItem("todoList", JSON.stringify(todoList.map((Todo)=>{ if (Todo.id ==)})));
  // }, [newText]);
  // const editTodo = ( event: React.ChangeEvent<HTMLTextAreaElement>) => {
  //   setTodoList(
  //     todoList.map((Todo) => {
  //       if (Todo.text !== event.target.value) {
  //       return {...Todo, setText(event.target.value)}
  //       } else {return Todo}
  //     })
  //   );
  // };

  // const enterTodo = (e: any, editedTask: string): void => {
  //   const key = e.key;
  //   {
  //     if (key == "Enter" && !e.shiftKey) {
  //       editTodo(editedTask)
  //         }
  //       }if (key == "Enter" && !e.shiftKey) {
  //       e.preventDefault();}}

  //     }
  //
  //     }
  //   }
  // };
  // const unCompleteTodo = (unCompletedTask: string) => {
  //   setTodoList(
  //     todoList.map((Todo) => {
  //       if (Todo.id == unCompletedTask && !toggle) {
  //         return { ...Todo, completed: "none" };
  //       } else {
  //         return Todo;
  //       }
  //     })
  //   );
  //   setToggle(!toggle);
  // };
  // // useEffect(()=>{ toggle && },[toggle])

  return (
    <>
      {todoList.map(({ text, height, id, completed }) => {
        return(
        <Text id={id} todoList={todoList} setTodoList={setTodoList} text={text} setText={setText} height={height} completed={completed} />
      )})}
    </>
  );
};
function App() {
  const [text, setText] = useState<string>("");
  const [todoList, setTodoList] = useState<Todo[]>(JSON.parse(localStorage.getItem("todoList")!) ?? []);

  // const [cords, setCords] = useState<Coordinates>({ x: 0, y: 0 });
  // const [menu, setMenu] = useState<boolean>(false);

  // const handleContextMenu = useCallback(
  //   (event: any) => {
  //     event.preventDefault();
  //     setCords({ x: event.pageX, y: event.pageY });
  //     setMenu(true);
  //   },
  //   [setCords, setMenu]
  // );

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
    <div className="App">
      <div className="app">
        {/* {menu && <ContextMenu cords={cords} />} */}
        <LocalTime />
        <Input text={text} setText={setText} todoList={todoList} setTodoList={setTodoList} />
        <Todos todoList={todoList} setTodoList={setTodoList} text={text} setText={setText} />
      </div>
    </div>
  );
}
export default App;
// function id(id: any) {
//   throw new Error("Function not implemented.");
// }
