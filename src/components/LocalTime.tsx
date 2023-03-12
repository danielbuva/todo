import { LocalTimeConfig } from '../lib/theme/types';
import { useState, useEffect } from 'react';
import { Text } from '@chakra-ui/react';

const LocalTime = ({
  tutorialToggled,
  stepOne,
  stepTwo,
  setStepOne,
  setStepTwo,
  setStepThree,
  tCycle,
  dCycle,
  setTCycle,
  setDCycle,
}: LocalTimeConfig) => {
  const [time, setTime] = useState({ clock: new Date() }); //initial state is an object where clock is a new Date

  const tick = () => {
    setTime({ clock: new Date() });
  }; // updates the state

  const timeFormats = [
    '',
    time.clock.toLocaleTimeString(),
    time.clock.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    }),
    time.clock.toLocaleTimeString().replace('AM', '').replace('PM', ''),
    time.clock
      .toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      })
      .replace('AM', '')
      .replace('PM', ''),
  ];

  const dateFormats = [
    '',
    time.clock.toLocaleDateString([], {
      month: 'long',
      day: 'numeric',
      weekday: 'long',
    }),
    time.clock.toLocaleDateString([], {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }),
    time.clock.toLocaleDateString([], {
      month: 'long',
      day: 'numeric',
    }),
    time.clock.toLocaleDateString([], {
      day: 'numeric',
      weekday: 'long',
    }),
    time.clock.toLocaleDateString(),
  ];

  const changeTimeFormat = () => {
    setTCycle(tCycle + 1);
  };

  useEffect(() => {
    tCycle == timeFormats.length && setTCycle(0);
  }, [tCycle]);
  const changeDateFormat = () => {
    setDCycle(dCycle + 1);
  };

  useEffect(() => {
    dCycle == dateFormats.length && setDCycle(0);
  }, [dCycle]);

  useEffect(() => {
    setInterval(() => tick(), 1000); //every second the state is updated
  }, []); //every update the useEffect renders again

  useEffect(() => {
    localStorage.setItem('time format preference', JSON.stringify(tCycle));
  }, [tCycle]);

  useEffect(() => {
    localStorage.setItem('date format preference', JSON.stringify(dCycle));
  }, [dCycle]);

  useEffect(() => {
    tutorialToggled && setStepOne(true);
  }, [tutorialToggled]);
  return (
    <>
      <div className="clock">
        <div
          className="time"
          onClick={() => {
            changeTimeFormat();
            setStepOne(false);
            {
              tutorialToggled && setStepTwo(true);
            }
          }}
        >
          {tutorialToggled && stepOne ? (
            <p className="clock-tutorial">click here for clock</p>
          ) : (
            `${timeFormats[tCycle]}`
          )}
        </div>
        {!stepOne ? (
          <p
            className="date"
            onClick={() => {
              changeDateFormat();
              setStepTwo(false);
              {
                tutorialToggled && setStepThree(true);
              }
            }}
          >
            {tutorialToggled && stepTwo ? 'click here for date' : `${dateFormats[dCycle]}`}
          </p>
        ) : (
          <Text mb="13px" p={0}></Text>
        )}
      </div>
    </>
  );
};
export default LocalTime;
