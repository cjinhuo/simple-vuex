<template>
  <div>
    <div>state.count{{ $store.state.count }}</div>
    <div>state.getters.getNum{{ $store.getters.getNum }}</div>
    <button @click="onAdd">
      增加
    </button>
  </div>
</template>

<script>
export default {
  name: 'Name',
  props: {
    value: Boolean
  },
  data: function() {
    return {}
  },
  beforeCreate() {
    console.log(this.$store)
  },
  created() {
    console.log(this.$store)
  },
  methods: {
    onAdd() {
      this.$store.dispatch('increment')
      this.$store.commit('increment',2)
    }
  }
}
</script>

<style scoped>

</style>
