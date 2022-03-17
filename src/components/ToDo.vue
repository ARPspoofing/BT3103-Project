<template>
    <div class="task">
            <router-link style="text-decoration: none; color: inherit; " :to="{name:'ToDoTaskDetails', params: {taskId: task['id']}}">
                <div class="status-button flex" :class="{todo:task['todo'],inprogress:task['inprogress'],pendingreview:task['pendingreview'],completed:task['completed']}">
                    <span v-if="task['todo']">ToDo</span>
                    <span v-if="task['inprogress']">In-Progress</span>
                    <span v-if="task['pendingreview']">Pending Review</span>
                    <span v-if="task['completed']">Completed </span>
                </div>
                <span class="title">{{task['taskname']}}</span>
                <span class="duedate">{{task['duedate']}}</span>
                <span class="short">{{task['shortdescription']}}</span>
            </router-link>        
    </div>  

    
</template>

<script>
    export default {
        name: 'ToDo',
        props: ['task']
    }
</script>

<style scoped>

    .task {
        align-items:center;
        background-color: aquamarine;
        border-radius: 20px;
        padding: 40px 20px;
        background-color: aquamarine;
        width: 15vw;
        height: 10vh;
        margin-bottom: 4px;
        text-decoration: none;
    }

    .status-button {
        width: 4px;
        height: 10px;
        font-size: 12px;
        align-items: center;
        justify-content: center;
        padding: 8px 30px;
        border-radius: 10px;
    }

    .flex {
        display: flex;
    }

    a {
        width:15vw;
    }

    .duedate {
        width:15vw;
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