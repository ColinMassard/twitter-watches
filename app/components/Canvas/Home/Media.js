import GSAP from 'gsap'
import { Mesh, Program } from 'ogl'

import fragment from 'shaders/home-fragment.glsl'
import vertex from 'shaders/home-vertex.glsl'

export default class {
  constructor ({ element, geometry, gl, index, scene, sizes }) {
    this.element = element
    this.geometry = geometry
    this.gl = gl
    this.index = index
    this.scene = scene
    this.sizes = sizes

    this.extra = {
      x: 0,
      y: 0
    }

    this.createTexture()
    this.createProgram()
    this.createMesh()
    this.createBounds({
      sizes: this.sizes
    })
  }

  createTexture () {
    const image = this.element

    this.texture = window.TEXTURES[image.getAttribute('data-src')]
  }

  createProgram () {
    this.program = new Program(this.gl, {
      fragment,
      vertex,
      uniforms: {
        uAlpha: { value: 0 },
        uSpeed: { value: 0 },
        uViewportSizes: { value: [this.sizes.width, this.sizes.height] },
        tMap: { value: this.texture }
      }
    })
  }

  createMesh () {
    this.mesh = new Mesh(this.gl, {
      geometry: this.geometry,
      program: this.program
    })

    this.mesh.setParent(this.scene)

    // this.mesh.rotation.z = -Math.PI / 4
  }

  createBounds ({ sizes }) {
    this.sizes = sizes

    this.bounds = this.element.getBoundingClientRect()

    this.updateScale(sizes)
    this.updateX()
    this.updateY()
  }

  /****
   * ANIMATIONS
   * ***/
  show () {
    GSAP.fromTo(this.program.uniforms.uAlpha, {
      value: 0
    }, {
      value: 0.75
    })
  }

  hide () {
    GSAP.to(this.program.uniforms.uAlpha, {
      value: 0
    })
  }

  /****
   * EVENTS
   * ***/
  onResize (sizes, scroll) {
    this.extra = {
      x: 0,
      y: 0
    }

    this.createBounds(sizes)
    this.updateX(scroll && scroll.x)
    this.updateY(scroll && scroll.y)
  }

  /****
   * LOOP
   * ***/
  updateScale () {
    this.width = this.bounds.width / window.innerWidth
    this.height = this.bounds.height / window.innerHeight

    this.mesh.scale.x = this.sizes.width * this.width
    this.mesh.scale.y = this.sizes.height * this.height
  }

  updateX (x = 0) {
    this.x = (this.bounds.left + x) / window.innerWidth

    this.mesh.position.x = (-this.sizes.width / 2) + (this.mesh.scale.x / 2) + (this.x * this.sizes.width) + this.extra.x
  }

  updateY (media, y = 0, multiplier, direction, height, offsetY, scaleY) {
    this.y = (this.bounds.top + y) / window.innerHeight

    this.mesh.position.y = ((this.sizes.height / 2) - (this.mesh.scale.y / 2) - (this.y * this.sizes.height) + this.extra.y) * multiplier

    if (multiplier === 1) {
      if (direction === 'top') {
        const y = media.mesh.position.y + scaleY

        if (y < -offsetY) {
          media.extra.y += height
        }
      } else if (direction === 'bottom') {
        const y = media.mesh.position.y - scaleY

        if (y > offsetY) {
          media.extra.y -= height
        }
      }
    } else if (multiplier === -1) {
      if (direction === 'top') {
        const y = media.mesh.position.y - scaleY

        if (y > offsetY) {
          media.extra.y += height
        }
      } else if (direction === 'bottom') {
        const y = media.mesh.position.y + scaleY

        if (y < -offsetY) {
          media.extra.y -= height
        }
      }
    }
  }

  update (media, scroll, speed, multiplier, direction, height, offsetY, scaleY, y) {
    this.updateX(scroll.x)
    this.updateY(media, scroll.y, multiplier, direction, height, offsetY, scaleY)

    this.program.uniforms.uSpeed.value = ((y.current - y.target) / this.sizes.width) * 0.005
  }

  roll (media, scroll, speed, multiplier, direction, height, offsetY, scaleY, y) {

  }
}
