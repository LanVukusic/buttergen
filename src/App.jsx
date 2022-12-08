import React, { useEffect, useState } from "react";
import { AudioIn } from "./vis/lib";
import { Renderer } from "./vis/Renderer";

const App = function App() {
  const [audioIn, setAudioIn] = useState(new AudioIn());
  const [audi, setAudi] = useState(false);

  useEffect(() => {
    setAudioIn(new AudioIn());
  }, []);

  return (
    <div>
      <button
        style={{
          display: audi ? "none" : "block",
        }}
        onClick={() => {
          audioIn.micSelect().then(() => {
            setAudi(true);
          });
        }}
      >
        audio addss
      </button>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
        }}
      >
        {audi &&
          [1, 2, 3].map((i) => (
            <Renderer aud={audioIn} key={(audi ? "on" : "off") + i} />
          ))}
      </div>
    </div>
  );
};

export default App;
