import TutorialMessage from "./components/TutorialMessage";
import { useEffect, useState, useCallback } from "react";
import ClickForInput from "./components/ClickForInput";
import LocalTime from "./components/LocalTime";
import Settings from "./components/Settings";
import Header from "./components/Header";
import Todos from "./components/Todos";
import "./App.css";

// import Input from "./components/Input";

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

function App() {
  const [timeCycle, setTimeCycle] = useState<number>(Number(localStorage.getItem("time preference")) ?? 0);
  const [dateCycle, setDateCycle] = useState<number>(Number(localStorage.getItem("date preference")) ?? 0);
  const [greetingCycle, setGreetingCycle] = useState<number>(0);
  const [text, setText] = useState<string>(""); //used in original input will add again later
  const [todoList, setTodoList] = useState<Todo[]>(JSON.parse(localStorage.getItem("todoList")!) ?? []);
  const [isShowingSettings, setIsShowingSettings] = useState<boolean>(false);
  const [cords, setCords] = useState<Coordinates>({ x: 0, y: 0 });
  const [showTextArea, setShowTextArea] = useState<boolean>(false);
  const [margin, setMargin] = useState<string>("");
  const [isStartingTutorial, setIsStartingTutorial] = useState<boolean>(false);
  const [tutorialStepTwo, setTutorialStepTwo] = useState<boolean>(false);
  const [tutorialStepOne, setTutorialStepOne] = useState<boolean>(false);
  const [tutorialStepThree, setTutorialStepThree] = useState<boolean>(false);
  // const [cords1, setCords1] = useState<Coordinates>({ x: 0, y: 0 });
  // const [menu, setMenu] = useState<boolean>(false);
  // const [greetingCycle, setGreetingCycle] = useState<number>(0);
  // useEffect(() => {
  //   isStartingTutorial && !tutorialStepOne && !tutorialStepTwo && setTutorialStepThree(true);
  // }, [tutorialStepTwo]);
  // console.log(tutorialStepThree)

  const handleDoubleClick = useCallback(
    (event: MouseEvent) => {
      event.preventDefault();
      setCords({ x: event.pageX, y: event.pageY });
      setShowTextArea(true);
      setGreetingCycle(greetingCycle + 1);
    },
    [setCords, setShowTextArea, greetingCycle]
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
  console.log(tutorialStepOne);
  useEffect(() => {
    todoList.find((todo) => todo.id == todo.id) && setIsStartingTutorial(false);
    todoList.find((todo) => todo.id == todo.id) && setTutorialStepOne(false);
    todoList.find((todo) => todo.id == todo.id) && setTutorialStepTwo(false);
    todoList.find((todo) => todo.id == todo.id) && setTutorialStepThree(false);
  }, [todoList]);
  useEffect(() => {
    document.addEventListener("dblclick", handleDoubleClick);
    return () => {
      document.removeEventListener("dblclick", handleDoubleClick);
    };
  }, [handleDoubleClick]);
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
      {showTextArea && <ClickForInput cords={cords} setShowTextArea={setShowTextArea} todoList={todoList} setTodoList={setTodoList} greetingCycle={greetingCycle} setGreetingCycle={setGreetingCycle}/>}
      <Header
        isShowingSettings={isShowingSettings}
        isStartingTutorial={isStartingTutorial}
        setIsStartingTutorial={setIsStartingTutorial}
        setTutorialStepOne={setTutorialStepOne}
        setTutorialStepTwo={setTutorialStepTwo}
        setTutorialStepThree={setTutorialStepThree}
        setIsShowingSettings={setIsShowingSettings}
        setDateCycle={setDateCycle}
        setTimeCycle={setTimeCycle}
      />
      {isShowingSettings && <Settings setMargin={setMargin} />}
      {!isShowingSettings && (
        <>
          <div className="app">
            <LocalTime
              isStartingTutorial={isStartingTutorial}
              tutorialStepOne={tutorialStepOne}
              tutorialStepTwo={tutorialStepTwo}
              setTutorialStepOne={setTutorialStepOne}
              setTutorialStepTwo={setTutorialStepTwo}
              setTutorialStepThree={setTutorialStepThree}
              timeCycle={timeCycle}
              dateCycle={dateCycle}
              setTimeCycle={setTimeCycle}
              setDateCycle={setDateCycle}
            />
            {/* <Input text={text} setText={setText} todoList={todoList} setTodoList={setTodoList} /> */}
            <Todos todoList={todoList} setTodoList={setTodoList} setText={setText} setTutorialStepThree={setTutorialStepThree} tutorialStepThree={tutorialStepThree} />
            <TutorialMessage isStartingTutorial={isStartingTutorial} tutorialStepThree={tutorialStepThree} />
          </div>
        </>
      )}
    </div>
  );
}
export default App;
