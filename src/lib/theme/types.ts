import { type Dispatch, type SetStateAction } from "react";

export interface TodoInterface {
  id: string;
  text: string;
  width: string;
  height: string;
  completed: string;
  timestamp: string;
}
export interface EnteredItemValue extends TodoInterface {
  todoList: TodoInterface[];
  setTodoList: Dispatch<SetStateAction<TodoInterface[]>>;
}
export interface ListValue {
  todoList: TodoInterface[];
  setTodoList: Dispatch<SetStateAction<TodoInterface[]>>;
}
export interface InputValue extends ListValue {
  text: string;
  setText: Dispatch<SetStateAction<string>>;
}
export interface Point {
  x: number;
  y: number;
}
export interface dbConfig {
  todoList: TodoInterface[];
  setTodoList: Dispatch<SetStateAction<TodoInterface[]>>;
  cords: Point;
  setShowTextArea: Dispatch<SetStateAction<boolean>>;
  gCycle: number;
  setGCycle: Dispatch<SetStateAction<number>>;
}
export interface TutorialMessageValue {
  tutorialToggled: boolean;
  stepThree: boolean;
}
export interface LocalTimeConfig {
  tCycle: number;
  dCycle: number;
  setTCycle: Dispatch<SetStateAction<number>>;
  setDCycle: Dispatch<SetStateAction<number>>;
  tutorialToggled: boolean;
  stepOne: boolean;
  stepTwo: boolean;
  setStepOne: Dispatch<SetStateAction<boolean>>;
  setStepTwo: Dispatch<SetStateAction<boolean>>;
  setStepThree: Dispatch<SetStateAction<boolean>>;
}
export interface TutorialToggleFxn {
  tutorialToggled: boolean;
  setDCycle: Dispatch<SetStateAction<number>>;
  setTCycle: Dispatch<SetStateAction<number>>;
  setTutorialToggled: Dispatch<SetStateAction<boolean>>;
  setStepOne: Dispatch<SetStateAction<boolean>>;
  setStepTwo: Dispatch<SetStateAction<boolean>>;
  setStepThree: Dispatch<SetStateAction<boolean>>;
}
export interface HeaderValue extends TutorialToggleFxn {
  sToggled: boolean;
  setSToggled: Dispatch<SetStateAction<boolean>>;
}
export interface SettingsFxn {
  sToggled: boolean;
  setSToggled: Dispatch<SetStateAction<boolean>>;
}
