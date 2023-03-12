import { useState, useEffect, useRef } from 'react';
import { InputValue } from '../lib/theme/types';
import { nanoid } from 'nanoid';

const Input = ({ text, setText, setTodoList }: InputValue) => {
  const [greeting, setGreeting] = useState<string>('');
  const [width, setWidth] = useState<string>('154px');
  const [height, setHeight] = useState<string>('23px');
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const textOnChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };
  useEffect(() => {
    if (textAreaRef && textAreaRef.current) {
      textAreaRef.current.style.height = '23px';
      textAreaRef.current.style.width = '154px';
      const textAreaHeight = textAreaRef.current.scrollHeight + 'px';
      const textAreaWidth = textAreaRef.current.scrollWidth + 'px';
      setHeight(textAreaHeight);
      setWidth(textAreaWidth);
    }
  }, [text]);

  const enterTodo = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    const key = e.key;
    {
      if (key == 'Enter' && !e.shiftKey && text.trim() != '') {
        setTodoList((todoList) => [
          ...todoList,
          {
            text: text.trim(),
            // height: textAreaRef.current?.scrollHeight + "px",
            width: width,
            height: height,
            id: nanoid(),
            completed: 'none',
            timestamp: new Date().toLocaleTimeString([], {
              hour: 'numeric',
              minute: '2-digit',
            }),
          },
        ]);
        setText('');
      }
      if (key == 'Enter' && !e.shiftKey) {
        e.preventDefault();
      }
    }
  };
  useEffect(() => {
    const d = new Date();
    if (d.getHours() < 12) {
      setGreeting('good morning');
    } else if (d.getHours() >= 12 && d.getHours() < 17) {
      //if it's after 12pm but before 5pm hehe
      setGreeting('good afternoon');
    } else if (d.getHours() >= 17) {
      setGreeting('good evening');
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
        onKeyDown={(e) => enterTodo(e)}
        value={text}
        wrap="off"
        style={{ width, height }}
      />
    </>
  );
};
export default Input;
