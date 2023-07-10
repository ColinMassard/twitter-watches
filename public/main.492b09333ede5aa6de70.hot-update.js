"use strict";
self["webpackHotUpdateboilerplate_prismic"]("main",{

/***/ "./app/components/Canvas/Home/Media.js":
/*!*********************************************!*\
  !*** ./app/components/Canvas/Home/Media.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var gsap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! gsap */ "./node_modules/gsap/index.js");
/* harmony import */ var ogl__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ogl */ "./node_modules/ogl/src/core/Program.js");
/* harmony import */ var ogl__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ogl */ "./node_modules/ogl/src/core/Mesh.js");
/* harmony import */ var shaders_home_fragment_glsl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! shaders/home-fragment.glsl */ "./app/shaders/home-fragment.glsl");
/* harmony import */ var shaders_home_vertex_glsl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! shaders/home-vertex.glsl */ "./app/shaders/home-vertex.glsl");




/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (class {
  constructor({
    element,
    geometry,
    gl,
    index,
    scene,
    sizes
  }) {
    this.element = element;
    this.geometry = geometry;
    this.gl = gl;
    this.index = index;
    this.scene = scene;
    this.sizes = sizes;
    this.extra = {
      x: 0,
      y: 0
    };
    this.createTexture();
    this.createProgram();
    this.createMesh();
    this.createBounds({
      sizes: this.sizes
    });
  }
  createTexture() {
    const image = this.element;
    this.texture = window.TEXTURES[image.getAttribute('data-src')];
  }
  createProgram() {
    this.program = new ogl__WEBPACK_IMPORTED_MODULE_2__.Program(this.gl, {
      fragment: shaders_home_fragment_glsl__WEBPACK_IMPORTED_MODULE_0__["default"],
      vertex: shaders_home_vertex_glsl__WEBPACK_IMPORTED_MODULE_1__["default"],
      uniforms: {
        uAlpha: {
          value: 0
        },
        uSpeed: {
          value: 0
        },
        uViewportSizes: {
          value: [this.sizes.width, this.sizes.height]
        },
        tMap: {
          value: this.texture
        }
      }
    });
  }
  createMesh() {
    this.mesh = new ogl__WEBPACK_IMPORTED_MODULE_3__.Mesh(this.gl, {
      geometry: this.geometry,
      program: this.program
    });
    this.mesh.setParent(this.scene);

    // this.mesh.rotation.z = -Math.PI / 4
  }

  createBounds({
    sizes
  }) {
    this.sizes = sizes;
    this.bounds = this.element.getBoundingClientRect();
    this.updateScale(sizes);
    this.updateX();
    this.updateY();
  }

  /****
   * ANIMATIONS
   * ***/
  show() {
    gsap__WEBPACK_IMPORTED_MODULE_4__["default"].fromTo(this.program.uniforms.uAlpha, {
      value: 0
    }, {
      value: 0.75
    });
  }
  hide() {
    gsap__WEBPACK_IMPORTED_MODULE_4__["default"].to(this.program.uniforms.uAlpha, {
      value: 0
    });
  }

  /****
   * EVENTS
   * ***/
  onResize(sizes, scroll) {
    this.extra = {
      x: 0,
      y: 0
    };
    this.createBounds(sizes);
    this.updateX(scroll && scroll.x);
    this.updateY(scroll && scroll.y);
  }

  /****
   * LOOP
   * ***/
  updateScale() {
    this.width = this.bounds.width / window.innerWidth;
    this.height = this.bounds.height / window.innerHeight;
    this.mesh.scale.x = this.sizes.width * this.width;
    this.mesh.scale.y = this.sizes.height * this.height;
  }
  updateX(x = 0) {
    this.x = (this.bounds.left + x) / window.innerWidth;
    this.mesh.position.x = -this.sizes.width / 2 + this.mesh.scale.x / 2 + this.x * this.sizes.width + this.extra.x;
  }
  updateY(media, y = 0, multiplier, direction, height, offsetY, scaleY) {
    this.y = (this.bounds.top + y) / window.innerHeight;
    this.mesh.position.y = (this.sizes.height / 2 - this.mesh.scale.y / 2 - this.y * this.sizes.height + this.extra.y) * multiplier;
    if (multiplier === 1) {
      if (direction === 'top') {
        const y = media.mesh.position.y + scaleY;
        if (y < -offsetY) {
          media.extra.y += height;
        }
      } else if (direction === 'bottom') {
        const y = media.mesh.position.y - scaleY;
        if (y > offsetY) {
          media.extra.y -= height;
        }
      }
    } else if (multiplier === -1) {
      if (direction === 'top') {
        const y = media.mesh.position.y - scaleY;
        if (y > offsetY) {
          media.extra.y += height;
        }
      } else if (direction === 'bottom') {
        const y = media.mesh.position.y + scaleY;
        if (y < -offsetY) {
          media.extra.y -= height;
        }
      }
    }
  }
  update(media, scroll, speed, multiplier, direction, height, offsetY, scaleY, y) {
    this.updateX(scroll.x);
    this.updateY(media, scroll.y, multiplier, direction, height, offsetY, scaleY);
    this.program.uniforms.uSpeed.value = (y.current - y.target) / this.sizes.width * 0.005;
  }
  roll(media, scroll, speed, multiplier, direction, height, offsetY, scaleY, y) {
    this.y = (this.bounds.top + y) / window.innerHeight;
    this.mesh.position.y = (this.sizes.height / 2 - this.mesh.scale.y / 2 - this.y * this.sizes.height + this.extra.y) * multiplier;
    if (multiplier === 1) {
      if (direction === 'top') {
        const y = media.mesh.position.y + scaleY;
        if (y < -offsetY) {
          media.extra.y += height;
        }
      } else if (direction === 'bottom') {
        const y = media.mesh.position.y - scaleY;
        if (y > offsetY) {
          media.extra.y -= height;
        }
      }
    } else if (multiplier === -1) {
      if (direction === 'top') {
        const y = media.mesh.position.y - scaleY;
        if (y > offsetY) {
          media.extra.y += height;
        }
      } else if (direction === 'bottom') {
        const y = media.mesh.position.y + scaleY;
        if (y < -offsetY) {
          media.extra.y -= height;
        }
      }
    }
  }
});

/***/ }),

/***/ "./app/components/Canvas/Home/index.js":
/*!*********************************************!*\
  !*** ./app/components/Canvas/Home/index.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var ogl__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ogl */ "./node_modules/ogl/src/core/Transform.js");
/* harmony import */ var ogl__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ogl */ "./node_modules/ogl/src/extras/Plane.js");
/* harmony import */ var gsap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! gsap */ "./node_modules/gsap/index.js");
/* harmony import */ var lodash_map__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/map */ "./node_modules/lodash/map.js");
/* harmony import */ var lodash_map__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_map__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Media__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Media */ "./app/components/Canvas/Home/Media.js");




/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (class {
  constructor({
    gl,
    scene,
    sizes
  }) {
    this.gl = gl;
    this.scene = scene;
    this.sizes = sizes;
    this.group = new ogl__WEBPACK_IMPORTED_MODULE_2__.Transform();
    this.galleryElement = document.querySelector('.home__gallery');
    this.mediasElements = document.querySelectorAll('.home__gallery__media__image');
    this.slotRoll = document.querySelector('.home__button');
    this.buttonRoll = document.querySelector('.home__button button');
    this.speedAutoScroll = 2;
    this.x = {
      current: 0,
      target: 0,
      lerp: 0.1
    };
    this.y = {
      current: 0,
      target: 0,
      lerp: 0.1
    };
    this.scrollCurrent = {
      x: 0,
      y: 0
    };
    this.scroll = {
      x: 0,
      y: 0
    };
    this.speed = {
      current: 0,
      target: 0,
      lerp: 0.1
    };
    this.createGeometry();
    this.createGallery();
    this.onResize({
      sizes: this.sizes
    });
    this.createButtonRoll(this.slotRoll);
    this.group.setParent(this.scene);
    this.show();
  }
  createGeometry() {
    this.geometry = new ogl__WEBPACK_IMPORTED_MODULE_3__.Plane(this.gl, {
      heightSegments: 20,
      widthSegments: 20
    });
  }
  createGallery() {
    this.medias = lodash_map__WEBPACK_IMPORTED_MODULE_0___default()(this.mediasElements, (element, index) => {
      return new _Media__WEBPACK_IMPORTED_MODULE_1__["default"]({
        element,
        geometry: this.geometry,
        index,
        gl: this.gl,
        scene: this.group,
        sizes: this.sizes
      });
    });
  }
  createButtonRoll(buttonRoll) {
    let mediaAssets = [];
    buttonRoll.addEventListener('click', _ => {
      mediaAssets = [];
      this.speedAutoScroll = 0;
      this.y.target = Math.random() * 10000;
      lodash_map__WEBPACK_IMPORTED_MODULE_0___default()(this.medias, (media, index) => {
        mediaAssets[index] = [media.bounds.top, media.element.alt];
      });
      console.log(mediaAssets);
      console.log(this.scroll.y + this.sizes.height / 2);
      const target = this.scroll.y + this.sizes.height / 2;
      mediaAssets.sort(function (a, b) {
        return a[0] - b[0];
      });
      const closest = mediaAssets.reduce((a, b) => {
        return Math.abs(b - target) < Math.abs(a - target) ? b : a;
      });
      console.log(closest);
      this.buttonRoll.innerText = 'Roll again ?';
    });
  }

  /****
   * ANIMATIONS
   * ***/
  show() {
    lodash_map__WEBPACK_IMPORTED_MODULE_0___default()(this.medias, media => media.show());
  }
  hide() {
    lodash_map__WEBPACK_IMPORTED_MODULE_0___default()(this.medias, media => media.hide());
  }

  /****
   * EVENTS
   * ***/
  onResize(event) {
    this.galleryBounds = this.galleryElement.getBoundingClientRect();
    this.sizes = event.sizes;
    this.gallerySizes = {
      height: this.galleryBounds.height / window.innerHeight * this.sizes.height,
      width: this.galleryBounds.width / window.innerWidth * this.sizes.width
    };
    this.scroll.x = this.x.target = 0;
    this.scroll.y = this.y.target = 0;
    lodash_map__WEBPACK_IMPORTED_MODULE_0___default()(this.medias, media => media.onResize(event, this.scroll));
  }
  onTouchDown({
    x,
    y
  }) {}
  onTouchMove({
    x,
    y
  }) {}
  onTouchUp({
    x,
    y
  }) {}
  onWheel({
    pixelX,
    pixelY
  }) {
    // this.x.target += pixelX
    this.y.target += pixelY;
  }

  /****
   * LOOP
   * ***/
  update() {
    this.y.target += this.speedAutoScroll;
    this.speed.current = gsap__WEBPACK_IMPORTED_MODULE_4__["default"].utils.interpolate(this.speed.current, this.speed.target, this.speed.lerp);
    this.x.current = gsap__WEBPACK_IMPORTED_MODULE_4__["default"].utils.interpolate(this.x.current, this.x.target, this.x.lerp);
    this.y.current = gsap__WEBPACK_IMPORTED_MODULE_4__["default"].utils.interpolate(this.y.current, this.y.target, this.y.lerp);
    if (this.scroll.y < this.y.current) {
      this.y.direction = 'top';
    } else if (this.scroll.y > this.y.current) {
      this.y.direction = 'bottom';
    }
    this.scroll.x = this.x.current;
    this.scroll.y = this.y.current;
    lodash_map__WEBPACK_IMPORTED_MODULE_0___default()(this.medias, (media, index) => {
      const offsetY = this.sizes.height * 0.6;
      const scaleY = media.mesh.scale.y / 2;
      if (index % 2 === 0) {
        this.multiplier = -1;
      } else if (index % 2 === 1) {
        this.multiplier = 1;
      }
      media.update(media, this.scroll, this.speed.current, this.multiplier, this.y.direction, this.gallerySizes.height, offsetY, scaleY, this.y);
    });
  }

  /****
   * DESTROY
   * ***/
  destroy() {
    this.scene.removeChild(this.group);
  }
});

/***/ }),

/***/ "./app/shaders/home-fragment.glsl":
/*!****************************************!*\
  !*** ./app/shaders/home-fragment.glsl ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("precision highp float;\n#define GLSLIFY 1\n\nuniform float uAlpha;\nuniform sampler2D tMap;\n\nvarying vec2 vUv;\n\nvoid main() {\n  vec4 texture = texture2D(tMap, vUv);\n\n  gl_FragColor = texture;\n  gl_FragColor.a = uAlpha;\n}\n");

/***/ }),

/***/ "./app/shaders/home-vertex.glsl":
/*!**************************************!*\
  !*** ./app/shaders/home-vertex.glsl ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("#define GLSLIFY 1\n#define PI 3.1415926535897932384626433832795\n\nattribute vec3 position;\nattribute vec2 uv;\n\nuniform float uSpeed;\nuniform vec2 uViewportSizes;\n\nuniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\n\nvarying float speed;\nvarying vec2 vUv;\n\nvoid main() {\n  vUv = uv;\n\n  vec4 newPosition = modelViewMatrix * vec4(position, 1.0);\n\n  newPosition.z += (sin(newPosition.y / uViewportSizes.y * PI + PI / 2.0)) * uSpeed;\n\n  gl_Position = projectionMatrix * newPosition;\n}\n");

/***/ }),

/***/ "./node_modules/ogl/src/core/Geometry.js":
/*!***********************************************!*\
  !*** ./node_modules/ogl/src/core/Geometry.js ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Geometry: () => (/* binding */ Geometry)
/* harmony export */ });
/* harmony import */ var _math_Vec3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../math/Vec3.js */ "./node_modules/ogl/src/math/Vec3.js");
// attribute params
// {
//     data - typed array eg UInt16Array for indices, Float32Array
//     size - int default 1
//     instanced - default null. Pass divisor amount
//     type - gl enum default gl.UNSIGNED_SHORT for 'index', gl.FLOAT for others
//     normalized - boolean default false

//     buffer - gl buffer, if buffer exists, don't need to provide data - although needs position data for bounds calculation
//     stride - default 0 - for when passing in buffer
//     offset - default 0 - for when passing in buffer
//     count - default null - for when passing in buffer
//     min - array - for when passing in buffer
//     max - array - for when passing in buffer
// }

// TODO: fit in transform feedback


const tempVec3 = new _math_Vec3_js__WEBPACK_IMPORTED_MODULE_0__.Vec3();
let ID = 1;
let ATTR_ID = 1;

// To stop inifinite warnings
let isBoundsWarned = false;
class Geometry {
  constructor(gl, attributes = {}) {
    if (!gl.canvas) console.error('gl not passed as first argument to Geometry');
    this.gl = gl;
    this.attributes = attributes;
    this.id = ID++;

    // Store one VAO per program attribute locations order
    this.VAOs = {};
    this.drawRange = {
      start: 0,
      count: 0
    };
    this.instancedCount = 0;

    // Unbind current VAO so that new buffers don't get added to active mesh
    this.gl.renderer.bindVertexArray(null);
    this.gl.renderer.currentGeometry = null;

    // Alias for state store to avoid redundant calls for global state
    this.glState = this.gl.renderer.state;

    // create the buffers
    for (let key in attributes) {
      this.addAttribute(key, attributes[key]);
    }
  }
  addAttribute(key, attr) {
    this.attributes[key] = attr;

    // Set options
    attr.id = ATTR_ID++; // TODO: currently unused, remove?
    attr.size = attr.size || 1;
    attr.type = attr.type || (attr.data.constructor === Float32Array ? this.gl.FLOAT : attr.data.constructor === Uint16Array ? this.gl.UNSIGNED_SHORT : this.gl.UNSIGNED_INT); // Uint32Array
    attr.target = key === 'index' ? this.gl.ELEMENT_ARRAY_BUFFER : this.gl.ARRAY_BUFFER;
    attr.normalized = attr.normalized || false;
    attr.stride = attr.stride || 0;
    attr.offset = attr.offset || 0;
    attr.count = attr.count || (attr.stride ? attr.data.byteLength / attr.stride : attr.data.length / attr.size);
    attr.divisor = attr.instanced || 0;
    attr.needsUpdate = false;
    attr.usage = attr.usage || this.gl.STATIC_DRAW;
    if (!attr.buffer) {
      // Push data to buffer
      this.updateAttribute(attr);
    }

    // Update geometry counts. If indexed, ignore regular attributes
    if (attr.divisor) {
      this.isInstanced = true;
      if (this.instancedCount && this.instancedCount !== attr.count * attr.divisor) {
        console.warn('geometry has multiple instanced buffers of different length');
        return this.instancedCount = Math.min(this.instancedCount, attr.count * attr.divisor);
      }
      this.instancedCount = attr.count * attr.divisor;
    } else if (key === 'index') {
      this.drawRange.count = attr.count;
    } else if (!this.attributes.index) {
      this.drawRange.count = Math.max(this.drawRange.count, attr.count);
    }
  }
  updateAttribute(attr) {
    const isNewBuffer = !attr.buffer;
    if (isNewBuffer) attr.buffer = this.gl.createBuffer();
    if (this.glState.boundBuffer !== attr.buffer) {
      this.gl.bindBuffer(attr.target, attr.buffer);
      this.glState.boundBuffer = attr.buffer;
    }
    if (isNewBuffer) {
      this.gl.bufferData(attr.target, attr.data, attr.usage);
    } else {
      this.gl.bufferSubData(attr.target, 0, attr.data);
    }
    attr.needsUpdate = false;
  }
  setIndex(value) {
    this.addAttribute('index', value);
  }
  setDrawRange(start, count) {
    this.drawRange.start = start;
    this.drawRange.count = count;
  }
  setInstancedCount(value) {
    this.instancedCount = value;
  }
  createVAO(program) {
    this.VAOs[program.attributeOrder] = this.gl.renderer.createVertexArray();
    this.gl.renderer.bindVertexArray(this.VAOs[program.attributeOrder]);
    this.bindAttributes(program);
  }
  bindAttributes(program) {
    // Link all attributes to program using gl.vertexAttribPointer
    program.attributeLocations.forEach((location, {
      name,
      type
    }) => {
      // If geometry missing a required shader attribute
      if (!this.attributes[name]) {
        console.warn(`active attribute ${name} not being supplied`);
        return;
      }
      const attr = this.attributes[name];
      this.gl.bindBuffer(attr.target, attr.buffer);
      this.glState.boundBuffer = attr.buffer;

      // For matrix attributes, buffer needs to be defined per column
      let numLoc = 1;
      if (type === 35674) numLoc = 2; // mat2
      if (type === 35675) numLoc = 3; // mat3
      if (type === 35676) numLoc = 4; // mat4

      const size = attr.size / numLoc;
      const stride = numLoc === 1 ? 0 : numLoc * numLoc * 4;
      const offset = numLoc === 1 ? 0 : numLoc * 4;
      for (let i = 0; i < numLoc; i++) {
        this.gl.vertexAttribPointer(location + i, size, attr.type, attr.normalized, attr.stride + stride, attr.offset + i * offset);
        this.gl.enableVertexAttribArray(location + i);

        // For instanced attributes, divisor needs to be set.
        // For firefox, need to set back to 0 if non-instanced drawn after instanced. Else won't render
        this.gl.renderer.vertexAttribDivisor(location + i, attr.divisor);
      }
    });

    // Bind indices if geometry indexed
    if (this.attributes.index) this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.attributes.index.buffer);
  }
  draw({
    program,
    mode = this.gl.TRIANGLES
  }) {
    if (this.gl.renderer.currentGeometry !== `${this.id}_${program.attributeOrder}`) {
      if (!this.VAOs[program.attributeOrder]) this.createVAO(program);
      this.gl.renderer.bindVertexArray(this.VAOs[program.attributeOrder]);
      this.gl.renderer.currentGeometry = `${this.id}_${program.attributeOrder}`;
    }

    // Check if any attributes need updating
    program.attributeLocations.forEach((location, {
      name
    }) => {
      const attr = this.attributes[name];
      if (attr.needsUpdate) this.updateAttribute(attr);
    });

    // For drawElements, offset needs to be multiple of type size
    let indexBytesPerElement = 2;
    if (this.attributes.index?.type === this.gl.UNSIGNED_INT) indexBytesPerElement = 4;
    if (this.isInstanced) {
      if (this.attributes.index) {
        this.gl.renderer.drawElementsInstanced(mode, this.drawRange.count, this.attributes.index.type, this.attributes.index.offset + this.drawRange.start * indexBytesPerElement, this.instancedCount);
      } else {
        this.gl.renderer.drawArraysInstanced(mode, this.drawRange.start, this.drawRange.count, this.instancedCount);
      }
    } else {
      if (this.attributes.index) {
        this.gl.drawElements(mode, this.drawRange.count, this.attributes.index.type, this.attributes.index.offset + this.drawRange.start * indexBytesPerElement);
      } else {
        this.gl.drawArrays(mode, this.drawRange.start, this.drawRange.count);
      }
    }
  }
  getPosition() {
    // Use position buffer, or min/max if available
    const attr = this.attributes.position;
    // if (attr.min) return [...attr.min, ...attr.max];
    if (attr.data) return attr;
    if (isBoundsWarned) return;
    console.warn('No position buffer data found to compute bounds');
    return isBoundsWarned = true;
  }
  computeBoundingBox(attr) {
    if (!attr) attr = this.getPosition();
    const array = attr.data;
    // Data loaded shouldn't haave stride, only buffers
    // const stride = attr.stride ? attr.stride / array.BYTES_PER_ELEMENT : attr.size;
    const stride = attr.size;
    if (!this.bounds) {
      this.bounds = {
        min: new _math_Vec3_js__WEBPACK_IMPORTED_MODULE_0__.Vec3(),
        max: new _math_Vec3_js__WEBPACK_IMPORTED_MODULE_0__.Vec3(),
        center: new _math_Vec3_js__WEBPACK_IMPORTED_MODULE_0__.Vec3(),
        scale: new _math_Vec3_js__WEBPACK_IMPORTED_MODULE_0__.Vec3(),
        radius: Infinity
      };
    }
    const min = this.bounds.min;
    const max = this.bounds.max;
    const center = this.bounds.center;
    const scale = this.bounds.scale;
    min.set(+Infinity);
    max.set(-Infinity);

    // TODO: check size of position (eg triangle with Vec2)
    for (let i = 0, l = array.length; i < l; i += stride) {
      const x = array[i];
      const y = array[i + 1];
      const z = array[i + 2];
      min.x = Math.min(x, min.x);
      min.y = Math.min(y, min.y);
      min.z = Math.min(z, min.z);
      max.x = Math.max(x, max.x);
      max.y = Math.max(y, max.y);
      max.z = Math.max(z, max.z);
    }
    scale.sub(max, min);
    center.add(min, max).divide(2);
  }
  computeBoundingSphere(attr) {
    if (!attr) attr = this.getPosition();
    const array = attr.data;
    // Data loaded shouldn't haave stride, only buffers
    // const stride = attr.stride ? attr.stride / array.BYTES_PER_ELEMENT : attr.size;
    const stride = attr.size;
    if (!this.bounds) this.computeBoundingBox(attr);
    let maxRadiusSq = 0;
    for (let i = 0, l = array.length; i < l; i += stride) {
      tempVec3.fromArray(array, i);
      maxRadiusSq = Math.max(maxRadiusSq, this.bounds.center.squaredDistance(tempVec3));
    }
    this.bounds.radius = Math.sqrt(maxRadiusSq);
  }
  remove() {
    for (let key in this.VAOs) {
      this.gl.renderer.deleteVertexArray(this.VAOs[key]);
      delete this.VAOs[key];
    }
    for (let key in this.attributes) {
      this.gl.deleteBuffer(this.attributes[key].buffer);
      delete this.attributes[key];
    }
  }
}

/***/ }),

/***/ "./node_modules/ogl/src/core/Mesh.js":
/*!*******************************************!*\
  !*** ./node_modules/ogl/src/core/Mesh.js ***!
  \*******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Mesh: () => (/* binding */ Mesh)
/* harmony export */ });
/* harmony import */ var _Transform_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Transform.js */ "./node_modules/ogl/src/core/Transform.js");
/* harmony import */ var _math_Mat3_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../math/Mat3.js */ "./node_modules/ogl/src/math/Mat3.js");
/* harmony import */ var _math_Mat4_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../math/Mat4.js */ "./node_modules/ogl/src/math/Mat4.js");



let ID = 0;
class Mesh extends _Transform_js__WEBPACK_IMPORTED_MODULE_0__.Transform {
  constructor(gl, {
    geometry,
    program,
    mode = gl.TRIANGLES,
    frustumCulled = true,
    renderOrder = 0
  } = {}) {
    super();
    if (!gl.canvas) console.error('gl not passed as first argument to Mesh');
    this.gl = gl;
    this.id = ID++;
    this.geometry = geometry;
    this.program = program;
    this.mode = mode;

    // Used to skip frustum culling
    this.frustumCulled = frustumCulled;

    // Override sorting to force an order
    this.renderOrder = renderOrder;
    this.modelViewMatrix = new _math_Mat4_js__WEBPACK_IMPORTED_MODULE_1__.Mat4();
    this.normalMatrix = new _math_Mat3_js__WEBPACK_IMPORTED_MODULE_2__.Mat3();
    this.beforeRenderCallbacks = [];
    this.afterRenderCallbacks = [];
  }
  onBeforeRender(f) {
    this.beforeRenderCallbacks.push(f);
    return this;
  }
  onAfterRender(f) {
    this.afterRenderCallbacks.push(f);
    return this;
  }
  draw({
    camera
  } = {}) {
    if (camera) {
      // Add empty matrix uniforms to program if unset
      if (!this.program.uniforms.modelMatrix) {
        Object.assign(this.program.uniforms, {
          modelMatrix: {
            value: null
          },
          viewMatrix: {
            value: null
          },
          modelViewMatrix: {
            value: null
          },
          normalMatrix: {
            value: null
          },
          projectionMatrix: {
            value: null
          },
          cameraPosition: {
            value: null
          }
        });
      }

      // Set the matrix uniforms
      this.program.uniforms.projectionMatrix.value = camera.projectionMatrix;
      this.program.uniforms.cameraPosition.value = camera.worldPosition;
      this.program.uniforms.viewMatrix.value = camera.viewMatrix;
      this.modelViewMatrix.multiply(camera.viewMatrix, this.worldMatrix);
      this.normalMatrix.getNormalMatrix(this.modelViewMatrix);
      this.program.uniforms.modelMatrix.value = this.worldMatrix;
      this.program.uniforms.modelViewMatrix.value = this.modelViewMatrix;
      this.program.uniforms.normalMatrix.value = this.normalMatrix;
    }
    this.beforeRenderCallbacks.forEach(f => f && f({
      mesh: this,
      camera
    }));

    // determine if faces need to be flipped - when mesh scaled negatively
    let flipFaces = this.program.cullFace && this.worldMatrix.determinant() < 0;
    this.program.use({
      flipFaces
    });
    this.geometry.draw({
      mode: this.mode,
      program: this.program
    });
    this.afterRenderCallbacks.forEach(f => f && f({
      mesh: this,
      camera
    }));
  }
}

/***/ }),

/***/ "./node_modules/ogl/src/core/Program.js":
/*!**********************************************!*\
  !*** ./node_modules/ogl/src/core/Program.js ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Program: () => (/* binding */ Program)
