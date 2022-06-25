import { nanoid } from "nanoid";
import React, { useState, useEffect, useRef, SetStateAction } from "react";
type Todo = {
    text: string;
    height: string;
    width: string;
    id: string;
    completed: string;
    timestamp: string;
  };
  type Coordinates = {
    x: number;
    y: number;
  };
const ClickForInput = ({
  setTodoList,
  cords,
  setShowTextArea,
  greetingCycle,
  setGreetingCycle,
}: {
  todoList: Todo[];
  setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>;
  cords: Coordinates;
  setShowTextArea: React.Dispatch<React.SetStateAction<boolean>>;
  greetingCycle: number;
  setGreetingCycle: React.Dispatch<React.SetStateAction<number>>; 
}) => {

  const [width, setWidth] = useState<string>("154px");
  const [newText, setNewText] = useState<string>("");
  const newTextAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const textOnChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewText(event.target.value);
  };
  useEffect(() => {
    if (newTextAreaRef && newTextAreaRef.current) {
      newTextAreaRef.current.style.width = "0px";
      const newTextAreaWidth = newTextAreaRef.current.scrollWidth + "px";
      newTextAreaRef.current.style.width = newTextAreaWidth;
      setWidth(newTextAreaWidth);
      // setText(newText)
    }
  }, [newText]);
  const enterTodo = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    const key = e.key;
    {
      if (key == "Enter" && !e.shiftKey && newText.trim() != "") {
        setTodoList((todoList) => [
          ...todoList,
          {
            text: newText.trim(),
            height: newTextAreaRef.current?.scrollHeight + "px",
            width: width,
            id: nanoid(),
            completed: "none",
            timestamp: new Date().toLocaleTimeString([], {
              hour: "numeric",
              minute: "2-digit",
            }),
          },
        ]);
        setNewText("");
        setGreetingCycle(greetingCycle + 1);
      }
      if (key == "Enter" && !e.shiftKey) {
        e.preventDefault();
        // e.currentTarget.blur();
      }
    }
  };

  const greetings = [
    "",
    "add task",
    "hello",
    "oi",
    "greetings",
    "hi",
    "hey",
    "nice to see you",
    "wyd",
    "how's it going?",
    "heyo gamer",
    "help me I'm trapped in here",
    "good to see you",
    "wyd today",
    "wyd rn",
    "hey brother",
    "sup",
    "hi",
    "oi",
    "hi there",
    "tudo bem?",
    "howdy",
    "look what the cat dragged in",
    "let's get stuff done",
    "good job",
    "pls help me",
    "hey gamer",
    "heyo"
    
  ];
  useEffect(() => {
    greetingCycle == greetings.length && setGreetingCycle(0);
  }, [greetingCycle]);
  /* if it's morning placeholder says good morning
   *  if it's afternoon placeholder says good afternoon
   *  if it's evening placeholder says good evening*/
  return (
    <>
      <textarea
        spellCheck="false"
        ref={newTextAreaRef}
        onChange={textOnChange}
        placeholder={`${greetings[greetingCycle]}`}
        className="floating-enter-item"
        onKeyDown={(e) => enterTodo(e)}
        onBlur={() => {
          setShowTextArea(false);
          // setGreetingCycle(greetingCycle + 1);
        }}
        // onFocus={() => setGreetingCycle(greetingCycle + 1)}
        value={newText}
        autoFocus
        wrap="off"
        style={{
          top: cords.y,
          left: cords.x,
          width: width,
        }}
      />
    </>
  );
};
export default ClickForInput;
