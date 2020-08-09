/**
 * Update this file to customize trend data.
 * Google Trends: https://support.google.com/trends/answer/4359582?hl=enand globe properties
 * react-globe: https://github.com/chrisrzhou/react-globe
 */
export default {
  keyword: 'covid + covid19 + coronavirus',
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
    cameraRotateSpeed: 0.2,
    enableCameraZoom: false,
    enableDefocus: false,
    focusAnimationDuration: 1000,
    globeCloudsOpacity: 0.1,
    globeGlowCoefficient: 0.1,
    globeGlowColor: 'red',
    globeGlowPower: 5,
    globeGlowRadiusScale: 0.2,
    pointLightIntensity: 3,
    pointLightPositionRadiusScales: [-1, 1.5, -2.5],
  },
};
