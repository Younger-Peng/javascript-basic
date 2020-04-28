// 针对各种指令的回调函数
export default {
    // 事件绑定
    on: {
        implement(vm, el, name, expOrFn) {
            el['on' + name] = vm[expOrFn].bind(vm)
        },
        update(vm, el, expOrFn, newVal, oldVal) {

        }
    },
    // 动态attributes 绑定
    bind: {
        implement(vm, el, name, expOrFn) {
            el.setAttribute(expOrFn, vm[expOrFn])
        }, 
        update(vm, el, expOrFn, newVal, oldVal) {
            el.setAttribute(expOrFn, newVal)
        }
    },
    // 双向绑定
    model: {
        implement(vm, el, name, expOrFn) {
            el.value = vm[expOrFn]
            el.oninput = function() {
                vm[expOrFn] = this.value
            }
        },  
        update(vm, el, expOrFn, newVal, oldVal) {
            el.value = newVal
        }
    },
    // 把数据渲染到节点中
    textNode: {
        implement(vm, textNode, variable) {
            textNode.nodeValue = textNode.nodeValue.replace(`{{${variable}}}`, vm[variable])
        },  
        update(vm, newVal, oldVal, textNode, variable, rawValue, re1, re2) {
            textNode.nodeValue = rawValue.replace(`{{${variable}}}`, newVal)
            let str = textNode.nodeValue
            if (re1.test(str)) {
                let arry = str.match(re1)
                arry.forEach(e => {
                    let variable = e.replace(re2, '')
                    str = str.replace(e, vm[variable])
                })
                textNode.nodeValue = str
            }
        }
    }
}