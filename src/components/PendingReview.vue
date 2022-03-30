<template>
    <router-link style="text-decoration: none; color: inherit; " :to="{name:'ToDoTaskDetails', params: {taskId: task['id']}}">
    <div class="pendingreview">
        <div class="top flex flex-row">
            <div class="title">{{task['taskname']}}</div>
            <div class="status-button flex todoButton">
               
                <div>
                    <p>Pending Review</p>
                </div>
                
            </div>
        </div>
        <div class="duedate">
            <p>
                 Due date: {{duedate}}
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
    export default {
        name: 'PendingReview',
        props: {
            task:Object,
        },
        data() {
            return {
                duedate: new Date(this.task['duedate']['seconds']).toLocaleDateString('en-us',{year: "numeric", month: "short", day: "numeric"}),
                dateOptions: {year: "numeric", month: "short", day: "numeric"},
            }
        },
        watch: {
        },
    }
</script>

<style scoped>

    .pendingreview {
        background-color: hsl(202, 54%, 56%);
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