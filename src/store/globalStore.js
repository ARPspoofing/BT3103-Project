
/*
const store = Vue.observable({  managementCount: '',postedCount: '' ,completedCount:' '})

const actions = {
  incrementManagementCount() {
    store.managementCount += 1
  },
  incrementPostedCount() {
    store.postedCount += 1
  },
  incrementCompletedCount() {
    store.completedCount += 1
  },
}

Vue.prototype.$store = store
Vue.prototype.$actions = actions
*/

import { reactive } from "vue";

export const store = {
  state: reactive({
    numbers: [1, 2, 3]
  }),
  addNumber(newNumber) {
    this.state.numbers.push(newNumber);
  }
};
