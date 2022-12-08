import React, { useEffect, useRef, useState } from "react";
import { Vis } from "./lib";

export const Renderer = ({ aud, preset, size }) => {
  const ref = useRef(null);
  const [vis, setVis] = useState(null);
  const [bg, setBg] = useState("gray");

  // console.log(preset.baseVals.wave_mode);

  useEffect(() => {
    if (aud.audioContext && aud.getOutputNode()) {
      const vis = new Vis();
      vis.initPlayer(ref.current, aud.audioContext, aud.getOutputNode(), size);

      console.log("AAAAA SPET DELAM VSE");
      // @ts-ignore
      setVis(vis);
    } else {
      console.log("no audio context or output node");
    }
  }, []);

  // use effect for preset changes
  useEffect(() => {
    if (vis) {
      // @ts-ignore
      vis.loadPreset(preset);
    }
  }, [preset]);

  return (
    <div
      onClick={() => {
        setBg("white");
        setTimeout(() => {
          setBg("gray");
        }, 100);
      }}
    >
      <canvas
        ref={ref}
        width={size}
        height={size}
        style={{
          border: "1px solid " + bg,
        }}
      />
    </div>
  );
};
