import React, { useEffect, useState } from "react";
import { Manager } from "./genetic/Manager";
import { AudioIn } from "./vis/lib";
import { Renderer } from "./vis/Renderer";

const m = new Manager(8, 440);

const App = function App() {
  const [audioIn, setAudioIn] = useState(new AudioIn());
  const [audi, setAudi] = useState(false);
  const [ent, setEnt] = useState({ entities: m.entities });

  // console.log("---" + ent.map((e) => e.id) + "---");

  const kill = (id) => {
    const a = m.kill(id);
    setEnt({ entities: a });
  };

  useEffect(() => {
    setAudioIn(new AudioIn());
    m.init(setEnt);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",

        overflowX: "hidden",
        overflowY: "auto",
      }}
    >
      <button
        style={{
          display: audi ? "none" : "block",
          margin: "auto",
        }}
        onClick={() => {
          audioIn.micSelect().then(() => {
            setAudi(true);
          });
        }}
      >
        Connect to mic
      </button>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {audi &&
          ent.entities.map((e, i) => (
            <div
              onClick={() => {
                kill(i);
              }}
              key={i}
            >
              <Renderer
                aud={audioIn}
                preset={e.getPreset()}
                size={m.visSizePx}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default App;
