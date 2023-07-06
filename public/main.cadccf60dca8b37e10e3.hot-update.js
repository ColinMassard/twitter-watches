"use strict";
self["webpackHotUpdateboilerplate_prismic"]("main",{

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
  }) {
    // this.speed.target = 1

    // this.scrollCurrent.x = this.scroll.x
    // this.scrollCurrent.y = this.scroll.y
  }
  onTouchMove({
    x,
    y
  }) {
    // const xDistance = x.start - x.end
    // const yDistance = y.start - y.end

    // this.x.target = this.scrollCurrent.x - xDistance
    // this.y.target = this.scrollCurrent.y - yDistance
  }
  onTouchUp({
    x,
    y
  }) {
    // this.speed.target = 0
  }
  onWheel({
    pixelX,
    pixelY
  }) {
    this.x.target += pixelX;
    this.y.target += pixelY;
  }

  /****
   * LOOP
   * ***/
  update() {
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
      console.log(offsetY);
      console.log(scaleY);
      if (this.y.direction === 'top') {
        const y = media.mesh.position.y + scaleY;
        if (y < -offsetY) {
          // media.extra.y += this.gallerySizes.height

          // media.mesh.rotation.z = GSAP.utils.random(-Math.PI * 0.03, Math.PI * 0.03)
        }
      } else if (this.y.direction === 'bottom') {
        const y = media.mesh.position.y - scaleY;
        if (y > offsetY) {
          // media.extra.y -= this.gallerySizes.height

          // media.mesh.rotation.z = GSAP.utils.random(-Math.PI * 0.03, Math.PI * 0.03)
        }
      }
      media.update(this.scroll, this.speed.current);
    });
  }

  /****
   * DESTROY
   * ***/
  destroy() {
    this.scene.removeChild(this.group);
  }
});

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("9da64baa221d2d4d65f1")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5jYWRjY2Y2MGRjYThiMzdlMTBlMy5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBc0M7QUFDZjtBQUVLO0FBRUQ7QUFFM0IsaUVBQWUsTUFBTTtFQUNuQkssV0FBV0EsQ0FBRTtJQUFFQyxFQUFFO0lBQUVDLEtBQUs7SUFBRUM7RUFBTSxDQUFDLEVBQUU7SUFDakMsSUFBSSxDQUFDRixFQUFFLEdBQUdBLEVBQUU7SUFDWixJQUFJLENBQUNDLEtBQUssR0FBR0EsS0FBSztJQUNsQixJQUFJLENBQUNDLEtBQUssR0FBR0EsS0FBSztJQUVsQixJQUFJLENBQUNDLEtBQUssR0FBRyxJQUFJUiwwQ0FBUyxDQUFDLENBQUM7SUFFNUIsSUFBSSxDQUFDUyxjQUFjLEdBQUdDLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLGdCQUFnQixDQUFDO0lBQzlELElBQUksQ0FBQ0MsY0FBYyxHQUFHRixRQUFRLENBQUNHLGdCQUFnQixDQUFDLDhCQUE4QixDQUFDO0lBRS9FLElBQUksQ0FBQ0MsQ0FBQyxHQUFHO01BQ1BDLE9BQU8sRUFBRSxDQUFDO01BQ1ZDLE1BQU0sRUFBRSxDQUFDO01BQ1RDLElBQUksRUFBRTtJQUNSLENBQUM7SUFFRCxJQUFJLENBQUNDLENBQUMsR0FBRztNQUNQSCxPQUFPLEVBQUUsQ0FBQztNQUNWQyxNQUFNLEVBQUUsQ0FBQztNQUNUQyxJQUFJLEVBQUU7SUFDUixDQUFDO0lBRUQsSUFBSSxDQUFDRSxhQUFhLEdBQUc7TUFDbkJMLENBQUMsRUFBRSxDQUFDO01BQ0pJLENBQUMsRUFBRTtJQUNMLENBQUM7SUFFRCxJQUFJLENBQUNFLE1BQU0sR0FBRztNQUNaTixDQUFDLEVBQUUsQ0FBQztNQUNKSSxDQUFDLEVBQUU7SUFDTCxDQUFDO0lBRUQsSUFBSSxDQUFDRyxLQUFLLEdBQUc7TUFDWE4sT0FBTyxFQUFFLENBQUM7TUFDVkMsTUFBTSxFQUFFLENBQUM7TUFDVEMsSUFBSSxFQUFFO0lBQ1IsQ0FBQztJQUVELElB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RUFBRSxJQUFJLENBQUNDLEtBQUssQ0FBQ04sT0FBTyxDQUFDO0lBQy9DLENBQUMsQ0FBQztFQUNKOztFQUVBO0FBQ0Y7QUFDQTtFQUNFOEMsT0FBT0EsQ0FBQSxFQUFJO0lBQ1QsSUFBSSxDQUFDdkQsS0FBSyxDQUFDd0QsV0FBVyxDQUFDLElBQUksQ0FBQ3RELEtBQUssQ0FBQztFQUNwQztBQUNGOzs7Ozs7OztVQ3ZMQSIsInNvdXJjZXMiOlsid2VicGFjazovL2JvaWxlcnBsYXRlLXByaXNtaWMvLi9hcHAvY29tcG9uZW50cy9DYW52YXMvSG9tZS9pbmRleC5qcyIsIndlYnBhY2s6Ly9ib2lsZXJwbGF0ZS1wcmlzbWljL3dlYnBhY2svcnVudGltZS9nZXRGdWxsSGFzaCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQbGFuZSwgVHJhbnNmb3JtIH0gZnJvbSAnb2dsJ1xyXG5pbXBvcnQgR1NBUCBmcm9tICdnc2FwJ1xyXG5cclxuaW1wb3J0IG1hcCBmcm9tICdsb2Rhc2gvbWFwJ1xyXG5cclxuaW1wb3J0IE1lZGlhIGZyb20gJy4vTWVkaWEnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyB7XHJcbiAgY29uc3RydWN0b3IgKHsgZ2wsIHNjZW5lLCBzaXplcyB9KSB7XHJcbiAgICB0aGlzLmdsID0gZ2xcclxuICAgIHRoaXMuc2NlbmUgPSBzY2VuZVxyXG4gICAgdGhpcy5zaXplcyA9IHNpemVzXHJcblxyXG4gICAgdGhpcy5ncm91cCA9IG5ldyBUcmFuc2Zvcm0oKVxyXG5cclxuICAgIHRoaXMuZ2FsbGVyeUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG9tZV9fZ2FsbGVyeScpXHJcbiAgICB0aGlzLm1lZGlhc0VsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmhvbWVfX2dhbGxlcnlfX21lZGlhX19pbWFnZScpXHJcblxyXG4gICAgdGhpcy54ID0ge1xyXG4gICAgICBjdXJyZW50OiAwLFxyXG4gICAgICB0YXJnZXQ6IDAsXHJcbiAgICAgIGxlcnA6IDAuMVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMueSA9IHtcclxuICAgICAgY3VycmVudDogMCxcclxuICAgICAgdGFyZ2V0OiAwLFxyXG4gICAgICBsZXJwOiAwLjFcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnNjcm9sbEN1cnJlbnQgPSB7XHJcbiAgICAgIHg6IDAsXHJcbiAgICAgIHk6IDBcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnNjcm9sbCA9IHtcclxuICAgICAgeDogMCxcclxuICAgICAgeTogMFxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuc3BlZWQgPSB7XHJcbiAgICAgIGN1cnJlbnQ6IDAsXHJcbiAgICAgIHRhcmdldDogMCxcclxuICAgICAgbGVycDogMC4xXHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5jcmVhdGVHZW9tZXRyeSgpXHJcbiAgICB0aGlzLmNyZWF0ZUdhbGxlcnkoKVxyXG4gICAgdGhpcy5vblJlc2l6ZSh7XHJcbiAgICAgIHNpemVzOiB0aGlzLnNpemVzXHJcbiAgICB9KVxyXG5cclxuICAgIHRoaXMuZ3JvdXAuc2V0UGFyZW50KHRoaXMuc2NlbmUpXHJcblxyXG4gICAgdGhpcy5zaG93KClcclxuICB9XHJcblxyXG4gIGNyZWF0ZUdlb21ldHJ5ICgpIHtcclxuICAgIHRoaXMuZ2VvbWV0cnkgPSBuZXcgUGxhbmUodGhpcy5nbCwge1xyXG4gICAgICBoZWlnaHRTZWdtZW50czogMjAsXHJcbiAgICAgIHdpZHRoU2VnbWVudHM6IDIwXHJcbiAgICB9KVxyXG4gIH1cclxuXHJcbiAgY3JlYXRlR2FsbGVyeSAoKSB7XHJcbiAgICB0aGlzLm1lZGlhcyA9IG1hcCh0aGlzLm1lZGlhc0VsZW1lbnRzLCAoZWxlbWVudCwgaW5kZXgpID0+IHtcclxuICAgICAgcmV0dXJuIG5ldyBNZWRpYSh7XHJcbiAgICAgICAgZWxlbWVudCxcclxuICAgICAgICBnZW9tZXRyeTogdGhpcy5nZW9tZXRyeSxcclxuICAgICAgICBpbmRleCxcclxuICAgICAgICBnbDogdGhpcy5nbCxcclxuICAgICAgICBzY2VuZTogdGhpcy5ncm91cCxcclxuICAgICAgICBzaXplczogdGhpcy5zaXplc1xyXG4gICAgICB9KVxyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIC8qKioqXHJcbiAgICogQU5JTUFUSU9OU1xyXG4gICAqICoqKi9cclxuICBzaG93ICgpIHtcclxuICAgIG1hcCh0aGlzLm1lZGlhcywgbWVkaWEgPT4gbWVkaWEuc2hvdygpKVxyXG4gIH1cclxuXHJcbiAgaGlkZSAoKSB7XHJcbiAgICBtYXAodGhpcy5tZWRpYXMsIG1lZGlhID0+IG1lZGlhLmhpZGUoKSlcclxuICB9XHJcblxyXG4gIC8qKioqXHJcbiAgICogRVZFTlRTXHJcbiAgICogKioqL1xyXG4gIG9uUmVzaXplIChldmVudCkge1xyXG4gICAgdGhpcy5nYWxsZXJ5Qm91bmRzID0gdGhpcy5nYWxsZXJ5RWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxyXG5cclxuICAgIHRoaXMuc2l6ZXMgPSBldmVudC5zaXplc1xyXG5cclxuICAgIHRoaXMuZ2FsbGVyeVNpemVzID0ge1xyXG4gICAgICBoZWlnaHQ6IHRoaXMuZ2FsbGVyeUJvdW5kcy5oZWlnaHQgLyB3aW5kb3cuaW5uZXJIZWlnaHQgKiB0aGlzLnNpemVzLmhlaWdodCxcclxuICAgICAgd2lkdGg6IHRoaXMuZ2FsbGVyeUJvdW5kcy53aWR0aCAvIHdpbmRvdy5pbm5lcldpZHRoICogdGhpcy5zaXplcy53aWR0aFxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuc2Nyb2xsLnggPSB0aGlzLngudGFyZ2V0ID0gMFxyXG4gICAgdGhpcy5zY3JvbGwueSA9IHRoaXMueS50YXJnZXQgPSAwXHJcblxyXG4gICAgbWFwKHRoaXMubWVkaWFzLCBtZWRpYSA9PiBtZWRpYS5vblJlc2l6ZShldmVudCwgdGhpcy5zY3JvbGwpKVxyXG4gIH1cclxuXHJcbiAgb25Ub3VjaERvd24gKHsgeCwgeSB9KSB7XHJcbiAgICAvLyB0aGlzLnNwZWVkLnRhcmdldCA9IDFcclxuXHJcbiAgICAvLyB0aGlzLnNjcm9sbEN1cnJlbnQueCA9IHRoaXMuc2Nyb2xsLnhcclxuICAgIC8vIHRoaXMuc2Nyb2xsQ3VycmVudC55ID0gdGhpcy5zY3JvbGwueVxyXG4gIH1cclxuXHJcbiAgb25Ub3VjaE1vdmUgKHsgeCwgeSB9KSB7XHJcbiAgICAvLyBjb25zdCB4RGlzdGFuY2UgPSB4LnN0YXJ0IC0geC5lbmRcclxuICAgIC8vIGNvbnN0IHlEaXN0YW5jZSA9IHkuc3RhcnQgLSB5LmVuZFxyXG5cclxuICAgIC8vIHRoaXMueC50YXJnZXQgPSB0aGlzLnNjcm9sbEN1cnJlbnQueCAtIHhEaXN0YW5jZVxyXG4gICAgLy8gdGhpcy55LnRhcmdldCA9IHRoaXMuc2Nyb2xsQ3VycmVudC55IC0geURpc3RhbmNlXHJcbiAgfVxyXG5cclxuICBvblRvdWNoVXAgKHsgeCwgeSB9KSB7XHJcbiAgICAvLyB0aGlzLnNwZWVkLnRhcmdldCA9IDBcclxuICB9XHJcblxyXG4gIG9uV2hlZWwgKHsgcGl4ZWxYLCBwaXhlbFkgfSkge1xyXG4gICAgdGhpcy54LnRhcmdldCArPSBwaXhlbFhcclxuICAgIHRoaXMueS50YXJnZXQgKz0gcGl4ZWxZXHJcbiAgfVxyXG5cclxuICAvKioqKlxyXG4gICAqIExPT1BcclxuICAgKiAqKiovXHJcbiAgdXBkYXRlICgpIHtcclxuICAgIHRoaXMuc3BlZWQuY3VycmVudCA9IEdTQVAudXRpbHMuaW50ZXJwb2xhdGUodGhpcy5zcGVlZC5jdXJyZW50LCB0aGlzLnNwZWVkLnRhcmdldCwgdGhpcy5zcGVlZC5sZXJwKVxyXG5cclxuICAgIHRoaXMueC5jdXJyZW50ID0gR1NBUC51dGlscy5pbnRlcnBvbGF0ZSh0aGlzLnguY3VycmVudCwgdGhpcy54LnRhcmdldCwgdGhpcy54LmxlcnApXHJcbiAgICB0aGlzLnkuY3VycmVudCA9IEdTQVAudXRpbHMuaW50ZXJwb2xhdGUodGhpcy55LmN1cnJlbnQsIHRoaXMueS50YXJnZXQsIHRoaXMueS5sZXJwKVxyXG5cclxuICAgIGlmICh0aGlzLnNjcm9sbC55IDwgdGhpcy55LmN1cnJlbnQpIHtcclxuICAgICAgdGhpcy55LmRpcmVjdGlvbiA9ICd0b3AnXHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuc2Nyb2xsLnkgPiB0aGlzLnkuY3VycmVudCkge1xyXG4gICAgICB0aGlzLnkuZGlyZWN0aW9uID0gJ2JvdHRvbSdcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnNjcm9sbC54ID0gdGhpcy54LmN1cnJlbnRcclxuICAgIHRoaXMuc2Nyb2xsLnkgPSB0aGlzLnkuY3VycmVudFxyXG5cclxuICAgIG1hcCh0aGlzLm1lZGlhcywgKG1lZGlhLCBpbmRleCkgPT4ge1xyXG4gICAgICBjb25zdCBvZmZzZXRZID0gdGhpcy5zaXplcy5oZWlnaHQgKiAwLjZcclxuICAgICAgY29uc3Qgc2NhbGVZID0gbWVkaWEubWVzaC5zY2FsZS55IC8gMlxyXG5cclxuICAgICAgY29uc29sZS5sb2cob2Zmc2V0WSlcclxuICAgICAgY29uc29sZS5sb2coc2NhbGVZKVxyXG5cclxuICAgICAgaWYgKHRoaXMueS5kaXJlY3Rpb24gPT09ICd0b3AnKSB7XHJcbiAgICAgICAgY29uc3QgeSA9IG1lZGlhLm1lc2gucG9zaXRpb24ueSArIHNjYWxlWVxyXG5cclxuICAgICAgICBpZiAoeSA8IC1vZmZzZXRZKSB7XHJcbiAgICAgICAgICAvLyBtZWRpYS5leHRyYS55ICs9IHRoaXMuZ2FsbGVyeVNpemVzLmhlaWdodFxyXG5cclxuICAgICAgICAgIC8vIG1lZGlhLm1lc2gucm90YXRpb24ueiA9IEdTQVAudXRpbHMucmFuZG9tKC1NYXRoLlBJICogMC4wMywgTWF0aC5QSSAqIDAuMDMpXHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2UgaWYgKHRoaXMueS5kaXJlY3Rpb24gPT09ICdib3R0b20nKSB7XHJcbiAgICAgICAgY29uc3QgeSA9IG1lZGlhLm1lc2gucG9zaXRpb24ueSAtIHNjYWxlWVxyXG5cclxuICAgICAgICBpZiAoeSA+IG9mZnNldFkpIHtcclxuICAgICAgICAgIC8vIG1lZGlhLmV4dHJhLnkgLT0gdGhpcy5nYWxsZXJ5U2l6ZXMuaGVpZ2h0XHJcblxyXG4gICAgICAgICAgLy8gbWVkaWEubWVzaC5yb3RhdGlvbi56ID0gR1NBUC51dGlscy5yYW5kb20oLU1hdGguUEkgKiAwLjAzLCBNYXRoLlBJICogMC4wMylcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgbWVkaWEudXBkYXRlKHRoaXMuc2Nyb2xsLCB0aGlzLnNwZWVkLmN1cnJlbnQpXHJcbiAgICB9KVxyXG4gIH1cclxuXHJcbiAgLyoqKipcclxuICAgKiBERVNUUk9ZXHJcbiAgICogKioqL1xyXG4gIGRlc3Ryb3kgKCkge1xyXG4gICAgdGhpcy5zY2VuZS5yZW1vdmVDaGlsZCh0aGlzLmdyb3VwKVxyXG4gIH1cclxufVxyXG4iLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSAoKSA9PiAoXCI5ZGE2NGJhYTIyMWQyZDRkNjVmMVwiKSJdLCJuYW1lcyI6WyJQbGFuZSIsIlRyYW5zZm9ybSIsIkdTQVAiLCJtYXAiLCJNZWRpYSIsImNvbnN0cnVjdG9yIiwiZ2wiLCJzY2VuZSIsInNpemVzIiwiZ3JvdXAiLCJnYWxsZXJ5RWxlbWVudCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsIm1lZGlhc0VsZW1lbnRzIiwicXVlcnlTZWxlY3RvckFsbCIsIngiLCJjdXJyZW50IiwidGFyZ2V0IiwibGVycCIsInkiLCJzY3JvbGxDdXJyZW50Iiwic2Nyb2xsIiwic3BlZWQiLCJjcmVhdGVHZW9tZXRyeSIsImNyZWF0ZUdhbGxlcnkiLCJvblJlc2l6ZSIsInNldFBhcmVudCIsInNob3ciLCJnZW9tZXRyeSIsImhlaWdodFNlZ21lbnRzIiwid2lkdGhTZWdtZW50cyIsIm1lZGlhcyIsImVsZW1lbnQiLCJpbmRleCIsIm1lZGlhIiwiaGlkZSIsImV2ZW50IiwiZ2FsbGVyeUJvdW5kcyIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsImdhbGxlcnlTaXplcyIsImhlaWdodCIsIndpbmRvdyIsImlubmVySGVpZ2h0Iiwid2lkdGgiLCJpbm5lcldpZHRoIiwib25Ub3VjaERvd24iLCJvblRvdWNoTW92ZSIsIm9uVG91Y2hVcCIsIm9uV2hlZWwiLCJwaXhlbFgiLCJwaXhlbFkiLCJ1cGRhdGUiLCJ1dGlscyIsImludGVycG9sYXRlIiwiZGlyZWN0aW9uIiwib2Zmc2V0WSIsInNjYWxlWSIsIm1lc2giLCJzY2FsZSIsImNvbnNvbGUiLCJsb2ciLCJwb3NpdGlvbiIsImRlc3Ryb3kiLCJyZW1vdmVDaGlsZCJdLCJzb3VyY2VSb290IjoiIn0=