// dep实例的ID
let did = 0

export default class Dep {
    // Dep.target为watcher实例
    static target = null

    constructor() {
        this.id = did
        did++
        this.subs = []
    }

    depend() {
        if (Dep.target) { // watcher
            Dep.target.addDep(this)
        }
    }

    addSub(sub) {
        this.subs.push(sub)
    }

    removeSub(sub) {
        const index = this.subs.indexOf(sub)
        if (index > -1) {
            this.subs.splice(index, 1)
        }
    }

    notify() {
        this.subs.forEach(e => {
            e.update()
        })
    }
}
