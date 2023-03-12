import { SetStateAction } from 'react';

const Settings = ({ setMargin }: { setMargin: React.Dispatch<SetStateAction<string>> }) => {
  return (
    <>
      <p>theme</p>
      <div>
        <button>preset</button>
        <button>custom</button>
      </div>
      <p>placeholder</p>
      <p>time</p>
      <div>
        appearance<p>margin</p>
        <button onClick={() => setMargin('App-left')}>left</button>
        <button onClick={() => setMargin('App-center')}>center</button>
        <button onClick={() => setMargin('App-right')}>right</button>
      </div>
      <div>
        preferences
        <p>organize completed</p>
        <p>font size</p>
        <p>font weight</p>
      </div>
    </>
  );
};
export default Settings;
