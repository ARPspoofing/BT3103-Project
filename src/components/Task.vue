<template>
    <div class="task">
        <div class="content">
            <router-link class="task flex" :to="{name:'TaskDetails', params: {taskId: task['id']}}">
                <!--
                <div class="left flex">    
                </div>
                -->
                <span class="title">{{task['taskname']}}</span>
                <span class="duedate">{{task['duedate']}}</span>
                <span class="short">{{task['shortdescription']}}</span>
                <div class="status-button flex" :class="{todo:task['todo'],inprogress:task['inprogress'],pendingreview:task['pendingreview'],completed:task['completed']}">
                    <span v-if="task['todo']">ToDo</span>
                    <span v-if="task['inprogress']">In-Progress</span>
                    <span v-if="task['pendingreview']">Pending Review</span>
                    <span v-if="task['completed']">Completed </span>
                </div>
                <!--
                <div class="right flex">
                </div>
                -->
            </router-link>
        </div>
    </div>  
    
</template>

<script>
    export default {
        name: 'Task',
        props: ['task']
    }
</script>

<style scoped>


    .task {
        z-index:100;
        position:fixed;
        display:flex;
        flex-direction:column;
        justify-content:left;
        align-items:center;
    }

    .content {
        position: absolute;
        display:flex;
        flex-direction: column;
        border-radius: 20px;
        padding: 40px 20px;
        background-color: aquamarine;
        width: 15vw;
        height: 10vh;
    }

    p {
        text-align:center;
    }

    /*
    .task {
        text-decoration: none;
        cursor: pointer;
        gap: 16px;
        margin-bottom: 16px;
        color: #fff;
        border-radius: 20px;
        padding: 28px 32px;
        background-color: pink;
    }
    */



    .status-button {
        width: 4px;
        height: 10px;
        font-size: 12px;
        margin-right: 30px;
        align-items: center;
        justify-content: center;
        padding: 8px 30px;
        border-radius: 10px;
    }

    .flex {
        display: flex;
    }

    span {
        align-items: center;
    }

    .todo::before {
        background-color: green;
    }
    .todo {
        color: green;
        background-color: black;
    }

    .inprogress::before {
        background-color: yellow;
    }
    .inprogress {
        color: yellow;
        background-color: black;
    }

    .pendingreview::before {
        background-color: blue;
    }
    .pendingreview {
        color: blue;
        background-color: black;
    }

    .completed::before {
        background-color: pink;
    }
    .completed {
        color: pink;
        background-color: black;
    }



</style>