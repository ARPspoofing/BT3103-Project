<template>
  <!--<router-link style="text-decoration: none; color: inherit; " 
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
    >-->
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
      <div class="todo">
        <div class="top flex flex-row">
          <div class="title">
            <strong>{{ task["taskname"] }}</strong>
          </div>
          <div class="status-button flex todoButton">
            <div>
              <p id="status">To Do</p>
            </div>
          </div>
        </div>
        <div class="duedate">
          <p>Due date: {{ formatDate(task["duedate"]) }}</p>
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
          comments: task['comments'],
        },
      }"
    >
      <div class="todo">
        <div class="top flex flex-row">
          <div class="title">
            <strong>{{ task["taskname"] }}</strong>
          </div>
          <div class="status-button flex todoButton">
            <div>
              <p id="status">To Do</p>
            </div>
          </div>
        </div>
        <div class="duedate">
          <p>Due date: {{ formatDate(task["duedate"]) }}</p>
        </div>

        <div class="short">
          <p>Short Description: {{ task["shortdescription"] }}</p>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
import * as moment from "moment";

export default {
  name: "ToDo",
  props: {
    task: Object,
    projectTitle: String,
    projectId: String,
    description: String,
    user: String,
    comments: Array,
  },
  mounted() {
    const curr = this;
    //this.comments = JSON.parse(curr.task.comments)
    /*console.log(curr.task.comments);
    let c = curr.task.comments;
    console.log(curr.task);
    for (let i = 0; i < c.length; i++) {
      this.comments.push({
        user: c[i].user,
        //name: curr.task[i].name,
        comment: c[i].comment,
        date: c[i].date,
        //profPic: curr.task[i].profPic,
      });
      console.log(curr.comments);
    }
    console.log(curr.comments);*/
  },
  data() {
    return {
      duedate: this.task.duedate,
      dateOptions: { year: "numeric", month: "short", day: "numeric" },
      comments: [],
    };
  },
  watch: {},
  methods: {
    formatDate(date) {
      return moment(date).format("DD MMMM YYYY");
    },
  },
};
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
  height: 200px;
}

.duedate {
  width: 15vw;
}

.todo {
  color: white;
  background-color: #73ad8e; /*rgb(54, 179, 110);*/
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
  background-color: #bd9dcc;
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
  padding-top: 10px;
  padding-bottom: 10px;
}

.inprogressButton {
}

.pendingreviewButton {
}

.completedButton {
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
