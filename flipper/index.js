class Flipper {
    constructor(initVal) {
        this.currUpper = document.querySelector('.curr-upper');
        this.currLower = document.querySelector('.curr-lower');
        this.nextLower = document.querySelector('.next-lower');
        this.nextUpper = document.querySelector('.next-upper');
        this.currUpper.innerText = this.currLower.innerText = this.currVal = initVal
        this.animating = false
    }

    update(nextVal) {
        if (this.animating) return
        if (nextVal === this.currVal) return
        this.nextLower.innerText = this.nextUpper.innerText = this.nextVal = nextVal
        this.animate()
    }

    animate() {
        this.animating = true
        this.currUpper.style.transition = 'transform 0.2s ease';
        this.nextLower.style.transition = 'transform 0.4s ease 0.2s';
        this.currUpper.classList.add('active')
        this.nextLower.classList.add('active')
        setTimeout(() => {
            this.reset()
        }, 500)
    }

    reset() {
        this.currVal = this.nextVal
        this.currUpper.innerText = this.currLower.innerText = this.currVal
        this.currUpper.style.transition = ''
        this.nextLower.style.transition = ''
        this.currUpper.classList.remove('active')
        this.nextLower.classList.remove('active')
        this.animating = false
    }
}

function main() {
    let n = 9
    let timer
    const flipper = new Flipper(n)
    animate()

    function animate() {
        timer = setTimeout(() => {
            n--
            if (n === -1) {
                n = 9
            }
            flipper.update(n)
            animate()
        }, 1000)
    }
}

main()