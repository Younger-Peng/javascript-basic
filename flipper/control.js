class Control {
    constructor() {
        this.container = document.querySelector('.container')
        this.xAxis = document.querySelector('[name=xAxis]')
        this.yAxis = document.querySelector('[name=yAxis]')
        this.listen()
    }

    listen() {
        this.xAxis.addEventListener('change', e => {
            let xDeg = e.target.value - 50
            console.log(xDeg)
            this.container.style.transform = `rotateY(${xDeg}deg)`
        })

        this.yAxis.addEventListener('change', e => {
            let yDeg = e.target.value
            this.container.style['perspective-origin'] = `50% ${yDeg}%`;
        })
    }
}

new Control()