/* harmony export */ });
// TODO: upload empty texture if null ? maybe not
// TODO: upload identity matrix if null ?
// TODO: sampler Cube

let ID = 1;

// cache of typed arrays used to flatten uniform arrays
const arrayCacheF32 = {};
class Program {
  constructor(gl, {
    vertex,
    fragment,
    uniforms = {},
    transparent = false,
    cullFace = gl.BACK,
    frontFace = gl.CCW,
    depthTest = true,
    depthWrite = true,
    depthFunc = gl.LESS
  } = {}) {
    if (!gl.canvas) console.error('gl not passed as first argument to Program');
    this.gl = gl;
    this.uniforms = uniforms;
    this.id = ID++;
    if (!vertex) console.warn('vertex shader not supplied');
    if (!fragment) console.warn('fragment shader not supplied');

    // Store program state
    this.transparent = transparent;
    this.cullFace = cullFace;
    this.frontFace = frontFace;
    this.depthTest = depthTest;
    this.depthWrite = depthWrite;
    this.depthFunc = depthFunc;
    this.blendFunc = {};
    this.blendEquation = {};

    // set default blendFunc if transparent flagged
    if (this.transparent && !this.blendFunc.src) {
      if (this.gl.renderer.premultipliedAlpha) this.setBlendFunc(this.gl.ONE, this.gl.ONE_MINUS_SRC_ALPHA);else this.setBlendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
    }

    // compile vertex shader and log errors
    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertex);
    gl.compileShader(vertexShader);
    if (gl.getShaderInfoLog(vertexShader) !== '') {
      console.warn(`${gl.getShaderInfoLog(vertexShader)}\nVertex Shader\n${addLineNumbers(vertex)}`);
    }

    // compile fragment shader and log errors
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragment);
    gl.compileShader(fragmentShader);
    if (gl.getShaderInfoLog(fragmentShader) !== '') {
      console.warn(`${gl.getShaderInfoLog(fragmentShader)}\nFragment Shader\n${addLineNumbers(fragment)}`);
    }

    // compile program and log errors
    this.program = gl.createProgram();
    gl.attachShader(this.program, vertexShader);
    gl.attachShader(this.program, fragmentShader);
    gl.linkProgram(this.program);
    if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
      return console.warn(gl.getProgramInfoLog(this.program));
    }

    // Remove shader once linked
    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);

    // Get active uniform locations
    this.uniformLocations = new Map();
    let numUniforms = gl.getProgramParameter(this.program, gl.ACTIVE_UNIFORMS);
    for (let uIndex = 0; uIndex < numUniforms; uIndex++) {
      let uniform = gl.getActiveUniform(this.program, uIndex);
      this.uniformLocations.set(uniform, gl.getUniformLocation(this.program, uniform.name));

      // split uniforms' names to separate array and struct declarations
      const split = uniform.name.match(/(\w+)/g);
      uniform.uniformName = split[0];
      uniform.nameComponents = split.slice(1);
    }

    // Get active attribute locations
    this.attributeLocations = new Map();
    const locations = [];
    const numAttribs = gl.getProgramParameter(this.program, gl.ACTIVE_ATTRIBUTES);
    for (let aIndex = 0; aIndex < numAttribs; aIndex++) {
      const attribute = gl.getActiveAttrib(this.program, aIndex);
      const location = gl.getAttribLocation(this.program, attribute.name);
      // Ignore special built-in inputs. eg gl_VertexID, gl_InstanceID
      if (location === -1) continue;
      locations[location] = attribute.name;
      this.attributeLocations.set(attribute, location);
    }
    this.attributeOrder = locations.join('');
  }
  setBlendFunc(src, dst, srcAlpha, dstAlpha) {
    this.blendFunc.src = src;
    this.blendFunc.dst = dst;
    this.blendFunc.srcAlpha = srcAlpha;
    this.blendFunc.dstAlpha = dstAlpha;
    if (src) this.transparent = true;
  }
  setBlendEquation(modeRGB, modeAlpha) {
    this.blendEquation.modeRGB = modeRGB;
    this.blendEquation.modeAlpha = modeAlpha;
  }
  applyState() {
    if (this.depthTest) this.gl.renderer.enable(this.gl.DEPTH_TEST);else this.gl.renderer.disable(this.gl.DEPTH_TEST);
    if (this.cullFace) this.gl.renderer.enable(this.gl.CULL_FACE);else this.gl.renderer.disable(this.gl.CULL_FACE);
    if (this.blendFunc.src) this.gl.renderer.enable(this.gl.BLEND);else this.gl.renderer.disable(this.gl.BLEND);
    if (this.cullFace) this.gl.renderer.setCullFace(this.cullFace);
    this.gl.renderer.setFrontFace(this.frontFace);
    this.gl.renderer.setDepthMask(this.depthWrite);
    this.gl.renderer.setDepthFunc(this.depthFunc);
    if (this.blendFunc.src) this.gl.renderer.setBlendFunc(this.blendFunc.src, this.blendFunc.dst, this.blendFunc.srcAlpha, this.blendFunc.dstAlpha);
    this.gl.renderer.setBlendEquation(this.blendEquation.modeRGB, this.blendEquation.modeAlpha);
  }
  use({
    flipFaces = false
  } = {}) {
    let textureUnit = -1;
    const programActive = this.gl.renderer.state.currentProgram === this.id;

    // Avoid gl call if program already in use
    if (!programActive) {
      this.gl.useProgram(this.program);
      this.gl.renderer.state.currentProgram = this.id;
    }

    // Set only the active uniforms found in the shader
    this.uniformLocations.forEach((location, activeUniform) => {
      let uniform = this.uniforms[activeUniform.uniformName];
      for (const component of activeUniform.nameComponents) {
        if (!uniform) break;
        if (component in uniform) {
          uniform = uniform[component];
        } else if (Array.isArray(uniform.value)) {
          break;
        } else {
          uniform = undefined;
          break;
        }
      }
      if (!uniform) {
        return warn(`Active uniform ${activeUniform.name} has not been supplied`);
      }
      if (uniform && uniform.value === undefined) {
        return warn(`${activeUniform.name} uniform is missing a value parameter`);
      }
      if (uniform.value.texture) {
        textureUnit = textureUnit + 1;

        // Check if texture needs to be updated
        uniform.value.update(textureUnit);
        return setUniform(this.gl, activeUniform.type, location, textureUnit);
      }

      // For texture arrays, set uniform as an array of texture units instead of just one
      if (uniform.value.length && uniform.value[0].texture) {
        const textureUnits = [];
        uniform.value.forEach(value => {
          textureUnit = textureUnit + 1;
          value.update(textureUnit);
          textureUnits.push(textureUnit);
        });
        return setUniform(this.gl, activeUniform.type, location, textureUnits);
      }
      setUniform(this.gl, activeUniform.type, location, uniform.value);
    });
    this.applyState();
    if (flipFaces) this.gl.renderer.setFrontFace(this.frontFace === this.gl.CCW ? this.gl.CW : this.gl.CCW);
  }
  remove() {
    this.gl.deleteProgram(this.program);
  }
}
function setUniform(gl, type, location, value) {
  value = value.length ? flatten(value) : value;
  const setValue = gl.renderer.state.uniformLocations.get(location);

  // Avoid redundant uniform commands
  if (value.length) {
    if (setValue === undefined || setValue.length !== value.length) {
      // clone array to store as cache
      gl.renderer.state.uniformLocations.set(location, value.slice(0));
    } else {
      if (arraysEqual(setValue, value)) return;

      // Update cached array values
      setValue.set ? setValue.set(value) : setArray(setValue, value);
      gl.renderer.state.uniformLocations.set(location, setValue);
    }
  } else {
    if (setValue === value) return;
    gl.renderer.state.uniformLocations.set(location, value);
  }
  switch (type) {
    case 5126:
      return value.length ? gl.uniform1fv(location, value) : gl.uniform1f(location, value);
    // FLOAT
    case 35664:
      return gl.uniform2fv(location, value);
    // FLOAT_VEC2
    case 35665:
      return gl.uniform3fv(location, value);
    // FLOAT_VEC3
    case 35666:
      return gl.uniform4fv(location, value);
    // FLOAT_VEC4
    case 35670: // BOOL
    case 5124: // INT
    case 35678: // SAMPLER_2D
    case 35680:
      return value.length ? gl.uniform1iv(location, value) : gl.uniform1i(location, value);
    // SAMPLER_CUBE
    case 35671: // BOOL_VEC2
    case 35667:
      return gl.uniform2iv(location, value);
    // INT_VEC2
    case 35672: // BOOL_VEC3
    case 35668:
      return gl.uniform3iv(location, value);
    // INT_VEC3
    case 35673: // BOOL_VEC4
    case 35669:
      return gl.uniform4iv(location, value);
    // INT_VEC4
    case 35674:
      return gl.uniformMatrix2fv(location, false, value);
    // FLOAT_MAT2
    case 35675:
      return gl.uniformMatrix3fv(location, false, value);
    // FLOAT_MAT3
    case 35676:
      return gl.uniformMatrix4fv(location, false, value);
    // FLOAT_MAT4
  }
}

function addLineNumbers(string) {
  let lines = string.split('\n');
  for (let i = 0; i < lines.length; i++) {
    lines[i] = i + 1 + ': ' + lines[i];
  }
  return lines.join('\n');
}
function flatten(a) {
  const arrayLen = a.length;
  const valueLen = a[0].length;
  if (valueLen === undefined) return a;
  const length = arrayLen * valueLen;
  let value = arrayCacheF32[length];
  if (!value) arrayCacheF32[length] = value = new Float32Array(length);
  for (let i = 0; i < arrayLen; i++) value.set(a[i], i * valueLen);
  return value;
}
function arraysEqual(a, b) {
  if (a.length !== b.length) return false;
  for (let i = 0, l = a.length; i < l; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}
function setArray(a, b) {
  for (let i = 0, l = a.length; i < l; i++) {
    a[i] = b[i];
  }
}
let warnCount = 0;
function warn(message) {
  if (warnCount > 100) return;
  console.warn(message);
  warnCount++;
  if (warnCount > 100) console.warn('More than 100 program warnings - stopping logs.');
}

/***/ }),

/***/ "./node_modules/ogl/src/extras/Plane.js":
/*!**********************************************!*\
  !*** ./node_modules/ogl/src/extras/Plane.js ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Plane: () => (/* binding */ Plane)
/* harmony export */ });
/* harmony import */ var _core_Geometry_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/Geometry.js */ "./node_modules/ogl/src/core/Geometry.js");

class Plane extends _core_Geometry_js__WEBPACK_IMPORTED_MODULE_0__.Geometry {
  constructor(gl, {
    width = 1,
    height = 1,
    widthSegments = 1,
    heightSegments = 1,
    attributes = {}
  } = {}) {
    const wSegs = widthSegments;
    const hSegs = heightSegments;

    // Determine length of arrays
    const num = (wSegs + 1) * (hSegs + 1);
    const numIndices = wSegs * hSegs * 6;

    // Generate empty arrays once
    const position = new Float32Array(num * 3);
    const normal = new Float32Array(num * 3);
    const uv = new Float32Array(num * 2);
    const index = numIndices > 65536 ? new Uint32Array(numIndices) : new Uint16Array(numIndices);
    Plane.buildPlane(position, normal, uv, index, width, height, 0, wSegs, hSegs);
    Object.assign(attributes, {
      position: {
        size: 3,
        data: position
      },
      normal: {
        size: 3,
        data: normal
      },
      uv: {
        size: 2,
        data: uv
      },
      index: {
        data: index
      }
    });
    super(gl, attributes);
  }
  static buildPlane(position, normal, uv, index, width, height, depth, wSegs, hSegs, u = 0, v = 1, w = 2, uDir = 1, vDir = -1, i = 0, ii = 0) {
    const io = i;
    const segW = width / wSegs;
    const segH = height / hSegs;
    for (let iy = 0; iy <= hSegs; iy++) {
      let y = iy * segH - height / 2;
      for (let ix = 0; ix <= wSegs; ix++, i++) {
        let x = ix * segW - width / 2;
        position[i * 3 + u] = x * uDir;
        position[i * 3 + v] = y * vDir;
        position[i * 3 + w] = depth / 2;
        normal[i * 3 + u] = 0;
        normal[i * 3 + v] = 0;
        normal[i * 3 + w] = depth >= 0 ? 1 : -1;
        uv[i * 2] = ix / wSegs;
        uv[i * 2 + 1] = 1 - iy / hSegs;
        if (iy === hSegs || ix === wSegs) continue;
        let a = io + ix + iy * (wSegs + 1);
        let b = io + ix + (iy + 1) * (wSegs + 1);
        let c = io + ix + (iy + 1) * (wSegs + 1) + 1;
        let d = io + ix + iy * (wSegs + 1) + 1;
        index[ii * 6] = a;
        index[ii * 6 + 1] = b;
        index[ii * 6 + 2] = d;
        index[ii * 6 + 3] = b;
        index[ii * 6 + 4] = c;
        index[ii * 6 + 5] = d;
        ii++;
      }
    }
  }
}

/***/ }),

/***/ "./node_modules/ogl/src/math/Mat3.js":
/*!*******************************************!*\
  !*** ./node_modules/ogl/src/math/Mat3.js ***!
  \*******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Mat3: () => (/* binding */ Mat3)
/* harmony export */ });
/* harmony import */ var _functions_Mat3Func_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./functions/Mat3Func.js */ "./node_modules/ogl/src/math/functions/Mat3Func.js");

class Mat3 extends Array {
  constructor(m00 = 1, m01 = 0, m02 = 0, m10 = 0, m11 = 1, m12 = 0, m20 = 0, m21 = 0, m22 = 1) {
    super(m00, m01, m02, m10, m11, m12, m20, m21, m22);
    return this;
  }
  set(m00, m01, m02, m10, m11, m12, m20, m21, m22) {
    if (m00.length) return this.copy(m00);
    _functions_Mat3Func_js__WEBPACK_IMPORTED_MODULE_0__.set(this, m00, m01, m02, m10, m11, m12, m20, m21, m22);
    return this;
  }
  translate(v, m = this) {
    _functions_Mat3Func_js__WEBPACK_IMPORTED_MODULE_0__.translate(this, m, v);
    return this;
  }
  rotate(v, m = this) {
    _functions_Mat3Func_js__WEBPACK_IMPORTED_MODULE_0__.rotate(this, m, v);
    return this;
  }
  scale(v, m = this) {
    _functions_Mat3Func_js__WEBPACK_IMPORTED_MODULE_0__.scale(this, m, v);
    return this;
  }
  multiply(ma, mb) {
    if (mb) {
      _functions_Mat3Func_js__WEBPACK_IMPORTED_MODULE_0__.multiply(this, ma, mb);
    } else {
      _functions_Mat3Func_js__WEBPACK_IMPORTED_MODULE_0__.multiply(this, this, ma);
    }
    return this;
  }
  identity() {
    _functions_Mat3Func_js__WEBPACK_IMPORTED_MODULE_0__.identity(this);
    return this;
  }
  copy(m) {
    _functions_Mat3Func_js__WEBPACK_IMPORTED_MODULE_0__.copy(this, m);
    return this;
  }
  fromMatrix4(m) {
    _functions_Mat3Func_js__WEBPACK_IMPORTED_MODULE_0__.fromMat4(this, m);
    return this;
  }
  fromQuaternion(q) {
    _functions_Mat3Func_js__WEBPACK_IMPORTED_MODULE_0__.fromQuat(this, q);
    return this;
  }
  fromBasis(vec3a, vec3b, vec3c) {
    this.set(vec3a[0], vec3a[1], vec3a[2], vec3b[0], vec3b[1], vec3b[2], vec3c[0], vec3c[1], vec3c[2]);
    return this;
  }
  inverse(m = this) {
    _functions_Mat3Func_js__WEBPACK_IMPORTED_MODULE_0__.invert(this, m);
    return this;
  }
  getNormalMatrix(m) {
    _functions_Mat3Func_js__WEBPACK_IMPORTED_MODULE_0__.normalFromMat4(this, m);
    return this;
  }
}

/***/ }),

/***/ "./node_modules/ogl/src/math/functions/Mat3Func.js":
/*!*********************************************************!*\
  !*** ./node_modules/ogl/src/math/functions/Mat3Func.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   add: () => (/* binding */ add),
/* harmony export */   copy: () => (/* binding */ copy),
/* harmony export */   determinant: () => (/* binding */ determinant),
/* harmony export */   fromMat4: () => (/* binding */ fromMat4),
/* harmony export */   fromQuat: () => (/* binding */ fromQuat),
/* harmony export */   identity: () => (/* binding */ identity),
/* harmony export */   invert: () => (/* binding */ invert),
/* harmony export */   multiply: () => (/* binding */ multiply),
/* harmony export */   multiplyScalar: () => (/* binding */ multiplyScalar),
/* harmony export */   normalFromMat4: () => (/* binding */ normalFromMat4),
/* harmony export */   projection: () => (/* binding */ projection),
/* harmony export */   rotate: () => (/* binding */ rotate),
/* harmony export */   scale: () => (/* binding */ scale),
/* harmony export */   set: () => (/* binding */ set),
/* harmony export */   subtract: () => (/* binding */ subtract),
/* harmony export */   translate: () => (/* binding */ translate),
/* harmony export */   transpose: () => (/* binding */ transpose)
/* harmony export */ });
const EPSILON = 0.000001;

/**
 * Copies the upper-left 3x3 values into the given mat3.
 *
 * @param {mat3} out the receiving 3x3 matrix
 * @param {mat4} a   the source 4x4 matrix
 * @returns {mat3} out
 */
function fromMat4(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[4];
  out[4] = a[5];
  out[5] = a[6];
  out[6] = a[8];
  out[7] = a[9];
  out[8] = a[10];
  return out;
}

/**
 * Calculates a 3x3 matrix from the given quaternion
 *
 * @param {mat3} out mat3 receiving operation result
 * @param {quat} q Quaternion to create matrix from
 *
 * @returns {mat3} out
 */
function fromQuat(out, q) {
  let x = q[0],
    y = q[1],
    z = q[2],
    w = q[3];
  let x2 = x + x;
  let y2 = y + y;
  let z2 = z + z;
  let xx = x * x2;
  let yx = y * x2;
  let yy = y * y2;
  let zx = z * x2;
  let zy = z * y2;
  let zz = z * z2;
  let wx = w * x2;
  let wy = w * y2;
  let wz = w * z2;
  out[0] = 1 - yy - zz;
  out[3] = yx - wz;
  out[6] = zx + wy;
  out[1] = yx + wz;
  out[4] = 1 - xx - zz;
  out[7] = zy - wx;
  out[2] = zx - wy;
  out[5] = zy + wx;
  out[8] = 1 - xx - yy;
  return out;
}

/**
 * Copy the values from one mat3 to another
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
function copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  return out;
}

/**
 * Set the components of a mat3 to the given values
 *
 * @param {mat3} out the receiving matrix
 * @returns {mat3} out
 */
function set(out, m00, m01, m02, m10, m11, m12, m20, m21, m22) {
  out[0] = m00;
  out[1] = m01;
  out[2] = m02;
  out[3] = m10;
  out[4] = m11;
  out[5] = m12;
  out[6] = m20;
  out[7] = m21;
  out[8] = m22;
  return out;
}

/**
 * Set a mat3 to the identity matrix
 *
 * @param {mat3} out the receiving matrix
 * @returns {mat3} out
 */
function identity(out) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 1;
  out[5] = 0;
  out[6] = 0;
  out[7] = 0;
  out[8] = 1;
  return out;
}

/**
 * Transpose the values of a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
function transpose(out, a) {
  // If we are transposing ourselves we can skip a few steps but have to cache some values
  if (out === a) {
    let a01 = a[1],
      a02 = a[2],
      a12 = a[5];
    out[1] = a[3];
    out[2] = a[6];
    out[3] = a01;
    out[5] = a[7];
    out[6] = a02;
    out[7] = a12;
  } else {
    out[0] = a[0];
    out[1] = a[3];
    out[2] = a[6];
    out[3] = a[1];
    out[4] = a[4];
    out[5] = a[7];
    out[6] = a[2];
    out[7] = a[5];
    out[8] = a[8];
  }
  return out;
}

/**
 * Inverts a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
function invert(out, a) {
  let a00 = a[0],
    a01 = a[1],
    a02 = a[2];
  let a10 = a[3],
    a11 = a[4],
    a12 = a[5];
  let a20 = a[6],
    a21 = a[7],
    a22 = a[8];
  let b01 = a22 * a11 - a12 * a21;
  let b11 = -a22 * a10 + a12 * a20;
  let b21 = a21 * a10 - a11 * a20;

  // Calculate the determinant
  let det = a00 * b01 + a01 * b11 + a02 * b21;
  if (!det) {
    return null;
  }
  det = 1.0 / det;
  out[0] = b01 * det;
  out[1] = (-a22 * a01 + a02 * a21) * det;
  out[2] = (a12 * a01 - a02 * a11) * det;
  out[3] = b11 * det;
  out[4] = (a22 * a00 - a02 * a20) * det;
  out[5] = (-a12 * a00 + a02 * a10) * det;
  out[6] = b21 * det;
  out[7] = (-a21 * a00 + a01 * a20) * det;
  out[8] = (a11 * a00 - a01 * a10) * det;
  return out;
}

/**
 * Calculates the determinant of a mat3
 *
 * @param {mat3} a the source matrix
 * @returns {Number} determinant of a
 */
function determinant(a) {
  let a00 = a[0],
    a01 = a[1],
    a02 = a[2];
  let a10 = a[3],
    a11 = a[4],
    a12 = a[5];
  let a20 = a[6],
    a21 = a[7],
    a22 = a[8];
  return a00 * (a22 * a11 - a12 * a21) + a01 * (-a22 * a10 + a12 * a20) + a02 * (a21 * a10 - a11 * a20);
}

/**
 * Multiplies two mat3's
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the first operand
 * @param {mat3} b the second operand
 * @returns {mat3} out
 */
function multiply(out, a, b) {
  let a00 = a[0],
    a01 = a[1],
    a02 = a[2];
  let a10 = a[3],
    a11 = a[4],
    a12 = a[5];
  let a20 = a[6],
    a21 = a[7],
    a22 = a[8];
  let b00 = b[0],
    b01 = b[1],
    b02 = b[2];
  let b10 = b[3],
    b11 = b[4],
    b12 = b[5];
  let b20 = b[6],
    b21 = b[7],
    b22 = b[8];
  out[0] = b00 * a00 + b01 * a10 + b02 * a20;
  out[1] = b00 * a01 + b01 * a11 + b02 * a21;
  out[2] = b00 * a02 + b01 * a12 + b02 * a22;
  out[3] = b10 * a00 + b11 * a10 + b12 * a20;
  out[4] = b10 * a01 + b11 * a11 + b12 * a21;
  out[5] = b10 * a02 + b11 * a12 + b12 * a22;
  out[6] = b20 * a00 + b21 * a10 + b22 * a20;
  out[7] = b20 * a01 + b21 * a11 + b22 * a21;
  out[8] = b20 * a02 + b21 * a12 + b22 * a22;
  return out;
}

/**
 * Translate a mat3 by the given vector
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to translate
 * @param {vec2} v vector to translate by
 * @returns {mat3} out
 */
function translate(out, a, v) {
  let a00 = a[0],
    a01 = a[1],
    a02 = a[2],
    a10 = a[3],
    a11 = a[4],
    a12 = a[5],
    a20 = a[6],
    a21 = a[7],
    a22 = a[8],
    x = v[0],
    y = v[1];
  out[0] = a00;
  out[1] = a01;
  out[2] = a02;
  out[3] = a10;
  out[4] = a11;
  out[5] = a12;
  out[6] = x * a00 + y * a10 + a20;
  out[7] = x * a01 + y * a11 + a21;
  out[8] = x * a02 + y * a12 + a22;
  return out;
}

/**
 * Rotates a mat3 by the given angle
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat3} out
 */
function rotate(out, a, rad) {
  let a00 = a[0],
    a01 = a[1],
    a02 = a[2],
    a10 = a[3],
    a11 = a[4],
    a12 = a[5],
    a20 = a[6],
    a21 = a[7],
    a22 = a[8],
    s = Math.sin(rad),
    c = Math.cos(rad);
  out[0] = c * a00 + s * a10;
  out[1] = c * a01 + s * a11;
  out[2] = c * a02 + s * a12;
  out[3] = c * a10 - s * a00;
  out[4] = c * a11 - s * a01;
  out[5] = c * a12 - s * a02;
  out[6] = a20;
  out[7] = a21;
  out[8] = a22;
  return out;
}

/**
 * Scales the mat3 by the dimensions in the given vec2
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to rotate
 * @param {vec2} v the vec2 to scale the matrix by
 * @returns {mat3} out
 **/
function scale(out, a, v) {
  let x = v[0],
    y = v[1];
  out[0] = x * a[0];
  out[1] = x * a[1];
  out[2] = x * a[2];
  out[3] = y * a[3];
  out[4] = y * a[4];
  out[5] = y * a[5];
  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  return out;
}

/**
 * Calculates a 3x3 normal matrix (transpose inverse) from the 4x4 matrix
 *
 * @param {mat3} out mat3 receiving operation result
 * @param {mat4} a Mat4 to derive the normal matrix from
 *
 * @returns {mat3} out
 */
function normalFromMat4(out, a) {
  let a00 = a[0],
    a01 = a[1],
    a02 = a[2],
    a03 = a[3];
  let a10 = a[4],
    a11 = a[5],
    a12 = a[6],
    a13 = a[7];
  let a20 = a[8],
    a21 = a[9],
    a22 = a[10],
    a23 = a[11];
  let a30 = a[12],
    a31 = a[13],
    a32 = a[14],
    a33 = a[15];
  let b00 = a00 * a11 - a01 * a10;
  let b01 = a00 * a12 - a02 * a10;
  let b02 = a00 * a13 - a03 * a10;
  let b03 = a01 * a12 - a02 * a11;
  let b04 = a01 * a13 - a03 * a11;
  let b05 = a02 * a13 - a03 * a12;
  let b06 = a20 * a31 - a21 * a30;
  let b07 = a20 * a32 - a22 * a30;
  let b08 = a20 * a33 - a23 * a30;
  let b09 = a21 * a32 - a22 * a31;
  let b10 = a21 * a33 - a23 * a31;
  let b11 = a22 * a33 - a23 * a32;

  // Calculate the determinant
  let det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
  if (!det) {
    return null;
  }
  det = 1.0 / det;
  out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
  out[1] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
  out[2] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
  out[3] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
  out[4] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
  out[5] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
  out[6] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
  out[7] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
  out[8] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
  return out;
}

/**
 * Generates a 2D projection matrix with the given bounds
 *
 * @param {mat3} out mat3 frustum matrix will be written into
 * @param {number} width Width of your gl context
 * @param {number} height Height of gl context
 * @returns {mat3} out
 */
function projection(out, width, height) {
  out[0] = 2 / width;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = -2 / height;
  out[5] = 0;
  out[6] = -1;
  out[7] = 1;
  out[8] = 1;
  return out;
}

/**
 * Adds two mat3's
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the first operand
 * @param {mat3} b the second operand
 * @returns {mat3} out
 */
function add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  out[3] = a[3] + b[3];
  out[4] = a[4] + b[4];
  out[5] = a[5] + b[5];
  out[6] = a[6] + b[6];
  out[7] = a[7] + b[7];
  out[8] = a[8] + b[8];
  return out;
}

