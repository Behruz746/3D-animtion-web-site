const loadEl = document.getElementById("preloader")

window.addEventListener("load", () => {
  loadEl.style.display = "none"
})

function locomotive() {
  gsap.registerPlugin(ScrollTrigger) // GSAP kutubxonasi

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"), // scroll boluvchi element
    smooth: true, // scrollBar parametori
  })
  locoScroll.on("scroll", ScrollTrigger.update)

  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y
    },

    getBoundingClientRect() {
      return {
        top: 0, // canvasning top parametiri
        left: 0, // canvasning left parametiri
        width: window.innerWidth, // windowning heingligi
        height: window.innerHeight, // windowning balandligi
      }
    },

    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  })
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update())
  ScrollTrigger.refresh()
}
locomotive()

const canvas = document.querySelector("canvas") // canvas element
const context = canvas.getContext("2d") // canvas 2d

canvas.width = window.innerWidth // canvas window width parametorini olishi
canvas.height = window.innerHeight // canvas window height parametorini olishi

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  render()
})

function files(index) {
  var imagePaths = [] // image elementlarni arrayi

  for (let i = 1; i <= 300; i++) {
    // 300 ta imagelarning file yolarini yaratish
    var fileName = `male${String(i).padStart(4, "0")}.png`
    imagePaths.push(`./images/${fileName}`) // file yolari push qilish
  }

  return imagePaths[index] // malumit return bolishi
}

const frameCount = 300 // imagelarni qancha kadir bolishi
const images = []
const imageSeq = {
  frame: 1,
}

for (let i = 0; i < frameCount; i++) {
  // image elementlar create bolishi
  const img = new Image()
  img.src = files(i) // imagelarning file yo'llari
  images.push(img)
}

gsap.to(imageSeq, {
  frame: frameCount - 1,
  snap: "frame",
  ease: `none`,
  scrollTrigger: {
    scrub: 0.15, // animtionaning susuvchanligi
    trigger: `#page>canvas`,
    start: `top top`,
    end: `600% top`,
    scroller: `#main`,
  },
  onUpdate: render,
})

images[1].onload = render

function render() {
  scaleImage(images[imageSeq.frame], context)
}

function scaleImage(img, ctx) {
  // imageni canvas uzunlig va balandliklarini olishi
  var canvas = ctx.canvas
  var hRatio = canvas.width / img.width
  var vRatio = canvas.height / img.height
  var ratio = Math.max(hRatio, vRatio)
  var centerShift_x = (canvas.width - img.width * ratio) / 2
  var centerShift_y = (canvas.height - img.height * ratio) / 5
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.drawImage(
    // imageni canvas ichidagi positioni
    img,
    0,
    0,
    img.width,
    img.height,
    centerShift_x,
    centerShift_y,
    img.width * ratio,
    img.height * ratio
  )
}
ScrollTrigger.create({
  trigger: "#page>canvas",
  pin: true,
  scroller: `#main`,
  //   markers: true, scroll boshi va ohirin ikorsatib turuvchi text
  start: `top top`,
  end: `600% top`,
})

gsap.to("#page1", {
  scrollTrigger: {
    trigger: `#page1`,
    start: `top top`,
    end: `bottom top`,
    pin: true,
    scroller: `#main`,
  },
})
gsap.to("#page2", {
  scrollTrigger: {
    trigger: `#page2`,
    start: `top top`,
    end: `bottom top`,
    pin: true,
    scroller: `#main`,
  },
})
gsap.to("#page3", {
  scrollTrigger: {
    trigger: `#page3`,
    start: `top top`,
    end: `bottom top`,
    pin: true,
    scroller: `#main`,
  },
})
