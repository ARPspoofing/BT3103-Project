<template>
<!--
    <router-link style="text-decoration: none; color: inherit; " :to="{name:'ToDoView', params: {task:task,
        taskId: task['id'], projectId:task['projectId'], projectTitle:this.task['projectTitle'], duedate:this.duedate}}">
        -->
    <div class="todo" @click="getData">
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
    <!--
    </router-link>  
    -->

    
</template>

<script>
import * as moment from 'moment'
import ToDoView from '../views/Students/ToDoView.vue'
    export default {
        name: 'ToDo',
        props: {
            task:Object,
            projectTitle:String,
            projectId:String

        },
        components: {
          ToDoView,
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
            getData() {
              this.$emit('getData',this.task)
            }

        }
    }
</script>

<style scoped>

    .todo {
        /*background-color: aquamarine;*/
        border-radius: 20px;
        padding: 40px 20px;
        /*margin-right:5px;
        margin-left:5px;
        margin-bottom: 4px;*/
        text-decoration: none;
        margin: 15px 5px;
        box-shadow: 10px 10px 15px rgba(0, 0, 0, 0.15);
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