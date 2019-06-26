<template>
    <div class="todoinsert">
        <form v-on:submit="addTodo">
        <input type="text" v-model="task" placeholder="New Task">
        </form>
    </div>
</template>
<script>
export default {
    name:"todoinsert",
    data(){
        return {
            task: ''
        }
    },
    methods:{
        addTodo: function(e){
            e.preventDefault();
            //alert(this.task);
            if(this.task != ''){
                this.$emit('addTodo', this.task);
                this.task = '';
            }
        }
    }
}
</script>
<style scoped>
.todoinsert{
    margin-top: 10px;
}
input{
    width:100%;
    font-size: 20px;
    font-family: monospace;
    border: none;
    background-color: white;
    border-radius: 25px;
    padding: 5px 15px;
}
input::placeholder{
    color: grey;
}
input:focus{
    outline: none;
    box-shadow: 0px 0px 1px 1px WHITESMOKE;
}
input:hover{
    box-shadow: 0px 0px 1px 1px WHITESMOKE;
}
</style>
