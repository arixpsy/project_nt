<template>

    <div class="td-item">
        <input type="checkbox" v-model="todo.completed" v-on:input="$emit('toggleTodo', todo.id, todo.completed)">
        <span class="todo" v-bind:class="{ strike: todo.completed}">{{todo.todo}}</span>
        <button class="delete-btn" v-on:click="$emit('deleteTodo', todo.id, todo.completed)"><font-awesome-icon icon="times" /></button>
    </div>
</template>
<script>
export default {
    name:"todoitem",
    props: ["todo"]
}
</script>
<style scoped>
.td-item{
    padding: 2px 0;
    display: grid;
    grid-template-columns: auto 1fr 20px;
    align-items: center;
    font-size: 16px;
}
.todo{
    margin-left: 10px;
    overflow: hidden;
}
.strike{
    text-decoration: line-through;
    color: grey;
}
.delete-btn{
    opacity: 0;
    border: none;
    background-color: rgba(0,0,0,0);
    outline: none;
    color: white;
    font-size: 18px;
    padding: 0 0;
    text-align: center;
    transition: ease-out 0.2s;
    border-radius: 50%;
    transition-property: opacity, background-color ;
}
.delete-btn:hover{
    background-color: grey;
}
.td-item:hover .delete-btn{
    opacity: 1;
}
</style>
