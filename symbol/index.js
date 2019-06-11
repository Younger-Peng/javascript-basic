const a = require('./mod')
console.log(a.foo)

class MyClass {
    [Symbol.hasInstance](foo) {
        return foo instanceof Array
    }
}

[1, 2, 3] instanceof new MyClass()