const BaseWave = {
  a: 0.0,
  enabled: 1.0,
  r: 1.0,
  g: 1.0,
  b: 1.0,
  scaling: 10.0,
  samples: 128.0,
  additive: 0.0,
  usedots: 100.0,
  spectrum: 0.0,
  smoothing: 0.5,
  thick: 1.0,
  sep: 1.0,
};

const BaseSnap = {
  r2: 1.0,
  r: 1.0,
  g: 1.0,
  b: 1.0,
  a: 1.0,
  enabled: 0.0,
  tex_ang: 0.0,
  thickoutline: 0.0,
  textured: 0.0,
  g2: 1.0,
  tex_zoom: 0.0,
  additive: 0.0,
  border_a: 0.1,
  border_b: 0.0,
  b2: 0.0,
  a2: 0.0,
  border_g: 1.0,
  rad: 0.5,
  x: 0.5,
  y: 0.5,
  ang: 0.0,
  sides: 4.0,
  border_r: 1.0,
};

const shapeThing = {
  baseVals: BaseSnap,
  init_eqs: function (m) {
    m.rkeys = [];
    return m;
  },
  frame_eqs: function (m) {
    return m;
  },
};

export const defaults = {
  baseVals: {
    wave_mode: 7.0, // ful dober [0, 7]
    wave_g: 0.5,
    wave_r: 0.5,
    wave_a: 1.0,
    wave_b: 0.5,
    warpscale: 1.0,
    brighten: 1.0,
    modwavealphastart: 0.75,
    modwavealphaend: 0.95,
    wave_smoothing: 0.75,
    gammaadj: 0.75,
    wave_mystery: 0.8,
    mv_x: 12.0,
    mv_y: 9.0,
    wave_scale: 1.0,
    echo_alpha: 0.0,
    additivewave: 0.0,
    sx: 1.0,
    sy: 1.0,
    warp: 0.01,
    red_blue: 0.0,
    wave_brighten: 0.0,
    wrap: 0.0,
    zoomexp: 1.0,
    fshader: 0.0,
    echo_zoom: 1.0,
    warpanimspeed: 1.0,
    wave_dots: 0.0,
    wave_x: 0.5,
    wave_y: 0.5,
    zoom: 2.0,
    solarize: 0.0,
    modwavealphabyvolume: 0.0,
    dx: 0.0,
    cx: 0.5,
    dy: 0.0,
    darken_center: 0.0,
    cy: 0.5,
    invert: 0.0,
    bmotionvectorson: 0.0,
    rot: 2.0,
    decay: 0.9,
    rating: 5.0,
    darken: 0.0,
    echo_orient: 0.0,
    ib_r: 0.5,
    ib_g: 0.5,
    ib_b: 0.5,
    ib_a: 0.5,
    ib_size: 0.0,
    ob_r: 0.5,
    ob_g: 0.5,
    ob_b: 0.5,
    ob_a: 1.0,
    ob_size: 0.0,
    mv_dx: 0.0,
    mv_dy: 0.0,
    mv_a: 0.0,
    mv_r: 0.5,
    mv_g: 0.5,
    mv_b: 0.5,
    mv_l: 0.0,
    wave_usedots: 1,
  },
  init_eqs: function () {
    var m = {};
    return m;
  },
  frame_eqs: function (m) {
    m.rkeys = ["warp"];
    m.zoom = 1.01 + 0.2 * m.treb_att;
    m.warp = 0.15 + 0.25 * m.bass_att;
    return m;
  },
  pixel_eqs: function (m) {
    m.warp = m.warp + m.rad * 0.25;
    return m;
  },
  waves: [
    {
      baseVals: BaseWave,
      init_eqs: function (m) {
        m.rkeys = [];
        return m;
      },
      frame_eqs: function (m) {
        return m;
      },
      point_eqs: "",
    },
    {
      baseVals: BaseWave,

      init_eqs: function (m) {
        m.rkeys = [];
        return m;
      },
      frame_eqs: function (m) {
        return m;
      },
      point_eqs: "",
    },
    {
      baseVals: BaseWave,
      init_eqs: function (m) {
        m.rkeys = [];
        return m;
      },
      frame_eqs: function (m) {
        return m;
      },
      point_eqs: "",
    },
    {
      baseVals: BaseWave,
      init_eqs: function (m) {
        m.rkeys = [];
        return m;
      },
      frame_eqs: function (m) {
        return m;
      },
      point_eqs: "",
    },
  ],
  shapes: [shapeThing, shapeThing, shapeThing, shapeThing],
  warp: "shader_body {\nret = texture2D(sampler_main, uv).rgb;\nret -= 0.004;\n}\n",
  comp: "shader_body {\nret = texture2D(sampler_main, uv).rgb;\nret *= hue_shader;\n}\n",
};
