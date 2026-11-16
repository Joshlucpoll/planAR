"use client";

import { THREEx, ARjs } from "@ar-js-org/ar.js-threejs";
import { ArToolkitContext } from "@ar-js-org/ar.js-threejs/types/ArToolkitContext";
import { ArToolkitSource } from "@ar-js-org/ar.js-threejs/types/ArToolkitSource";
import { ISourceParameters } from "@ar-js-org/ar.js-threejs/types/CommonInterfaces/THREEx-interfaces";
import { useEffect } from "react";
import * as THREE from "three";

interface IARjsObjects {
  renderer: THREE.Renderer;
  scene: THREE.Scene;
  camera: THREE.Camera;
  arToolkitContext: ArToolkitContext;
  arToolkitSource: ArToolkitSource;
}

function init(): IARjsObjects {
  const scene = new THREE.Scene();

  const ambientLight = new THREE.AmbientLight(0xcccccc, 0.5);
  scene.add(ambientLight);

  const camera = new THREE.Camera();
  scene.add(camera);

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
  });

  renderer.setClearColor(new THREE.Color("lightgrey"), 0);
  renderer.setSize(640, 480);
  renderer.domElement.style.position = "absolute";
  renderer.domElement.style.top = "0px";
  renderer.domElement.style.left = "0px";
  document.body.appendChild(renderer.domElement);

  const arToolkitSource = new THREEx.ArToolkitSource({
    sourceType: "webcam",
  } as ISourceParameters);

  arToolkitSource.init(
    function onReady() {
      onResize();
    },
    () => {}
  );

  const arToolkitContext = new THREEx.ArToolkitContext({
    cameraParametersUrl: "/test/data/camera_para.dat",
    detectionMode: "mono",
  });

  arToolkitContext.init(function onCompleted() {
    camera.projectionMatrix.copy(arToolkitContext.getProjectionMatrix());
  });

  if (typeof window !== "undefined") {
    // Client-side-only code
    window.addEventListener("resize", function () {
      onResize();
    });
  }

  function onResize() {
    arToolkitSource.onResizeElement();
    arToolkitSource.copyElementSizeTo(renderer.domElement);
    if (arToolkitContext.arController !== null) {
      arToolkitSource.copyElementSizeTo(arToolkitContext.arController.canvas);
    }
  }

  return { renderer, scene, camera, arToolkitContext, arToolkitSource };
}

export function ARView() {
  useEffect(() => {
    const { renderer, scene, camera, arToolkitContext, arToolkitSource } =
      init();

    const animate = () => {
      requestAnimationFrame(animate);

      if (arToolkitSource.ready === false) return;

      arToolkitContext.update(arToolkitSource.domElement);

      renderer.render(scene, camera);
    };
    animate();

    const marker = new THREE.Group();
    scene.add(marker);
    const markerControls = new THREEx.ArMarkerControls(
      arToolkitContext,
      marker,
      {
        type: "pattern",
        patternUrl: "/test/data/hiro.patt",
      }
    );

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshNormalMaterial({
      transparent: true,
      opacity: 0.5,
      side: THREE.DoubleSide,
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.y = 0.5;

    marker.add(mesh);
  }, []);

  return <div></div>;
}
