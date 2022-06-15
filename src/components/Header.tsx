import { Setting2 } from "iconsax-react";
import { BsInfoLg } from "react-icons/Bs";
import { SetStateAction } from "react";
type Todo = {
    text: string;
    height: string;
    width: string;
    id: string;
    completed: string;
    timestamp: string;
  };
const Info = ({ setIsStartingTutorial, isStartingTutorial }: { setIsStartingTutorial: React.Dispatch<SetStateAction<boolean>>; isStartingTutorial: boolean }) => {
  return (
    <>
      <BsInfoLg className="info-button" onClick={() => setIsStartingTutorial(!isStartingTutorial)} />
    </>
  );
};

const Header = ({
  isShowingSettings,
  setIsShowingSettings,
  isStartingTutorial,
  setIsStartingTutorial,
}: {
  isShowingSettings: boolean;
  setIsShowingSettings: React.Dispatch<SetStateAction<boolean>>;
  isStartingTutorial: boolean;
  setIsStartingTutorial: React.Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div className="nav">
      <Info setIsStartingTutorial={setIsStartingTutorial} isStartingTutorial={isStartingTutorial} />
      <Setting2 size="21" color="black" cursor="pointer" className="settings-button" onClick={() => setIsShowingSettings(!isShowingSettings)} />
    </div>
  );
};
export default Header;
