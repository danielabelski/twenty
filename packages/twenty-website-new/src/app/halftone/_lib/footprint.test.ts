import { parseExportedPreset } from '@/app/halftone/_lib/exporters';
import {
  getContainedImageRect,
  getImageFootprintScale,
  getMeshFootprintScale,
  REFERENCE_PREVIEW_DISTANCE,
} from '@/app/halftone/_lib/footprint';
import { DEFAULT_HALFTONE_SETTINGS } from '@/app/halftone/_lib/state';
import * as THREE from 'three';

describe('halftone footprint helpers', () => {
  it('computes the visible contained image rect', () => {
    expect(
      getContainedImageRect({
        imageHeight: 500,
        imageWidth: 1000,
        viewportHeight: 800,
        viewportWidth: 800,
        zoom: 1,
      }),
    ).toEqual({
      x: 0,
      y: 200,
      width: 800,
      height: 400,
    });
  });

  it('derives image footprint scale from preview distance', () => {
    expect(
      getImageFootprintScale({
        imageHeight: 1000,
        imageWidth: 1000,
        previewDistance: REFERENCE_PREVIEW_DISTANCE,
        viewportHeight: 600,
        viewportWidth: 800,
      }),
    ).toBeCloseTo(1);

    expect(
      getImageFootprintScale({
        imageHeight: 1000,
        imageWidth: 1000,
        previewDistance: 8,
        viewportHeight: 600,
        viewportWidth: 800,
      }),
    ).toBeCloseTo(0.5, 5);
  });

  it('derives mesh footprint scale from projected bounds', () => {
    const camera = new THREE.PerspectiveCamera(45, 800 / 600, 0.1, 100);
    const target = new THREE.Vector3(0, 0, 0);
    camera.position.set(0, 0, 8);
    camera.lookAt(target);
    camera.updateProjectionMatrix();
    camera.updateMatrixWorld(true);

    expect(
      getMeshFootprintScale({
        camera,
        localBounds: new THREE.Box3(
          new THREE.Vector3(-0.5, -0.5, -0.5),
          new THREE.Vector3(0.5, 0.5, 0.5),
        ),
        lookAtTarget: target,
        meshMatrixWorld: new THREE.Matrix4(),
        viewportHeight: 600,
        viewportWidth: 800,
      }),
    ).toBeCloseTo(0.5, 1);
  });
});

describe('parseExportedPreset', () => {
  it('falls back to the reference preview distance for legacy presets', () => {
    const content = `
const settings = ${JSON.stringify(DEFAULT_HALFTONE_SETTINGS, null, 2)};
const shape = ${JSON.stringify(
      {
        filename: null,
        key: 'torusKnot',
        kind: 'builtin',
        label: 'Torus Knot',
        loader: null,
      },
      null,
      2,
    )};
const initialPose = ${JSON.stringify(
      {
        autoElapsed: 0,
        rotateElapsed: 0,
        rotationX: 0,
        rotationY: 0,
        rotationZ: 0,
        targetRotationX: 0,
        targetRotationY: 0,
        timeElapsed: 0,
      },
      null,
      2,
    )};
const VIRTUAL_RENDER_HEIGHT = 768;

export default function LegacyHalftone() {
  return null;
}
`;

    expect(parseExportedPreset(content).previewDistance).toBe(
      REFERENCE_PREVIEW_DISTANCE,
    );
  });
});
