<template>
<div v-if="finalTask.length > 0" class="wrapper-outer">
    <div class="wrapper">
        <h4>To-Do</h4>
        <ToDo v-if="finalTask" v-for="(task,index) in finalTask" :task="task" :key="index"/>
    </div>
    <div class="wrapper">
        <h4>IN PROGRESS</h4>
        <ToDo v-if="finalTask" v-for="(task,index) in finalTask" :task="task" :key="index"/>
    </div>
    <div class="wrapper">
        <h4>PENDING REVIEW</h4>
        <ToDo v-if="finalTask" v-for="(task,index) in finalTask" :task="task" :key="index"/>
    </div>
    <div class="wrapper">
        <h4>COMPLETED</h4>
        <ToDo v-if="finalTask" v-for="(task,index) in finalTask" :task="task" :key="index"/>
    </div>
    
</div>
    <div v-else class="empty flex flex-column">
        <img src="../../assets/empty.png">   
        <h3>You do not have any tasks yet</h3>
        <p>Tasks will only show up once you have accepted an offered project</p>
    </div>
</template>

<script>
import ToDo from '../../components/ToDo.vue'
import firebaseApp from '../../firebase.js';
import {getFirestore} from 'firebase/firestore';
import {doc,setDoc,collection,getDocs,deleteDoc} from 'firebase/firestore';
import {ref} from "vue"
import {useRouter} from "vue-router"
import Loading from '../../components/Loading.vue'
const db = getFirestore(firebaseApp)
const router = useRouter()


export default {
    name: "StudentManagement",
    data() {
        return {
            finalTask: [],
        }
    },
    methods: {
    },
    mounted() {
        const curr = this
        async function getTasks() {
          //Change "To-Do" to props later
          let database = await getDocs(collection(db,"Tasks"))
          var finalTask = []
          database.forEach((doc) => {
              //Change to dynamic props later
              if (doc.id.includes("ToDo")) {
                var data = doc.data()
                console.log(data)
                finalTask.push({
                    id: data.id,
                    comments: data.comments,
                    documents: data.documents,
                    currState: data.currState,
                    duedate: data.duedate,
                    taskname: data.taskname,
                    todo: data.todo,
                    inprogress: data.inprogress,
                    pendingreview: data.pendingreview,
                    completed: data.completed,
                    shortdescription: data.shortdescription,
                    
                })
              }
            })
        curr.finalTask = finalTask
      }
      getTasks()
    },
    components: {
        ToDo,
    },

}
</script>

<style scoped>
    .wrapper-outer {
        display: flex;
        flex-direction: row;
    }
    
    .wrapper {
        background-color: rgb(195, 238, 197);
        height:100vh;
        flex:1;
        align-items: center;
        justify-content: center;
        align-content: center;
        justify-items: center;
        margin-right:5px;
    }

    .empty {
        align-items: center;
    }   

    h3 {
        margin-top:-100px;
        font-size: 20px;  
    }

    p {
        text-align: center;
        font-size:12px;
        font-weight:300;
    }

</style>