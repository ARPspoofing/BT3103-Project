<template>
    <BusinessNavBar :search=false :Heading="Heading" :header=true />
  <h1>{{items.projectTitle}}</h1>
</template>

<script>
import BusinessNavBar from '../components/BusinessNavBar.vue'
import * as moment from 'moment'

export default {
    name: 'BusinessEditProject',
    props: ['items'],
    components: {
        BusinessNavBar,
    },
    data() {
        return {
            Heading: "EDIT PROJECT",
            props: ['items'],
        }
    },
    mounted() {
    this.items = JSON.parse(this.$route.params.items)
    console.log(this.items)
  }
}
</script>

<style>

</style>