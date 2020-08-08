// Update this file to customize trend data and globe UI
module.exports = {
  data: {
    keyword: ['covid', 'covid19', 'coronavirus'],
  },
  globeBackgroundTexture:
    'https://raw.githubusercontent.com/chrisrzhou/react-globe/main/textures/background.png',
  globeCloudsTexture:
    'https://raw.githubusercontent.com/chrisrzhou/react-globe/main/textures/clouds.png',
  globeTexture:
    'https://raw.githubusercontent.com/chrisrzhou/react-globe/main/textures/globe_dark.jpg',
  options: {
    ambientLightColor: '#b34444',
    ambientLightIntensity: 1,
    cameraAutoRotateSpeed: 0.01,
    cameraRotateSpeed: 0.02,
    enableCameraZoom: false,
    enableDefocus: false,
    globeCloudsOpacity: 0.1,
    globeGlowCoefficient: 0.1,
    globeGlowColor: 'red',
    globeGlowPower: 5,
    globeGlowRadiusScale: 0.2,
    pointLightIntensity: 3,
    pointLightPositionRadiusScales: [-1, 1.5, -2.5],
  },
};
