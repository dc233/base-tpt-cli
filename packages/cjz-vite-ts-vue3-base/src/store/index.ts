import { createStore, Store } from 'vuex'
import { InjectionKey } from 'vue'

export interface State {
  count: number
}
// 定义 injection key
export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state() {
    return {
      count: 0,
    }
  },
  mutations: {
    // 累加功能
    increment(state) {
      state.count++
    },
  },
})
