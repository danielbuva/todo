import React, { useState, useEffect, SetStateAction } from "react";

const LocalTime = ({
    isStartingTutorial,
    setIsStartingTutorial,
    tutorialStepTwo,
    setTutorialStepTwo,
    tutorialStepOne,
    setTutorialStepOne,
    setTutorialStepThree,
  }: {
    isStartingTutorial: boolean;
    setIsStartingTutorial: React.Dispatch<SetStateAction<boolean>>;
    tutorialStepTwo: boolean;
    setTutorialStepTwo: React.Dispatch<SetStateAction<boolean>>;
    tutorialStepOne: boolean;
    setTutorialStepOne: React.Dispatch<SetStateAction<boolean>>;
    setTutorialStepThree: React.Dispatch<SetStateAction<boolean>>;
  }) => {
    const [time, setTime] = useState({ clock: new Date() }); //initial state is an object where clock is a new Date
    const [timeCycle, setTimeCycle] = useState<number>(Number(localStorage.getItem("time preference")) ?? 0);
    const [dateCycle, setDateCycle] = useState<number>(Number(localStorage.getItem("date preference")) ?? 0);
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
            {tutorialStepOne ? <p className="clock-tutorial">click here for clock</p> : `${timeFormats[timeCycle]}`}
          </div>
          <p
            className="date"
            onClick={() => {
              changeDateFormat();
              setTutorialStepTwo(false);
              setTutorialStepThree(true);
            }}
          >
            {!tutorialStepOne && (tutorialStepTwo ? "click here for date" : `${dateFormats[dateCycle]}`)}
          </p>
        </div>
      </>
    );
  };
  export default LocalTime