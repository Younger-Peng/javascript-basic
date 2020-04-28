## Observer

Observer 引入 Dep, defineReactive 方法使用到Dep，defineProperty时，每个 key 都对应一个 Dep 的实例对象 dep，
getter时调用 dep 的 addSub 方法
setter时调用 dep 的 notify 方法

## Dep
Dep 有个静态属性Target，为 Watcher 的实例 watcher
watcher 实例化过程中会更改 Watch 的 Target

## Watcher
Watcher 引入 Dep，可以改变 Dep的静态属性 Target

## Compile
Compile 引入 Watcher，