import * as TWEEN from 'es6-tween';
import React from 'react';
import ReactGlobe from 'react-globe';
import * as THREE from 'three';

import data from './_data/trends.json';

const GLOBE_TEXTURE =
  'https://raw.githubusercontent.com/chrisrzhou/react-globe/master/textures/globe_dark.jpg';
const GLOBE_GLOW_COLOR = '#FFF9E6';
const AMBIENT_LIGHT_COLOR = '#babc95';
const MARKER_COLOR = '#FCFFB2';
const MARKER_COMPANION_COLOR = '#babc95';
const pointLightPositionRadiusScales = [-1, 1.5, -2.5];

function random(scaleFactor: number): number {
  return Math.random() > 0.5
    ? scaleFactor * Math.random()
    : -scaleFactor * Math.random();
}

interface Props {
  ready: boolean;
}

function Globe({ ready }: Props): React.ReactElement {
  const markers = ready ? data.trends['1522540800000'] : [];
  return (
    <div className="globe">
      <ReactGlobe
        cameraOptions={{
          enableZoom: false,
        }}
        globeOptions={{
          cloudsSpeed: 0.2,
          cloudsOpacity: 0.05,
          glowCoefficient: 0.1,
          glowColor: GLOBE_GLOW_COLOR,
          glowPower: 5,
          glowRadiusScale: 0.25,
          texture: GLOBE_TEXTURE,
        }}
        lightOptions={{
          ambientLightColor: AMBIENT_LIGHT_COLOR,
          ambientLightIntensity: 1,
          pointLightIntensity: 3,
          pointLightPositionRadiusScales,
        }}
        markers={markers}
        markerOptions={{
          enableTooltip: ready,
          getTooltipContent: (marker: any): string =>
            `${marker.city} (${marker.value})`,
          renderer: (marker: any): THREE.Object3D => {
            const size = Math.min(Math.max(marker.value / 10, 1.5), 5);
            const geometry = new THREE.SphereGeometry(size, 10, 10);
            const material = new THREE.MeshBasicMaterial({
              color: new THREE.Color(MARKER_COLOR),
            });

            // add light
            const mesh = new THREE.Mesh(geometry, material);
            const light = new THREE.PointLight(MARKER_COLOR, 1, 0, 0);
            mesh.children = [];
            mesh.add(light);

            // add companion markers based on size
            const companions: THREE.Mesh[] = [];
            for (let i = 0; i < 10; i++) {
              const companionGeometry = new THREE.SphereGeometry(
                Math.min(size, Math.random()),
                10,
                10,
              );
              const companionMaterial = new THREE.MeshBasicMaterial({
                color: new THREE.Color(MARKER_COMPANION_COLOR),
              });
              const companion = new THREE.Mesh(
                companionGeometry,
                companionMaterial,
              );
              companion.lookAt(new THREE.Vector3(0, 0, 0));
              companions.push(companion);
              mesh.add(companion);
            }

            companions.forEach(
              (companion, i: number): void => {
                function animate(): void {
                  const from = {
                    opacity: 0,
                    position: companion.position.clone().toArray(),
                    scale: Math.max(0.3, Math.random()),
                  };
                  const to = {
                    opacity: 1,
                    position: [
                      random(size * 5),
                      random(size * 5),
                      random(size * 5),
                    ],
                    scale: 0.01,
                  };
                  const tween = new TWEEN.Tween(from)
                    .to(to, 2000)
                    .easing(TWEEN.Easing.Quadratic.InOut)
                    .delay(i * 100);
                  tween
                    .on(
                      'update',
                      (): void => {
                        const [x, y, z] = from.position;
                        const companionMaterial = companion.material as THREE.MeshBasicMaterial;
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
                    )
                    .on('complete', animate)
                    .start();
                }
                animate();
              },
            );
            return mesh;
          },
        }}
      />
    </div>
  );
}

export default Globe;
