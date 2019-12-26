import * as THREE from 'three';

export default function(el, text, font) {
  const width = window.innerWidth / 2;
  const height = window.innerHeight;

  // CAMERA
  const camera = new THREE.PerspectiveCamera(30, width / height, 1, 1500);
  camera.position.set(0, 400, 700);
  const cameraTarget = new THREE.Vector3(0, 150, 0);
  // SCENE
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);
  scene.fog = new THREE.Fog(0x000000, 250, 1400);
  // LIGHTS
  var dirLight = new THREE.DirectionalLight(0xffffff, 0.125);
  dirLight.position.set(0, 0, 1).normalize();
  scene.add(dirLight);
  var pointLight = new THREE.PointLight(0xffffff, 1.5);
  pointLight.position.set(0, 200, 200);
  scene.add(pointLight);

  const clippingPlanes = [
    new THREE.Plane(new THREE.Vector3(0, 0, 1), 0),
    new THREE.Plane(new THREE.Vector3(0, 0, -1), 0)
  ];
  const materials = [
    new THREE.MeshPhongMaterial({
      color: 0xffffff,
      flatShading: true,
      clippingPlanes
    }), // front
    new THREE.MeshPhongMaterial({ color: 0xffffff, clippingPlanes }) // side
  ];
  const group = new THREE.Group();
  group.position.y = 100;
  scene.add(group);

  const size = 100;
  const curveSegments = 4;
  const bevelThickness = 2;
  const bevelSize = 2;
  const bevelEnabled = true;
  let textGeo;
  // textGeo = new THREE.TextGeometry(text, {
  //   font: new THREE.Font(font),
  //   size: size,
  //   height: fontHeight,
  //   curveSegments: curveSegments,
  //   bevelThickness: bevelThickness,
  //   bevelSize: bevelSize,
  //   bevelEnabled: bevelEnabled
  // });

  const extrudePath = new THREE.CurvePath();
  extrudePath.add(
    new THREE.LineCurve3(
      new THREE.Vector3(0, 0, -120),
      new THREE.Vector3(0, 0, -100)
    )
  );
  extrudePath.add(
    new THREE.CubicBezierCurve3(
      new THREE.Vector3(0, 0, -100),
      new THREE.Vector3(0, 0, -50),
      new THREE.Vector3(30, 0, -30),
      new THREE.Vector3(30, 0, 0)
    )
  );
  extrudePath.add(
    new THREE.CubicBezierCurve3(
      new THREE.Vector3(30, 0, 0),
      new THREE.Vector3(30, 0, 30),
      new THREE.Vector3(0, 0, 50),
      new THREE.Vector3(0, 0, 100)
    )
  );
  extrudePath.add(
    new THREE.LineCurve3(
      new THREE.Vector3(0, 0, 100),
      new THREE.Vector3(0, 0, 120)
    )
  );
  const tFont = new THREE.Font(font);
  textGeo = new THREE.TextGeometry(text, {
    font: tFont,
    size: size,
    steps: 100,
    curveSegments: curveSegments,
    extrudePath: extrudePath
  });
  // textGeo.computeBoundingBox();
  // textGeo.computeVertexNormals();

  const textMesh = new THREE.Mesh(textGeo, materials);
  textMesh.add(new THREE.AxesHelper(100));
  // const centerOffset =
  //   -0.5 * (textGeo.boundingBox.max.x - textGeo.boundingBox.min.x);
  // textMesh.position.x = centerOffset;
  // textMesh.position.y = hover;
  // textMesh.position.z = 0;
  // textMesh.rotation.x = 0;
  // textMesh.rotation.y = Math.PI * 2;
  textMesh.rotation.z = Math.PI / 2;
  group.add(textMesh);

  const textPlaneExtrudePath = new THREE.CurvePath();
  textPlaneExtrudePath.add(
    new THREE.LineCurve3(
      new THREE.Vector3(0, 0, -0.01),
      new THREE.Vector3(0, 0, 0.01)
    )
  );
  const textPlaneGeom = new THREE.TextGeometry(text, {
    font: tFont,
    size: size,
    curveSegments: curveSegments,
    extrudePath: textPlaneExtrudePath
  });
  const textPlaneMaterials = [
    new THREE.MeshPhongMaterial({
      color: 0xffffff,
      flatShading: true
    }), // front
    new THREE.MeshPhongMaterial({ color: 0xffffff }) // side
  ];
  const textMeshFront = new THREE.Mesh(textPlaneGeom, textPlaneMaterials);
  const textMeshBack = new THREE.Mesh(textPlaneGeom, textPlaneMaterials);
  textMeshFront.rotation.z = Math.PI / 2;
  textMeshBack.rotation.z = Math.PI / 2;
  textMeshFront.add(new THREE.AxesHelper(100));
  // group.add(textMeshFront);
  // group.add(textMeshBack);

  var plane = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(10000, 10000),
    new THREE.MeshBasicMaterial({
      color: 0xffffff,
      opacity: 0.5,
      transparent: true
    })
  );
  plane.position.y = 100;
  plane.rotation.x = -Math.PI / 2;
  scene.add(plane);

  // RENDERER
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);
  renderer.localClippingEnabled = true;
  document.body.appendChild(renderer.domElement);

  function animate() {
    requestAnimationFrame(animate);
    render();
  }

  var targetRotation = 0;
  var targetRotationOnMouseDown = 0;
  var mouseX = 0;
  var mouseXOnMouseDown = 0;
  var windowHalfX = window.innerWidth / 2;

  const len = 121;
  const showLen = 1 / 12;
  var dir = true;
  var min = 0;
  var max = min;
  var t = Date.now();
  const turn = 2000;
  const axis = new THREE.Vector3(0, 0, 1);

  function render() {
    const time = Date.now();
    const move = (time - t) / turn;
    t = time;

    if (dir) {
      max += move;
      min = Math.max(0, max - showLen);
    } else {
      min -= move;
      max = Math.min(1, min + showLen);
    }

    if (max >= 0.99) {
      dir = false;
    }
    if (min <= 0.01) {
      dir = true;
    }

    textMeshBack.position.copy(
      extrudePath.getPoint(0).applyAxisAngle(axis, Math.PI / 2)
    );
    textMeshFront.position.copy(
      extrudePath.getPoint(1).applyAxisAngle(axis, Math.PI / 2)
    );

    group.rotation.y += (targetRotation - group.rotation.y) * 0.05;
    const quat = new THREE.Quaternion().setFromEuler(group.rotation);

    clippingPlanes[0].set(
      new THREE.Vector3(0, 0, 1).applyQuaternion(quat),
      -textMeshBack.position.z + 0.01
    );
    clippingPlanes[1].set(
      new THREE.Vector3(0, 0, -1).applyQuaternion(quat),
      textMeshFront.position.z + 0.01
    );

    camera.lookAt(cameraTarget);
    renderer.clear();
    renderer.render(scene, camera);
  }

  renderer.domElement.addEventListener('mousedown', onDocumentMouseDown, false);
  function onDocumentMouseDown(event) {
    event.preventDefault();
    renderer.domElement.addEventListener(
      'mousemove',
      onDocumentMouseMove,
      false
    );
    renderer.domElement.addEventListener('mouseup', onDocumentMouseUp, false);
    renderer.domElement.addEventListener('mouseout', onDocumentMouseOut, false);
    mouseXOnMouseDown = event.clientX - windowHalfX;
    targetRotationOnMouseDown = targetRotation;
  }
  function onDocumentMouseMove(event) {
    mouseX = event.clientX - windowHalfX;
    targetRotation =
      targetRotationOnMouseDown + (mouseX - mouseXOnMouseDown) * 0.02;
  }
  function onDocumentMouseUp() {
    renderer.domElement.removeEventListener(
      'mousemove',
      onDocumentMouseMove,
      false
    );
    renderer.domElement.removeEventListener(
      'mouseup',
      onDocumentMouseUp,
      false
    );
    renderer.domElement.removeEventListener(
      'mouseout',
      onDocumentMouseOut,
      false
    );
  }
  function onDocumentMouseOut() {
    renderer.domElement.removeEventListener(
      'mousemove',
      onDocumentMouseMove,
      false
    );
    renderer.domElement.removeEventListener(
      'mouseup',
      onDocumentMouseUp,
      false
    );
    renderer.domElement.removeEventListener(
      'mouseout',
      onDocumentMouseOut,
      false
    );
  }

  animate();
}
