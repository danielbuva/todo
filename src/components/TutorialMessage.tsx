import { TutorialMessageValue } from '../lib/theme/types';

const TutorialMessage = ({ tutorialToggled, stepThree }: TutorialMessageValue) => {
  return (
    <>
      {tutorialToggled && stepThree ? (
        <p style={{ width: '90vw', marginTop: '350px', cursor: 'pointer' }}>
          double click to add a task
        </p>
      ) : (
        ''
      )}
    </>
  );
};

export default TutorialMessage;
