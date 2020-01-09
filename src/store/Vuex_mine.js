let Vue // 先定义，在使用Vue.use后便赋值

class Store {
  constructor(options) {
    this.vm = new Vue({
      data: {
        state: options.state
      }
    })
    let getters = options.getters || {}
    // getters
    this.getters = {} // 当前实例
    Object.keys(getters).forEach(getterName => {
      Object.defineProperty(this.getters, getterName, {
        get: () => {
          return getters[getterName](this.state)
        }
      })
    })
    // mutations
    let mutations = options.mutations || {}
    this.mutations = {}
    Object.keys(mutations).forEach(mutationName => {
      this.mutations[mutationName] = payload => mutations[mutationName](this.state, payload)
    })
    // actions
    let actions = options.actions || {}
    this.actions = {}
    Object.keys(actions).forEach(actionName => {
      this.actions[actionName] = payload => actions[actionName](this, payload)
    })
  }

  commit = (mutationName, payload) => {
    const fn = this.mutations[mutationName]
    if (fn) {
      fn(payload)
    }
  }

  dispatch = (type, payload) => {
    const params = unifyObjectStyle(type, payload)
    this.actions[params.type](payload)
  }
  get state() {
    return this.vm.state
  }
}

const install = v => {
  Vue = v
  Vue.mixin({
    beforeCreate(){
      if (this.$options && this.$options.store) {
        // 如果option上面有store的话就是root组件，因为只在main.js的上面挂载了
        this.$store = this.$options.store
      } else {
        // 渲染是从父到子，所以相当于
        this.$store = this.$parent && this.$parent.$store
      }
    }
  })
}

// 可以接收对象方式和载荷方式
function unifyObjectStyle(type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload
    payload = type
    type = type.type
  }

  return { type: type, payload: payload, options: options }
}

function isObject(obj) {
  return obj !== null && typeof obj === 'object'
}
export default {
  install,
  Store
}
