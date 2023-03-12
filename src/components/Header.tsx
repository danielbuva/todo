import { HeaderValue, TutorialToggleFxn } from '../lib/theme/types';
import { BsInfoLg } from 'react-icons/Bs';
import { Setting2 } from 'iconsax-react';

const Info = ({
  setDCycle,
  setTCycle,
  tutorialToggled,
  setTutorialToggled,
  setStepOne,
  setStepTwo,
  setStepThree,
}: TutorialToggleFxn) => {
  return (
    <>
      <BsInfoLg
        className="info-button"
        onClick={() => {
          setTutorialToggled(!tutorialToggled);
          {
            tutorialToggled && setStepOne(false);
          }
          setStepTwo(false);
          setStepThree(false);
          {
            !tutorialToggled && setTCycle(0);
          }
          {
            !tutorialToggled && setDCycle(0);
          }
        }}
      />
    </>
  );
};
const Header = ({
  sToggled,
  setSToggled,
  tutorialToggled,
  setTutorialToggled,
  setStepOne,
  setStepTwo,
  setStepThree,
  setDCycle,
  setTCycle,
}: HeaderValue) => {
  return (
    <div className="nav">
      <Info
        setTutorialToggled={setTutorialToggled}
        tutorialToggled={tutorialToggled}
        setDCycle={setDCycle}
        setTCycle={setTCycle}
        setStepOne={setStepOne}
        setStepTwo={setStepTwo}
        setStepThree={setStepThree}
      />
      <Setting2
        size="21"
        color="black"
        cursor="pointer"
        className="settings-button"
        onClick={() => setSToggled(!sToggled)}
      />
    </div>
  );
};
export default Header;
