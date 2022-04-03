<template>
    <router-link style="text-decoration: none; color: inherit; " 
        :to="{name:'ToDoView', 
            params: {
                projectId: task['projectId'],
                projectTitle: task['projectTitle'],
                taskId: task['taskId'],
                shortdescription: task['shortdescription'],
                duedate: task['duedate'],
                taskname: task['taskname'],
                issuedate: task['issueDate'],
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
            <div class="status-button flex todoButton">
               
                <div>
                    <p>To Do</p>
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
            projectTitle:String,
            projectId:String

        },
        mounted() {
            const curr = this 
            console.log(curr.task)

        },
        data() {
            return {
                duedate: this.task.duedate,
                dateOptions: {year: "numeric", month: "short", day: "numeric"},
            }
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
        /*background-color: aquamarine;*/
        border-radius: 20px;
        padding: 30px 20px;
        /*margin-right:5px;
        margin-left:5px;
        margin-bottom: 4px;*/
        text-decoration: none;
        margin: 15px 5px;
        box-shadow: 10px 10px 15px rgba(0, 0, 0, 0.15);
        height: 170px;
        text-align: left;
    }
    p {
        margin: 0px;
    }

    .title {
        height: 20px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1; /* number of lines to show */
        line-clamp: 1;
        -webkit-box-orient: vertical;
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
        background-color: #73AD8E; /*rgb(54, 179, 110);*/
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
        padding-top: 10px;
        padding-bottom: 10px;;
    }

    .inprogressButton {

    }

    .pendingreviewButton {

    }

    .completedButton {

    }

    .duedate {
        font-size:13px;
        margin-top:-7px;
    }
    
    .short {
        font-size:13px;
        margin-top:5px;
        height: 63px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3; /* number of lines to show */
        line-clamp: 3;
        -webkit-box-orient: vertical;
    }

</style>