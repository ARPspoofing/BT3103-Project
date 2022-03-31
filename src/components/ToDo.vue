<template>
    <router-link style="text-decoration: none; color: inherit; " 
        :to="{name:'ToDoView', 
            params: {
                taskId: task['id'],
                shortdescription: task['shortdescription'],
                duedate: task['duedate'],
                taskname: task['taskname'],
                status:task['status'],
                todo: task['todo'],
                inprogress: task['inprogress'],
                pendingreview: task['pendingreview'],
                completed: task['completed']
            }
        }"
    >
    <div class="todo">
        <div class="top flex flex-row">
            <div class="title">{{task['taskname']}}</div>
            <div class="status-button flex" :class="{todoButton:task['todo'],inprogressButton:task['inprogress'],pendingreviewButton:task['pendingreview'],completedButton:task['completed']}">
                <div v-if="task['todo']">
                    <p>Todo</p>
                </div>
                <div v-if="task['inprogress']">
                    <p>In-Progress</p>
                </div>
                <div v-if="task['pendingreview']">
                    <p>Pending Review</p>
                </div>
                <div v-if="task['completed']"> 
                    <p>Completed</p>
                </div>
            </div>
        </div>
        <div class="duedate">
            <p>
                 Due date: {{formatDate(task["duedate"])}}
            </p>
        </div>
       
        <div class="short">
        <p>
            Short Description: {{task['shortdescription']}}
        </p>
        </div>          
    </div>  
    </router-link>  

    
</template>

<script>
import * as moment from 'moment'
    export default {
        name: 'ToDo',
        props: {
            task:Object,
        },
        data() {
            // return {
            //     duedate: new Date(this.task['duedate']['seconds']).toLocaleDateString('en-us',{year: "numeric", month: "short", day: "numeric"}),
            //     dateOptions: {year: "numeric", month: "short", day: "numeric"},
            // }
        },
        watch: {
        },
        methods: {
            formatDate(date) {
                return moment(date).format("DD MMMM YYYY");
            },
        }
    }
</script>

<style scoped>

    .todo {
        background-color: aquamarine;
        border-radius: 20px;
        padding: 40px 20px;
        margin-right:5px;
        margin-left:5px;
        margin-bottom: 4px;
        text-decoration: none;
    }

    .flex {
        display: flex;
    }

    .flex-row {
        flex-direction: row;
    }

    a {
        height:200px;
    }

    .duedate {
        width:15vw;
    }

    .todo {
        color: white;
        background-color: rgb(54, 179, 110);
    }

    .inprogress {
        color: white;
        background-color: rgb(245, 116, 11);
    }

    .pendingreview {
        color: white;
        background-color: rgb(102, 117, 245);
    }

    .completed {
        color: white;
        background-color: rgb(187, 111, 231);
    }

     .status-button {
        width: 4px;
        height: 10px;
        font-size: 12px;
        justify-self: start;
        align-items: center;
        justify-content: center;
        padding: 8px 30px;
        border-radius: 10px;
        margin-left: auto;
    }

    .top {
        margin-bottom: 15px;
        margin-top:-15px;
    }

    
    .todoButton {
        background-color: rgb(230, 121, 139);
    }

    .inprogressButton {

    }

    .pendingreviewButton {

    }

    .completedButton {

    }

    .duedate {
        font-size:12px;
        margin-top:-15px;
    }
    



</style>