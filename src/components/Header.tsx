import { Setting2 } from "iconsax-react";
import { BsInfoLg } from "react-icons/Bs";
import { SetStateAction } from "react";
// type Todo = {
//   text: string;
//   height: string;
//   width: string;
//   id: string;
//   completed: string;
//   timestamp: string;
// };
const Info = ({
  setIsStartingTutorial,
  isStartingTutorial,
  setTutorialStepOne,
  setTutorialStepTwo,
  setTutorialStepThree,
  setDateCycle,
  setTimeCycle,
}: {
  setIsStartingTutorial: React.Dispatch<SetStateAction<boolean>>;
  isStartingTutorial: boolean;
  setTutorialStepOne: React.Dispatch<SetStateAction<boolean>>;
  setTutorialStepTwo: React.Dispatch<SetStateAction<boolean>>;
  setTutorialStepThree: React.Dispatch<SetStateAction<boolean>>;
  setDateCycle: React.Dispatch<SetStateAction<number>>;
  setTimeCycle: React.Dispatch<SetStateAction<number>>;
}) => {
  return (
    <>
      <BsInfoLg
        className="info-button"
        onClick={() => {
          setIsStartingTutorial(!isStartingTutorial);
          {
            isStartingTutorial && setTutorialStepOne(false);
          }
          setTutorialStepTwo(false);
          setTutorialStepThree(false);
          {
            !isStartingTutorial && setTimeCycle(0);
          }
          {
            !isStartingTutorial && setDateCycle(0);
          }
        }}
      />
    </>
  );
};

const Header = ({
  isShowingSettings,
  setIsShowingSettings,
  isStartingTutorial,
  setIsStartingTutorial,
  setTutorialStepOne,
  setTutorialStepTwo,
  setTutorialStepThree,
  setDateCycle,
  setTimeCycle,
}: {
  isShowingSettings: boolean;
  setIsShowingSettings: React.Dispatch<SetStateAction<boolean>>;
  isStartingTutorial: boolean;
  setIsStartingTutorial: React.Dispatch<SetStateAction<boolean>>;
  setTutorialStepOne: React.Dispatch<SetStateAction<boolean>>;
  setTutorialStepTwo: React.Dispatch<SetStateAction<boolean>>;
  setTutorialStepThree: React.Dispatch<SetStateAction<boolean>>;
  setDateCycle: React.Dispatch<SetStateAction<number>>;
  setTimeCycle: React.Dispatch<SetStateAction<number>>;
}) => {
  return (
    <div className="nav">
      <Info
        setIsStartingTutorial={setIsStartingTutorial}
        isStartingTutorial={isStartingTutorial}
        setTutorialStepThree={setTutorialStepThree}
        setDateCycle={setDateCycle}
        setTimeCycle={setTimeCycle}
        setTutorialStepOne={setTutorialStepOne}
        setTutorialStepTwo={setTutorialStepTwo}
      />
      <Setting2 size="21" color="black" cursor="pointer" className="settings-button" onClick={() => setIsShowingSettings(!isShowingSettings)} />
    </div>
  );
};
export default Header;
