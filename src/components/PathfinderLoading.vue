<template>
    <div class="loader">
        PATHFINDERS
    </div> 
</template>

<script>
    export default {
        name: 'PathfinderLoading',
    }
</script>



<style scoped>
    .loader {
        font-size:40px;
        color:palevioletred;

    }

    .loader::after {
        content: '\2026 ';
        display:inline-block;
        overflow: hidden;
        vertical-align: bottom;
        animation: dots steps(4,end) 0.5s infinite;
    }

    @keyframes dots {
        to {
            width: 0.05em;
        }
    }
</style>