import * as butterchurn from "butterchurn";
import { defaults } from "./preset";

// import { defaults } from "./preset";

export class AudioIn {
  audioContext = null;
  sourceNode = null;
  delayedAudible = null;

  gainN = null;

  constructor() {
    this.audioContext = new AudioContext({
      latencyHint: "interactive",
    });
  }

  connectMicAudio(sourceNode, audioContext) {
    audioContext.resume();

    this.gainN = audioContext.createGain();
    this.gainN.gain.value = 1.25;
    sourceNode.connect(this.gainN);

    return this.gainN;
  }

  micSelect() {
    return new Promise((resolve, reject) => {
      let out;

      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          var micsourceNode =
            // @ts-ignore
            this.audioContext?.createMediaStreamSource(stream);
          out = this.connectMicAudio(micsourceNode, this.audioContext);
          resolve(out);
        })
        .catch((err) => {
          console.log("Error getting audio stream from getUserMedia");
          reject(err);
        });
    });
  }

  getOutputNode() {
    return this.gainN;
  }
}

export class Vis {
  visualizer = null;
  rendering = false;
  cycleInterval = null;

  constructor() {}

  connectAudio(sourceNode) {
    this.visualizer.connectAudio(sourceNode);
  }

  startRenderer() {
    requestAnimationFrame(() => this.startRenderer());
    this.visualizer.render();
  }

  initPlayer(canvas, audioContext, sourceNode, size = 1000, preset) {
    this.visualizer = butterchurn.default.createVisualizer(
      audioContext,
      canvas,
      {
        width: size,
        height: size,
        pixelRatio: window.devicePixelRatio || 1,
        textureRatio: 2,
        zoom: 0.2,
      }
    );
    if (preset) {
      this.visualizer.loadPreset(preset, 1.0);
    }
    // this.visualizer.loadPreset(presets[presetKeys[presetIndex]], 5.7);
    this.connectAudio(sourceNode);
    this.startRenderer();
  }

  loadPreset(preset) {
    this.visualizer.loadPreset(preset, 0.2);
  }
}
