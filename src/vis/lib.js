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
      // @ts-ignore
      navigator.getUserMedia(
        { audio: true },
        (stream) => {
          var micsourceNode = this.audioContext.createMediaStreamSource(stream);

          out = this.connectMicAudio(micsourceNode, this.audioContext);
          resolve(out);
        },
        (err) => {
          console.log("Error getting audio stream from getUserMedia");
          reject(err);
        }
      );
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

  // connectToAudioAnalyzer(sourceNode) {
  //   this.delayedAudible = this.audioContext.createDelay();
  //   this.delayedAudible.delayTime.value = 0.26;

  //   sourceNode.connect(this.delayedAudible);
  //   this.delayedAudible.connect(this.audioContext.destination);

  //   this.visualizer.connectAudio(this.delayedAudible);
  // }

  connectAudio(sourceNode) {
    this.visualizer.connectAudio(sourceNode);
  }

  startRenderer() {
    requestAnimationFrame(() => this.startRenderer());
    this.visualizer.render();
  }

  initPlayer(canvas, audioContext, sourceNode, size = 1000) {
    this.visualizer = butterchurn.default.createVisualizer(
      audioContext,
      canvas,
      {
        width: size,
        height: size,
        pixelRatio: window.devicePixelRatio || 1,
        textureRatio: 1,
        zoom: 1,
      }
    );
    this.visualizer.loadPreset(defaults, 0.0);
    // this.visualizer.loadPreset(presets[presetKeys[presetIndex]], 5.7);
    this.connectAudio(sourceNode);
    this.startRenderer();
  }
}
