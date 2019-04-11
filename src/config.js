// Update this file to customize trend data and globe UI

// @ts-ignore:  Used by a node script and requires the CommonJS syntax
module.exports = {
  data: {
    keyword: 'game of thrones',
    months: 12,
  },
  cameraOptions: {
    enableZoom: false,
  },
  focusOptions: {
    enableDefocus: false,
  },
  globeOptions: {
    cloudsSpeed: 0.2,
    cloudsOpacity: 0.05,
    glowCoefficient: 0.1,
    glowColor: '#fff9e6',
    glowPower: 5,
    glowRadiusScale: 0.2,
    texture:
      'https://raw.githubusercontent.com/chrisrzhou/react-globe/master/textures/globe_dark.jpg',
  },
  lightOptions: {
    ambientLightColor: '#babc95',
    ambientLightIntensity: 1,
    pointLightIntensity: 3,
    pointLightPositionRadiusScales: [-1, 1.5, -2.5],
  },
};
