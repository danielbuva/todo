import { useEffect, useState, useCallback } from "react";
import "./App.css";
import Todos from "./components/Todos";
import ClickForInput from "./components/ClickForInput";
import Header from "./components/Header";
import LocalTime from "./components/LocalTime";
import Settings from "./components/Settings";
import TutorialMessage from "./components/TutorialMessage";
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
      {showTextArea && <ClickForInput cords={cords} setShowTextArea={setShowTextArea} todoList={todoList} setTodoList={setTodoList} />}
      <Header
        isShowingSettings={isShowingSettings}
        setIsShowingSettings={setIsShowingSettings}
        setIsStartingTutorial={setIsStartingTutorial}
        isStartingTutorial={isStartingTutorial}
      />
      {isShowingSettings && <Settings setMargin={setMargin} />}
      {!isShowingSettings && (
        <>
          <div className="app">
            <LocalTime
              setIsStartingTutorial={setIsStartingTutorial}
              isStartingTutorial={isStartingTutorial}
              tutorialStepTwo={tutorialStepTwo}
              setTutorialStepTwo={setTutorialStepTwo}
              tutorialStepOne={tutorialStepOne}
              setTutorialStepOne={setTutorialStepOne}
              setTutorialStepThree={setTutorialStepThree}
            />
            {/* <Input text={text} setText={setText} todoList={todoList} setTodoList={setTodoList} /> */}
            <Todos todoList={todoList} setTodoList={setTodoList} setText={setText} setTutorialStepThree={setTutorialStepThree} tutorialStepThree={tutorialStepThree} />
            <TutorialMessage isStartingTutorial={isStartingTutorial} setIsStartingTutorial={setIsStartingTutorial} tutorialStepThree={tutorialStepThree} />
          </div>
        </>
      )}
    </div>
  );
}
export default App;
