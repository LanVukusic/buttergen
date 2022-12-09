import { defaults } from "../vis/preset";
import { Fenotype, Gene, sex } from "./genetic";
import butterchurnPresets from "butterchurn-presets";

// 4 9 11 14 18

const presets = butterchurnPresets.getPresets();
const options = Object.keys(presets);
let selected = options[4];
const preset = presets[selected];
console.log(preset);

const deepClone = (obj) => {
  if (obj === null) return null;
  let clone = Object.assign({}, obj);
  Object.keys(clone).forEach(
    (key) =>
      (clone[key] =
        typeof obj[key] === "object" ? deepClone(obj[key]) : obj[key])
  );
  if (Array.isArray(obj)) {
    clone.length = obj.length;
    return Array.from(clone);
  }
  return clone;
};

class VisEntity extends Fenotype {
  id = "";
  constructor(genes: Gene[]) {
    super(genes);

    if (!genes || genes.length === 0) {
      this.genes = [
        new Gene(0, 7, Math.random() * 7, "int"), //wave_mode
        new Gene(0, 1, Math.random() * 1, "float"), //wave_speed
        new Gene(0, 1, Math.random() * 1, "float"), //wave_r
        new Gene(0, 1, Math.random() * 1, "float"), //wave_g
        new Gene(0, 1, Math.random() * 1, "float"), //wave_b
        new Gene(0, 1, Math.random() * 1, "int"), //brighten
        new Gene(0, 1, Math.random() * 1, "float"), //warpscale
        new Gene(0, 1, Math.random() * 1, "float"), //modwavealphastart
        new Gene(0, 1, Math.random() * 1, "float"), //modwavealphaend
        new Gene(0, 1, Math.random() * 1, "float"), //wave_smoothing
        new Gene(-1, 1, Math.random() * 1, "float"), //wave_mystery
        // mv attributes
        new Gene(0, 64, Math.random() * 1, "float"), //mv_x
        new Gene(0, 48, Math.random() * 1, "float"), //mv_y
        //rot
        new Gene(-1, 1, Math.random() * 1, "float"), //rot
        // decay
        new Gene(0.7, 1, Math.random() * 1, "float"), //decay
        // echo_zoom
        new Gene(0, 1, Math.random() * 1, "float"), //echo_zoom
        // gama_adj
        new Gene(0, 1, Math.random() * 1, "float"), //gama_adj
        // warp
        new Gene(0, 1, Math.random() * 1, "float"), //warp
        // dx
        new Gene(0, 1, Math.random() * 1, "float"), //dx
        // dy
        new Gene(0, 1, Math.random() * 1, "float"), //dy
        // darken
        new Gene(0, 1, Math.random() * 1, "float"), //darken
        // echo_alpha
        new Gene(0, 1, Math.random() * 1, "float"), //echo_alpha
        // echo_orient
        new Gene(0, 1, Math.random() * 1, "float"), //echo_orient
        // wave_scale
        new Gene(0, 1, Math.random() * 1, "float"), //wave_scale
        // warpanimspeed
        new Gene(0, 1, Math.random() * 1, "float"), //warpanimspeed
        // bled
        new Gene(0, 1, Math.random() * 1, "float"), //bled
      ];
    }

    this.id = Math.random().toString(36).substr(2, 9);
  }

  getPreset() {
    const presetDefault = deepClone(preset);

    if (!this.genes || this.genes.length === 0) {
      console.log("no genes");
      return presetDefault;
    }

    presetDefault.baseVals.wave_mode = this.genes[0].value; //wave_mode
    presetDefault.baseVals.wave_speed = this.genes[1].value; //wave_speed
    presetDefault.baseVals.wave_r = this.genes[2].value; //wave_r
    presetDefault.baseVals.wave_g = this.genes[3].value; //wave_g
    presetDefault.baseVals.wave_b = this.genes[4].value; //wave_b
    presetDefault.baseVals.brighten = this.genes[5].value; //brighten
    presetDefault.baseVals.warpscale = this.genes[6].value; //warpscale
    presetDefault.baseVals.modwavealphastart = this.genes[7].value; //modwavealphastart
    presetDefault.baseVals.modwavealphaend = this.genes[8].value; //modwavealphaend
    presetDefault.baseVals.wave_smoothing = this.genes[9].value; //wave_smoothing
    presetDefault.baseVals.wave_mystery = this.genes[10].value; //wave_mystery
    // mv attributes
    presetDefault.baseVals.mv_x = this.genes[11].value; //mv_x
    presetDefault.baseVals.mv_y = this.genes[12].value; //mv_y
    presetDefault.baseVals.rot_x = this.genes[13].value; //rot
    presetDefault.baseVals.decay = this.genes[14].value; //decay
    presetDefault.baseVals.echo_zoom = this.genes[15].value; //echo_zoom
    presetDefault.baseVals.gama_adj = this.genes[16].value; //gama_adj
    presetDefault.baseVals.warp = this.genes[17].value; //warp
    presetDefault.baseVals.dx = this.genes[18].value; //dx
    presetDefault.baseVals.dy = this.genes[19].value; //dy
    presetDefault.baseVals.darken = this.genes[20].value; //darken
    presetDefault.baseVals.echo_alpha = this.genes[21].value; //echo_alpha
    presetDefault.baseVals.echo_orient = this.genes[22].value; //echo_orient
    presetDefault.baseVals.wave_scale = this.genes[23].value; //wave_scale
    presetDefault.baseVals.warpanimspeed = this.genes[24].value; //warpanimspeed
    presetDefault.baseVals.bled = this.genes[25].value; //bled
    return presetDefault;
  }
}

export class Manager {
  populationSize: number;
  visSizePx: number;

  entities: VisEntity[];
  updatedAt: number;

  constructor(populationSize: number, visSizePx: number) {
    this.populationSize = populationSize;
    this.visSizePx = visSizePx;
    this.entities = [];
    this.updatedAt = 0;
  }

  init(setNewEnt: (vis: { entities: VisEntity[] }) => void) {
    this.entities = [];
    for (let i = 0; i < this.populationSize; i++) {
      this.entities.push(new VisEntity([]));
    }
    setNewEnt({ entities: this.entities });
    this.updatedAt++;
  }

  kill(index: number) {
    const others = this.entities.filter((e, i) => i !== index);
    const newFenotype = sex(others);
    const newvis = new VisEntity(newFenotype.genes);
    this.entities[index] = newvis;
    this.updatedAt++;
    return this.entities;
  }
}
