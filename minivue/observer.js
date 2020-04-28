import Dep from './dep.js'

class Observer {
    constructor(obj) {
        this.walk(obj)
    }

    walk(obj) {
        // 对数据进行监听
        const keys = Object.keys(obj) 
        for (let i = 0, len = keys.length; i < len; i++) {
            defineReactive(obj, keys[i], obj[keys[i]])
        }
    }
}

function defineReactive(obj, key, val) {
    const dep = new Dep()
    // 如果值是一个对象 递归监听
    if (typeof val === 'object') {
        new Observer(val)
    }

    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get() {
            // 收集对应的观察者对象
            if (Dep.target) {
                dep.depend()
            }
            return val
        },
        set(newVal) {
            if (val === newVal) {
                return
            }
            val = newVal
            // 如果新值是对象 递归监听
            if (typeof val === 'object') {
                new Observer(val)
            }
            // 触发更新
            dep.notify()
        }
    })
}

export default Observer