/**
 * Subtracts matrix b from matrix a
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the first operand
 * @param {mat3} b the second operand
 * @returns {mat3} out
 */
function subtract(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  out[3] = a[3] - b[3];
  out[4] = a[4] - b[4];
  out[5] = a[5] - b[5];
  out[6] = a[6] - b[6];
  out[7] = a[7] - b[7];
  out[8] = a[8] - b[8];
  return out;
}

/**
 * Multiply each element of the matrix by a scalar.
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to scale
 * @param {Number} b amount to scale the matrix's elements by
 * @returns {mat3} out
 */
function multiplyScalar(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  out[3] = a[3] * b;
  out[4] = a[4] * b;
  out[5] = a[5] * b;
  out[6] = a[6] * b;
  out[7] = a[7] * b;
  out[8] = a[8] * b;
  return out;
}

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("fe5415a66d8fcbc4f603")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi40OTJiMDkzMzNlZGU1YWE2ZGU3MC5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUF1QjtBQUNZO0FBRWM7QUFDSjtBQUU3QyxpRUFBZSxNQUFNO0VBQ25CSyxXQUFXQSxDQUFFO0lBQUVDLE9BQU87SUFBRUMsUUFBUTtJQUFFQyxFQUFFO0lBQUVDLEtBQUs7SUFBRUMsS0FBSztJQUFFQztFQUFNLENBQUMsRUFBRTtJQUMzRCxJQUFJLENBQUNMLE9BQU8sR0FBR0EsT0FBTztJQUN0QixJQUFJLENBQUNDLFFBQVEsR0FBR0EsUUFBUTtJQUN4QixJQUFJLENBQUNDLEVBQUUsR0FBR0EsRUFBRTtJQUNaLElBQUksQ0FBQ0MsS0FBSyxHQUFHQSxLQUFLO0lBQ2xCLElBQUksQ0FBQ0MsS0FBSyxHQUFHQSxLQUFLO0lBQ2xCLElBQUksQ0FBQ0MsS0FBSyxHQUFHQSxLQUFLO0lBRWxCLElBQUksQ0FBQ0MsS0FBSyxHQUFHO01BQ1hDLENBQUMsRUFBRSxDQUFDO01BQ0pDLENBQUMsRUFBRTtJQUNMLENBQUM7SUFFRCxJQUFJLENBQUNDLGFBQWEsQ0FBQyxDQUFDO0lBQ3BCLElBQUksQ0FBQ0MsYUFBYSxDQUFDLENBQUM7SUFDcEIsSUFBSSxDQUFDQyxVQUFVLENBQUMsQ0FBQztJQUNqQixJQUFJLENBQUNDLFlBQVksQ0FBQztNQUNoQlAsS0FBSyxFQUFFLElBQUksQ0FBQ0E7SUFDZCxDQUFDLENBQUM7RUFDSjtFQUVBSSxhQUFhQSxDQUFBLEVBQUk7SUFDZixNQUFNSSxLQUFLLEdBQUcsSUFBSSxDQUFDYixPQUFPO0lBRTFCLElBQUksQ0FBQ2MsT0FBTyxHQUFHQyxNQUFNLENBQUNDLFFBQVEsQ0FBQ0gsS0FBSyxDQUFDSSxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUM7RUFDaEU7RUFFQVAsYUFBYUEsQ0FBQSxFQUFJO0lBQ2YsSUFBSSxDQUFDUSxPQUFPLEdBQUcsSUFBSXRCLHdDQUFPLENBQUMsSUFBSSxDQUFDTSxFQUFFLEVB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QUFNO0VBQ3BCNFcsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7RUFDVkEsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztFQUNYQSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztFQUNWQSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztFQUNWLE9BQU9BLEdBQUc7QUFDZDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ08sU0FBU25NLEdBQUdBLENBQUNtTSxHQUFHLEVBQUUvUyxDQUFDLEVBQUVDLENBQUMsRUFBRTtFQUMzQjhTLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRy9TLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBR0MsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQjhTLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRy9TLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBR0MsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQjhTLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRy9TLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBR0MsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQjhTLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRy9TLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBR0MsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQjhTLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRy9TLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBR0MsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQjhTLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRy9TLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBR0MsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQjhTLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRy9TLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBR0MsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQjhTLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRy9TLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBR0MsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQjhTLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRy9TLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBR0MsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixPQUFPOFMsR0FBRztBQUNkOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTyxTQUFTb0QsUUFBUUEsQ0FBQ3BELEdBQUcsRUFBRS9TLENBQUMsRUFBRUMsQ0FBQyxFQUFFO0VBQ2hDOFMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHL1MsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCOFMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHL1MsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCOFMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHL1MsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCOFMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHL1MsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCOFMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHL1MsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCOFMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHL1MsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCOFMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHL1MsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCOFMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHL1MsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCOFMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHL1MsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLE9BQU84UyxHQUFHO0FBQ2Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPLFNBQVNxRCxjQUFjQSxDQUFDckQsR0FBRyxFQUFFL1MsQ0FBQyxFQUFFQyxDQUFDLEVBQUU7RUFDdEM4UyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcvUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUdDLENBQUM7RUFDakI4UyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcvUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUdDLENBQUM7RUFDakI4UyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcvUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUdDLENBQUM7RUFDakI4UyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcvUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUdDLENBQUM7RUFDakI4UyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcvUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUdDLENBQUM7RUFDakI4UyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcvUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUdDLENBQUM7RUFDakI4UyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcvUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUdDLENBQUM7RUFDakI4UyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcvUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUdDLENBQUM7RUFDakI4UyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcvUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUdDLENBQUM7RUFDakIsT0FBTzhTLEdBQUc7QUFDZDs7Ozs7Ozs7VUNyZkEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9ib2lsZXJwbGF0ZS1wcmlzbWljLy4vYXBwL2NvbXBvbmVudHMvQ2FudmFzL0hvbWUvTWVkaWEuanMiLCJ3ZWJwYWNrOi8vYm9pbGVycGxhdGUtcHJpc21pYy8uL2FwcC9jb21wb25lbnRzL0NhbnZhcy9Ib21lL2luZGV4LmpzIiwid2VicGFjazovL2JvaWxlcnBsYXRlLXByaXNtaWMvLi9hcHAvc2hhZGVycy9ob21lLWZyYWdtZW50Lmdsc2wiLCJ3ZWJwYWNrOi8vYm9pbGVycGxhdGUtcHJpc21pYy8uL2FwcC9zaGFkZXJzL2hvbWUtdmVydGV4Lmdsc2wiLCJ3ZWJwYWNrOi8vYm9pbGVycGxhdGUtcHJpc21pYy8uL25vZGVfbW9kdWxlcy9vZ2wvc3JjL2NvcmUvR2VvbWV0cnkuanMiLCJ3ZWJwYWNrOi8vYm9pbGVycGxhdGUtcHJpc21pYy8uL25vZGVfbW9kdWxlcy9vZ2wvc3JjL2NvcmUvTWVzaC5qcyIsIndlYnBhY2s6Ly9ib2lsZXJwbGF0ZS1wcmlzbWljLy4vbm9kZV9tb2R1bGVzL29nbC9zcmMvY29yZS9Qcm9ncmFtLmpzIiwid2VicGFjazovL2JvaWxlcnBsYXRlLXByaXNtaWMvLi9ub2RlX21vZHVsZXMvb2dsL3NyYy9leHRyYXMvUGxhbmUuanMiLCJ3ZWJwYWNrOi8vYm9pbGVycGxhdGUtcHJpc21pYy8uL25vZGVfbW9kdWxlcy9vZ2wvc3JjL21hdGgvTWF0My5qcyIsIndlYnBhY2s6Ly9ib2lsZXJwbGF0ZS1wcmlzbWljLy4vbm9kZV9tb2R1bGVzL29nbC9zcmMvbWF0aC9mdW5jdGlvbnMvTWF0M0Z1bmMuanMiLCJ3ZWJwYWNrOi8vYm9pbGVycGxhdGUtcHJpc21pYy93ZWJwYWNrL3J1bnRpbWUvZ2V0RnVsbEhhc2giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEdTQVAgZnJvbSAnZ3NhcCdcclxuaW1wb3J0IHsgTWVzaCwgUHJvZ3JhbSB9IGZyb20gJ29nbCdcclxuXHJcbmltcG9ydCBmcmFnbWVudCBmcm9tICdzaGFkZXJzL2hvbWUtZnJhZ21lbnQuZ2xzbCdcclxuaW1wb3J0IHZlcnRleCBmcm9tICdzaGFkZXJzL2hvbWUtdmVydGV4Lmdsc2wnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyB7XHJcbiAgY29uc3RydWN0b3IgKHsgZWxlbWVudCwgZ2VvbWV0cnksIGdsLCBpbmRleCwgc2NlbmUsIHNpemVzIH0pIHtcclxuICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnRcclxuICAgIHRoaXMuZ2VvbWV0cnkgPSBnZW9tZXRyeVxyXG4gICAgdGhpcy5nbCA9IGdsXHJcbiAgICB0aGlzLmluZGV4ID0gaW5kZXhcclxuICAgIHRoaXMuc2NlbmUgPSBzY2VuZVxyXG4gICAgdGhpcy5zaXplcyA9IHNpemVzXHJcblxyXG4gICAgdGhpcy5leHRyYSA9IHtcclxuICAgICAgeDogMCxcclxuICAgICAgeTogMFxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuY3JlYXRlVGV4dHVyZSgpXHJcbiAgICB0aGlzLmNyZWF0ZVByb2dyYW0oKVxyXG4gICAgdGhpcy5jcmVhdGVNZXNoKClcclxuICAgIHRoaXMuY3JlYXRlQm91bmRzKHtcclxuICAgICAgc2l6ZXM6IHRoaXMuc2l6ZXNcclxuICAgIH0pXHJcbiAgfVxyXG5cclxuICBjcmVhdGVUZXh0dXJlICgpIHtcclxuICAgIGNvbnN0IGltYWdlID0gdGhpcy5lbGVtZW50XHJcblxyXG4gICAgdGhpcy50ZXh0dXJlID0gd2luZG93LlRFWFRVUkVTW2ltYWdlLmdldEF0dHJpYnV0ZSgnZGF0YS1zcmMnKV1cclxuICB9XHJcblxyXG4gIGNyZWF0ZVByb2dyYW0gKCkge1xyXG4gICAgdGhpcy5wcm9ncmFtID0gbmV3IFByb2dyYW0odGhpcy5nbCwge1xyXG4gICAgICBmcmFnbWVudCxcclxuICAgICAgdmVydGV4LFxyXG4gICAgICB1bmlmb3Jtczoge1xyXG4gICAgICAgIHVBbHBoYTogeyB2YWx1ZTogMCB9LFxyXG4gICAgICAgIHVTcGVlZDogeyB2YWx1ZTogMCB9LFxyXG4gICAgICAgIHVWaWV3cG9ydFNpemVzOiB7IHZhbHVlOiBbdGhpcy5zaXplcy53aWR0aCwgdGhpcy5zaXplcy5oZWlnaHRdIH0sXHJcbiAgICAgICAgdE1hcDogeyB2YWx1ZTogdGhpcy50ZXh0dXJlIH1cclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIGNyZWF0ZU1lc2ggKCkge1xyXG4gICAgdGhpcy5tZXNoID0gbmV3IE1lc2godGhpcy5nbCwge1xyXG4gICAgICBnZW9tZXRyeTogdGhpcy5nZW9tZXRyeSxcclxuICAgICAgcHJvZ3JhbTogdGhpcy5wcm9ncmFtXHJcbiAgICB9KVxyXG5cclxuICAgIHRoaXMubWVzaC5zZXRQYXJlbnQodGhpcy5zY2VuZSlcclxuXHJcbiAgICAvLyB0aGlzLm1lc2gucm90YXRpb24ueiA9IC1NYXRoLlBJIC8gNFxyXG4gIH1cclxuXHJcbiAgY3JlYXRlQm91bmRzICh7IHNpemVzIH0pIHtcclxuICAgIHRoaXMuc2l6ZXMgPSBzaXplc1xyXG5cclxuICAgIHRoaXMuYm91bmRzID0gdGhpcy5lbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXHJcblxyXG4gICAgdGhpcy51cGRhdGVTY2FsZShzaXplcylcclxuICAgIHRoaXMudXBkYXRlWCgpXHJcbiAgICB0aGlzLnVwZGF0ZVkoKVxyXG4gIH1cclxuXHJcbiAgLyoqKipcclxuICAgKiBBTklNQVRJT05TXHJcbiAgICogKioqL1xyXG4gIHNob3cgKCkge1xyXG4gICAgR1NBUC5mcm9tVG8odGhpcy5wcm9ncmFtLnVuaWZvcm1zLnVBbHBoYSwge1xyXG4gICAgICB2YWx1ZTogMFxyXG4gICAgfSwge1xyXG4gICAgICB2YWx1ZTogMC43NVxyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIGhpZGUgKCkge1xyXG4gICAgR1NBUC50byh0aGlzLnByb2dyYW0udW5pZm9ybXMudUFscGhhLCB7XHJcbiAgICAgIHZhbHVlOiAwXHJcbiAgICB9KVxyXG4gIH1cclxuXHJcbiAgLyoqKipcclxuICAgKiBFVkVOVFNcclxuICAgKiAqKiovXHJcbiAgb25SZXNpemUgKHNpemVzLCBzY3JvbGwpIHtcclxuICAgIHRoaXMuZXh0cmEgPSB7XHJcbiAgICAgIHg6IDAsXHJcbiAgICAgIHk6IDBcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmNyZWF0ZUJvdW5kcyhzaXplcylcclxuICAgIHRoaXMudXBkYXRlWChzY3JvbGwgJiYgc2Nyb2xsLngpXHJcbiAgICB0aGlzLnVwZGF0ZVkoc2Nyb2xsICYmIHNjcm9sbC55KVxyXG4gIH1cclxuXHJcbiAgLyoqKipcclxuICAgKiBMT09QXHJcbiAgICogKioqL1xyXG4gIHVwZGF0ZVNjYWxlICgpIHtcclxuICAgIHRoaXMud2lkdGggPSB0aGlzLmJvdW5kcy53aWR0aCAvIHdpbmRvdy5pbm5lcldpZHRoXHJcbiAgICB0aGlzLmhlaWdodCA9IHRoaXMuYm91bmRzLmhlaWdodCAvIHdpbmRvdy5pbm5lckhlaWdodFxyXG5cclxuICAgIHRoaXMubWVzaC5zY2FsZS54ID0gdGhpcy5zaXplcy53aWR0aCAqIHRoaXMud2lkdGhcclxuICAgIHRoaXMubWVzaC5zY2FsZS55ID0gdGhpcy5zaXplcy5oZWlnaHQgKiB0aGlzLmhlaWdodFxyXG4gIH1cclxuXHJcbiAgdXBkYXRlWCAoeCA9IDApIHtcclxuICAgIHRoaXMueCA9ICh0aGlzLmJvdW5kcy5sZWZ0ICsgeCkgLyB3aW5kb3cuaW5uZXJXaWR0aFxyXG5cclxuICAgIHRoaXMubWVzaC5wb3NpdGlvbi54ID0gKC10aGlzLnNpemVzLndpZHRoIC8gMikgKyAodGhpcy5tZXNoLnNjYWxlLnggLyAyKSArICh0aGlzLnggKiB0aGlzLnNpemVzLndpZHRoKSArIHRoaXMuZXh0cmEueFxyXG4gIH1cclxuXHJcbiAgdXBkYXRlWSAobWVkaWEsIHkgPSAwLCBtdWx0aXBsaWVyLCBkaXJlY3Rpb24sIGhlaWdodCwgb2Zmc2V0WSwgc2NhbGVZKSB7XHJcbiAgICB0aGlzLnkgPSAodGhpcy5ib3VuZHMudG9wICsgeSkgLyB3aW5kb3cuaW5uZXJIZWlnaHRcclxuXHJcbiAgICB0aGlzLm1lc2gucG9zaXRpb24ueSA9ICgodGhpcy5zaXplcy5oZWlnaHQgLyAyKSAtICh0aGlzLm1lc2guc2NhbGUueSAvIDIpIC0gKHRoaXMueSAqIHRoaXMuc2l6ZXMuaGVpZ2h0KSArIHRoaXMuZXh0cmEueSkgKiBtdWx0aXBsaWVyXHJcblxyXG4gICAgaWYgKG11bHRpcGxpZXIgPT09IDEpIHtcclxuICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gJ3RvcCcpIHtcclxuICAgICAgICBjb25zdCB5ID0gbWVkaWEubWVzaC5wb3NpdGlvbi55ICsgc2NhbGVZXHJcblxyXG4gICAgICAgIGlmICh5IDwgLW9mZnNldFkpIHtcclxuICAgICAgICAgIG1lZGlhLmV4dHJhLnkgKz0gaGVpZ2h0XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbiA9PT0gJ2JvdHRvbScpIHtcclxuICAgICAgICBjb25zdCB5ID0gbWVkaWEubWVzaC5wb3NpdGlvbi55IC0gc2NhbGVZXHJcblxyXG4gICAgICAgIGlmICh5ID4gb2Zmc2V0WSkge1xyXG4gICAgICAgICAgbWVkaWEuZXh0cmEueSAtPSBoZWlnaHRcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAobXVsdGlwbGllciA9PT0gLTEpIHtcclxuICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gJ3RvcCcpIHtcclxuICAgICAgICBjb25zdCB5ID0gbWVkaWEubWVzaC5wb3NpdGlvbi55IC0gc2NhbGVZXHJcblxyXG4gICAgICAgIGlmICh5ID4gb2Zmc2V0WSkge1xyXG4gICAgICAgICAgbWVkaWEuZXh0cmEueSArPSBoZWlnaHRcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uID09PSAnYm90dG9tJykge1xyXG4gICAgICAgIGNvbnN0IHkgPSBtZWRpYS5tZXNoLnBvc2l0aW9uLnkgKyBzY2FsZVlcclxuXHJcbiAgICAgICAgaWYgKHkgPCAtb2Zmc2V0WSkge1xyXG4gICAgICAgICAgbWVkaWEuZXh0cmEueSAtPSBoZWlnaHRcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHVwZGF0ZSAobWVkaWEsIHNjcm9sbCwgc3BlZWQsIG11bHRpcGxpZXIsIGRpcmVjdGlvbiwgaGVpZ2h0LCBvZmZzZXRZLCBzY2FsZVksIHkpIHtcclxuICAgIHRoaXMudXBkYXRlWChzY3JvbGwueClcclxuICAgIHRoaXMudXBkYXRlWShtZWRpYSwgc2Nyb2xsLnksIG11bHRpcGxpZXIsIGRpcmVjdGlvbiwgaGVpZ2h0LCBvZmZzZXRZLCBzY2FsZVkpXHJcblxyXG4gICAgdGhpcy5wcm9ncmFtLnVuaWZvcm1zLnVTcGVlZC52YWx1ZSA9ICgoeS5jdXJyZW50IC0geS50YXJnZXQpIC8gdGhpcy5zaXplcy53aWR0aCkgKiAwLjAwNVxyXG4gIH1cclxuXHJcbiAgcm9sbCAobWVkaWEsIHNjcm9sbCwgc3BlZWQsIG11bHRpcGxpZXIsIGRpcmVjdGlvbiwgaGVpZ2h0LCBvZmZzZXRZLCBzY2FsZVksIHkpIHtcclxuICAgIHRoaXMueSA9ICh0aGlzLmJvdW5kcy50b3AgKyB5KSAvIHdpbmRvdy5pbm5lckhlaWdodFxyXG5cclxuICAgIHRoaXMubWVzaC5wb3NpdGlvbi55ID0gKCh0aGlzLnNpemVzLmhlaWdodCAvIDIpIC0gKHRoaXMubWVzaC5zY2FsZS55IC8gMikgLSAodGhpcy55ICogdGhpcy5zaXplcy5oZWlnaHQpICsgdGhpcy5leHRyYS55KSAqIG11bHRpcGxpZXJcclxuXHJcbiAgICBpZiAobXVsdGlwbGllciA9PT0gMSkge1xyXG4gICAgICBpZiAoZGlyZWN0aW9uID09PSAndG9wJykge1xyXG4gICAgICAgIGNvbnN0IHkgPSBtZWRpYS5tZXNoLnBvc2l0aW9uLnkgKyBzY2FsZVlcclxuXHJcbiAgICAgICAgaWYgKHkgPCAtb2Zmc2V0WSkge1xyXG4gICAgICAgICAgbWVkaWEuZXh0cmEueSArPSBoZWlnaHRcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uID09PSAnYm90dG9tJykge1xyXG4gICAgICAgIGNvbnN0IHkgPSBtZWRpYS5tZXNoLnBvc2l0aW9uLnkgLSBzY2FsZVlcclxuXHJcbiAgICAgICAgaWYgKHkgPiBvZmZzZXRZKSB7XHJcbiAgICAgICAgICBtZWRpYS5leHRyYS55IC09IGhlaWdodFxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChtdWx0aXBsaWVyID09PSAtMSkge1xyXG4gICAgICBpZiAoZGlyZWN0aW9uID09PSAndG9wJykge1xyXG4gICAgICAgIGNvbnN0IHkgPSBtZWRpYS5tZXNoLnBvc2l0aW9uLnkgLSBzY2FsZVlcclxuXHJcbiAgICAgICAgaWYgKHkgPiBvZmZzZXRZKSB7XHJcbiAgICAgICAgICBtZWRpYS5leHRyYS55ICs9IGhlaWdodFxyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIGlmIChkaXJlY3Rpb24gPT09ICdib3R0b20nKSB7XHJcbiAgICAgICAgY29uc3QgeSA9IG1lZGlhLm1lc2gucG9zaXRpb24ueSArIHNjYWxlWVxyXG5cclxuICAgICAgICBpZiAoeSA8IC1vZmZzZXRZKSB7XHJcbiAgICAgICAgICBtZWRpYS5leHRyYS55IC09IGhlaWdodFxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBQbGFuZSwgVHJhbnNmb3JtIH0gZnJvbSAnb2dsJ1xyXG5pbXBvcnQgR1NBUCBmcm9tICdnc2FwJ1xyXG5cclxuaW1wb3J0IG1hcCBmcm9tICdsb2Rhc2gvbWFwJ1xyXG5cclxuaW1wb3J0IE1lZGlhIGZyb20gJy4vTWVkaWEnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyB7XHJcbiAgY29uc3RydWN0b3IgKHsgZ2wsIHNjZW5lLCBzaXplcyB9KSB7XHJcbiAgICB0aGlzLmdsID0gZ2xcclxuICAgIHRoaXMuc2NlbmUgPSBzY2VuZVxyXG4gICAgdGhpcy5zaXplcyA9IHNpemVzXHJcblxyXG4gICAgdGhpcy5ncm91cCA9IG5ldyBUcmFuc2Zvcm0oKVxyXG5cclxuICAgIHRoaXMuZ2FsbGVyeUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG9tZV9fZ2FsbGVyeScpXHJcbiAgICB0aGlzLm1lZGlhc0VsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmhvbWVfX2dhbGxlcnlfX21lZGlhX19pbWFnZScpXHJcbiAgICB0aGlzLnNsb3RSb2xsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhvbWVfX2J1dHRvbicpXHJcbiAgICB0aGlzLmJ1dHRvblJvbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG9tZV9fYnV0dG9uIGJ1dHRvbicpXHJcblxyXG4gICAgdGhpcy5zcGVlZEF1dG9TY3JvbGwgPSAyXHJcblxyXG4gICAgdGhpcy54ID0ge1xyXG4gICAgICBjdXJyZW50OiAwLFxyXG4gICAgICB0YXJnZXQ6IDAsXHJcbiAgICAgIGxlcnA6IDAuMVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMueSA9IHtcclxuICAgICAgY3VycmVudDogMCxcclxuICAgICAgdGFyZ2V0OiAwLFxyXG4gICAgICBsZXJwOiAwLjFcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnNjcm9sbEN1cnJlbnQgPSB7XHJcbiAgICAgIHg6IDAsXHJcbiAgICAgIHk6IDBcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnNjcm9sbCA9IHtcclxuICAgICAgeDogMCxcclxuICAgICAgeTogMFxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuc3BlZWQgPSB7XHJcbiAgICAgIGN1cnJlbnQ6IDAsXHJcbiAgICAgIHRhcmdldDogMCxcclxuICAgICAgbGVycDogMC4xXHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5jcmVhdGVHZW9tZXRyeSgpXHJcbiAgICB0aGlzLmNyZWF0ZUdhbGxlcnkoKVxyXG4gICAgdGhpcy5vblJlc2l6ZSh7XHJcbiAgICAgIHNpemVzOiB0aGlzLnNpemVzXHJcbiAgICB9KVxyXG4gICAgdGhpcy5jcmVhdGVCdXR0b25Sb2xsKHRoaXMuc2xvdFJvbGwpXHJcblxyXG4gICAgdGhpcy5ncm91cC5zZXRQYXJlbnQodGhpcy5zY2VuZSlcclxuXHJcbiAgICB0aGlzLnNob3coKVxyXG4gIH1cclxuXHJcbiAgY3JlYXRlR2VvbWV0cnkgKCkge1xyXG4gICAgdGhpcy5nZW9tZXRyeSA9IG5ldyBQbGFuZSh0aGlzLmdsLCB7XHJcbiAgICAgIGhlaWdodFNlZ21lbnRzOiAyMCxcclxuICAgICAgd2lkdGhTZWdtZW50czogMjBcclxuICAgIH0pXHJcbiAgfVxyXG5cclxuICBjcmVhdGVHYWxsZXJ5ICgpIHtcclxuICAgIHRoaXMubWVkaWFzID0gbWFwKHRoaXMubWVkaWFzRWxlbWVudHMsIChlbGVtZW50LCBpbmRleCkgPT4ge1xyXG4gICAgICByZXR1cm4gbmV3IE1lZGlhKHtcclxuICAgICAgICBlbGVtZW50LFxyXG4gICAgICAgIGdlb21ldHJ5OiB0aGlzLmdlb21ldHJ5LFxyXG4gICAgICAgIGluZGV4LFxyXG4gICAgICAgIGdsOiB0aGlzLmdsLFxyXG4gICAgICAgIHNjZW5lOiB0aGlzLmdyb3VwLFxyXG4gICAgICAgIHNpemVzOiB0aGlzLnNpemVzXHJcbiAgICAgIH0pXHJcbiAgICB9KVxyXG4gIH1cclxuXHJcbiAgY3JlYXRlQnV0dG9uUm9sbCAoYnV0dG9uUm9sbCkge1xyXG4gICAgbGV0IG1lZGlhQXNzZXRzID0gW11cclxuXHJcbiAgICBidXR0b25Sb2xsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgXyA9PiB7XHJcbiAgICAgIG1lZGlhQXNzZXRzID0gW11cclxuICAgICAgdGhpcy5zcGVlZEF1dG9TY3JvbGwgPSAwXHJcbiAgICAgIHRoaXMueS50YXJnZXQgPSBNYXRoLnJhbmRvbSgpICogMTAwMDBcclxuICAgICAgbWFwKHRoaXMubWVkaWFzLCAobWVkaWEsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgbWVkaWFBc3NldHNbaW5kZXhdID0gW21lZGlhLmJvdW5kcy50b3AsIG1lZGlhLmVsZW1lbnQuYWx0XVxyXG4gICAgICB9KVxyXG4gICAgICBjb25zb2xlLmxvZyhtZWRpYUFzc2V0cylcclxuICAgICAgY29uc29sZS5sb2codGhpcy5zY3JvbGwueSArIHRoaXMuc2l6ZXMuaGVpZ2h0IC8gMilcclxuICAgICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5zY3JvbGwueSArIHRoaXMuc2l6ZXMuaGVpZ2h0IC8gMlxyXG5cclxuICAgICAgbWVkaWFBc3NldHMuc29ydChmdW5jdGlvbiAoYSwgYikge1xyXG4gICAgICAgIHJldHVybiBhWzBdIC0gYlswXVxyXG4gICAgICB9KVxyXG5cclxuICAgICAgY29uc3QgY2xvc2VzdCA9IG1lZGlhQXNzZXRzLnJlZHVjZSgoYSwgYikgPT4ge1xyXG4gICAgICAgIHJldHVybiBNYXRoLmFicyhiIC0gdGFyZ2V0KSA8IE1hdGguYWJzKGEgLSB0YXJnZXQpID8gYiA6IGFcclxuICAgICAgfSlcclxuXHJcbiAgICAgIGNvbnNvbGUubG9nKGNsb3Nlc3QpXHJcblxyXG4gICAgICB0aGlzLmJ1dHRvblJvbGwuaW5uZXJUZXh0ID0gJ1JvbGwgYWdhaW4gPydcclxuICAgIH0pXHJcbiAgfVxyXG5cclxuICAvKioqKlxyXG4gICAqIEFOSU1BVElPTlNcclxuICAgKiAqKiovXHJcbiAgc2hvdyAoKSB7XHJcbiAgICBtYXAodGhpcy5tZWRpYXMsIG1lZGlhID0+IG1lZGlhLnNob3coKSlcclxuICB9XHJcblxyXG4gIGhpZGUgKCkge1xyXG4gICAgbWFwKHRoaXMubWVkaWFzLCBtZWRpYSA9PiBtZWRpYS5oaWRlKCkpXHJcbiAgfVxyXG5cclxuICAvKioqKlxyXG4gICAqIEVWRU5UU1xyXG4gICAqICoqKi9cclxuICBvblJlc2l6ZSAoZXZlbnQpIHtcclxuICAgIHRoaXMuZ2FsbGVyeUJvdW5kcyA9IHRoaXMuZ2FsbGVyeUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcclxuXHJcbiAgICB0aGlzLnNpemVzID0gZXZlbnQuc2l6ZXNcclxuXHJcbiAgICB0aGlzLmdhbGxlcnlTaXplcyA9IHtcclxuICAgICAgaGVpZ2h0OiB0aGlzLmdhbGxlcnlCb3VuZHMuaGVpZ2h0IC8gd2luZG93LmlubmVySGVpZ2h0ICogdGhpcy5zaXplcy5oZWlnaHQsXHJcbiAgICAgIHdpZHRoOiB0aGlzLmdhbGxlcnlCb3VuZHMud2lkdGggLyB3aW5kb3cuaW5uZXJXaWR0aCAqIHRoaXMuc2l6ZXMud2lkdGhcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnNjcm9sbC54ID0gdGhpcy54LnRhcmdldCA9IDBcclxuICAgIHRoaXMuc2Nyb2xsLnkgPSB0aGlzLnkudGFyZ2V0ID0gMFxyXG5cclxuICAgIG1hcCh0aGlzLm1lZGlhcywgbWVkaWEgPT4gbWVkaWEub25SZXNpemUoZXZlbnQsIHRoaXMuc2Nyb2xsKSlcclxuICB9XHJcblxyXG4gIG9uVG91Y2hEb3duICh7IHgsIHkgfSkge1xyXG4gIH1cclxuXHJcbiAgb25Ub3VjaE1vdmUgKHsgeCwgeSB9KSB7XHJcblxyXG4gIH1cclxuXHJcbiAgb25Ub3VjaFVwICh7IHgsIHkgfSkge1xyXG5cclxuICB9XHJcblxyXG4gIG9uV2hlZWwgKHsgcGl4ZWxYLCBwaXhlbFkgfSkge1xyXG4gICAgLy8gdGhpcy54LnRhcmdldCArPSBwaXhlbFhcclxuICAgIHRoaXMueS50YXJnZXQgKz0gcGl4ZWxZXHJcbiAgfVxyXG5cclxuICAvKioqKlxyXG4gICAqIExPT1BcclxuICAgKiAqKiovXHJcbiAgdXBkYXRlICgpIHtcclxuICAgIHRoaXMueS50YXJnZXQgKz0gdGhpcy5zcGVlZEF1dG9TY3JvbGxcclxuICAgIHRoaXMuc3BlZWQuY3VycmVudCA9IEdTQVAudXRpbHMuaW50ZXJwb2xhdGUodGhpcy5zcGVlZC5jdXJyZW50LCB0aGlzLnNwZWVkLnRhcmdldCwgdGhpcy5zcGVlZC5sZXJwKVxyXG5cclxuICAgIHRoaXMueC5jdXJyZW50ID0gR1NBUC51dGlscy5pbnRlcnBvbGF0ZSh0aGlzLnguY3VycmVudCwgdGhpcy54LnRhcmdldCwgdGhpcy54LmxlcnApXHJcbiAgICB0aGlzLnkuY3VycmVudCA9IEdTQVAudXRpbHMuaW50ZXJwb2xhdGUodGhpcy55LmN1cnJlbnQsIHRoaXMueS50YXJnZXQsIHRoaXMueS5sZXJwKVxyXG5cclxuICAgIGlmICh0aGlzLnNjcm9sbC55IDwgdGhpcy55LmN1cnJlbnQpIHtcclxuICAgICAgdGhpcy55LmRpcmVjdGlvbiA9ICd0b3AnXHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuc2Nyb2xsLnkgPiB0aGlzLnkuY3VycmVudCkge1xyXG4gICAgICB0aGlzLnkuZGlyZWN0aW9uID0gJ2JvdHRvbSdcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnNjcm9sbC54ID0gdGhpcy54LmN1cnJlbnRcclxuICAgIHRoaXMuc2Nyb2xsLnkgPSB0aGlzLnkuY3VycmVudFxyXG5cclxuICAgIG1hcCh0aGlzLm1lZGlhcywgKG1lZGlhLCBpbmRleCkgPT4ge1xyXG4gICAgICBjb25zdCBvZmZzZXRZID0gdGhpcy5zaXplcy5oZWlnaHQgKiAwLjZcclxuICAgICAgY29uc3Qgc2NhbGVZID0gbWVkaWEubWVzaC5zY2FsZS55IC8gMlxyXG5cclxuICAgICAgaWYgKGluZGV4ICUgMiA9PT0gMCkge1xyXG4gICAgICAgIHRoaXMubXVsdGlwbGllciA9IC0xXHJcbiAgICAgIH0gZWxzZSBpZiAoaW5kZXggJSAyID09PSAxKSB7XHJcbiAgICAgICAgdGhpcy5tdWx0aXBsaWVyID0gMVxyXG4gICAgICB9XHJcblxyXG4gICAgICBtZWRpYS51cGRhdGUobWVkaWEsIHRoaXMuc2Nyb2xsLCB0aGlzLnNwZWVkLmN1cnJlbnQsIHRoaXMubXVsdGlwbGllciwgdGhpcy55LmRpcmVjdGlvbiwgdGhpcy5nYWxsZXJ5U2l6ZXMuaGVpZ2h0LCBvZmZzZXRZLCBzY2FsZVksIHRoaXMueSlcclxuICAgIH0pXHJcbiAgfVxyXG5cclxuICAvKioqKlxyXG4gICAqIERFU1RST1lcclxuICAgKiAqKiovXHJcbiAgZGVzdHJveSAoKSB7XHJcbiAgICB0aGlzLnNjZW5lLnJlbW92ZUNoaWxkKHRoaXMuZ3JvdXApXHJcbiAgfVxyXG59XHJcbiIsImV4cG9ydCBkZWZhdWx0IFwicHJlY2lzaW9uIGhpZ2hwIGZsb2F0O1xcbiNkZWZpbmUgR0xTTElGWSAxXFxuXFxudW5pZm9ybSBmbG9hdCB1QWxwaGE7XFxudW5pZm9ybSBzYW1wbGVyMkQgdE1hcDtcXG5cXG52YXJ5aW5nIHZlYzIgdlV2O1xcblxcbnZvaWQgbWFpbigpIHtcXG4gIHZlYzQgdGV4dHVyZSA9IHRleHR1cmUyRCh0TWFwLCB2VXYpO1xcblxcbiAgZ2xfRnJhZ0NvbG9yID0gdGV4dHVyZTtcXG4gIGdsX0ZyYWdDb2xvci5hID0gdUFscGhhO1xcbn1cXG5cIjsiLCJleHBvcnQgZGVmYXVsdCBcIiNkZWZpbmUgR0xTTElGWSAxXFxuI2RlZmluZSBQSSAzLjE0MTU5MjY1MzU4OTc5MzIzODQ2MjY0MzM4MzI3OTVcXG5cXG5hdHRyaWJ1dGUgdmVjMyBwb3NpdGlvbjtcXG5hdHRyaWJ1dGUgdmVjMiB1djtcXG5cXG51bmlmb3JtIGZsb2F0IHVTcGVlZDtcXG51bmlmb3JtIHZlYzIgdVZpZXdwb3J0U2l6ZXM7XFxuXFxudW5pZm9ybSBtYXQ0IG1vZGVsVmlld01hdHJpeDtcXG51bmlmb3JtIG1hdDQgcHJvamVjdGlvbk1hdHJpeDtcXG5cXG52YXJ5aW5nIGZsb2F0IHNwZWVkO1xcbnZhcnlpbmcgdmVjMiB2VXY7XFxuXFxudm9pZCBtYWluKCkge1xcbiAgdlV2ID0gdXY7XFxuXFxuICB2ZWM0IG5ld1Bvc2l0aW9uID0gbW9kZWxWaWV3TWF0cml4ICogdmVjNChwb3NpdGlvbiwgMS4wKTtcXG5cXG4gIG5ld1Bvc2l0aW9uLnogKz0gKHNpbihuZXdQb3NpdGlvbi55IC8gdVZpZXdwb3J0U2l6ZXMueSAqIFBJICsgUEkgLyAyLjApKSAqIHVTcGVlZDtcXG5cXG4gIGdsX1Bvc2l0aW9uID0gcHJvamVjdGlvbk1hdHJpeCAqIG5ld1Bvc2l0aW9uO1xcbn1cXG5cIjsiLCIvLyBhdHRyaWJ1dGUgcGFyYW1zXG4vLyB7XG4vLyAgICAgZGF0YSAtIHR5cGVkIGFycmF5IGVnIFVJbnQxNkFycmF5IGZvciBpbmRpY2VzLCBGbG9hdDMyQXJyYXlcbi8vICAgICBzaXplIC0gaW50IGRlZmF1bHQgMVxuLy8gICAgIGluc3RhbmNlZCAtIGRlZmF1bHQgbnVsbC4gUGFzcyBkaXZpc29yIGFtb3VudFxuLy8gICAgIHR5cGUgLSBnbCBlbnVtIGRlZmF1bHQgZ2wuVU5TSUdORURfU0hPUlQgZm9yICdpbmRleCcsIGdsLkZMT0FUIGZvciBvdGhlcnNcbi8vICAgICBub3JtYWxpemVkIC0gYm9vbGVhbiBkZWZhdWx0IGZhbHNlXG5cbi8vICAgICBidWZmZXIgLSBnbCBidWZmZXIsIGlmIGJ1ZmZlciBleGlzdHMsIGRvbid0IG5lZWQgdG8gcHJvdmlkZSBkYXRhIC0gYWx0aG91Z2ggbmVlZHMgcG9zaXRpb24gZGF0YSBmb3IgYm91bmRzIGNhbGN1bGF0aW9uXG4vLyAgICAgc3RyaWRlIC0gZGVmYXVsdCAwIC0gZm9yIHdoZW4gcGFzc2luZyBpbiBidWZmZXJcbi8vICAgICBvZmZzZXQgLSBkZWZhdWx0IDAgLSBmb3Igd2hlbiBwYXNzaW5nIGluIGJ1ZmZlclxuLy8gICAgIGNvdW50IC0gZGVmYXVsdCBudWxsIC0gZm9yIHdoZW4gcGFzc2luZyBpbiBidWZmZXJcbi8vICAgICBtaW4gLSBhcnJheSAtIGZvciB3aGVuIHBhc3NpbmcgaW4gYnVmZmVyXG4vLyAgICAgbWF4IC0gYXJyYXkgLSBmb3Igd2hlbiBwYXNzaW5nIGluIGJ1ZmZlclxuLy8gfVxuXG4vLyBUT0RPOiBmaXQgaW4gdHJhbnNmb3JtIGZlZWRiYWNrXG5cbmltcG9ydCB7IFZlYzMgfSBmcm9tICcuLi9tYXRoL1ZlYzMuanMnO1xuXG5jb25zdCB0ZW1wVmVjMyA9IG5ldyBWZWMzKCk7XG5cbmxldCBJRCA9IDE7XG5sZXQgQVRUUl9JRCA9IDE7XG5cbi8vIFRvIHN0b3AgaW5pZmluaXRlIHdhcm5pbmdzXG5sZXQgaXNCb3VuZHNXYXJuZWQgPSBmYWxzZTtcblxuZXhwb3J0IGNsYXNzIEdlb21ldHJ5IHtcbiAgICBjb25zdHJ1Y3RvcihnbCwgYXR0cmlidXRlcyA9IHt9KSB7XG4gICAgICAgIGlmICghZ2wuY2FudmFzKSBjb25zb2xlLmVycm9yKCdnbCBub3QgcGFzc2VkIGFzIGZpcnN0IGFyZ3VtZW50IHRvIEdlb21ldHJ5Jyk7XG4gICAgICAgIHRoaXMuZ2wgPSBnbDtcbiAgICAgICAgdGhpcy5hdHRyaWJ1dGVzID0gYXR0cmlidXRlcztcbiAgICAgICAgdGhpcy5pZCA9IElEKys7XG5cbiAgICAgICAgLy8gU3RvcmUgb25lIFZBTyBwZXIgcHJvZ3JhbSBhdHRyaWJ1dGUgbG9jYXRpb25zIG9yZGVyXG4gICAgICAgIHRoaXMuVkFPcyA9IHt9O1xuXG4gICAgICAgIHRoaXMuZHJhd1JhbmdlID0geyBzdGFydDogMCwgY291bnQ6IDAgfTtcbiAgICAgICAgdGhpcy5pbnN0YW5jZWRDb3VudCA9IDA7XG5cbiAgICAgICAgLy8gVW5iaW5kIGN1cnJlbnQgVkFPIHNvIHRoYXQgbmV3IGJ1ZmZlcnMgZG9uJ3QgZ2V0IGFkZGVkIHRvIGFjdGl2ZSBtZXNoXG4gICAgICAgIHRoaXMuZ2wucmVuZGVyZXIuYmluZFZlcnRleEFycmF5KG51bGwpO1xuICAgICAgICB0aGlzLmdsLnJlbmRlcmVyLmN1cnJlbnRHZW9tZXRyeSA9IG51bGw7XG5cbiAgICAgICAgLy8gQWxpYXMgZm9yIHN0YXRlIHN0b3JlIHRvIGF2b2lkIHJlZHVuZGFudCBjYWxscyBmb3IgZ2xvYmFsIHN0YXRlXG4gICAgICAgIHRoaXMuZ2xTdGF0ZSA9IHRoaXMuZ2wucmVuZGVyZXIuc3RhdGU7XG5cbiAgICAgICAgLy8gY3JlYXRlIHRoZSBidWZmZXJzXG4gICAgICAgIGZvciAobGV0IGtleSBpbiBhdHRyaWJ1dGVzKSB7XG4gICAgICAgICAgICB0aGlzLmFkZEF0dHJpYnV0ZShrZXksIGF0dHJpYnV0ZXNba2V5XSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhZGRBdHRyaWJ1dGUoa2V5LCBhdHRyKSB7XG4gICAgICAgIHRoaXMuYXR0cmlidXRlc1trZXldID0gYXR0cjtcblxuICAgICAgICAvLyBTZXQgb3B0aW9uc1xuICAgICAgICBhdHRyLmlkID0gQVRUUl9JRCsrOyAvLyBUT0RPOiBjdXJyZW50bHkgdW51c2VkLCByZW1vdmU/XG4gICAgICAgIGF0dHIuc2l6ZSA9IGF0dHIuc2l6ZSB8fCAxO1xuICAgICAgICBhdHRyLnR5cGUgPVxuICAgICAgICAgICAgYXR0ci50eXBlIHx8XG4gICAgICAgICAgICAoYXR0ci5kYXRhLmNvbnN0cnVjdG9yID09PSBGbG9hdDMyQXJyYXlcbiAgICAgICAgICAgICAgICA/IHRoaXMuZ2wuRkxPQVRcbiAgICAgICAgICAgICAgICA6IGF0dHIuZGF0YS5jb25zdHJ1Y3RvciA9PT0gVWludDE2QXJyYXlcbiAgICAgICAgICAgICAgICA/IHRoaXMuZ2wuVU5TSUdORURfU0hPUlRcbiAgICAgICAgICAgICAgICA6IHRoaXMuZ2wuVU5TSUdORURfSU5UKTsgLy8gVWludDMyQXJyYXlcbiAgICAgICAgYXR0ci50YXJnZXQgPSBrZXkgPT09ICdpbmRleCcgPyB0aGlzLmdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSIDogdGhpcy5nbC5BUlJBWV9CVUZGRVI7XG4gICAgICAgIGF0dHIubm9ybWFsaXplZCA9IGF0dHIubm9ybWFsaXplZCB8fCBmYWxzZTtcbiAgICAgICAgYXR0ci5zdHJpZGUgPSBhdHRyLnN0cmlkZSB8fCAwO1xuICAgICAgICBhdHRyLm9mZnNldCA9IGF0dHIub2Zmc2V0IHx8IDA7XG4gICAgICAgIGF0dHIuY291bnQgPSBhdHRyLmNvdW50IHx8IChhdHRyLnN0cmlkZSA/IGF0dHIuZGF0YS5ieXRlTGVuZ3RoIC8gYXR0ci5zdHJpZGUgOiBhdHRyLmRhdGEubGVuZ3RoIC8gYXR0ci5zaXplKTtcbiAgICAgICAgYXR0ci5kaXZpc29yID0gYXR0ci5pbnN0YW5jZWQgfHwgMDtcbiAgICAgICAgYXR0ci5uZWVkc1VwZGF0ZSA9IGZhbHNlO1xuICAgICAgICBhdHRyLnVzYWdlID0gYXR0ci51c2FnZSB8fCB0aGlzLmdsLlNUQVRJQ19EUkFXO1xuXG4gICAgICAgIGlmICghYXR0ci5idWZmZXIpIHtcbiAgICAgICAgICAgIC8vIFB1c2ggZGF0YSB0byBidWZmZXJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQXR0cmlidXRlKGF0dHIpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gVXBkYXRlIGdlb21ldHJ5IGNvdW50cy4gSWYgaW5kZXhlZCwgaWdub3JlIHJlZ3VsYXIgYXR0cmlidXRlc1xuICAgICAgICBpZiAoYXR0ci5kaXZpc29yKSB7XG4gICAgICAgICAgICB0aGlzLmlzSW5zdGFuY2VkID0gdHJ1ZTtcbiAgICAgICAgICAgIGlmICh0aGlzLmluc3RhbmNlZENvdW50ICYmIHRoaXMuaW5zdGFuY2VkQ291bnQgIT09IGF0dHIuY291bnQgKiBhdHRyLmRpdmlzb3IpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oJ2dlb21ldHJ5IGhhcyBtdWx0aXBsZSBpbnN0YW5jZWQgYnVmZmVycyBvZiBkaWZmZXJlbnQgbGVuZ3RoJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuICh0aGlzLmluc3RhbmNlZENvdW50ID0gTWF0aC5taW4odGhpcy5pbnN0YW5jZWRDb3VudCwgYXR0ci5jb3VudCAqIGF0dHIuZGl2aXNvcikpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5pbnN0YW5jZWRDb3VudCA9IGF0dHIuY291bnQgKiBhdHRyLmRpdmlzb3I7XG4gICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSAnaW5kZXgnKSB7XG4gICAgICAgICAgICB0aGlzLmRyYXdSYW5nZS5jb3VudCA9IGF0dHIuY291bnQ7XG4gICAgICAgIH0gZWxzZSBpZiAoIXRoaXMuYXR0cmlidXRlcy5pbmRleCkge1xuICAgICAgICAgICAgdGhpcy5kcmF3UmFuZ2UuY291bnQgPSBNYXRoLm1heCh0aGlzLmRyYXdSYW5nZS5jb3VudCwgYXR0ci5jb3VudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1cGRhdGVBdHRyaWJ1dGUoYXR0cikge1xuICAgICAgICBjb25zdCBpc05ld0J1ZmZlciA9ICFhdHRyLmJ1ZmZlcjtcbiAgICAgICAgaWYgKGlzTmV3QnVmZmVyKSBhdHRyLmJ1ZmZlciA9IHRoaXMuZ2wuY3JlYXRlQnVmZmVyKCk7XG4gICAgICAgIGlmICh0aGlzLmdsU3RhdGUuYm91bmRCdWZmZXIgIT09IGF0dHIuYnVmZmVyKSB7XG4gICAgICAgICAgICB0aGlzLmdsLmJpbmRCdWZmZXIoYXR0ci50YXJnZXQsIGF0dHIuYnVmZmVyKTtcbiAgICAgICAgICAgIHRoaXMuZ2xTdGF0ZS5ib3VuZEJ1ZmZlciA9IGF0dHIuYnVmZmVyO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc05ld0J1ZmZlcikge1xuICAgICAgICAgICAgdGhpcy5nbC5idWZmZXJEYXRhKGF0dHIudGFyZ2V0LCBhdHRyLmRhdGEsIGF0dHIudXNhZ2UpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5nbC5idWZmZXJTdWJEYXRhKGF0dHIudGFyZ2V0LCAwLCBhdHRyLmRhdGEpO1xuICAgICAgICB9XG4gICAgICAgIGF0dHIubmVlZHNVcGRhdGUgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBzZXRJbmRleCh2YWx1ZSkge1xuICAgICAgICB0aGlzLmFkZEF0dHJpYnV0ZSgnaW5kZXgnLCB2YWx1ZSk7XG4gICAgfVxuXG4gICAgc2V0RHJhd1JhbmdlKHN0YXJ0LCBjb3VudCkge1xuICAgICAgICB0aGlzLmRyYXdSYW5nZS5zdGFydCA9IHN0YXJ0O1xuICAgICAgICB0aGlzLmRyYXdSYW5nZS5jb3VudCA9IGNvdW50O1xuICAgIH1cblxuICAgIHNldEluc3RhbmNlZENvdW50KHZhbHVlKSB7XG4gICAgICAgIHRoaXMuaW5zdGFuY2VkQ291bnQgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBjcmVhdGVWQU8ocHJvZ3JhbSkge1xuICAgICAgICB0aGlzLlZBT3NbcHJvZ3JhbS5hdHRyaWJ1dGVPcmRlcl0gPSB0aGlzLmdsLnJlbmRlcmVyLmNyZWF0ZVZlcnRleEFycmF5KCk7XG4gICAgICAgIHRoaXMuZ2wucmVuZGVyZXIuYmluZFZlcnRleEFycmF5KHRoaXMuVkFPc1twcm9ncmFtLmF0dHJpYnV0ZU9yZGVyXSk7XG4gICAgICAgIHRoaXMuYmluZEF0dHJpYnV0ZXMocHJvZ3JhbSk7XG4gICAgfVxuXG4gICAgYmluZEF0dHJpYnV0ZXMocHJvZ3JhbSkge1xuICAgICAgICAvLyBMaW5rIGFsbCBhdHRyaWJ1dGVzIHRvIHByb2dyYW0gdXNpbmcgZ2wudmVydGV4QXR0cmliUG9pbnRlclxuICAgICAgICBwcm9ncmFtLmF0dHJpYnV0ZUxvY2F0aW9ucy5mb3JFYWNoKChsb2NhdGlvbiwgeyBuYW1lLCB0eXBlIH0pID0+IHtcbiAgICAgICAgICAgIC8vIElmIGdlb21ldHJ5IG1pc3NpbmcgYSByZXF1aXJlZCBzaGFkZXIgYXR0cmlidXRlXG4gICAgICAgICAgICBpZiAoIXRoaXMuYXR0cmlidXRlc1tuYW1lXSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgYWN0aXZlIGF0dHJpYnV0ZSAke25hbWV9IG5vdCBiZWluZyBzdXBwbGllZGApO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgYXR0ciA9IHRoaXMuYXR0cmlidXRlc1tuYW1lXTtcblxuICAgICAgICAgICAgdGhpcy5nbC5iaW5kQnVmZmVyKGF0dHIudGFyZ2V0LCBhdHRyLmJ1ZmZlcik7XG4gICAgICAgICAgICB0aGlzLmdsU3RhdGUuYm91bmRCdWZmZXIgPSBhdHRyLmJ1ZmZlcjtcblxuICAgICAgICAgICAgLy8gRm9yIG1hdHJpeCBhdHRyaWJ1dGVzLCBidWZmZXIgbmVlZHMgdG8gYmUgZGVmaW5lZCBwZXIgY29sdW1uXG4gICAgICAgICAgICBsZXQgbnVtTG9jID0gMTtcbiAgICAgICAgICAgIGlmICh0eXBlID09PSAzNTY3NCkgbnVtTG9jID0gMjsgLy8gbWF0MlxuICAgICAgICAgICAgaWYgKHR5cGUgPT09IDM1Njc1KSBudW1Mb2MgPSAzOyAvLyBtYXQzXG4gICAgICAgICAgICBpZiAodHlwZSA9PT0gMzU2NzYpIG51bUxvYyA9IDQ7IC8vIG1hdDRcblxuICAgICAgICAgICAgY29uc3Qgc2l6ZSA9IGF0dHIuc2l6ZSAvIG51bUxvYztcbiAgICAgICAgICAgIGNvbnN0IHN0cmlkZSA9IG51bUxvYyA9PT0gMSA/IDAgOiBudW1Mb2MgKiBudW1Mb2MgKiA0O1xuICAgICAgICAgICAgY29uc3Qgb2Zmc2V0ID0gbnVtTG9jID09PSAxID8gMCA6IG51bUxvYyAqIDQ7XG5cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtTG9jOyBpKyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLmdsLnZlcnRleEF0dHJpYlBvaW50ZXIobG9jYXRpb24gKyBpLCBzaXplLCBhdHRyLnR5cGUsIGF0dHIubm9ybWFsaXplZCwgYXR0ci5zdHJpZGUgKyBzdHJpZGUsIGF0dHIub2Zmc2V0ICsgaSAqIG9mZnNldCk7XG4gICAgICAgICAgICAgICAgdGhpcy5nbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheShsb2NhdGlvbiArIGkpO1xuXG4gICAgICAgICAgICAgICAgLy8gRm9yIGluc3RhbmNlZCBhdHRyaWJ1dGVzLCBkaXZpc29yIG5lZWRzIHRvIGJlIHNldC5cbiAgICAgICAgICAgICAgICAvLyBGb3IgZmlyZWZveCwgbmVlZCB0byBzZXQgYmFjayB0byAwIGlmIG5vbi1pbnN0YW5jZWQgZHJhd24gYWZ0ZXIgaW5zdGFuY2VkLiBFbHNlIHdvbid0IHJlbmRlclxuICAgICAgICAgICAgICAgIHRoaXMuZ2wucmVuZGVyZXIudmVydGV4QXR0cmliRGl2aXNvcihsb2NhdGlvbiArIGksIGF0dHIuZGl2aXNvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIEJpbmQgaW5kaWNlcyBpZiBnZW9tZXRyeSBpbmRleGVkXG4gICAgICAgIGlmICh0aGlzLmF0dHJpYnV0ZXMuaW5kZXgpIHRoaXMuZ2wuYmluZEJ1ZmZlcih0aGlzLmdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSLCB0aGlzLmF0dHJpYnV0ZXMuaW5kZXguYnVmZmVyKTtcbiAgICB9XG5cbiAgICBkcmF3KHsgcHJvZ3JhbSwgbW9kZSA9IHRoaXMuZ2wuVFJJQU5HTEVTIH0pIHtcbiAgICAgICAgaWYgKHRoaXMuZ2wucmVuZGVyZXIuY3VycmVudEdlb21ldHJ5ICE9PSBgJHt0aGlzLmlkfV8ke3Byb2dyYW0uYXR0cmlidXRlT3JkZXJ9YCkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLlZBT3NbcHJvZ3JhbS5hdHRyaWJ1dGVPcmRlcl0pIHRoaXMuY3JlYXRlVkFPKHByb2dyYW0pO1xuICAgICAgICAgICAgdGhpcy5nbC5yZW5kZXJlci5iaW5kVmVydGV4QXJyYXkodGhpcy5WQU9zW3Byb2dyYW0uYXR0cmlidXRlT3JkZXJdKTtcbiAgICAgICAgICAgIHRoaXMuZ2wucmVuZGVyZXIuY3VycmVudEdlb21ldHJ5ID0gYCR7dGhpcy5pZH1fJHtwcm9ncmFtLmF0dHJpYnV0ZU9yZGVyfWA7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBDaGVjayBpZiBhbnkgYXR0cmlidXRlcyBuZWVkIHVwZGF0aW5nXG4gICAgICAgIHByb2dyYW0uYXR0cmlidXRlTG9jYXRpb25zLmZvckVhY2goKGxvY2F0aW9uLCB7IG5hbWUgfSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgYXR0ciA9IHRoaXMuYXR0cmlidXRlc1tuYW1lXTtcbiAgICAgICAgICAgIGlmIChhdHRyLm5lZWRzVXBkYXRlKSB0aGlzLnVwZGF0ZUF0dHJpYnV0ZShhdHRyKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gRm9yIGRyYXdFbGVtZW50cywgb2Zmc2V0IG5lZWRzIHRvIGJlIG11bHRpcGxlIG9mIHR5cGUgc2l6ZVxuICAgICAgICBsZXQgaW5kZXhCeXRlc1BlckVsZW1lbnQgPSAyO1xuICAgICAgICBpZiAodGhpcy5hdHRyaWJ1dGVzLmluZGV4Py50eXBlID09PSB0aGlzLmdsLlVOU0lHTkVEX0lOVCkgaW5kZXhCeXRlc1BlckVsZW1lbnQgPSA0O1xuXG4gICAgICAgIGlmICh0aGlzLmlzSW5zdGFuY2VkKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5hdHRyaWJ1dGVzLmluZGV4KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5nbC5yZW5kZXJlci5kcmF3RWxlbWVudHNJbnN0YW5jZWQoXG4gICAgICAgICAgICAgICAgICAgIG1vZGUsXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZHJhd1JhbmdlLmNvdW50LFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmF0dHJpYnV0ZXMuaW5kZXgudHlwZSxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdHRyaWJ1dGVzLmluZGV4Lm9mZnNldCArIHRoaXMuZHJhd1JhbmdlLnN0YXJ0ICogaW5kZXhCeXRlc1BlckVsZW1lbnQsXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5zdGFuY2VkQ291bnRcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmdsLnJlbmRlcmVyLmRyYXdBcnJheXNJbnN0YW5jZWQobW9kZSwgdGhpcy5kcmF3UmFuZ2Uuc3RhcnQsIHRoaXMuZHJhd1JhbmdlLmNvdW50LCB0aGlzLmluc3RhbmNlZENvdW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmF0dHJpYnV0ZXMuaW5kZXgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmdsLmRyYXdFbGVtZW50cyhcbiAgICAgICAgICAgICAgICAgICAgbW9kZSxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kcmF3UmFuZ2UuY291bnQsXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXR0cmlidXRlcy5pbmRleC50eXBlLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmF0dHJpYnV0ZXMuaW5kZXgub2Zmc2V0ICsgdGhpcy5kcmF3UmFuZ2Uuc3RhcnQgKiBpbmRleEJ5dGVzUGVyRWxlbWVudFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuZ2wuZHJhd0FycmF5cyhtb2RlLCB0aGlzLmRyYXdSYW5nZS5zdGFydCwgdGhpcy5kcmF3UmFuZ2UuY291bnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0UG9zaXRpb24oKSB7XG4gICAgICAgIC8vIFVzZSBwb3NpdGlvbiBidWZmZXIsIG9yIG1pbi9tYXggaWYgYXZhaWxhYmxlXG4gICAgICAgIGNvbnN0IGF0dHIgPSB0aGlzLmF0dHJpYnV0ZXMucG9zaXRpb247XG4gICAgICAgIC8vIGlmIChhdHRyLm1pbikgcmV0dXJuIFsuLi5hdHRyLm1pbiwgLi4uYXR0ci5tYXhdO1xuICAgICAgICBpZiAoYXR0ci5kYXRhKSByZXR1cm4gYXR0cjtcbiAgICAgICAgaWYgKGlzQm91bmRzV2FybmVkKSByZXR1cm47XG4gICAgICAgIGNvbnNvbGUud2FybignTm8gcG9zaXRpb24gYnVmZmVyIGRhdGEgZm91bmQgdG8gY29tcHV0ZSBib3VuZHMnKTtcbiAgICAgICAgcmV0dXJuIChpc0JvdW5kc1dhcm5lZCA9IHRydWUpO1xuICAgIH1cblxuICAgIGNvbXB1dGVCb3VuZGluZ0JveChhdHRyKSB7XG4gICAgICAgIGlmICghYXR0cikgYXR0ciA9IHRoaXMuZ2V0UG9zaXRpb24oKTtcbiAgICAgICAgY29uc3QgYXJyYXkgPSBhdHRyLmRhdGE7XG4gICAgICAgIC8vIERhdGEgbG9hZGVkIHNob3VsZG4ndCBoYWF2ZSBzdHJpZGUsIG9ubHkgYnVmZmVyc1xuICAgICAgICAvLyBjb25zdCBzdHJpZGUgPSBhdHRyLnN0cmlkZSA/IGF0dHIuc3RyaWRlIC8gYXJyYXkuQllURVNfUEVSX0VMRU1FTlQgOiBhdHRyLnNpemU7XG4gICAgICAgIGNvbnN0IHN0cmlkZSA9IGF0dHIuc2l6ZTtcblxuICAgICAgICBpZiAoIXRoaXMuYm91bmRzKSB7XG4gICAgICAgICAgICB0aGlzLmJvdW5kcyA9IHtcbiAgICAgICAgICAgICAgICBtaW46IG5ldyBWZWMzKCksXG4gICAgICAgICAgICAgICAgbWF4OiBuZXcgVmVjMygpLFxuICAgICAgICAgICAgICAgIGNlbnRlcjogbmV3IFZlYzMoKSxcbiAgICAgICAgICAgICAgICBzY2FsZTogbmV3IFZlYzMoKSxcbiAgICAgICAgICAgICAgICByYWRpdXM6IEluZmluaXR5LFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG1pbiA9IHRoaXMuYm91bmRzLm1pbjtcbiAgICAgICAgY29uc3QgbWF4ID0gdGhpcy5ib3VuZHMubWF4O1xuICAgICAgICBjb25zdCBjZW50ZXIgPSB0aGlzLmJvdW5kcy5jZW50ZXI7XG4gICAgICAgIGNvbnN0IHNjYWxlID0gdGhpcy5ib3VuZHMuc2NhbGU7XG5cbiAgICAgICAgbWluLnNldCgrSW5maW5pdHkpO1xuICAgICAgICBtYXguc2V0KC1JbmZpbml0eSk7XG5cbiAgICAgICAgLy8gVE9ETzogY2hlY2sgc2l6ZSBvZiBwb3NpdGlvbiAoZWcgdHJpYW5nbGUgd2l0aCBWZWMyKVxuICAgICAgICBmb3IgKGxldCBpID0gMCwgbCA9IGFycmF5Lmxlbmd0aDsgaSA8IGw7IGkgKz0gc3RyaWRlKSB7XG4gICAgICAgICAgICBjb25zdCB4ID0gYXJyYXlbaV07XG4gICAgICAgICAgICBjb25zdCB5ID0gYXJyYXlbaSArIDFdO1xuICAgICAgICAgICAgY29uc3QgeiA9IGFycmF5W2kgKyAyXTtcblxuICAgICAgICAgICAgbWluLnggPSBNYXRoLm1pbih4LCBtaW4ueCk7XG4gICAgICAgICAgICBtaW4ueSA9IE1hdGgubWluKHksIG1pbi55KTtcbiAgICAgICAgICAgIG1pbi56ID0gTWF0aC5taW4oeiwgbWluLnopO1xuXG4gICAgICAgICAgICBtYXgueCA9IE1hdGgubWF4KHgsIG1heC54KTtcbiAgICAgICAgICAgIG1heC55ID0gTWF0aC5tYXgoeSwgbWF4LnkpO1xuICAgICAgICAgICAgbWF4LnogPSBNYXRoLm1heCh6LCBtYXgueik7XG4gICAgICAgIH1cblxuICAgICAgICBzY2FsZS5zdWIobWF4LCBtaW4pO1xuICAgICAgICBjZW50ZXIuYWRkKG1pbiwgbWF4KS5kaXZpZGUoMik7XG4gICAgfVxuXG4gICAgY29tcHV0ZUJvdW5kaW5nU3BoZXJlKGF0dHIpIHtcbiAgICAgICAgaWYgKCFhdHRyKSBhdHRyID0gdGhpcy5nZXRQb3NpdGlvbigpO1xuICAgICAgICBjb25zdCBhcnJheSA9IGF0dHIuZGF0YTtcbiAgICAgICAgLy8gRGF0YSBsb2FkZWQgc2hvdWxkbid0IGhhYXZlIHN0cmlkZSwgb25seSBidWZmZXJzXG4gICAgICAgIC8vIGNvbnN0IHN0cmlkZSA9IGF0dHIuc3RyaWRlID8gYXR0ci5zdHJpZGUgLyBhcnJheS5CWVRFU19QRVJfRUxFTUVOVCA6IGF0dHIuc2l6ZTtcbiAgICAgICAgY29uc3Qgc3RyaWRlID0gYXR0ci5zaXplO1xuXG4gICAgICAgIGlmICghdGhpcy5ib3VuZHMpIHRoaXMuY29tcHV0ZUJvdW5kaW5nQm94KGF0dHIpO1xuXG4gICAgICAgIGxldCBtYXhSYWRpdXNTcSA9IDA7XG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gYXJyYXkubGVuZ3RoOyBpIDwgbDsgaSArPSBzdHJpZGUpIHtcbiAgICAgICAgICAgIHRlbXBWZWMzLmZyb21BcnJheShhcnJheSwgaSk7XG4gICAgICAgICAgICBtYXhSYWRpdXNTcSA9IE1hdGgubWF4KG1heFJhZGl1c1NxLCB0aGlzLmJvdW5kcy5jZW50ZXIuc3F1YXJlZERpc3RhbmNlKHRlbXBWZWMzKSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmJvdW5kcy5yYWRpdXMgPSBNYXRoLnNxcnQobWF4UmFkaXVzU3EpO1xuICAgIH1cblxuICAgIHJlbW92ZSgpIHtcbiAgICAgICAgZm9yIChsZXQga2V5IGluIHRoaXMuVkFPcykge1xuICAgICAgICAgICAgdGhpcy5nbC5yZW5kZXJlci5kZWxldGVWZXJ0ZXhBcnJheSh0aGlzLlZBT3Nba2V5XSk7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy5WQU9zW2tleV07XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQga2V5IGluIHRoaXMuYXR0cmlidXRlcykge1xuICAgICAgICAgICAgdGhpcy5nbC5kZWxldGVCdWZmZXIodGhpcy5hdHRyaWJ1dGVzW2tleV0uYnVmZmVyKTtcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmF0dHJpYnV0ZXNba2V5XTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCB7IFRyYW5zZm9ybSB9IGZyb20gJy4vVHJhbnNmb3JtLmpzJztcbmltcG9ydCB7IE1hdDMgfSBmcm9tICcuLi9tYXRoL01hdDMuanMnO1xuaW1wb3J0IHsgTWF0NCB9IGZyb20gJy4uL21hdGgvTWF0NC5qcyc7XG5cbmxldCBJRCA9IDA7XG5cbmV4cG9ydCBjbGFzcyBNZXNoIGV4dGVuZHMgVHJhbnNmb3JtIHtcbiAgICBjb25zdHJ1Y3RvcihnbCwgeyBnZW9tZXRyeSwgcHJvZ3JhbSwgbW9kZSA9IGdsLlRSSUFOR0xFUywgZnJ1c3R1bUN1bGxlZCA9IHRydWUsIHJlbmRlck9yZGVyID0gMCB9ID0ge30pIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgaWYgKCFnbC5jYW52YXMpIGNvbnNvbGUuZXJyb3IoJ2dsIG5vdCBwYXNzZWQgYXMgZmlyc3QgYXJndW1lbnQgdG8gTWVzaCcpO1xuICAgICAgICB0aGlzLmdsID0gZ2w7XG4gICAgICAgIHRoaXMuaWQgPSBJRCsrO1xuICAgICAgICB0aGlzLmdlb21ldHJ5ID0gZ2VvbWV0cnk7XG4gICAgICAgIHRoaXMucHJvZ3JhbSA9IHByb2dyYW07XG4gICAgICAgIHRoaXMubW9kZSA9IG1vZGU7XG5cbiAgICAgICAgLy8gVXNlZCB0byBza2lwIGZydXN0dW0gY3VsbGluZ1xuICAgICAgICB0aGlzLmZydXN0dW1DdWxsZWQgPSBmcnVzdHVtQ3VsbGVkO1xuXG4gICAgICAgIC8vIE92ZXJyaWRlIHNvcnRpbmcgdG8gZm9yY2UgYW4gb3JkZXJcbiAgICAgICAgdGhpcy5yZW5kZXJPcmRlciA9IHJlbmRlck9yZGVyO1xuICAgICAgICB0aGlzLm1vZGVsVmlld01hdHJpeCA9IG5ldyBNYXQ0KCk7XG4gICAgICAgIHRoaXMubm9ybWFsTWF0cml4ID0gbmV3IE1hdDMoKTtcbiAgICAgICAgdGhpcy5iZWZvcmVSZW5kZXJDYWxsYmFja3MgPSBbXTtcbiAgICAgICAgdGhpcy5hZnRlclJlbmRlckNhbGxiYWNrcyA9IFtdO1xuICAgIH1cblxuICAgIG9uQmVmb3JlUmVuZGVyKGYpIHtcbiAgICAgICAgdGhpcy5iZWZvcmVSZW5kZXJDYWxsYmFja3MucHVzaChmKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgb25BZnRlclJlbmRlcihmKSB7XG4gICAgICAgIHRoaXMuYWZ0ZXJSZW5kZXJDYWxsYmFja3MucHVzaChmKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgZHJhdyh7IGNhbWVyYSB9ID0ge30pIHtcbiAgICAgICAgaWYgKGNhbWVyYSkge1xuICAgICAgICAgICAgLy8gQWRkIGVtcHR5IG1hdHJpeCB1bmlmb3JtcyB0byBwcm9ncmFtIGlmIHVuc2V0XG4gICAgICAgICAgICBpZiAoIXRoaXMucHJvZ3JhbS51bmlmb3Jtcy5tb2RlbE1hdHJpeCkge1xuICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24odGhpcy5wcm9ncmFtLnVuaWZvcm1zLCB7XG4gICAgICAgICAgICAgICAgICAgIG1vZGVsTWF0cml4OiB7IHZhbHVlOiBudWxsIH0sXG4gICAgICAgICAgICAgICAgICAgIHZpZXdNYXRyaXg6IHsgdmFsdWU6IG51bGwgfSxcbiAgICAgICAgICAgICAgICAgICAgbW9kZWxWaWV3TWF0cml4OiB7IHZhbHVlOiBudWxsIH0sXG4gICAgICAgICAgICAgICAgICAgIG5vcm1hbE1hdHJpeDogeyB2YWx1ZTogbnVsbCB9LFxuICAgICAgICAgICAgICAgICAgICBwcm9qZWN0aW9uTWF0cml4OiB7IHZhbHVlOiBudWxsIH0sXG4gICAgICAgICAgICAgICAgICAgIGNhbWVyYVBvc2l0aW9uOiB7IHZhbHVlOiBudWxsIH0sXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFNldCB0aGUgbWF0cml4IHVuaWZvcm1zXG4gICAgICAgICAgICB0aGlzLnByb2dyYW0udW5pZm9ybXMucHJvamVjdGlvbk1hdHJpeC52YWx1ZSA9IGNhbWVyYS5wcm9qZWN0aW9uTWF0cml4O1xuICAgICAgICAgICAgdGhpcy5wcm9ncmFtLnVuaWZvcm1zLmNhbWVyYVBvc2l0aW9uLnZhbHVlID0gY2FtZXJhLndvcmxkUG9zaXRpb247XG4gICAgICAgICAgICB0aGlzLnByb2dyYW0udW5pZm9ybXMudmlld01hdHJpeC52YWx1ZSA9IGNhbWVyYS52aWV3TWF0cml4O1xuICAgICAgICAgICAgdGhpcy5tb2RlbFZpZXdNYXRyaXgubXVsdGlwbHkoY2FtZXJhLnZpZXdNYXRyaXgsIHRoaXMud29ybGRNYXRyaXgpO1xuICAgICAgICAgICAgdGhpcy5ub3JtYWxNYXRyaXguZ2V0Tm9ybWFsTWF0cml4KHRoaXMubW9kZWxWaWV3TWF0cml4KTtcbiAgICAgICAgICAgIHRoaXMucHJvZ3JhbS51bmlmb3Jtcy5tb2RlbE1hdHJpeC52YWx1ZSA9IHRoaXMud29ybGRNYXRyaXg7XG4gICAgICAgICAgICB0aGlzLnByb2dyYW0udW5pZm9ybXMubW9kZWxWaWV3TWF0cml4LnZhbHVlID0gdGhpcy5tb2RlbFZpZXdNYXRyaXg7XG4gICAgICAgICAgICB0aGlzLnByb2dyYW0udW5pZm9ybXMubm9ybWFsTWF0cml4LnZhbHVlID0gdGhpcy5ub3JtYWxNYXRyaXg7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5iZWZvcmVSZW5kZXJDYWxsYmFja3MuZm9yRWFjaCgoZikgPT4gZiAmJiBmKHsgbWVzaDogdGhpcywgY2FtZXJhIH0pKTtcblxuICAgICAgICAvLyBkZXRlcm1pbmUgaWYgZmFjZXMgbmVlZCB0byBiZSBmbGlwcGVkIC0gd2hlbiBtZXNoIHNjYWxlZCBuZWdhdGl2ZWx5XG4gICAgICAgIGxldCBmbGlwRmFjZXMgPSB0aGlzLnByb2dyYW0uY3VsbEZhY2UgJiYgdGhpcy53b3JsZE1hdHJpeC5kZXRlcm1pbmFudCgpIDwgMDtcbiAgICAgICAgdGhpcy5wcm9ncmFtLnVzZSh7IGZsaXBGYWNlcyB9KTtcbiAgICAgICAgdGhpcy5nZW9tZXRyeS5kcmF3KHsgbW9kZTogdGhpcy5tb2RlLCBwcm9ncmFtOiB0aGlzLnByb2dyYW0gfSk7XG4gICAgICAgIHRoaXMuYWZ0ZXJSZW5kZXJDYWxsYmFja3MuZm9yRWFjaCgoZikgPT4gZiAmJiBmKHsgbWVzaDogdGhpcywgY2FtZXJhIH0pKTtcbiAgICB9XG59XG4iLCIvLyBUT0RPOiB1cGxvYWQgZW1wdHkgdGV4dHVyZSBpZiBudWxsID8gbWF5YmUgbm90XG4vLyBUT0RPOiB1cGxvYWQgaWRlbnRpdHkgbWF0cml4IGlmIG51bGwgP1xuLy8gVE9ETzogc2FtcGxlciBDdWJlXG5cbmxldCBJRCA9IDE7XG5cbi8vIGNhY2hlIG9mIHR5cGVkIGFycmF5cyB1c2VkIHRvIGZsYXR0ZW4gdW5pZm9ybSBhcnJheXNcbmNvbnN0IGFycmF5Q2FjaGVGMzIgPSB7fTtcblxuZXhwb3J0IGNsYXNzIFByb2dyYW0ge1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBnbCxcbiAgICAgICAge1xuICAgICAgICAgICAgdmVydGV4LFxuICAgICAgICAgICAgZnJhZ21lbnQsXG4gICAgICAgICAgICB1bmlmb3JtcyA9IHt9LFxuXG4gICAgICAgICAgICB0cmFuc3BhcmVudCA9IGZhbHNlLFxuICAgICAgICAgICAgY3VsbEZhY2UgPSBnbC5CQUNLLFxuICAgICAgICAgICAgZnJvbnRGYWNlID0gZ2wuQ0NXLFxuICAgICAgICAgICAgZGVwdGhUZXN0ID0gdHJ1ZSxcbiAgICAgICAgICAgIGRlcHRoV3JpdGUgPSB0cnVlLFxuICAgICAgICAgICAgZGVwdGhGdW5jID0gZ2wuTEVTUyxcbiAgICAgICAgfSA9IHt9XG4gICAgKSB7XG4gICAgICAgIGlmICghZ2wuY2FudmFzKSBjb25zb2xlLmVycm9yKCdnbCBub3QgcGFzc2VkIGFzIGZpcnN0IGFyZ3VtZW50IHRvIFByb2dyYW0nKTtcbiAgICAgICAgdGhpcy5nbCA9IGdsO1xuICAgICAgICB0aGlzLnVuaWZvcm1zID0gdW5pZm9ybXM7XG4gICAgICAgIHRoaXMuaWQgPSBJRCsrO1xuXG4gICAgICAgIGlmICghdmVydGV4KSBjb25zb2xlLndhcm4oJ3ZlcnRleCBzaGFkZXIgbm90IHN1cHBsaWVkJyk7XG4gICAgICAgIGlmICghZnJhZ21lbnQpIGNvbnNvbGUud2FybignZnJhZ21lbnQgc2hhZGVyIG5vdCBzdXBwbGllZCcpO1xuXG4gICAgICAgIC8vIFN0b3JlIHByb2dyYW0gc3RhdGVcbiAgICAgICAgdGhpcy50cmFuc3BhcmVudCA9IHRyYW5zcGFyZW50O1xuICAgICAgICB0aGlzLmN1bGxGYWNlID0gY3VsbEZhY2U7XG4gICAgICAgIHRoaXMuZnJvbnRGYWNlID0gZnJvbnRGYWNlO1xuICAgICAgICB0aGlzLmRlcHRoVGVzdCA9IGRlcHRoVGVzdDtcbiAgICAgICAgdGhpcy5kZXB0aFdyaXRlID0gZGVwdGhXcml0ZTtcbiAgICAgICAgdGhpcy5kZXB0aEZ1bmMgPSBkZXB0aEZ1bmM7XG4gICAgICAgIHRoaXMuYmxlbmRGdW5jID0ge307XG4gICAgICAgIHRoaXMuYmxlbmRFcXVhdGlvbiA9IHt9O1xuXG4gICAgICAgIC8vIHNldCBkZWZhdWx0IGJsZW5kRnVuYyBpZiB0cmFuc3BhcmVudCBmbGFnZ2VkXG4gICAgICAgIGlmICh0aGlzLnRyYW5zcGFyZW50ICYmICF0aGlzLmJsZW5kRnVuYy5zcmMpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmdsLnJlbmRlcmVyLnByZW11bHRpcGxpZWRBbHBoYSkgdGhpcy5zZXRCbGVuZEZ1bmModGhpcy5nbC5PTkUsIHRoaXMuZ2wuT05FX01JTlVTX1NSQ19BTFBIQSk7XG4gICAgICAgICAgICBlbHNlIHRoaXMuc2V0QmxlbmRGdW5jKHRoaXMuZ2wuU1JDX0FMUEhBLCB0aGlzLmdsLk9ORV9NSU5VU19TUkNfQUxQSEEpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gY29tcGlsZSB2ZXJ0ZXggc2hhZGVyIGFuZCBsb2cgZXJyb3JzXG4gICAgICAgIGNvbnN0IHZlcnRleFNoYWRlciA9IGdsLmNyZWF0ZVNoYWRlcihnbC5WRVJURVhfU0hBREVSKTtcbiAgICAgICAgZ2wuc2hhZGVyU291cmNlKHZlcnRleFNoYWRlciwgdmVydGV4KTtcbiAgICAgICAgZ2wuY29tcGlsZVNoYWRlcih2ZXJ0ZXhTaGFkZXIpO1xuICAgICAgICBpZiAoZ2wuZ2V0U2hhZGVySW5mb0xvZyh2ZXJ0ZXhTaGFkZXIpICE9PSAnJykge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKGAke2dsLmdldFNoYWRlckluZm9Mb2codmVydGV4U2hhZGVyKX1cXG5WZXJ0ZXggU2hhZGVyXFxuJHthZGRMaW5lTnVtYmVycyh2ZXJ0ZXgpfWApO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gY29tcGlsZSBmcmFnbWVudCBzaGFkZXIgYW5kIGxvZyBlcnJvcnNcbiAgICAgICAgY29uc3QgZnJhZ21lbnRTaGFkZXIgPSBnbC5jcmVhdGVTaGFkZXIoZ2wuRlJBR01FTlRfU0hBREVSKTtcbiAgICAgICAgZ2wuc2hhZGVyU291cmNlKGZyYWdtZW50U2hhZGVyLCBmcmFnbWVudCk7XG4gICAgICAgIGdsLmNvbXBpbGVTaGFkZXIoZnJhZ21lbnRTaGFkZXIpO1xuICAgICAgICBpZiAoZ2wuZ2V0U2hhZGVySW5mb0xvZyhmcmFnbWVudFNoYWRlcikgIT09ICcnKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oYCR7Z2wuZ2V0U2hhZGVySW5mb0xvZyhmcmFnbWVudFNoYWRlcil9XFxuRnJhZ21lbnQgU2hhZGVyXFxuJHthZGRMaW5lTnVtYmVycyhmcmFnbWVudCl9YCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjb21waWxlIHByb2dyYW0gYW5kIGxvZyBlcnJvcnNcbiAgICAgICAgdGhpcy5wcm9ncmFtID0gZ2wuY3JlYXRlUHJvZ3JhbSgpO1xuICAgICAgICBnbC5hdHRhY2hTaGFkZXIodGhpcy5wcm9ncmFtLCB2ZXJ0ZXhTaGFkZXIpO1xuICAgICAgICBnbC5hdHRhY2hTaGFkZXIodGhpcy5wcm9ncmFtLCBmcmFnbWVudFNoYWRlcik7XG4gICAgICAgIGdsLmxpbmtQcm9ncmFtKHRoaXMucHJvZ3JhbSk7XG4gICAgICAgIGlmICghZ2wuZ2V0UHJvZ3JhbVBhcmFtZXRlcih0aGlzLnByb2dyYW0sIGdsLkxJTktfU1RBVFVTKSkge1xuICAgICAgICAgICAgcmV0dXJuIGNvbnNvbGUud2FybihnbC5nZXRQcm9ncmFtSW5mb0xvZyh0aGlzLnByb2dyYW0pKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFJlbW92ZSBzaGFkZXIgb25jZSBsaW5rZWRcbiAgICAgICAgZ2wuZGVsZXRlU2hhZGVyKHZlcnRleFNoYWRlcik7XG4gICAgICAgIGdsLmRlbGV0ZVNoYWRlcihmcmFnbWVudFNoYWRlcik7XG5cbiAgICAgICAgLy8gR2V0IGFjdGl2ZSB1bmlmb3JtIGxvY2F0aW9uc1xuICAgICAgICB0aGlzLnVuaWZvcm1Mb2NhdGlvbnMgPSBuZXcgTWFwKCk7XG4gICAgICAgIGxldCBudW1Vbmlmb3JtcyA9IGdsLmdldFByb2dyYW1QYXJhbWV0ZXIodGhpcy5wcm9ncmFtLCBnbC5BQ1RJVkVfVU5JRk9STVMpO1xuICAgICAgICBmb3IgKGxldCB1SW5kZXggPSAwOyB1SW5kZXggPCBudW1Vbmlmb3JtczsgdUluZGV4KyspIHtcbiAgICAgICAgICAgIGxldCB1bmlmb3JtID0gZ2wuZ2V0QWN0aXZlVW5pZm9ybSh0aGlzLnByb2dyYW0sIHVJbmRleCk7XG4gICAgICAgICAgICB0aGlzLnVuaWZvcm1Mb2NhdGlvbnMuc2V0KHVuaWZvcm0sIGdsLmdldFVuaWZvcm1Mb2NhdGlvbih0aGlzLnByb2dyYW0sIHVuaWZvcm0ubmFtZSkpO1xuXG4gICAgICAgICAgICAvLyBzcGxpdCB1bmlmb3JtcycgbmFtZXMgdG8gc2VwYXJhdGUgYXJyYXkgYW5kIHN0cnVjdCBkZWNsYXJhdGlvbnNcbiAgICAgICAgICAgIGNvbnN0IHNwbGl0ID0gdW5pZm9ybS5uYW1lLm1hdGNoKC8oXFx3KykvZyk7XG5cbiAgICAgICAgICAgIHVuaWZvcm0udW5pZm9ybU5hbWUgPSBzcGxpdFswXTtcbiAgICAgICAgICAgIHVuaWZvcm0ubmFtZUNvbXBvbmVudHMgPSBzcGxpdC5zbGljZSgxKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEdldCBhY3RpdmUgYXR0cmlidXRlIGxvY2F0aW9uc1xuICAgICAgICB0aGlzLmF0dHJpYnV0ZUxvY2F0aW9ucyA9IG5ldyBNYXAoKTtcbiAgICAgICAgY29uc3QgbG9jYXRpb25zID0gW107XG4gICAgICAgIGNvbnN0IG51bUF0dHJpYnMgPSBnbC5nZXRQcm9ncmFtUGFyYW1ldGVyKHRoaXMucHJvZ3JhbSwgZ2wuQUNUSVZFX0FUVFJJQlVURVMpO1xuICAgICAgICBmb3IgKGxldCBhSW5kZXggPSAwOyBhSW5kZXggPCBudW1BdHRyaWJzOyBhSW5kZXgrKykge1xuICAgICAgICAgICAgY29uc3QgYXR0cmlidXRlID0gZ2wuZ2V0QWN0aXZlQXR0cmliKHRoaXMucHJvZ3JhbSwgYUluZGV4KTtcbiAgICAgICAgICAgIGNvbnN0IGxvY2F0aW9uID0gZ2wuZ2V0QXR0cmliTG9jYXRpb24odGhpcy5wcm9ncmFtLCBhdHRyaWJ1dGUubmFtZSk7XG4gICAgICAgICAgICAvLyBJZ25vcmUgc3BlY2lhbCBidWlsdC1pbiBpbnB1dHMuIGVnIGdsX1ZlcnRleElELCBnbF9JbnN0YW5jZUlEXG4gICAgICAgICAgICBpZiAobG9jYXRpb24gPT09IC0xKSBjb250aW51ZTtcbiAgICAgICAgICAgIGxvY2F0aW9uc1tsb2NhdGlvbl0gPSBhdHRyaWJ1dGUubmFtZTtcbiAgICAgICAgICAgIHRoaXMuYXR0cmlidXRlTG9jYXRpb25zLnNldChhdHRyaWJ1dGUsIGxvY2F0aW9uKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmF0dHJpYnV0ZU9yZGVyID0gbG9jYXRpb25zLmpvaW4oJycpO1xuICAgIH1cblxuICAgIHNldEJsZW5kRnVuYyhzcmMsIGRzdCwgc3JjQWxwaGEsIGRzdEFscGhhKSB7XG4gICAgICAgIHRoaXMuYmxlbmRGdW5jLnNyYyA9IHNyYztcbiAgICAgICAgdGhpcy5ibGVuZEZ1bmMuZHN0ID0gZHN0O1xuICAgICAgICB0aGlzLmJsZW5kRnVuYy5zcmNBbHBoYSA9IHNyY0FscGhhO1xuICAgICAgICB0aGlzLmJsZW5kRnVuYy5kc3RBbHBoYSA9IGRzdEFscGhhO1xuICAgICAgICBpZiAoc3JjKSB0aGlzLnRyYW5zcGFyZW50ID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBzZXRCbGVuZEVxdWF0aW9uKG1vZGVSR0IsIG1vZGVBbHBoYSkge1xuICAgICAgICB0aGlzLmJsZW5kRXF1YXRpb24ubW9kZVJHQiA9IG1vZGVSR0I7XG4gICAgICAgIHRoaXMuYmxlbmRFcXVhdGlvbi5tb2RlQWxwaGEgPSBtb2RlQWxwaGE7XG4gICAgfVxuXG4gICAgYXBwbHlTdGF0ZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuZGVwdGhUZXN0KSB0aGlzLmdsLnJlbmRlcmVyLmVuYWJsZSh0aGlzLmdsLkRFUFRIX1RFU1QpO1xuICAgICAgICBlbHNlIHRoaXMuZ2wucmVuZGVyZXIuZGlzYWJsZSh0aGlzLmdsLkRFUFRIX1RFU1QpO1xuXG4gICAgICAgIGlmICh0aGlzLmN1bGxGYWNlKSB0aGlzLmdsLnJlbmRlcmVyLmVuYWJsZSh0aGlzLmdsLkNVTExfRkFDRSk7XG4gICAgICAgIGVsc2UgdGhpcy5nbC5yZW5kZXJlci5kaXNhYmxlKHRoaXMuZ2wuQ1VMTF9GQUNFKTtcblxuICAgICAgICBpZiAodGhpcy5ibGVuZEZ1bmMuc3JjKSB0aGlzLmdsLnJlbmRlcmVyLmVuYWJsZSh0aGlzLmdsLkJMRU5EKTtcbiAgICAgICAgZWxzZSB0aGlzLmdsLnJlbmRlcmVyLmRpc2FibGUodGhpcy5nbC5CTEVORCk7XG5cbiAgICAgICAgaWYgKHRoaXMuY3VsbEZhY2UpIHRoaXMuZ2wucmVuZGVyZXIuc2V0Q3VsbEZhY2UodGhpcy5jdWxsRmFjZSk7XG4gICAgICAgIHRoaXMuZ2wucmVuZGVyZXIuc2V0RnJvbnRGYWNlKHRoaXMuZnJvbnRGYWNlKTtcbiAgICAgICAgdGhpcy5nbC5yZW5kZXJlci5zZXREZXB0aE1hc2sodGhpcy5kZXB0aFdyaXRlKTtcbiAgICAgICAgdGhpcy5nbC5yZW5kZXJlci5zZXREZXB0aEZ1bmModGhpcy5kZXB0aEZ1bmMpO1xuICAgICAgICBpZiAodGhpcy5ibGVuZEZ1bmMuc3JjKVxuICAgICAgICAgICAgdGhpcy5nbC5yZW5kZXJlci5zZXRCbGVuZEZ1bmModGhpcy5ibGVuZEZ1bmMuc3JjLCB0aGlzLmJsZW5kRnVuYy5kc3QsIHRoaXMuYmxlbmRGdW5jLnNyY0FscGhhLCB0aGlzLmJsZW5kRnVuYy5kc3RBbHBoYSk7XG4gICAgICAgIHRoaXMuZ2wucmVuZGVyZXIuc2V0QmxlbmRFcXVhdGlvbih0aGlzLmJsZW5kRXF1YXRpb24ubW9kZVJHQiwgdGhpcy5ibGVuZEVxdWF0aW9uLm1vZGVBbHBoYSk7XG4gICAgfVxuXG4gICAgdXNlKHsgZmxpcEZhY2VzID0gZmFsc2UgfSA9IHt9KSB7XG4gICAgICAgIGxldCB0ZXh0dXJlVW5pdCA9IC0xO1xuICAgICAgICBjb25zdCBwcm9ncmFtQWN0aXZlID0gdGhpcy5nbC5yZW5kZXJlci5zdGF0ZS5jdXJyZW50UHJvZ3JhbSA9PT0gdGhpcy5pZDtcblxuICAgICAgICAvLyBBdm9pZCBnbCBjYWxsIGlmIHByb2dyYW0gYWxyZWFkeSBpbiB1c2VcbiAgICAgICAgaWYgKCFwcm9ncmFtQWN0aXZlKSB7XG4gICAgICAgICAgICB0aGlzLmdsLnVzZVByb2dyYW0odGhpcy5wcm9ncmFtKTtcbiAgICAgICAgICAgIHRoaXMuZ2wucmVuZGVyZXIuc3RhdGUuY3VycmVudFByb2dyYW0gPSB0aGlzLmlkO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gU2V0IG9ubHkgdGhlIGFjdGl2ZSB1bmlmb3JtcyBmb3VuZCBpbiB0aGUgc2hhZGVyXG4gICAgICAgIHRoaXMudW5pZm9ybUxvY2F0aW9ucy5mb3JFYWNoKChsb2NhdGlvbiwgYWN0aXZlVW5pZm9ybSkgPT4ge1xuICAgICAgICAgICAgbGV0IHVuaWZvcm0gPSB0aGlzLnVuaWZvcm1zW2FjdGl2ZVVuaWZvcm0udW5pZm9ybU5hbWVdO1xuXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGNvbXBvbmVudCBvZiBhY3RpdmVVbmlmb3JtLm5hbWVDb21wb25lbnRzKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF1bmlmb3JtKSBicmVhaztcblxuICAgICAgICAgICAgICAgIGlmIChjb21wb25lbnQgaW4gdW5pZm9ybSkge1xuICAgICAgICAgICAgICAgICAgICB1bmlmb3JtID0gdW5pZm9ybVtjb21wb25lbnRdO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheSh1bmlmb3JtLnZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB1bmlmb3JtID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghdW5pZm9ybSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB3YXJuKGBBY3RpdmUgdW5pZm9ybSAke2FjdGl2ZVVuaWZvcm0ubmFtZX0gaGFzIG5vdCBiZWVuIHN1cHBsaWVkYCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh1bmlmb3JtICYmIHVuaWZvcm0udmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB3YXJuKGAke2FjdGl2ZVVuaWZvcm0ubmFtZX0gdW5pZm9ybSBpcyBtaXNzaW5nIGEgdmFsdWUgcGFyYW1ldGVyYCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh1bmlmb3JtLnZhbHVlLnRleHR1cmUpIHtcbiAgICAgICAgICAgICAgICB0ZXh0dXJlVW5pdCA9IHRleHR1cmVVbml0ICsgMTtcblxuICAgICAgICAgICAgICAgIC8vIENoZWNrIGlmIHRleHR1cmUgbmVlZHMgdG8gYmUgdXBkYXRlZFxuICAgICAgICAgICAgICAgIHVuaWZvcm0udmFsdWUudXBkYXRlKHRleHR1cmVVbml0KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2V0VW5pZm9ybSh0aGlzLmdsLCBhY3RpdmVVbmlmb3JtLnR5cGUsIGxvY2F0aW9uLCB0ZXh0dXJlVW5pdCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIEZvciB0ZXh0dXJlIGFycmF5cywgc2V0IHVuaWZvcm0gYXMgYW4gYXJyYXkgb2YgdGV4dHVyZSB1bml0cyBpbnN0ZWFkIG9mIGp1c3Qgb25lXG4gICAgICAgICAgICBpZiAodW5pZm9ybS52YWx1ZS5sZW5ndGggJiYgdW5pZm9ybS52YWx1ZVswXS50ZXh0dXJlKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdGV4dHVyZVVuaXRzID0gW107XG4gICAgICAgICAgICAgICAgdW5pZm9ybS52YWx1ZS5mb3JFYWNoKCh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0dXJlVW5pdCA9IHRleHR1cmVVbml0ICsgMTtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUudXBkYXRlKHRleHR1cmVVbml0KTtcbiAgICAgICAgICAgICAgICAgICAgdGV4dHVyZVVuaXRzLnB1c2godGV4dHVyZVVuaXQpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNldFVuaWZvcm0odGhpcy5nbCwgYWN0aXZlVW5pZm9ybS50eXBlLCBsb2NhdGlvbiwgdGV4dHVyZVVuaXRzKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc2V0VW5pZm9ybSh0aGlzLmdsLCBhY3RpdmVVbmlmb3JtLnR5cGUsIGxvY2F0aW9uLCB1bmlmb3JtLnZhbHVlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5hcHBseVN0YXRlKCk7XG4gICAgICAgIGlmIChmbGlwRmFjZXMpIHRoaXMuZ2wucmVuZGVyZXIuc2V0RnJvbnRGYWNlKHRoaXMuZnJvbnRGYWNlID09PSB0aGlzLmdsLkNDVyA/IHRoaXMuZ2wuQ1cgOiB0aGlzLmdsLkNDVyk7XG4gICAgfVxuXG4gICAgcmVtb3ZlKCkge1xuICAgICAgICB0aGlzLmdsLmRlbGV0ZVByb2dyYW0odGhpcy5wcm9ncmFtKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHNldFVuaWZvcm0oZ2wsIHR5cGUsIGxvY2F0aW9uLCB2YWx1ZSkge1xuICAgIHZhbHVlID0gdmFsdWUubGVuZ3RoID8gZmxhdHRlbih2YWx1ZSkgOiB2YWx1ZTtcbiAgICBjb25zdCBzZXRWYWx1ZSA9IGdsLnJlbmRlcmVyLnN0YXRlLnVuaWZvcm1Mb2NhdGlvbnMuZ2V0KGxvY2F0aW9uKTtcblxuICAgIC8vIEF2b2lkIHJlZHVuZGFudCB1bmlmb3JtIGNvbW1hbmRzXG4gICAgaWYgKHZhbHVlLmxlbmd0aCkge1xuICAgICAgICBpZiAoc2V0VmFsdWUgPT09IHVuZGVmaW5lZCB8fCBzZXRWYWx1ZS5sZW5ndGggIT09IHZhbHVlLmxlbmd0aCkge1xuICAgICAgICAgICAgLy8gY2xvbmUgYXJyYXkgdG8gc3RvcmUgYXMgY2FjaGVcbiAgICAgICAgICAgIGdsLnJlbmRlcmVyLnN0YXRlLnVuaWZvcm1Mb2NhdGlvbnMuc2V0KGxvY2F0aW9uLCB2YWx1ZS5zbGljZSgwKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoYXJyYXlzRXF1YWwoc2V0VmFsdWUsIHZhbHVlKSkgcmV0dXJuO1xuXG4gICAgICAgICAgICAvLyBVcGRhdGUgY2FjaGVkIGFycmF5IHZhbHVlc1xuICAgICAgICAgICAgc2V0VmFsdWUuc2V0ID8gc2V0VmFsdWUuc2V0KHZhbHVlKSA6IHNldEFycmF5KHNldFZhbHVlLCB2YWx1ZSk7XG4gICAgICAgICAgICBnbC5yZW5kZXJlci5zdGF0ZS51bmlmb3JtTG9jYXRpb25zLnNldChsb2NhdGlvbiwgc2V0VmFsdWUpO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHNldFZhbHVlID09PSB2YWx1ZSkgcmV0dXJuO1xuICAgICAgICBnbC5yZW5kZXJlci5zdGF0ZS51bmlmb3JtTG9jYXRpb25zLnNldChsb2NhdGlvbiwgdmFsdWUpO1xuICAgIH1cblxuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICBjYXNlIDUxMjY6XG4gICAgICAgICAgICByZXR1cm4gdmFsdWUubGVuZ3RoID8gZ2wudW5pZm9ybTFmdihsb2NhdGlvbiwgdmFsdWUpIDogZ2wudW5pZm9ybTFmKGxvY2F0aW9uLCB2YWx1ZSk7IC8vIEZMT0FUXG4gICAgICAgIGNhc2UgMzU2NjQ6XG4gICAgICAgICAgICByZXR1cm4gZ2wudW5pZm9ybTJmdihsb2NhdGlvbiwgdmFsdWUpOyAvLyBGTE9BVF9WRUMyXG4gICAgICAgIGNhc2UgMzU2NjU6XG4gICAgICAgICAgICByZXR1cm4gZ2wudW5pZm9ybTNmdihsb2NhdGlvbiwgdmFsdWUpOyAvLyBGTE9BVF9WRUMzXG4gICAgICAgIGNhc2UgMzU2NjY6XG4gICAgICAgICAgICByZXR1cm4gZ2wudW5pZm9ybTRmdihsb2NhdGlvbiwgdmFsdWUpOyAvLyBGTE9BVF9WRUM0XG4gICAgICAgIGNhc2UgMzU2NzA6IC8vIEJPT0xcbiAgICAgICAgY2FzZSA1MTI0OiAvLyBJTlRcbiAgICAgICAgY2FzZSAzNTY3ODogLy8gU0FNUExFUl8yRFxuICAgICAgICBjYXNlIDM1NjgwOlxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlLmxlbmd0aCA/IGdsLnVuaWZvcm0xaXYobG9jYXRpb24sIHZhbHVlKSA6IGdsLnVuaWZvcm0xaShsb2NhdGlvbiwgdmFsdWUpOyAvLyBTQU1QTEVSX0NVQkVcbiAgICAgICAgY2FzZSAzNTY3MTogLy8gQk9PTF9WRUMyXG4gICAgICAgIGNhc2UgMzU2Njc6XG4gICAgICAgICAgICByZXR1cm4gZ2wudW5pZm9ybTJpdihsb2NhdGlvbiwgdmFsdWUpOyAvLyBJTlRfVkVDMlxuICAgICAgICBjYXNlIDM1NjcyOiAvLyBCT09MX1ZFQzNcbiAgICAgICAgY2FzZSAzNTY2ODpcbiAgICAgICAgICAgIHJldHVybiBnbC51bmlmb3JtM2l2KGxvY2F0aW9uLCB2YWx1ZSk7IC8vIElOVF9WRUMzXG4gICAgICAgIGNhc2UgMzU2NzM6IC8vIEJPT0xfVkVDNFxuICAgICAgICBjYXNlIDM1NjY5OlxuICAgICAgICAgICAgcmV0dXJuIGdsLnVuaWZvcm00aXYobG9jYXRpb24sIHZhbHVlKTsgLy8gSU5UX1ZFQzRcbiAgICAgICAgY2FzZSAzNTY3NDpcbiAgICAgICAgICAgIHJldHVybiBnbC51bmlmb3JtTWF0cml4MmZ2KGxvY2F0aW9uLCBmYWxzZSwgdmFsdWUpOyAvLyBGTE9BVF9NQVQyXG4gICAgICAgIGNhc2UgMzU2NzU6XG4gICAgICAgICAgICByZXR1cm4gZ2wudW5pZm9ybU1hdHJpeDNmdihsb2NhdGlvbiwgZmFsc2UsIHZhbHVlKTsgLy8gRkxPQVRfTUFUM1xuICAgICAgICBjYXNlIDM1Njc2OlxuICAgICAgICAgICAgcmV0dXJuIGdsLnVuaWZvcm1NYXRyaXg0ZnYobG9jYXRpb24sIGZhbHNlLCB2YWx1ZSk7IC8vIEZMT0FUX01BVDRcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGFkZExpbmVOdW1iZXJzKHN0cmluZykge1xuICAgIGxldCBsaW5lcyA9IHN0cmluZy5zcGxpdCgnXFxuJyk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaW5lcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBsaW5lc1tpXSA9IGkgKyAxICsgJzogJyArIGxpbmVzW2ldO1xuICAgIH1cbiAgICByZXR1cm4gbGluZXMuam9pbignXFxuJyk7XG59XG5cbmZ1bmN0aW9uIGZsYXR0ZW4oYSkge1xuICAgIGNvbnN0IGFycmF5TGVuID0gYS5sZW5ndGg7XG4gICAgY29uc3QgdmFsdWVMZW4gPSBhWzBdLmxlbmd0aDtcbiAgICBpZiAodmFsdWVMZW4gPT09IHVuZGVmaW5lZCkgcmV0dXJuIGE7XG4gICAgY29uc3QgbGVuZ3RoID0gYXJyYXlMZW4gKiB2YWx1ZUxlbjtcbiAgICBsZXQgdmFsdWUgPSBhcnJheUNhY2hlRjMyW2xlbmd0aF07XG4gICAgaWYgKCF2YWx1ZSkgYXJyYXlDYWNoZUYzMltsZW5ndGhdID0gdmFsdWUgPSBuZXcgRmxvYXQzMkFycmF5KGxlbmd0aCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnJheUxlbjsgaSsrKSB2YWx1ZS5zZXQoYVtpXSwgaSAqIHZhbHVlTGVuKTtcbiAgICByZXR1cm4gdmFsdWU7XG59XG5cbmZ1bmN0aW9uIGFycmF5c0VxdWFsKGEsIGIpIHtcbiAgICBpZiAoYS5sZW5ndGggIT09IGIubGVuZ3RoKSByZXR1cm4gZmFsc2U7XG4gICAgZm9yIChsZXQgaSA9IDAsIGwgPSBhLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICBpZiAoYVtpXSAhPT0gYltpXSkgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gc2V0QXJyYXkoYSwgYikge1xuICAgIGZvciAobGV0IGkgPSAwLCBsID0gYS5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgYVtpXSA9IGJbaV07XG4gICAgfVxufVxuXG5sZXQgd2FybkNvdW50ID0gMDtcbmZ1bmN0aW9uIHdhcm4obWVzc2FnZSkge1xuICAgIGlmICh3YXJuQ291bnQgPiAxMDApIHJldHVybjtcbiAgICBjb25zb2xlLndhcm4obWVzc2FnZSk7XG4gICAgd2FybkNvdW50Kys7XG4gICAgaWYgKHdhcm5Db3VudCA+IDEwMCkgY29uc29sZS53YXJuKCdNb3JlIHRoYW4gMTAwIHByb2dyYW0gd2FybmluZ3MgLSBzdG9wcGluZyBsb2dzLicpO1xufVxuIiwiaW1wb3J0IHsgR2VvbWV0cnkgfSBmcm9tICcuLi9jb3JlL0dlb21ldHJ5LmpzJztcblxuZXhwb3J0IGNsYXNzIFBsYW5lIGV4dGVuZHMgR2VvbWV0cnkge1xuICAgIGNvbnN0cnVjdG9yKGdsLCB7IHdpZHRoID0gMSwgaGVpZ2h0ID0gMSwgd2lkdGhTZWdtZW50cyA9IDEsIGhlaWdodFNlZ21lbnRzID0gMSwgYXR0cmlidXRlcyA9IHt9IH0gPSB7fSkge1xuICAgICAgICBjb25zdCB3U2VncyA9IHdpZHRoU2VnbWVudHM7XG4gICAgICAgIGNvbnN0IGhTZWdzID0gaGVpZ2h0U2VnbWVudHM7XG5cbiAgICAgICAgLy8gRGV0ZXJtaW5lIGxlbmd0aCBvZiBhcnJheXNcbiAgICAgICAgY29uc3QgbnVtID0gKHdTZWdzICsgMSkgKiAoaFNlZ3MgKyAxKTtcbiAgICAgICAgY29uc3QgbnVtSW5kaWNlcyA9IHdTZWdzICogaFNlZ3MgKiA2O1xuXG4gICAgICAgIC8vIEdlbmVyYXRlIGVtcHR5IGFycmF5cyBvbmNlXG4gICAgICAgIGNvbnN0IHBvc2l0aW9uID0gbmV3IEZsb2F0MzJBcnJheShudW0gKiAzKTtcbiAgICAgICAgY29uc3Qgbm9ybWFsID0gbmV3IEZsb2F0MzJBcnJheShudW0gKiAzKTtcbiAgICAgICAgY29uc3QgdXYgPSBuZXcgRmxvYXQzMkFycmF5KG51bSAqIDIpO1xuICAgICAgICBjb25zdCBpbmRleCA9IG51bUluZGljZXMgPiA2NTUzNiA/IG5ldyBVaW50MzJBcnJheShudW1JbmRpY2VzKSA6IG5ldyBVaW50MTZBcnJheShudW1JbmRpY2VzKTtcblxuICAgICAgICBQbGFuZS5idWlsZFBsYW5lKHBvc2l0aW9uLCBub3JtYWwsIHV2LCBpbmRleCwgd2lkdGgsIGhlaWdodCwgMCwgd1NlZ3MsIGhTZWdzKTtcblxuICAgICAgICBPYmplY3QuYXNzaWduKGF0dHJpYnV0ZXMsIHtcbiAgICAgICAgICAgIHBvc2l0aW9uOiB7IHNpemU6IDMsIGRhdGE6IHBvc2l0aW9uIH0sXG4gICAgICAgICAgICBub3JtYWw6IHsgc2l6ZTogMywgZGF0YTogbm9ybWFsIH0sXG4gICAgICAgICAgICB1djogeyBzaXplOiAyLCBkYXRhOiB1diB9LFxuICAgICAgICAgICAgaW5kZXg6IHsgZGF0YTogaW5kZXggfSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgc3VwZXIoZ2wsIGF0dHJpYnV0ZXMpO1xuICAgIH1cblxuICAgIHN0YXRpYyBidWlsZFBsYW5lKHBvc2l0aW9uLCBub3JtYWwsIHV2LCBpbmRleCwgd2lkdGgsIGhlaWdodCwgZGVwdGgsIHdTZWdzLCBoU2VncywgdSA9IDAsIHYgPSAxLCB3ID0gMiwgdURpciA9IDEsIHZEaXIgPSAtMSwgaSA9IDAsIGlpID0gMCkge1xuICAgICAgICBjb25zdCBpbyA9IGk7XG4gICAgICAgIGNvbnN0IHNlZ1cgPSB3aWR0aCAvIHdTZWdzO1xuICAgICAgICBjb25zdCBzZWdIID0gaGVpZ2h0IC8gaFNlZ3M7XG5cbiAgICAgICAgZm9yIChsZXQgaXkgPSAwOyBpeSA8PSBoU2VnczsgaXkrKykge1xuICAgICAgICAgICAgbGV0IHkgPSBpeSAqIHNlZ0ggLSBoZWlnaHQgLyAyO1xuICAgICAgICAgICAgZm9yIChsZXQgaXggPSAwOyBpeCA8PSB3U2VnczsgaXgrKywgaSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IHggPSBpeCAqIHNlZ1cgLSB3aWR0aCAvIDI7XG5cbiAgICAgICAgICAgICAgICBwb3NpdGlvbltpICogMyArIHVdID0geCAqIHVEaXI7XG4gICAgICAgICAgICAgICAgcG9zaXRpb25baSAqIDMgKyB2XSA9IHkgKiB2RGlyO1xuICAgICAgICAgICAgICAgIHBvc2l0aW9uW2kgKiAzICsgd10gPSBkZXB0aCAvIDI7XG5cbiAgICAgICAgICAgICAgICBub3JtYWxbaSAqIDMgKyB1XSA9IDA7XG4gICAgICAgICAgICAgICAgbm9ybWFsW2kgKiAzICsgdl0gPSAwO1xuICAgICAgICAgICAgICAgIG5vcm1hbFtpICogMyArIHddID0gZGVwdGggPj0gMCA/IDEgOiAtMTtcblxuICAgICAgICAgICAgICAgIHV2W2kgKiAyXSA9IGl4IC8gd1NlZ3M7XG4gICAgICAgICAgICAgICAgdXZbaSAqIDIgKyAxXSA9IDEgLSBpeSAvIGhTZWdzO1xuXG4gICAgICAgICAgICAgICAgaWYgKGl5ID09PSBoU2VncyB8fCBpeCA9PT0gd1NlZ3MpIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGxldCBhID0gaW8gKyBpeCArIGl5ICogKHdTZWdzICsgMSk7XG4gICAgICAgICAgICAgICAgbGV0IGIgPSBpbyArIGl4ICsgKGl5ICsgMSkgKiAod1NlZ3MgKyAxKTtcbiAgICAgICAgICAgICAgICBsZXQgYyA9IGlvICsgaXggKyAoaXkgKyAxKSAqICh3U2VncyArIDEpICsgMTtcbiAgICAgICAgICAgICAgICBsZXQgZCA9IGlvICsgaXggKyBpeSAqICh3U2VncyArIDEpICsgMTtcblxuICAgICAgICAgICAgICAgIGluZGV4W2lpICogNl0gPSBhO1xuICAgICAgICAgICAgICAgIGluZGV4W2lpICogNiArIDFdID0gYjtcbiAgICAgICAgICAgICAgICBpbmRleFtpaSAqIDYgKyAyXSA9IGQ7XG4gICAgICAgICAgICAgICAgaW5kZXhbaWkgKiA2ICsgM10gPSBiO1xuICAgICAgICAgICAgICAgIGluZGV4W2lpICogNiArIDRdID0gYztcbiAgICAgICAgICAgICAgICBpbmRleFtpaSAqIDYgKyA1XSA9IGQ7XG4gICAgICAgICAgICAgICAgaWkrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCAqIGFzIE1hdDNGdW5jIGZyb20gJy4vZnVuY3Rpb25zL01hdDNGdW5jLmpzJztcblxuZXhwb3J0IGNsYXNzIE1hdDMgZXh0ZW5kcyBBcnJheSB7XG4gICAgY29uc3RydWN0b3IobTAwID0gMSwgbTAxID0gMCwgbTAyID0gMCwgbTEwID0gMCwgbTExID0gMSwgbTEyID0gMCwgbTIwID0gMCwgbTIxID0gMCwgbTIyID0gMSkge1xuICAgICAgICBzdXBlcihtMDAsIG0wMSwgbTAyLCBtMTAsIG0xMSwgbTEyLCBtMjAsIG0yMSwgbTIyKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgc2V0KG0wMCwgbTAxLCBtMDIsIG0xMCwgbTExLCBtMTIsIG0yMCwgbTIxLCBtMjIpIHtcbiAgICAgICAgaWYgKG0wMC5sZW5ndGgpIHJldHVybiB0aGlzLmNvcHkobTAwKTtcbiAgICAgICAgTWF0M0Z1bmMuc2V0KHRoaXMsIG0wMCwgbTAxLCBtMDIsIG0xMCwgbTExLCBtMTIsIG0yMCwgbTIxLCBtMjIpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICB0cmFuc2xhdGUodiwgbSA9IHRoaXMpIHtcbiAgICAgICAgTWF0M0Z1bmMudHJhbnNsYXRlKHRoaXMsIG0sIHYpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICByb3RhdGUodiwgbSA9IHRoaXMpIHtcbiAgICAgICAgTWF0M0Z1bmMucm90YXRlKHRoaXMsIG0sIHYpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBzY2FsZSh2LCBtID0gdGhpcykge1xuICAgICAgICBNYXQzRnVuYy5zY2FsZSh0aGlzLCBtLCB2KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgbXVsdGlwbHkobWEsIG1iKSB7XG4gICAgICAgIGlmIChtYikge1xuICAgICAgICAgICAgTWF0M0Z1bmMubXVsdGlwbHkodGhpcywgbWEsIG1iKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIE1hdDNGdW5jLm11bHRpcGx5KHRoaXMsIHRoaXMsIG1hKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBpZGVudGl0eSgpIHtcbiAgICAgICAgTWF0M0Z1bmMuaWRlbnRpdHkodGhpcyk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGNvcHkobSkge1xuICAgICAgICBNYXQzRnVuYy5jb3B5KHRoaXMsIG0pO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBmcm9tTWF0cml4NChtKSB7XG4gICAgICAgIE1hdDNGdW5jLmZyb21NYXQ0KHRoaXMsIG0pO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBmcm9tUXVhdGVybmlvbihxKSB7XG4gICAgICAgIE1hdDNGdW5jLmZyb21RdWF0KHRoaXMsIHEpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBmcm9tQmFzaXModmVjM2EsIHZlYzNiLCB2ZWMzYykge1xuICAgICAgICB0aGlzLnNldCh2ZWMzYVswXSwgdmVjM2FbMV0sIHZlYzNhWzJdLCB2ZWMzYlswXSwgdmVjM2JbMV0sIHZlYzNiWzJdLCB2ZWMzY1swXSwgdmVjM2NbMV0sIHZlYzNjWzJdKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgaW52ZXJzZShtID0gdGhpcykge1xuICAgICAgICBNYXQzRnVuYy5pbnZlcnQodGhpcywgbSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGdldE5vcm1hbE1hdHJpeChtKSB7XG4gICAgICAgIE1hdDNGdW5jLm5vcm1hbEZyb21NYXQ0KHRoaXMsIG0pO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG59XG4iLCJjb25zdCBFUFNJTE9OID0gMC4wMDAwMDE7XG5cbi8qKlxuICogQ29waWVzIHRoZSB1cHBlci1sZWZ0IDN4MyB2YWx1ZXMgaW50byB0aGUgZ2l2ZW4gbWF0My5cbiAqXG4gKiBAcGFyYW0ge21hdDN9IG91dCB0aGUgcmVjZWl2aW5nIDN4MyBtYXRyaXhcbiAqIEBwYXJhbSB7bWF0NH0gYSAgIHRoZSBzb3VyY2UgNHg0IG1hdHJpeFxuICogQHJldHVybnMge21hdDN9IG91dFxuICovXG5leHBvcnQgZnVuY3Rpb24gZnJvbU1hdDQob3V0LCBhKSB7XG4gICAgb3V0WzBdID0gYVswXTtcbiAgICBvdXRbMV0gPSBhWzFdO1xuICAgIG91dFsyXSA9IGFbMl07XG4gICAgb3V0WzNdID0gYVs0XTtcbiAgICBvdXRbNF0gPSBhWzVdO1xuICAgIG91dFs1XSA9IGFbNl07XG4gICAgb3V0WzZdID0gYVs4XTtcbiAgICBvdXRbN10gPSBhWzldO1xuICAgIG91dFs4XSA9IGFbMTBdO1xuICAgIHJldHVybiBvdXQ7XG59XG5cbi8qKlxuICogQ2FsY3VsYXRlcyBhIDN4MyBtYXRyaXggZnJvbSB0aGUgZ2l2ZW4gcXVhdGVybmlvblxuICpcbiAqIEBwYXJhbSB7bWF0M30gb3V0IG1hdDMgcmVjZWl2aW5nIG9wZXJhdGlvbiByZXN1bHRcbiAqIEBwYXJhbSB7cXVhdH0gcSBRdWF0ZXJuaW9uIHRvIGNyZWF0ZSBtYXRyaXggZnJvbVxuICpcbiAqIEByZXR1cm5zIHttYXQzfSBvdXRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZyb21RdWF0KG91dCwgcSkge1xuICAgIGxldCB4ID0gcVswXSxcbiAgICAgICAgeSA9IHFbMV0sXG4gICAgICAgIHogPSBxWzJdLFxuICAgICAgICB3ID0gcVszXTtcbiAgICBsZXQgeDIgPSB4ICsgeDtcbiAgICBsZXQgeTIgPSB5ICsgeTtcbiAgICBsZXQgejIgPSB6ICsgejtcblxuICAgIGxldCB4eCA9IHggKiB4MjtcbiAgICBsZXQgeXggPSB5ICogeDI7XG4gICAgbGV0IHl5ID0geSAqIHkyO1xuICAgIGxldCB6eCA9IHogKiB4MjtcbiAgICBsZXQgenkgPSB6ICogeTI7XG4gICAgbGV0IHp6ID0geiAqIHoyO1xuICAgIGxldCB3eCA9IHcgKiB4MjtcbiAgICBsZXQgd3kgPSB3ICogeTI7XG4gICAgbGV0IHd6ID0gdyAqIHoyO1xuXG4gICAgb3V0WzBdID0gMSAtIHl5IC0geno7XG4gICAgb3V0WzNdID0geXggLSB3ejtcbiAgICBvdXRbNl0gPSB6eCArIHd5O1xuXG4gICAgb3V0WzFdID0geXggKyB3ejtcbiAgICBvdXRbNF0gPSAxIC0geHggLSB6ejtcbiAgICBvdXRbN10gPSB6eSAtIHd4O1xuXG4gICAgb3V0WzJdID0genggLSB3eTtcbiAgICBvdXRbNV0gPSB6eSArIHd4O1xuICAgIG91dFs4XSA9IDEgLSB4eCAtIHl5O1xuXG4gICAgcmV0dXJuIG91dDtcbn1cblxuLyoqXG4gKiBDb3B5IHRoZSB2YWx1ZXMgZnJvbSBvbmUgbWF0MyB0byBhbm90aGVyXG4gKlxuICogQHBhcmFtIHttYXQzfSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7bWF0M30gYSB0aGUgc291cmNlIG1hdHJpeFxuICogQHJldHVybnMge21hdDN9IG91dFxuICovXG5leHBvcnQgZnVuY3Rpb24gY29weShvdXQsIGEpIHtcbiAgICBvdXRbMF0gPSBhWzBdO1xuICAgIG91dFsxXSA9IGFbMV07XG4gICAgb3V0WzJdID0gYVsyXTtcbiAgICBvdXRbM10gPSBhWzNdO1xuICAgIG91dFs0XSA9IGFbNF07XG4gICAgb3V0WzVdID0gYVs1XTtcbiAgICBvdXRbNl0gPSBhWzZdO1xuICAgIG91dFs3XSA9IGFbN107XG4gICAgb3V0WzhdID0gYVs4XTtcbiAgICByZXR1cm4gb3V0O1xufVxuXG4vKipcbiAqIFNldCB0aGUgY29tcG9uZW50cyBvZiBhIG1hdDMgdG8gdGhlIGdpdmVuIHZhbHVlc1xuICpcbiAqIEBwYXJhbSB7bWF0M30gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcmV0dXJucyB7bWF0M30gb3V0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXQob3V0LCBtMDAsIG0wMSwgbTAyLCBtMTAsIG0xMSwgbTEyLCBtMjAsIG0yMSwgbTIyKSB7XG4gICAgb3V0WzBdID0gbTAwO1xuICAgIG91dFsxXSA9IG0wMTtcbiAgICBvdXRbMl0gPSBtMDI7XG4gICAgb3V0WzNdID0gbTEwO1xuICAgIG91dFs0XSA9IG0xMTtcbiAgICBvdXRbNV0gPSBtMTI7XG4gICAgb3V0WzZdID0gbTIwO1xuICAgIG91dFs3XSA9IG0yMTtcbiAgICBvdXRbOF0gPSBtMjI7XG4gICAgcmV0dXJuIG91dDtcbn1cblxuLyoqXG4gKiBTZXQgYSBtYXQzIHRvIHRoZSBpZGVudGl0eSBtYXRyaXhcbiAqXG4gKiBAcGFyYW0ge21hdDN9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHJldHVybnMge21hdDN9IG91dFxuICovXG5leHBvcnQgZnVuY3Rpb24gaWRlbnRpdHkob3V0KSB7XG4gICAgb3V0WzBdID0gMTtcbiAgICBvdXRbMV0gPSAwO1xuICAgIG91dFsyXSA9IDA7XG4gICAgb3V0WzNdID0gMDtcbiAgICBvdXRbNF0gPSAxO1xuICAgIG91dFs1XSA9IDA7XG4gICAgb3V0WzZdID0gMDtcbiAgICBvdXRbN10gPSAwO1xuICAgIG91dFs4XSA9IDE7XG4gICAgcmV0dXJuIG91dDtcbn1cblxuLyoqXG4gKiBUcmFuc3Bvc2UgdGhlIHZhbHVlcyBvZiBhIG1hdDNcbiAqXG4gKiBAcGFyYW0ge21hdDN9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHBhcmFtIHttYXQzfSBhIHRoZSBzb3VyY2UgbWF0cml4XG4gKiBAcmV0dXJucyB7bWF0M30gb3V0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0cmFuc3Bvc2Uob3V0LCBhKSB7XG4gICAgLy8gSWYgd2UgYXJlIHRyYW5zcG9zaW5nIG91cnNlbHZlcyB3ZSBjYW4gc2tpcCBhIGZldyBzdGVwcyBidXQgaGF2ZSB0byBjYWNoZSBzb21lIHZhbHVlc1xuICAgIGlmIChvdXQgPT09IGEpIHtcbiAgICAgICAgbGV0IGEwMSA9IGFbMV0sXG4gICAgICAgICAgICBhMDIgPSBhWzJdLFxuICAgICAgICAgICAgYTEyID0gYVs1XTtcbiAgICAgICAgb3V0WzFdID0gYVszXTtcbiAgICAgICAgb3V0WzJdID0gYVs2XTtcbiAgICAgICAgb3V0WzNdID0gYTAxO1xuICAgICAgICBvdXRbNV0gPSBhWzddO1xuICAgICAgICBvdXRbNl0gPSBhMDI7XG4gICAgICAgIG91dFs3XSA9IGExMjtcbiAgICB9IGVsc2Uge1xuICAgICAgICBvdXRbMF0gPSBhWzBdO1xuICAgICAgICBvdXRbMV0gPSBhWzNdO1xuICAgICAgICBvdXRbMl0gPSBhWzZdO1xuICAgICAgICBvdXRbM10gPSBhWzFdO1xuICAgICAgICBvdXRbNF0gPSBhWzRdO1xuICAgICAgICBvdXRbNV0gPSBhWzddO1xuICAgICAgICBvdXRbNl0gPSBhWzJdO1xuICAgICAgICBvdXRbN10gPSBhWzVdO1xuICAgICAgICBvdXRbOF0gPSBhWzhdO1xuICAgIH1cblxuICAgIHJldHVybiBvdXQ7XG59XG5cbi8qKlxuICogSW52ZXJ0cyBhIG1hdDNcbiAqXG4gKiBAcGFyYW0ge21hdDN9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHBhcmFtIHttYXQzfSBhIHRoZSBzb3VyY2UgbWF0cml4XG4gKiBAcmV0dXJucyB7bWF0M30gb3V0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpbnZlcnQob3V0LCBhKSB7XG4gICAgbGV0IGEwMCA9IGFbMF0sXG4gICAgICAgIGEwMSA9IGFbMV0sXG4gICAgICAgIGEwMiA9IGFbMl07XG4gICAgbGV0IGExMCA9IGFbM10sXG4gICAgICAgIGExMSA9IGFbNF0sXG4gICAgICAgIGExMiA9IGFbNV07XG4gICAgbGV0IGEyMCA9IGFbNl0sXG4gICAgICAgIGEyMSA9IGFbN10sXG4gICAgICAgIGEyMiA9IGFbOF07XG5cbiAgICBsZXQgYjAxID0gYTIyICogYTExIC0gYTEyICogYTIxO1xuICAgIGxldCBiMTEgPSAtYTIyICogYTEwICsgYTEyICogYTIwO1xuICAgIGxldCBiMjEgPSBhMjEgKiBhMTAgLSBhMTEgKiBhMjA7XG5cbiAgICAvLyBDYWxjdWxhdGUgdGhlIGRldGVybWluYW50XG4gICAgbGV0IGRldCA9IGEwMCAqIGIwMSArIGEwMSAqIGIxMSArIGEwMiAqIGIyMTtcblxuICAgIGlmICghZGV0KSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBkZXQgPSAxLjAgLyBkZXQ7XG5cbiAgICBvdXRbMF0gPSBiMDEgKiBkZXQ7XG4gICAgb3V0WzFdID0gKC1hMjIgKiBhMDEgKyBhMDIgKiBhMjEpICogZGV0O1xuICAgIG91dFsyXSA9IChhMTIgKiBhMDEgLSBhMDIgKiBhMTEpICogZGV0O1xuICAgIG91dFszXSA9IGIxMSAqIGRldDtcbiAgICBvdXRbNF0gPSAoYTIyICogYTAwIC0gYTAyICogYTIwKSAqIGRldDtcbiAgICBvdXRbNV0gPSAoLWExMiAqIGEwMCArIGEwMiAqIGExMCkgKiBkZXQ7XG4gICAgb3V0WzZdID0gYjIxICogZGV0O1xuICAgIG91dFs3XSA9ICgtYTIxICogYTAwICsgYTAxICogYTIwKSAqIGRldDtcbiAgICBvdXRbOF0gPSAoYTExICogYTAwIC0gYTAxICogYTEwKSAqIGRldDtcbiAgICByZXR1cm4gb3V0O1xufVxuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGRldGVybWluYW50IG9mIGEgbWF0M1xuICpcbiAqIEBwYXJhbSB7bWF0M30gYSB0aGUgc291cmNlIG1hdHJpeFxuICogQHJldHVybnMge051bWJlcn0gZGV0ZXJtaW5hbnQgb2YgYVxuICovXG5leHBvcnQgZnVuY3Rpb24gZGV0ZXJtaW5hbnQoYSkge1xuICAgIGxldCBhMDAgPSBhWzBdLFxuICAgICAgICBhMDEgPSBhWzFdLFxuICAgICAgICBhMDIgPSBhWzJdO1xuICAgIGxldCBhMTAgPSBhWzNdLFxuICAgICAgICBhMTEgPSBhWzRdLFxuICAgICAgICBhMTIgPSBhWzVdO1xuICAgIGxldCBhMjAgPSBhWzZdLFxuICAgICAgICBhMjEgPSBhWzddLFxuICAgICAgICBhMjIgPSBhWzhdO1xuXG4gICAgcmV0dXJuIGEwMCAqIChhMjIgKiBhMTEgLSBhMTIgKiBhMjEpICsgYTAxICogKC1hMjIgKiBhMTAgKyBhMTIgKiBhMjApICsgYTAyICogKGEyMSAqIGExMCAtIGExMSAqIGEyMCk7XG59XG5cbi8qKlxuICogTXVsdGlwbGllcyB0d28gbWF0MydzXG4gKlxuICogQHBhcmFtIHttYXQzfSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7bWF0M30gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHttYXQzfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge21hdDN9IG91dFxuICovXG5leHBvcnQgZnVuY3Rpb24gbXVsdGlwbHkob3V0LCBhLCBiKSB7XG4gICAgbGV0IGEwMCA9IGFbMF0sXG4gICAgICAgIGEwMSA9IGFbMV0sXG4gICAgICAgIGEwMiA9IGFbMl07XG4gICAgbGV0IGExMCA9IGFbM10sXG4gICAgICAgIGExMSA9IGFbNF0sXG4gICAgICAgIGExMiA9IGFbNV07XG4gICAgbGV0IGEyMCA9IGFbNl0sXG4gICAgICAgIGEyMSA9IGFbN10sXG4gICAgICAgIGEyMiA9IGFbOF07XG5cbiAgICBsZXQgYjAwID0gYlswXSxcbiAgICAgICAgYjAxID0gYlsxXSxcbiAgICAgICAgYjAyID0gYlsyXTtcbiAgICBsZXQgYjEwID0gYlszXSxcbiAgICAgICAgYjExID0gYls0XSxcbiAgICAgICAgYjEyID0gYls1XTtcbiAgICBsZXQgYjIwID0gYls2XSxcbiAgICAgICAgYjIxID0gYls3XSxcbiAgICAgICAgYjIyID0gYls4XTtcblxuICAgIG91dFswXSA9IGIwMCAqIGEwMCArIGIwMSAqIGExMCArIGIwMiAqIGEyMDtcbiAgICBvdXRbMV0gPSBiMDAgKiBhMDEgKyBiMDEgKiBhMTEgKyBiMDIgKiBhMjE7XG4gICAgb3V0WzJdID0gYjAwICogYTAyICsgYjAxICogYTEyICsgYjAyICogYTIyO1xuXG4gICAgb3V0WzNdID0gYjEwICogYTAwICsgYjExICogYTEwICsgYjEyICogYTIwO1xuICAgIG91dFs0XSA9IGIxMCAqIGEwMSArIGIxMSAqIGExMSArIGIxMiAqIGEyMTtcbiAgICBvdXRbNV0gPSBiMTAgKiBhMDIgKyBiMTEgKiBhMTIgKyBiMTIgKiBhMjI7XG5cbiAgICBvdXRbNl0gPSBiMjAgKiBhMDAgKyBiMjEgKiBhMTAgKyBiMjIgKiBhMjA7XG4gICAgb3V0WzddID0gYjIwICogYTAxICsgYjIxICogYTExICsgYjIyICogYTIxO1xuICAgIG91dFs4XSA9IGIyMCAqIGEwMiArIGIyMSAqIGExMiArIGIyMiAqIGEyMjtcbiAgICByZXR1cm4gb3V0O1xufVxuXG4vKipcbiAqIFRyYW5zbGF0ZSBhIG1hdDMgYnkgdGhlIGdpdmVuIHZlY3RvclxuICpcbiAqIEBwYXJhbSB7bWF0M30gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge21hdDN9IGEgdGhlIG1hdHJpeCB0byB0cmFuc2xhdGVcbiAqIEBwYXJhbSB7dmVjMn0gdiB2ZWN0b3IgdG8gdHJhbnNsYXRlIGJ5XG4gKiBAcmV0dXJucyB7bWF0M30gb3V0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0cmFuc2xhdGUob3V0LCBhLCB2KSB7XG4gICAgbGV0IGEwMCA9IGFbMF0sXG4gICAgICAgIGEwMSA9IGFbMV0sXG4gICAgICAgIGEwMiA9IGFbMl0sXG4gICAgICAgIGExMCA9IGFbM10sXG4gICAgICAgIGExMSA9IGFbNF0sXG4gICAgICAgIGExMiA9IGFbNV0sXG4gICAgICAgIGEyMCA9IGFbNl0sXG4gICAgICAgIGEyMSA9IGFbN10sXG4gICAgICAgIGEyMiA9IGFbOF0sXG4gICAgICAgIHggPSB2WzBdLFxuICAgICAgICB5ID0gdlsxXTtcblxuICAgIG91dFswXSA9IGEwMDtcbiAgICBvdXRbMV0gPSBhMDE7XG4gICAgb3V0WzJdID0gYTAyO1xuXG4gICAgb3V0WzNdID0gYTEwO1xuICAgIG91dFs0XSA9IGExMTtcbiAgICBvdXRbNV0gPSBhMTI7XG5cbiAgICBvdXRbNl0gPSB4ICogYTAwICsgeSAqIGExMCArIGEyMDtcbiAgICBvdXRbN10gPSB4ICogYTAxICsgeSAqIGExMSArIGEyMTtcbiAgICBvdXRbOF0gPSB4ICogYTAyICsgeSAqIGExMiArIGEyMjtcbiAgICByZXR1cm4gb3V0O1xufVxuXG4vKipcbiAqIFJvdGF0ZXMgYSBtYXQzIGJ5IHRoZSBnaXZlbiBhbmdsZVxuICpcbiAqIEBwYXJhbSB7bWF0M30gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge21hdDN9IGEgdGhlIG1hdHJpeCB0byByb3RhdGVcbiAqIEBwYXJhbSB7TnVtYmVyfSByYWQgdGhlIGFuZ2xlIHRvIHJvdGF0ZSB0aGUgbWF0cml4IGJ5XG4gKiBAcmV0dXJucyB7bWF0M30gb3V0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByb3RhdGUob3V0LCBhLCByYWQpIHtcbiAgICBsZXQgYTAwID0gYVswXSxcbiAgICAgICAgYTAxID0gYVsxXSxcbiAgICAgICAgYTAyID0gYVsyXSxcbiAgICAgICAgYTEwID0gYVszXSxcbiAgICAgICAgYTExID0gYVs0XSxcbiAgICAgICAgYTEyID0gYVs1XSxcbiAgICAgICAgYTIwID0gYVs2XSxcbiAgICAgICAgYTIxID0gYVs3XSxcbiAgICAgICAgYTIyID0gYVs4XSxcbiAgICAgICAgcyA9IE1hdGguc2luKHJhZCksXG4gICAgICAgIGMgPSBNYXRoLmNvcyhyYWQpO1xuXG4gICAgb3V0WzBdID0gYyAqIGEwMCArIHMgKiBhMTA7XG4gICAgb3V0WzFdID0gYyAqIGEwMSArIHMgKiBhMTE7XG4gICAgb3V0WzJdID0gYyAqIGEwMiArIHMgKiBhMTI7XG5cbiAgICBvdXRbM10gPSBjICogYTEwIC0gcyAqIGEwMDtcbiAgICBvdXRbNF0gPSBjICogYTExIC0gcyAqIGEwMTtcbiAgICBvdXRbNV0gPSBjICogYTEyIC0gcyAqIGEwMjtcblxuICAgIG91dFs2XSA9IGEyMDtcbiAgICBvdXRbN10gPSBhMjE7XG4gICAgb3V0WzhdID0gYTIyO1xuICAgIHJldHVybiBvdXQ7XG59XG5cbi8qKlxuICogU2NhbGVzIHRoZSBtYXQzIGJ5IHRoZSBkaW1lbnNpb25zIGluIHRoZSBnaXZlbiB2ZWMyXG4gKlxuICogQHBhcmFtIHttYXQzfSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7bWF0M30gYSB0aGUgbWF0cml4IHRvIHJvdGF0ZVxuICogQHBhcmFtIHt2ZWMyfSB2IHRoZSB2ZWMyIHRvIHNjYWxlIHRoZSBtYXRyaXggYnlcbiAqIEByZXR1cm5zIHttYXQzfSBvdXRcbiAqKi9cbmV4cG9ydCBmdW5jdGlvbiBzY2FsZShvdXQsIGEsIHYpIHtcbiAgICBsZXQgeCA9IHZbMF0sXG4gICAgICAgIHkgPSB2WzFdO1xuXG4gICAgb3V0WzBdID0geCAqIGFbMF07XG4gICAgb3V0WzFdID0geCAqIGFbMV07XG4gICAgb3V0WzJdID0geCAqIGFbMl07XG5cbiAgICBvdXRbM10gPSB5ICogYVszXTtcbiAgICBvdXRbNF0gPSB5ICogYVs0XTtcbiAgICBvdXRbNV0gPSB5ICogYVs1XTtcblxuICAgIG91dFs2XSA9IGFbNl07XG4gICAgb3V0WzddID0gYVs3XTtcbiAgICBvdXRbOF0gPSBhWzhdO1xuICAgIHJldHVybiBvdXQ7XG59XG5cbi8qKlxuICogQ2FsY3VsYXRlcyBhIDN4MyBub3JtYWwgbWF0cml4ICh0cmFuc3Bvc2UgaW52ZXJzZSkgZnJvbSB0aGUgNHg0IG1hdHJpeFxuICpcbiAqIEBwYXJhbSB7bWF0M30gb3V0IG1hdDMgcmVjZWl2aW5nIG9wZXJhdGlvbiByZXN1bHRcbiAqIEBwYXJhbSB7bWF0NH0gYSBNYXQ0IHRvIGRlcml2ZSB0aGUgbm9ybWFsIG1hdHJpeCBmcm9tXG4gKlxuICogQHJldHVybnMge21hdDN9IG91dFxuICovXG5leHBvcnQgZnVuY3Rpb24gbm9ybWFsRnJvbU1hdDQob3V0LCBhKSB7XG4gICAgbGV0IGEwMCA9IGFbMF0sXG4gICAgICAgIGEwMSA9IGFbMV0sXG4gICAgICAgIGEwMiA9IGFbMl0sXG4gICAgICAgIGEwMyA9IGFbM107XG4gICAgbGV0IGExMCA9IGFbNF0sXG4gICAgICAgIGExMSA9IGFbNV0sXG4gICAgICAgIGExMiA9IGFbNl0sXG4gICAgICAgIGExMyA9IGFbN107XG4gICAgbGV0IGEyMCA9IGFbOF0sXG4gICAgICAgIGEyMSA9IGFbOV0sXG4gICAgICAgIGEyMiA9IGFbMTBdLFxuICAgICAgICBhMjMgPSBhWzExXTtcbiAgICBsZXQgYTMwID0gYVsxMl0sXG4gICAgICAgIGEzMSA9IGFbMTNdLFxuICAgICAgICBhMzIgPSBhWzE0XSxcbiAgICAgICAgYTMzID0gYVsxNV07XG5cbiAgICBsZXQgYjAwID0gYTAwICogYTExIC0gYTAxICogYTEwO1xuICAgIGxldCBiMDEgPSBhMDAgKiBhMTIgLSBhMDIgKiBhMTA7XG4gICAgbGV0IGIwMiA9IGEwMCAqIGExMyAtIGEwMyAqIGExMDtcbiAgICBsZXQgYjAzID0gYTAxICogYTEyIC0gYTAyICogYTExO1xuICAgIGxldCBiMDQgPSBhMDEgKiBhMTMgLSBhMDMgKiBhMTE7XG4gICAgbGV0IGIwNSA9IGEwMiAqIGExMyAtIGEwMyAqIGExMjtcbiAgICBsZXQgYjA2ID0gYTIwICogYTMxIC0gYTIxICogYTMwO1xuICAgIGxldCBiMDcgPSBhMjAgKiBhMzIgLSBhMjIgKiBhMzA7XG4gICAgbGV0IGIwOCA9IGEyMCAqIGEzMyAtIGEyMyAqIGEzMDtcbiAgICBsZXQgYjA5ID0gYTIxICogYTMyIC0gYTIyICogYTMxO1xuICAgIGxldCBiMTAgPSBhMjEgKiBhMzMgLSBhMjMgKiBhMzE7XG4gICAgbGV0IGIxMSA9IGEyMiAqIGEzMyAtIGEyMyAqIGEzMjtcblxuICAgIC8vIENhbGN1bGF0ZSB0aGUgZGV0ZXJtaW5hbnRcbiAgICBsZXQgZGV0ID0gYjAwICogYjExIC0gYjAxICogYjEwICsgYjAyICogYjA5ICsgYjAzICogYjA4IC0gYjA0ICogYjA3ICsgYjA1ICogYjA2O1xuXG4gICAgaWYgKCFkZXQpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGRldCA9IDEuMCAvIGRldDtcblxuICAgIG91dFswXSA9IChhMTEgKiBiMTEgLSBhMTIgKiBiMTAgKyBhMTMgKiBiMDkpICogZGV0O1xuICAgIG91dFsxXSA9IChhMTIgKiBiMDggLSBhMTAgKiBiMTEgLSBhMTMgKiBiMDcpICogZGV0O1xuICAgIG91dFsyXSA9IChhMTAgKiBiMTAgLSBhMTEgKiBiMDggKyBhMTMgKiBiMDYpICogZGV0O1xuXG4gICAgb3V0WzNdID0gKGEwMiAqIGIxMCAtIGEwMSAqIGIxMSAtIGEwMyAqIGIwOSkgKiBkZXQ7XG4gICAgb3V0WzRdID0gKGEwMCAqIGIxMSAtIGEwMiAqIGIwOCArIGEwMyAqIGIwNykgKiBkZXQ7XG4gICAgb3V0WzVdID0gKGEwMSAqIGIwOCAtIGEwMCAqIGIxMCAtIGEwMyAqIGIwNikgKiBkZXQ7XG5cbiAgICBvdXRbNl0gPSAoYTMxICogYjA1IC0gYTMyICogYjA0ICsgYTMzICogYjAzKSAqIGRldDtcbiAgICBvdXRbN10gPSAoYTMyICogYjAyIC0gYTMwICogYjA1IC0gYTMzICogYjAxKSAqIGRldDtcbiAgICBvdXRbOF0gPSAoYTMwICogYjA0IC0gYTMxICogYjAyICsgYTMzICogYjAwKSAqIGRldDtcblxuICAgIHJldHVybiBvdXQ7XG59XG5cbi8qKlxuICogR2VuZXJhdGVzIGEgMkQgcHJvamVjdGlvbiBtYXRyaXggd2l0aCB0aGUgZ2l2ZW4gYm91bmRzXG4gKlxuICogQHBhcmFtIHttYXQzfSBvdXQgbWF0MyBmcnVzdHVtIG1hdHJpeCB3aWxsIGJlIHdyaXR0ZW4gaW50b1xuICogQHBhcmFtIHtudW1iZXJ9IHdpZHRoIFdpZHRoIG9mIHlvdXIgZ2wgY29udGV4dFxuICogQHBhcmFtIHtudW1iZXJ9IGhlaWdodCBIZWlnaHQgb2YgZ2wgY29udGV4dFxuICogQHJldHVybnMge21hdDN9IG91dFxuICovXG5leHBvcnQgZnVuY3Rpb24gcHJvamVjdGlvbihvdXQsIHdpZHRoLCBoZWlnaHQpIHtcbiAgICBvdXRbMF0gPSAyIC8gd2lkdGg7XG4gICAgb3V0WzFdID0gMDtcbiAgICBvdXRbMl0gPSAwO1xuICAgIG91dFszXSA9IDA7XG4gICAgb3V0WzRdID0gLTIgLyBoZWlnaHQ7XG4gICAgb3V0WzVdID0gMDtcbiAgICBvdXRbNl0gPSAtMTtcbiAgICBvdXRbN10gPSAxO1xuICAgIG91dFs4XSA9IDE7XG4gICAgcmV0dXJuIG91dDtcbn1cblxuLyoqXG4gKiBBZGRzIHR3byBtYXQzJ3NcbiAqXG4gKiBAcGFyYW0ge21hdDN9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHBhcmFtIHttYXQzfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge21hdDN9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7bWF0M30gb3V0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhZGQob3V0LCBhLCBiKSB7XG4gICAgb3V0WzBdID0gYVswXSArIGJbMF07XG4gICAgb3V0WzFdID0gYVsxXSArIGJbMV07XG4gICAgb3V0WzJdID0gYVsyXSArIGJbMl07XG4gICAgb3V0WzNdID0gYVszXSArIGJbM107XG4gICAgb3V0WzRdID0gYVs0XSArIGJbNF07XG4gICAgb3V0WzVdID0gYVs1XSArIGJbNV07XG4gICAgb3V0WzZdID0gYVs2XSArIGJbNl07XG4gICAgb3V0WzddID0gYVs3XSArIGJbN107XG4gICAgb3V0WzhdID0gYVs4XSArIGJbOF07XG4gICAgcmV0dXJuIG91dDtcbn1cblxuLyoqXG4gKiBTdWJ0cmFjdHMgbWF0cml4IGIgZnJvbSBtYXRyaXggYVxuICpcbiAqIEBwYXJhbSB7bWF0M30gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge21hdDN9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7bWF0M30gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHttYXQzfSBvdXRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHN1YnRyYWN0KG91dCwgYSwgYikge1xuICAgIG91dFswXSA9IGFbMF0gLSBiWzBdO1xuICAgIG91dFsxXSA9IGFbMV0gLSBiWzFdO1xuICAgIG91dFsyXSA9IGFbMl0gLSBiWzJdO1xuICAgIG91dFszXSA9IGFbM10gLSBiWzNdO1xuICAgIG91dFs0XSA9IGFbNF0gLSBiWzRdO1xuICAgIG91dFs1XSA9IGFbNV0gLSBiWzVdO1xuICAgIG91dFs2XSA9IGFbNl0gLSBiWzZdO1xuICAgIG91dFs3XSA9IGFbN10gLSBiWzddO1xuICAgIG91dFs4XSA9IGFbOF0gLSBiWzhdO1xuICAgIHJldHVybiBvdXQ7XG59XG5cbi8qKlxuICogTXVsdGlwbHkgZWFjaCBlbGVtZW50IG9mIHRoZSBtYXRyaXggYnkgYSBzY2FsYXIuXG4gKlxuICogQHBhcmFtIHttYXQzfSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7bWF0M30gYSB0aGUgbWF0cml4IHRvIHNjYWxlXG4gKiBAcGFyYW0ge051bWJlcn0gYiBhbW91bnQgdG8gc2NhbGUgdGhlIG1hdHJpeCdzIGVsZW1lbnRzIGJ5XG4gKiBAcmV0dXJucyB7bWF0M30gb3V0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtdWx0aXBseVNjYWxhcihvdXQsIGEsIGIpIHtcbiAgICBvdXRbMF0gPSBhWzBdICogYjtcbiAgICBvdXRbMV0gPSBhWzFdICogYjtcbiAgICBvdXRbMl0gPSBhWzJdICogYjtcbiAgICBvdXRbM10gPSBhWzNdICogYjtcbiAgICBvdXRbNF0gPSBhWzRdICogYjtcbiAgICBvdXRbNV0gPSBhWzVdICogYjtcbiAgICBvdXRbNl0gPSBhWzZdICogYjtcbiAgICBvdXRbN10gPSBhWzddICogYjtcbiAgICBvdXRbOF0gPSBhWzhdICogYjtcbiAgICByZXR1cm4gb3V0O1xufVxuIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5oID0gKCkgPT4gKFwiZmU1NDE1YTY2ZDhmY2JjNGY2MDNcIikiXSwibmFtZXMiOlsiR1NBUCIsIk1lc2giLCJQcm9ncmFtIiwiZnJhZ21lbnQiLCJ2ZXJ0ZXgiLCJjb25zdHJ1Y3RvciIsImVsZW1lbnQiLCJnZW9tZXRyeSIsImdsIiwiaW5kZXgiLCJzY2VuZSIsInNpemVzIiwiZXh0cmEiLCJ4IiwieSIsImNyZWF0ZVRleHR1cmUiLCJjcmVhdGVQcm9ncmFtIiwiY3JlYXRlTWVzaCIsImNyZWF0ZUJvdW5kcyIsImltYWdlIiwidGV4dHVyZSIsIndpbmRvdyIsIlRFWFRVUkVTIiwiZ2V0QXR0cmlidXRlIiwicHJvZ3JhbSIsInVuaWZvcm1zIiwidUFscGhhIiwidmFsdWUiLCJ1U3BlZWQiLCJ1Vmlld3BvcnRTaXplcyIsIndpZHRoIiwiaGVpZ2h0IiwidE1hcCIsIm1lc2giLCJzZXRQYXJlbnQiLCJib3VuZHMiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJ1cGRhdGVTY2FsZSIsInVwZGF0ZVgiLCJ1cGRhdGVZIiwic2hvdyIsImZyb21UbyIsImhpZGUiLCJ0byIsIm9uUmVzaXplIiwic2Nyb2xsIiwiaW5uZXJXaWR0aCIsImlubmVySGVpZ2h0Iiwic2NhbGUiLCJsZWZ0IiwicG9zaXRpb24iLCJtZWRpYSIsIm11bHRpcGxpZXIiLCJkaXJlY3Rpb24iLCJvZmZzZXRZIiwic2NhbGVZIiwidG9wIiwidXBkYXRlIiwic3BlZWQiLCJjdXJyZW50IiwidGFyZ2V0Iiwicm9sbCIsIlBsYW5lIiwiVHJhbnNmb3JtIiwibWFwIiwiTWVkaWEiLCJncm91cCIsImdhbGxlcnlFbGVtZW50IiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwibWVkaWFzRWxlbWVudHMiLCJxdWVyeVNlbGVjdG9yQWxsIiwic2xvdFJvbGwiLCJidXR0b25Sb2xsIiwic3BlZWRBdXRvU2Nyb2xsIiwibGVycCIsInNjcm9sbEN1cnJlbnQiLCJjcmVhdGVHZW9tZXRyeSIsImNyZWF0ZUdhbGxlcnkiLCJjcmVhdGVCdXR0b25Sb2xsIiwiaGVpZ2h0U2VnbWVudHMiLCJ3aWR0aFNlZ21lbnRzIiwibWVkaWFzIiwibWVkaWFBc3NldHMiLCJhZGRFdmVudExpc3RlbmVyIiwiXyIsIk1hdGgiLCJyYW5kb20iLCJhbHQiLCJjb25zb2xlIiwibG9nIiwic29ydCIsImEiLCJiIiwiY2xvc2VzdCIsInJlZHVjZSIsImFicyIsImlubmVyVGV4dCIsImV2ZW50IiwiZ2FsbGVyeUJvdW5kcyIsImdhbGxlcnlTaXplcyIsIm9uVG91Y2hEb3duIiwib25Ub3VjaE1vdmUiLCJvblRvdWNoVXAiLCJvbldoZWVsIiwicGl4ZWxYIiwicGl4ZWxZIiwidXRpbHMiLCJpbnRlcnBvbGF0ZSIsImRlc3Ryb3kiLCJyZW1vdmVDaGlsZCIsIlZlYzMiLCJ0ZW1wVmVjMyIsIklEIiwiQVRUUl9JRCIsImlzQm91bmRzV2FybmVkIiwiR2VvbWV0cnkiLCJhdHRyaWJ1dGVzIiwiY2FudmFzIiwiZXJyb3IiLCJpZCIsIlZBT3MiLCJkcmF3UmFuZ2UiLCJzdGFydCIsImNvdW50IiwiaW5zdGFuY2VkQ291bnQiLCJyZW5kZXJlciIsImJpbmRWZXJ0ZXhBcnJheSIsImN1cnJlbnRHZW9tZXRyeSIsImdsU3RhdGUiLCJzdGF0ZSIsImtleSIsImFkZEF0dHJpYnV0ZSIsImF0dHIiLCJzaXplIiwidHlwZSIsImRhdGEiLCJGbG9hdDMyQXJyYXkiLCJGTE9BVCIsIlVpbnQxNkFycmF5IiwiVU5TSUdORURfU0hPUlQiLCJVTlNJR05FRF9JTlQiLCJFTEVNRU5UX0FSUkFZX0JVRkZFUiIsIkFSUkFZX0JVRkZFUiIsIm5vcm1hbGl6ZWQiLCJzdHJpZGUiLCJvZmZzZXQiLCJieXRlTGVuZ3RoIiwibGVuZ3RoIiwiZGl2aXNvciIsImluc3RhbmNlZCIsIm5lZWRzVXBkYXRlIiwidXNhZ2UiLCJTVEFUSUNfRFJBVyIsImJ1ZmZlciIsInVwZGF0ZUF0dHJpYnV0ZSIsImlzSW5zdGFuY2VkIiwid2FybiIsIm1pbiIsIm1heCIsImlzTmV3QnVmZmVyIiwiY3JlYXRlQnVmZmVyIiwiYm91bmRCdWZmZXIiLCJiaW5kQnVmZmVyIiwiYnVmZmVyRGF0YSIsImJ1ZmZlclN1YkRhdGEiLCJzZXRJbmRleCIsInNldERyYXdSYW5nZSIsInNldEluc3RhbmNlZENvdW50IiwiY3JlYXRlVkFPIiwiYXR0cmlidXRlT3JkZXIiLCJjcmVhdGVWZXJ0ZXhBcnJheSIsImJpbmRBdHRyaWJ1dGVzIiwiYXR0cmlidXRlTG9jYXRpb25zIiwiZm9yRWFjaCIsImxvY2F0aW9uIiwibmFtZSIsIm51bUxvYyIsImkiLCJ2ZXJ0ZXhBdHRyaWJQb2ludGVyIiwiZW5hYmxlVmVydGV4QXR0cmliQXJyYXkiLCJ2ZXJ0ZXhBdHRyaWJEaXZpc29yIiwiZHJhdyIsIm1vZGUiLCJUUklBTkdMRVMiLCJpbmRleEJ5dGVzUGVyRWxlbWVudCIsImRyYXdFbGVtZW50c0luc3RhbmNlZCIsImRyYXdBcnJheXNJbnN0YW5jZWQiLCJkcmF3RWxlbWVudHMiLCJkcmF3QXJyYXlzIiwiZ2V0UG9zaXRpb24iLCJjb21wdXRlQm91bmRpbmdCb3giLCJhcnJheSIsImNlbnRlciIsInJhZGl1cyIsIkluZmluaXR5Iiwic2V0IiwibCIsInoiLCJzdWIiLCJhZGQiLCJkaXZpZGUiLCJjb21wdXRlQm91bmRpbmdTcGhlcmUiLCJtYXhSYWRpdXNTcSIsImZyb21BcnJheSIsInNxdWFyZWREaXN0YW5jZSIsInNxcnQiLCJyZW1vdmUiLCJkZWxldGVWZXJ0ZXhBcnJheSIsImRlbGV0ZUJ1ZmZlciIsIk1hdDMiLCJNYXQ0IiwiZnJ1c3R1bUN1bGxlZCIsInJlbmRlck9yZGVyIiwibW9kZWxWaWV3TWF0cml4Iiwibm9ybWFsTWF0cml4IiwiYmVmb3JlUmVuZGVyQ2FsbGJhY2tzIiwiYWZ0ZXJSZW5kZXJDYWxsYmFja3MiLCJvbkJlZm9yZVJlbmRlciIsImYiLCJwdXNoIiwib25BZnRlclJlbmRlciIsImNhbWVyYSIsIm1vZGVsTWF0cml4IiwiT2JqZWN0IiwiYXNzaWduIiwidmlld01hdHJpeCIsInByb2plY3Rpb25NYXRyaXgiLCJjYW1lcmFQb3NpdGlvbiIsIndvcmxkUG9zaXRpb24iLCJtdWx0aXBseSIsIndvcmxkTWF0cml4IiwiZ2V0Tm9ybWFsTWF0cml4IiwiZmxpcEZhY2VzIiwiY3VsbEZhY2UiLCJkZXRlcm1pbmFudCIsInVzZSIsImFycmF5Q2FjaGVGMzIiLCJ0cmFuc3BhcmVudCIsIkJBQ0siLCJmcm9udEZhY2UiLCJDQ1ciLCJkZXB0aFRlc3QiLCJkZXB0aFdyaXRlIiwiZGVwdGhGdW5jIiwiTEVTUyIsImJsZW5kRnVuYyIsImJsZW5kRXF1YXRpb24iLCJzcmMiLCJwcmVtdWx0aXBsaWVkQWxwaGEiLCJzZXRCbGVuZEZ1bmMiLCJPTkUiLCJPTkVfTUlOVVNfU1JDX0FMUEhBIiwiU1JDX0FMUEhBIiwidmVydGV4U2hhZGVyIiwiY3JlYXRlU2hhZGVyIiwiVkVSVEVYX1NIQURFUiIsInNoYWRlclNvdXJjZSIsImNvbXBpbGVTaGFkZXIiLCJnZXRTaGFkZXJJbmZvTG9nIiwiYWRkTGluZU51bWJlcnMiLCJmcmFnbWVudFNoYWRlciIsIkZSQUdNRU5UX1NIQURFUiIsImF0dGFjaFNoYWRlciIsImxpbmtQcm9ncmFtIiwiZ2V0UHJvZ3JhbVBhcmFtZXRlciIsIkxJTktfU1RBVFVTIiwiZ2V0UHJvZ3JhbUluZm9Mb2ciLCJkZWxldGVTaGFkZXIiLCJ1bmlmb3JtTG9jYXRpb25zIiwiTWFwIiwibnVtVW5pZm9ybXMiLCJBQ1RJVkVfVU5JRk9STVMiLCJ1SW5kZXgiLCJ1bmlmb3JtIiwiZ2V0QWN0aXZlVW5pZm9ybSIsImdldFVuaWZvcm1Mb2NhdGlvbiIsInNwbGl0IiwibWF0Y2giLCJ1bmlmb3JtTmFtZSIsIm5hbWVDb21wb25lbnRzIiwic2xpY2UiLCJsb2NhdGlvbnMiLCJudW1BdHRyaWJzIiwiQUNUSVZFX0FUVFJJQlVURVMiLCJhSW5kZXgiLCJhdHRyaWJ1dGUiLCJnZXRBY3RpdmVBdHRyaWIiLCJnZXRBdHRyaWJMb2NhdGlvbiIsImpvaW4iLCJkc3QiLCJzcmNBbHBoYSIsImRzdEFscGhhIiwic2V0QmxlbmRFcXVhdGlvbiIsIm1vZGVSR0IiLCJtb2RlQWxwaGEiLCJhcHBseVN0YXRlIiwiZW5hYmxlIiwiREVQVEhfVEVTVCIsImRpc2FibGUiLCJDVUxMX0ZBQ0UiLCJCTEVORCIsInNldEN1bGxGYWNlIiwic2V0RnJvbnRGYWNlIiwic2V0RGVwdGhNYXNrIiwic2V0RGVwdGhGdW5jIiwidGV4dHVyZVVuaXQiLCJwcm9ncmFtQWN0aXZlIiwiY3VycmVudFByb2dyYW0iLCJ1c2VQcm9ncmFtIiwiYWN0aXZlVW5pZm9ybSIsImNvbXBvbmVudCIsIkFycmF5IiwiaXNBcnJheSIsInVuZGVmaW5lZCIsInNldFVuaWZvcm0iLCJ0ZXh0dXJlVW5pdHMiLCJDVyIsImRlbGV0ZVByb2dyYW0iLCJmbGF0dGVuIiwic2V0VmFsdWUiLCJnZXQiLCJhcnJheXNFcXVhbCIsInNldEFycmF5IiwidW5pZm9ybTFmdiIsInVuaWZvcm0xZiIsInVuaWZvcm0yZnYiLCJ1bmlmb3JtM2Z2IiwidW5pZm9ybTRmdiIsInVuaWZvcm0xaXYiLCJ1bmlmb3JtMWkiLCJ1bmlmb3JtMml2IiwidW5pZm9ybTNpdiIsInVuaWZvcm00aXYiLCJ1bmlmb3JtTWF0cml4MmZ2IiwidW5pZm9ybU1hdHJpeDNmdiIsInVuaWZvcm1NYXRyaXg0ZnYiLCJzdHJpbmciLCJsaW5lcyIsImFycmF5TGVuIiwidmFsdWVMZW4iLCJ3YXJuQ291bnQiLCJtZXNzYWdlIiwid1NlZ3MiLCJoU2VncyIsIm51bSIsIm51bUluZGljZXMiLCJub3JtYWwiLCJ1diIsIlVpbnQzMkFycmF5IiwiYnVpbGRQbGFuZSIsImRlcHRoIiwidSIsInYiLCJ3IiwidURpciIsInZEaXIiLCJpaSIsImlvIiwic2VnVyIsInNlZ0giLCJpeSIsIml4IiwiYyIsImQiLCJNYXQzRnVuYyIsIm0wMCIsIm0wMSIsIm0wMiIsIm0xMCIsIm0xMSIsIm0xMiIsIm0yMCIsIm0yMSIsIm0yMiIsImNvcHkiLCJ0cmFuc2xhdGUiLCJtIiwicm90YXRlIiwibWEiLCJtYiIsImlkZW50aXR5IiwiZnJvbU1hdHJpeDQiLCJmcm9tTWF0NCIsImZyb21RdWF0ZXJuaW9uIiwicSIsImZyb21RdWF0IiwiZnJvbUJhc2lzIiwidmVjM2EiLCJ2ZWMzYiIsInZlYzNjIiwiaW52ZXJzZSIsImludmVydCIsIm5vcm1hbEZyb21NYXQ0IiwiRVBTSUxPTiIsIm91dCIsIngyIiwieTIiLCJ6MiIsInh4IiwieXgiLCJ5eSIsInp4IiwienkiLCJ6eiIsInd4Iiwid3kiLCJ3eiIsInRyYW5zcG9zZSIsImEwMSIsImEwMiIsImExMiIsImEwMCIsImExMCIsImExMSIsImEyMCIsImEyMSIsImEyMiIsImIwMSIsImIxMSIsImIyMSIsImRldCIsImIwMCIsImIwMiIsImIxMCIsImIxMiIsImIyMCIsImIyMiIsInJhZCIsInMiLCJzaW4iLCJjb3MiLCJhMDMiLCJhMTMiLCJhMjMiLCJhMzAiLCJhMzEiLCJhMzIiLCJhMzMiLCJiMDMiLCJiMDQiLCJiMDUiLCJiMDYiLCJiMDciLCJiMDgiLCJiMDkiLCJwcm9qZWN0aW9uIiwic3VidHJhY3QiLCJtdWx0aXBseVNjYWxhciJdLCJzb3VyY2VSb290IjoiIn0=