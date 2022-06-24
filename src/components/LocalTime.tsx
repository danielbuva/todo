import { Text } from "@chakra-ui/react";
import React, { useState, useEffect, SetStateAction } from "react";

const LocalTime = ({
  isStartingTutorial,
  tutorialStepTwo,
  setTutorialStepTwo,
  tutorialStepOne,
  setTutorialStepOne,
  setTutorialStepThree,
  dateCycle,
  setDateCycle,
  timeCycle,
  setTimeCycle,
}: {
  isStartingTutorial: boolean;
  tutorialStepTwo: boolean;
  setTutorialStepTwo: React.Dispatch<SetStateAction<boolean>>;
  tutorialStepOne: boolean;
  setTutorialStepOne: React.Dispatch<SetStateAction<boolean>>;
  setTutorialStepThree: React.Dispatch<SetStateAction<boolean>>;
  timeCycle: number;
  setTimeCycle: React.Dispatch<SetStateAction<number>>;
  dateCycle: number;
  setDateCycle: React.Dispatch<SetStateAction<number>>;
}) => {
  const [time, setTime] = useState({ clock: new Date() }); //initial state is an object where clock is a new Date

  // const [clockTutorialMessage, setClockTutorialMessage] = useState<string | null>(isStartingTutorial ? "click here for clock" : null);
  // const [dateTutorialMessage, setDateTutorialMessage] = useState<string | null>(tutorialStepTwo ? "click here for date" : null);
  // console.log(clockTutorialMessage)
  // console.log(isStartingTutorial)
  // console.log(dateTutorialMessage)

  useEffect(() => {
    isStartingTutorial && setTutorialStepOne(true);
  }, [isStartingTutorial]);

  const tick = () => {
    setTime({ clock: new Date() });
  }; // updates the state
  useEffect(() => {
    setInterval(() => tick(), 1000); //every second the state is updated
  }, []); //every update the useEffect renders again
  const timeFormats = [
    "",
    time.clock.toLocaleTimeString(),
    time.clock.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
    time.clock.toLocaleTimeString().replace("AM", "").replace("PM", ""),
    time.clock
      .toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
      .replace("AM", "")
      .replace("PM", ""),
  ];
  const dateFormats = [
    "",
    time.clock.toLocaleDateString([], {
      month: "long",
      day: "numeric",
      weekday: "long",
    }),
    time.clock.toLocaleDateString([], {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    }),
    time.clock.toLocaleDateString([], {
      month: "long",
      day: "numeric",
    }),
    time.clock.toLocaleDateString([], {
      day: "numeric",
      weekday: "long",
    }),
    time.clock.toLocaleDateString(),
  ];
  const changeTimeFormat = () => {
    setTimeCycle(timeCycle + 1);
  };
  useEffect(() => {
    timeCycle == 5 && setTimeCycle(0);
  }, [timeCycle]);
  const changeDateFormat = () => {
    setDateCycle(dateCycle + 1);
  };
  useEffect(() => {
    dateCycle == 6 && setDateCycle(0);
  }, [dateCycle]);
  useEffect(() => {
    localStorage.setItem("time preference", JSON.stringify(timeCycle));
  }, [timeCycle]);
  useEffect(() => {
    localStorage.setItem("date preference", JSON.stringify(dateCycle));
  }, [dateCycle]);
  // console.log(tutorialStepOne)
  // console.log(tutorialStepOne)
  return (
    <>
      <div className="clock">
        <div
          className="time"
          onClick={() => {
            changeTimeFormat();
            setTutorialStepOne(false);
            {
              isStartingTutorial && setTutorialStepTwo(true);
            }
          }}
        >
          {isStartingTutorial && tutorialStepOne ? <p className="clock-tutorial">click here for clock</p> : `${timeFormats[timeCycle]}`}
        </div>
        {!tutorialStepOne ? (
          <p
            className="date"
            onClick={() => {
              changeDateFormat();
              setTutorialStepTwo(false);
              {
                isStartingTutorial && setTutorialStepThree(true);
              }
            }}
          >
            {isStartingTutorial && tutorialStepTwo ? "click here for date" : `${dateFormats[dateCycle]}`}
          </p>
        ) : (
          <Text mb="13px" p={0}></Text>
        )}
      </div>
    </>
  );
};
export default LocalTime;
