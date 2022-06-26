import { useState, useEffect, useRef } from "react";
import { dbConfig } from "../lib/theme/types";
import { greetings } from "../assets/cycles";
import { Textarea } from "@chakra-ui/react";
import { nanoid } from "nanoid";

//db = doubleclick

const DoubleClickForInput = ({ setTodoList, cords, setShowTextArea, gCycle, setGCycle }: dbConfig) => {
  const [width, setWidth] = useState<string>("154px");
  const [dbValue, setdbValue] = useState<string>("");
  const newTextAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const textOnChange = (ev: React.ChangeEvent<HTMLTextAreaElement>) => {
    setdbValue(ev.target.value);
  };

  const enterTodo = (ev: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    const key = ev.key;
    {
      if (key == "Enter" && !ev.shiftKey && dbValue.trim() != "") {
        setTodoList((todoList) => [
          ...todoList,
          {
            text: dbValue.trim(),
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
        setdbValue("");
        setGCycle(gCycle + 1);
      }
      if (key == "Enter" && !ev.shiftKey) {
        ev.preventDefault();
        // e.currentTarget.blur();
      }
    }
  };

  useEffect(() => {
    if (newTextAreaRef && newTextAreaRef.current) {
      newTextAreaRef.current.style.width = "0px";
      const newTextAreaWidth = newTextAreaRef.current.scrollWidth + "px";
      newTextAreaRef.current.style.width = newTextAreaWidth;
      setWidth(newTextAreaWidth);
    }
  }, [dbValue]);

  useEffect(() => {
    gCycle == greetings.length && setGCycle(0);
  }, [gCycle]);

  return (
    <>
      <Textarea
        spellCheck="false"
        ref={newTextAreaRef}
        onChange={textOnChange}
        placeholder={`${greetings[gCycle]}`}
        className="floating-enter-item"
        onKeyDown={(e) => enterTodo(e)}
        onBlur={() => {
          setShowTextArea(false);
        }}
        value={dbValue}
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
export default DoubleClickForInput;
