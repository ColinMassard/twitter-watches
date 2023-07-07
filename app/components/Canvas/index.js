import { Camera, Renderer, Transform } from 'ogl'

import Home from './Home'

export default class Canvas {
  constructor ({ template }) {
    this.template = template

    this.x = {
      start: 0,
      distance: 0,
      end: 0
    }

    this.y = {
      start: 0,
      distance: 0,
      end: 0
    }

    this.createRenderer()
    this.createCamera()
    this.createScene()

    this.onResize()
  }

  createRenderer () {
    this.renderer = new Renderer({
      alpha: true,
      antialias: true
    })

    this.gl = this.renderer.gl

    document.body.appendChild(this.gl.canvas)
  }

  createCamera () {
    this.camera = new Camera(this.gl)
    this.camera.position.z = 5
    // this.camera.rotation.z = Math.PI / 4
  }

  createScene () {
    this.scene = new Transform()
  }

  /****
   * HOME
   * ***/
  createHome () {
    this.home = new Home({
      gl: this.gl,
      scene: this.scene,
      sizes: this.sizes
    })
  }

  destroyHome () {
    if (!this.home) return

    this.home.destroy()
    this.home = null
  }

  /****
   * EVENTS
   * ***/
  onPreloaded () {
    this.onChangeEnd(this.template)
  }

  onChangeStart (template, url) {
    if (this.home) {
      this.home.hide()
    }

    if (this.about) {
      this.about.hide()
    }
  }

  onChangeEnd (template) {
    if (template === 'home') {
      this.createHome()
    } else if (this.home) {
      this.destroyHome()
    }

    if (template === 'about') {
      this.createAbout()
    } else if (this.about) {
      this.destroyAbout()
    }

    this.template = template
  }

  onResize () {
    this.renderer.setSize(window.innerWidth, window.innerHeight)

    this.camera.perspective({
      aspect: window.innerWidth / window.innerHeight
    })

    const fov = this.camera.fov * (Math.PI / 180)
    const height = 2 * Math.tan(fov / 2) * this.camera.position.z
    const width = height * this.camera.aspect

    this.sizes = {
      height,
      width
    }

    const values = {
      sizes: this.sizes
    }

    if (this.home) {
      this.home.onResize(values)
    }

    if (this.about) {
      this.about.onResize(values)
    }
  }

  onTouchDown (event) {
    this.isDown = true

    this.x.start = event.touches ? event.touches[0].clientX : event.clientX
    this.y.start = event.touches ? event.touches[0].clientY : event.clientY

    const values = {
      x: this.x,
      y: this.y
    }

    if (this.home) {
      this.home.onTouchDown(values)
    }

    if (this.about) {
      this.about.onTouchDown(values)
    }
  }

  onTouchMove (event) {
    if (!this.isDown) return

    const x = event.touches ? event.touches[0].clientX : event.clientX
    const y = event.touches ? event.touches[0].clientY : event.clientY

    this.x.end = x
    this.y.end = y

    const values = {
      x: this.x,
      y: this.y
    }

    if (this.home) {
      this.home.onTouchMove(values)
    }

    if (this.about) {
      this.about.onTouchMove(values)
    }
  }

  onTouchUp (event) {
    this.isDown = false

    const x = event.changedTouches ? event.changedTouches[0].clientX : event.clientX
    const y = event.changedTouches ? event.changedTouches[0].clientY : event.clientY

    this.x.end = x
    this.y.end = y

    const values = {
      x: this.x,
      y: this.y
    }

    if (this.home) {
      this.home.onTouchUp(values)
    }

    if (this.about) {
      this.about.onTouchUp(values)
    }
  }

  onWheel (event) {
    if (this.home) {
      this.home.onWheel(event)
    }

    if (this.collections) {
      this.collections.onWheel(event)
    }
  }

  /****
   * LOOP
   * ***/
  update (scroll) {
    if (this.home) {
      this.home.update()
    }

    if (this.about) {
      this.about.update(scroll)
    }

    this.renderer.render({
      camera: this.camera,
      scene: this.scene
    })
  }
}
