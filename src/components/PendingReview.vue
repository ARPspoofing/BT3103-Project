<template>
  <div class="pendingreview" @click="getData">
    <div class="top flex flex-row">
      <div class="title">
        <strong>{{ task["taskname"] }}</strong>
      </div>
      <div class="status-button flex todoButton">
        <div>
          <p id="status">Pending</p>
        </div>
      </div>
    </div>
    <div class="top flex flex-row">
      <p>Due date: {{ duedate }}</p>
    </div>

    <div class="short">
      <p>Short Description: {{ trimmedSentence }}...</p>
    </div>
  </div>

  <!-- Non vuex non modal pop up business / student management. To uncomment if cannot finish business management vuex
  <div v-if="user == 'student'">
    <router-link
      style="text-decoration: none; color: inherit"
      :to="{
        name: 'ToDoView',
        params: {
          task: task,
          taskId: task['id'],
          projectId: task['projectId'],
          description: task['shortdescription'],
          projectTitle: this.task['projectTitle'],
          duedate: this.duedate,
        },
      }"
    >
      <div class="pendingreview">
        <div class="top flex flex-row">
          <div class="title">
            <strong>{{ task["taskname"] }}</strong>
          </div>
          <div class="status-button flex pendingreviewButton">
            <div>
              <p id="status">Pending</p>
            </div>
          </div>
        </div>
        <div class="duedate">
          <p>Due date: {{ duedate }}</p>
        </div>

        <div class="short">
          <p>Short Description: {{ task["shortdescription"] }}</p>
        </div>
      </div>
    </router-link>
  </div>
  <div v-else>
    <router-link
      style="text-decoration: none; color: inherit"
      :to="{
        name: 'BusinessToDoView',
        params: {
          task: task,
          taskId: task['id'],
          projectId: task['projectId'],
          description: task['shortdescription'],
          projectTitle: this.task['projectTitle'],
          duedate: this.duedate,
        },
      }"
    >
      <div class="pendingreview">
        <div class="top flex flex-row">
          <div class="title">
            <strong>{{ task["taskname"] }}</strong>
          </div>
          <div class="status-button flex pendingreviewButton">
            <div>
              <p id="status">Pending</p>
            </div>
          </div>
        </div>
        <div class="duedate">
          <p>Due date: {{ duedate }}</p>
        </div>

        <div class="short">
          <p>Short Description: {{ task["shortdescription"] }}</p>
        </div>
      </div>
    </router-link>
  </div>
-->
  <!-- <router-link style="text-decoration: none; color: inherit; " :to="{name:'ToDoView', params: {task:task,
        taskId: task['id'], projectId:task['projectId'], description: task['shortdescription'],projectTitle:this.task['projectTitle'], duedate:this.duedate}}">
    <div class="pendingreview">
        <div class="top flex flex-row">
            <div class="title"><strong>{{task['taskname']}}</strong></div>
            <div class="status-button flex pendingreviewButton">
               
                <div>
                    <p id="status">Pending</p>
                </div>
                
            </div>
        </div>
        <div class="top flex flex-row">
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
    -->
</template>

<script>
import * as moment from "moment";
export default {
  name: "PendingReview",
  props: {
    task: Object,
    projectTitle: String,
    projectId: String,
    user: String,
  },
  mounted() {
    const curr = this;
    //console.log(curr.task);
  },
  data() {
    return {
      duedate: this.task.duedate,
      dateOptions: { year: "numeric", month: "short", day: "numeric" },
      trimmedSentence: this.task["shortdescription"]
        .substr(0, 50)
        .substr(
          0,
          Math.min(
            this.task["shortdescription"].substr(0, 50).length,
            this.task["shortdescription"].substr(0, 50).lastIndexOf(" ")
          )
        ),
    };
  },
  methods: {
    formatDate(date) {
      return moment(date).format("DD MMMM YYYY");
    },
    getData() {
      this.$emit("getData", this.task);
      //console.log(this.task);
    },
  },
};
</script>

<style scoped>
.pendingreview {
  /* background-color: #FFAB2C; */
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
  width: 250px;
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
  height: 200px;
}

.duedate {
  width: 15vw;
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
  background-color: #71aed1;
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
  margin-top: -15px;
}

.todoButton {
  background-color: rgb(230, 121, 139);
}

.inprogressButton {
  background-color: rgb(230, 121, 139);
}

.pendingreviewButton {
  background-color: rgb(230, 121, 139);
  padding-top: 10px;
  padding-bottom: 10px;
  width: 70px;
}

.completedButton {
  background-color: rgb(230, 121, 139);
}

.duedate {
  font-size: 13px;
  margin-top: -7px;
}

.short {
  font-size: 13px;
  margin-top: 5px;
  height: 63px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* number of lines to show */
  line-clamp: 3;
  -webkit-box-orient: vertical;
}

#status {
  width: max-content;
  font-size: 12px;
  margin: 0px;
  color: white;
}
</style>
