import React from 'react';
import ReactGlobe, { tween } from 'react-globe';
import * as THREE from 'three';

import { useStateValue } from '../state';
import Fade from './fade';

import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';

const MARKER_COLOR = '#fcffbe';
const MARKER_COMPANION_COLOR = '#fff9e6';

function random(scaleFactor) {
  return Math.random() > 0.5
    ? scaleFactor * Math.random()
    : -scaleFactor * Math.random();
}

function markerRenderer(marker) {
  const size = Math.max(marker.value / 20, 1);
  const geometry = new THREE.SphereGeometry(size, 10, 10);
  const material = new THREE.MeshBasicMaterial({
    color: new THREE.Color(MARKER_COLOR),
  });

  const mesh = new THREE.Mesh(geometry, material);
  const light = new THREE.PointLight(MARKER_COLOR, 1, 0, 0);
  mesh.children = [];
  mesh.add(light);

  const companions = [];
  for (let i = 0; i < 10; i++) {
    const companionGeometry = new THREE.SphereGeometry(
      Math.min((size * Math.random()) / 2, 1),
      10,
      10,
    );
    const companionMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color(MARKER_COMPANION_COLOR),
    });
    const companion = new THREE.Mesh(companionGeometry, companionMaterial);
    companion.lookAt(new THREE.Vector3(0, 0, 0));
    companions.push(companion);
    mesh.add(companion);
  }

  companions.forEach((companion, i) => {
    function animate() {
      const from = {
        opacity: 0.1,
        position: companion.position.clone().toArray(),
        scale: Math.max(0.5, Math.random()),
      };
      const to = {
        opacity: 0.5,
        position: [random(size * 3), random(size * 3), random(size)],
        scale: 0.01,
      };
      tween({
        from,
        to,
        animationDuration: 4000,
        easingFunction: ['Quadratic', 'InOut'],
        onUpdate: () => {
          const [x, y, z] = from.position;
          const companionMaterial = companion.material;
          const intensityChange = random(0.05);
          if (
            light.intensity + intensityChange > 0 &&
            light.intensity + intensityChange < 1.5
          ) {
            light.intensity += intensityChange;
          }
          companionMaterial.opacity = from.opacity;
          companion.scale.x = from.scale;
          companion.scale.y = from.scale;
          companion.scale.z = from.scale;
          companion.position.set(x, y, z);
        },
        onEnd: animate,
        delay: i * 200,
      });
    }
    animate();
  });
  return mesh;
}

export default function Globe() {
  const [{ config, focusedMarker, markers, start }, dispatch] = useStateValue();

  const {
    globeBackgroundTexture,
    globeCloudsTexture,
    globeTexture,
    options,
  } = config;

  return (
    <Fade show durationMs={3000}>
      <ReactGlobe
        globeBackgroundTexture={globeBackgroundTexture}
        globeCloudsTexture={globeCloudsTexture}
        globeTexture={globeTexture}
        height="100vh"
        focus={focusedMarker?.coordinates}
        markers={start ? markers : []}
        width="100vw"
        options={{
          ...options,
          enableCameraRotate: start && !focusedMarker,
          markerTooltipRenderer: (marker) => `${marker.city} (${marker.value})`,
          markerRenderer,
        }}
        onClickMarker={(marker) => {
          dispatch({ type: 'FOCUS', payload: marker });
        }}
      />
    </Fade>
  );
}
