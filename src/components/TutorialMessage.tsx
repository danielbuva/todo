import { SetStateAction } from "react";

const TutorialMessage = ({
    isStartingTutorial,
    setIsStartingTutorial,
    tutorialStepThree,
  }: {
    isStartingTutorial: boolean;
    setIsStartingTutorial: React.Dispatch<SetStateAction<boolean>>;
    tutorialStepThree: boolean;
  }) => {
    return <>{isStartingTutorial && tutorialStepThree && <p style={{ width: "90vw", marginTop: "350px", cursor: "pointer" }}>double click to add a task</p>}</>;
  };

  export default TutorialMessage;