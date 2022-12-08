import React from "react";
import { Vis } from "./lib";

const SIZE = 500;

export const Renderer = ({ aud }) => {
  const ref = React.useRef(null);

  React.useEffect(() => {
    if (aud.audioContext && aud.getOutputNode()) {
      const vis = new Vis();
      vis.initPlayer(ref.current, aud.audioContext, aud.getOutputNode(), SIZE);
    } else {
      console.log("no audio context or output node");
    }
  }, []);

  return (
    <div
      onClick={() => {
        console.log("click");
      }}
    >
      <canvas ref={ref} width={SIZE} height={SIZE} />
    </div>
  );
};
