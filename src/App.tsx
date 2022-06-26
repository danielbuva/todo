import DoubleClickForInput from "./components/DoubleClickForInput";
import TutorialMessage from "./components/TutorialMessage";
import { Point, TodoInterface } from "./lib/theme/types";
import { useEffect, useState, useCallback } from "react";
import LocalTime from "./components/LocalTime";
import Settings from "./components/Settings";
import Header from "./components/Header";
import Input from "./components/Input";
import List from "./components/List";
import "./App.css";

function App() {
  const [text, setText] = useState<string>(""); //used in original input will add again later

  //     s = settings
  const [sToggled, setSToggled] = useState<boolean>(false);
  const [cords, setCords] = useState<Point>({ x: 0, y: 0 });

  const [margin, setMargin] = useState<string>("");

  //     tutorial message states
  const [stepOne, setStepOne] = useState<boolean>(false);
  const [stepTwo, setStepTwo] = useState<boolean>(false);
  const [stepThree, setStepThree] = useState<boolean>(false);
  const [tutorialToggled, setTutorialToggled] = useState<boolean>(false);
  const [showTextArea, setShowTextArea] = useState<boolean>(false);

  //     g = greeting, t = time, d = date
  const [gCycle, setGCycle] = useState<number>(0);
  const [tCycle, setTCycle] = useState<number>(Number(localStorage.getItem("time format preference")) ?? 0); //default time and date format is the last set time format preference otherwise it is blank
  const [dCycle, setDCycle] = useState<number>(Number(localStorage.getItem("date format preference")) ?? 0);
  const [todoList, setTodoList] = useState<TodoInterface[]>(JSON.parse(localStorage.getItem("todoList")!) ?? []);

  //on every double click show a text area and new greeting
  const handleDoubleClick = useCallback(
    (event: MouseEvent) => {
      event.preventDefault();
      setCords({ x: event.pageX, y: event.pageY }); //sets the position of the text area
      setShowTextArea(true);
      setGCycle(gCycle + 1);
    },
    [setCords, setShowTextArea, gCycle]
  );

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }, [todoList]);

  useEffect(() => {
    document.addEventListener("dblclick", handleDoubleClick);
    return () => {
      document.removeEventListener("dblclick", handleDoubleClick);
    };
  }, [handleDoubleClick]);

  useEffect(() => {
    const listExists = todoList.find((todo) => todo.id == todo.id);
    if (listExists) {
      // if the user created a todo item then set all tutorial messages to false
      setTutorialToggled(false);
      setStepOne(false);
      setStepTwo(false);
      setStepThree(false);
    }
  }, [todoList]); // checks if lists exists on first render and when you enter a todo item
  return (
    <div className={margin}>
      {showTextArea && (
        <DoubleClickForInput cords={cords} todoList={todoList} setTodoList={setTodoList} gCycle={gCycle} setGCycle={setGCycle} setShowTextArea={setShowTextArea} />
      )}
      <Header
        setDCycle={setDCycle}
        setTCycle={setTCycle}
        sToggled={sToggled}
        tutorialToggled={tutorialToggled}
        setTutorialToggled={setTutorialToggled}
        setStepOne={setStepOne}
        setStepTwo={setStepTwo}
        setStepThree={setStepThree}
        setSToggled={setSToggled}
      />
      {sToggled && <Settings setMargin={setMargin} />}
      {!sToggled && (
        <>
          <div className="app">
            <LocalTime
              tCycle={tCycle}
              dCycle={dCycle}
              setTCycle={setTCycle}
              setDCycle={setDCycle}
              tutorialToggled={tutorialToggled}
              stepOne={stepOne}
              stepTwo={stepTwo}
              setStepOne={setStepOne}
              setStepTwo={setStepTwo}
              setStepThree={setStepThree}
            />
            <Input text={text} setText={setText} todoList={todoList} setTodoList={setTodoList} />
            <List todoList={todoList} setTodoList={setTodoList} />
            <TutorialMessage tutorialToggled={tutorialToggled} stepThree={stepThree} />
          </div>
        </>
      )}
    </div>
  );
}
export default App;
