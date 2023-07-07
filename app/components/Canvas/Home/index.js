import { Plane, Transform } from 'ogl'
import GSAP from 'gsap'

import map from 'lodash/map'

import Media from './Media'

export default class {
  constructor ({ gl, scene, sizes }) {
    this.gl = gl
    this.scene = scene
    this.sizes = sizes

    this.group = new Transform()

    this.galleryElement = document.querySelector('.home__gallery')
    this.mediasElements = document.querySelectorAll('.home__gallery__media__image')

    this.x = {
      current: 0,
      target: 0,
      lerp: 0.1
    }

    this.y = {
      current: 0,
      target: 0,
      lerp: 0.1
    }

    this.scrollCurrent = {
      x: 0,
      y: 0
    }

    this.scroll = {
      x: 0,
      y: 0
    }

    this.speed = {
      current: 0,
      target: 0,
      lerp: 0.1
    }

    this.createGeometry()
    this.createGallery()
    this.onResize({
      sizes: this.sizes
    })

    this.group.setParent(this.scene)

    this.show()
  }

  createGeometry () {
    this.geometry = new Plane(this.gl, {
      heightSegments: 20,
      widthSegments: 20
    })
  }

  createGallery () {
    this.medias = map(this.mediasElements, (element, index) => {
      return new Media({
        element,
        geometry: this.geometry,
        index,
        gl: this.gl,
        scene: this.group,
        sizes: this.sizes
      })
    })
  }

  /****
   * ANIMATIONS
   * ***/
  show () {
    map(this.medias, media => media.show())
  }

  hide () {
    map(this.medias, media => media.hide())
  }

  /****
   * EVENTS
   * ***/
  onResize (event) {
    this.galleryBounds = this.galleryElement.getBoundingClientRect()

    this.sizes = event.sizes

    this.gallerySizes = {
      height: this.galleryBounds.height / window.innerHeight * this.sizes.height,
      width: this.galleryBounds.width / window.innerWidth * this.sizes.width
    }

    this.scroll.x = this.x.target = 0
    this.scroll.y = this.y.target = 0

    map(this.medias, media => media.onResize(event, this.scroll))
  }

  onTouchDown ({ x, y }) {

  }

  onTouchMove ({ x, y }) {

  }

  onTouchUp ({ x, y }) {

  }

  onWheel ({ pixelX, pixelY }) {
    this.x.target += pixelX
    this.y.target += pixelY
  }

  /****
   * LOOP
   * ***/
  update () {
    this.speed.current = GSAP.utils.interpolate(this.speed.current, this.speed.target, this.speed.lerp)

    this.x.current = GSAP.utils.interpolate(this.x.current, this.x.target, this.x.lerp)
    this.y.current = GSAP.utils.interpolate(this.y.current, this.y.target, this.y.lerp)

    if (this.scroll.y < this.y.current) {
      this.y.direction = 'top'
    } else if (this.scroll.y > this.y.current) {
      this.y.direction = 'bottom'
    }

    this.scroll.x = this.x.current
    this.scroll.y = this.y.current

    map(this.medias, (media, index) => {
      const offsetY = this.sizes.height * 0.6
      const scaleY = media.mesh.scale.y / 2

      if (index % 2 === 0) {
        this.multiplier = -1
      } else if (index % 2 === 1) {
        this.multiplier = 1
      }

      if (this.multiplier === 1) {
        if (this.y.direction === 'top') {
          const y = media.mesh.position.y + scaleY
          if (y < -offsetY) {
            media.extra.y += this.gallerySizes.height
          }
        } else if (this.y.direction === 'bottom') {
          const y = media.mesh.position.y - scaleY
          if (y > offsetY) {
            media.extra.y -= this.gallerySizes.height
          }
        }
      } else if (this.multiplier === -1) {
        if (this.y.direction === 'top') {
          // const y = media.mesh.position.y + scaleY
          // const test = this.gallerySizes.height * this.multiplier
          // if (y < -offsetY) {
          //   media.extra.y += test
          // }
        } else if (this.y.direction === 'bottom') {
          // const y = media.mesh.position.y - scaleY
          // const test = this.gallerySizes.height
          // if (y > offsetY) {
          //   media.extra.y -= test
          // }
        }
      }

      media.update(this.scroll, this.speed.current, this.multiplier)
    })
  }

  /****
   * DESTROY
   * ***/
  destroy () {
    this.scene.removeChild(this.group)
  }
}
