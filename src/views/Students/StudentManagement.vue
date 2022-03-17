<template>
    <div>
     <Task v-if="finalTask" v-for="(task,index) in finalTask" :task="task" :key="index"/>
    </div>
</template>

<script>
import Task from '../../components/Task.vue'
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
                    
                })
              }
            })
        curr.finalTask = finalTask
      }
      getTasks()
    },
    components: {
        Task,
    },

}
</script>

<style scoped>
    
</style>