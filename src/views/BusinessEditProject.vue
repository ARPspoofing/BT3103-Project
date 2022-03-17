<template>
    <BusinessNavBar :search=false :Heading="Heading" :header=true />
  <h1>{{items.projTitle}}</h1>
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
        this.projTitle = JSON.parse(this.$route.params.items).projectTitle
        this.items = JSON.parse(this.$route.params.items)
        /*console.log(JSON.parse(this.$route.params.tasks))*/
        console.log(this.projTitle);
    },
}
</script>

<style>

</style>