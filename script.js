const stage = document.querySelector('canvas#stage')
const c = stage.getContext('2d')

const w = stage.width
const h = stage.height

c.fillStyle = '#EFEFEF'
c.strokeStyle = '#FEFEFE'
c.lineWidth = w * 0.04
c.lineCap = 'round'

//c.beginPath()
//c.rect(0, 0, w, h)
//c.fillStyle = '#232323'
//c.fill()

c.translate(w/2, (h/2)-h*0.03)

const arm = (shoulder, length, rotation, left) => {
    left = left? -1 : 1;
    c.save()
    c.beginPath()
    c.strokeStyle = '#111111'
    c.translate(shoulder[0], shoulder[1])
    c.rotate(rotation)
    c.moveTo(0,0)
    c.lineTo(0, -length*0.62) // bicep
    c.rotate(-Math.PI*0.015*left)
    c.lineTo(0, -length) // forearm
    c.lineTo(-w*0.013, -h*0.025-length) // finger
    c.moveTo(0, -length)
    c.lineTo(0, -h*0.03-length) // finger
    c.moveTo(0, -length) 
    c.lineTo(w*0.013, -h*0.025-length) // finger
    c.stroke()
    c.restore()
}


const leg = (hip, length, rotation, left) => {
    left = left? -1 : 1;
    c.save()
    c.beginPath()
    c.strokeStyle = '#111111'
    c.translate(hip[0], hip[1])
    c.rotate(rotation)
    c.moveTo(0,0)
    c.lineTo(0, -length*0.55) // upper leg
    c.rotate(Math.PI*0.01*left)
    c.lineTo(0, -length) // lower leg
    c.lineTo(-w*0.035*left, -h*0.01-length) // toe
    c.moveTo(0, -length)
    c.lineTo(-w*0.035*left, -h*0.015-length) // toe
    //c.moveTo(0, -length) 
    //c.lineTo(w*0.013, -h*0.02-length) // toe
    c.stroke()
    c.restore()
}

arm([-w*0.12, -h*0.1], h*0.24, Math.PI*1.8, true)
arm([w*0.12, -h*0.1], h*0.24, Math.PI*2.2)

leg([-w*0.07, h*0.15], h*0.25, Math.PI*1.1, true)
leg([w*0.07, h*0.15], h*0.25, Math.PI*0.9)


const circle = p => {
    const [x, y, r] = p
    c.beginPath()
    c.arc(x, y, r, 0, Math.PI*2)
    c.fill()
}

const body = [
    // left
    [-w*0.08, -h*0.08, w*0.08],
    [-w*0.08, 0,       w*0.1],
    [-w*0.07, h*0.1,   w*0.08],

    // bottom
    [-w*0.03, h*0.11, w*0.08],
    [w*0.03,  h*0.11, w*0.08],

    // right
    [w*0.08, -h*0.08, w*0.08],
    [w*0.08, 0,       w*0.1],
    [w*0.07, h*0.1,   w*0.08],

    // top
    [-w*0.03, -h*0.1, w*0.08],
    [w*0.03,  -h*0.1, w*0.08],

    // fill
    [0, h*0, w*0.1],
]

// Body outline
c.fillStyle = '#111111'
body.forEach(circle)

// Body clear

c.fillStyle = '#fefefe'
body.forEach(part => {
    const [x, y, r] = part
    c.save()
    c.beginPath()
    c.arc(x, y, r*0.7, 0, Math.PI*2)
    //c.clip()
    //c.clearRect(-w/2, -h/2, w, h)
    c.fill()
    c.restore()
})




// head
c.beginPath()
c.fillStyle = '#111111'
c.ellipse(w*0.012, -h*0.22, w*0.1, w*0.14, Math.PI*0.4, 0, Math.PI*2)
c.fill()

// ear
c.beginPath()
c.fillStyle = '#111111'
c.ellipse(-w*0.097, -h*0.24, w*0.07, w*0.03, Math.PI*0.39, 0, Math.PI*2)
c.fill()


// image output
document.querySelector('img#out').src = stage.toDataURL()
