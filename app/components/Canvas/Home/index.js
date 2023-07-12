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
    this.slotRoll = document.querySelector('.home__button')
    this.buttonRoll = document.querySelector('.home__button button')
    this.homeResult = document.querySelector('.home__result')
    this.nameList = document.querySelector('.watch__name-list')
    this.imageList = document.querySelector('.watch__image-list')
    this.tweetButton = document.querySelector('.home__tweet')

    this.speedAutoScroll = 2

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
    this.createButtonRoll(this.slotRoll)

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

  createButtonRoll (buttonRoll) {
    let mediaAssets = []
    let lastY = 0

    buttonRoll.addEventListener('click', _ => {
      /****
       * RESETS
       * ***/
      this.nameList.innerHTML = ''
      this.imageList.innerHTML = ''
      this.y.target = 0
      mediaAssets = []
      this.speedAutoScroll = 0

      /****
       * ANIMATIONS
       * ***/
      map(this.medias, (media, index) => {
        mediaAssets[index] = [media.bounds.top, media.element.alt, media.element.currentSrc, media.bounds.height]
      })

      this.y.target = Math.round(Math.random() * 10) * mediaAssets[0][3]

      while (this.y.target === lastY) {
        this.y.target = Math.round(Math.random() * 10) * mediaAssets[0][3]
      }

      const target = mediaAssets[mediaAssets.length - 1][0] - this.y.target + (window.innerHeight / 2) + (mediaAssets[0][3] / 2)

      mediaAssets.sort(function (a, b) {
        return Math.abs(target - a[0]) - Math.abs(target - b[0])
      })

      for (let i = 0; i < 4; i++) {
        const newName = document.createElement('li')
        newName.innerHTML = mediaAssets[i][1]
        newName.classList = 'text-primary font-medium text-base text-center lg:text-lg'
        this.nameList.appendChild(newName)

        const newImage = document.createElement('img')
        newImage.src = mediaAssets[i][2]
        newImage.classList = 'img-cover'
        this.imageList.appendChild(newImage)
      }

      this.createTweet(this.tweetButton, mediaAssets)

      GSAP.to(this.homeResult, {
        autoAlpha: 1
      })
      lastY = this.y.target
      this.buttonRoll.innerText = 'Roll again ?'
    })
  }

  createTweet (tweetButton, mediaArray) {
    const newLink = `https://twitter.com/intent/tweet?text=Here%20is%20my%20Watch%20Combo%3A%0a%0a${mediaArray[0][1]}%0a${mediaArray[1][1]}%0a${mediaArray[2][1]}%0a${mediaArray[3][1]}%0aGenerate%20yours%20on%20%20${window.location.href}`
    tweetButton.setAttribute('href', newLink)
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

    GSAP.to(this.homeResult, {
      autoAlpha: 0
    })
  }

  onTouchDown ({ x, y }) {
  }

  onTouchMove ({ x, y }) {

  }

  onTouchUp ({ x, y }) {

  }

  onWheel ({ pixelX, pixelY }) {
    // this.x.target += pixelX
    this.y.target += pixelY
  }

  /****
   * LOOP
   * ***/
  update () {
    this.y.target += this.speedAutoScroll
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

      media.update(media, this.scroll, this.speed.current, this.multiplier, this.y.direction, this.gallerySizes.height, offsetY, scaleY, this.y)
    })
  }

  /****
   * DESTROY
   * ***/
  destroy () {
    this.scene.removeChild(this.group)
  }
}
