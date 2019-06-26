<template>
    <div class="todoapp">
        <div class="header"><span>Task List:</span><span>{{complete}}/{{total}}</span></div>
        <TodoInsert v-on:addTodo="addTodo" />
        <div class="empty-msg" v-if="todolist.length < 1">No tasks to be completed</div>
        <div class="todo-container">
            <transition-group name="list">
                <div  v-bind:key="todo.id" v-for="todo in todolist" class="todo-item">
                    <TodoItem v-bind:todo="todo" v-on:deleteTodo="deleteTodo" v-on:toggleTodo="toggleTodo"/>
                </div>
            </transition-group>
        </div>
    </div>
</template>
<script>
import TodoItem from './TodoItem.vue'
import TodoInsert from './TodoInsert.vue'

const uuidv4 = require('uuid/v4');

export default {
    name: 'todoapp',
    components: {
        TodoItem,
        TodoInsert
    },
    data(){
        return {
            total: 0,
            complete: 0,
            todolist: []
        }
    },created(){
        if(JSON.parse(localStorage.getItem("project_nt-todolist")) != null){
            this.todolist = JSON.parse(localStorage.getItem("project_nt-todolist"));
        }
        if(this.todolist != []){
            this.total = this.todolist.length;
            this.complete = this.todolist.filter((todo)=>{if(todo.completed == true) return todo;}).length;
        }
    }, methods: {
        addTodo: function(task){
            this.todolist = [...this.todolist, {
                id: uuidv4(),
                todo: task,
                completed: false
            }];
            localStorage.setItem("project_nt-todolist", JSON.stringify(this.todolist));
            this.total += 1;
        },
        deleteTodo: function(id, completed){
            if(completed) this.complete -= 1;
            this.total -= 1;
            this.todolist = this.todolist.filter((todo)=>{if(todo.id != id) return todo;})
            localStorage.setItem("project_nt-todolist", JSON.stringify(this.todolist));
        },
        toggleTodo: function(id, completed){
            for (let todo of this.todolist){
                if(todo.id == id){
                    todo.completed = !completed;
                }
            }
            if(!completed){
                this.complete += 1;
            } else {
                this.complete -= 1;
            }
            localStorage.setItem("project_nt-todolist", JSON.stringify(this.todolist));
        }
    }
}
</script>
<style scoped>
.todoapp{
    font-family: monospace;
    background-image: linear-gradient(to top right, #FE6F6F, #FE7576);
    grid-column: span 1;
    grid-row: span 2;
    font-size: 25px;
    color: white;
    padding: 10px;
    max-height: 100vh;
    display: flex;
    flex-direction: column;
}
.header{
    display: flex;
    justify-content: space-between;
    flex-direction: row;
}
.empty-msg{
    font-size: 16px;
    text-align: center;
    padding: 20px 15px;
}
.todo-container{
    margin-top: 10px;
    overflow-y: auto;
    height: 100%;
}
.list-enter-active, .list-leave-active {
    transition: all 0.5s;
}
.list-enter, .list-leave-to {
    opacity: 0;
  
}
.list-enter{
    transform: translateY(10px);
}
</style>
