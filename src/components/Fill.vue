<template>
    <div class="fill">
        <video autoplay muted loop id="video">
            <source src="../assets/shootingstar.mp4" type="video/mp4">
        </video>
    </div>
</template>
<script>
export default {
    name: 'fill'
}
</script>
<style scoped>
.fill{
    position: relative;
    grid-row: span 1;
    grid-column: span 1;
    background-image: linear-gradient(to top right, #FE6F6F, #FE7576);
    display: flex;
}
#video { 
    height: 100%;
    width: 100%;
}
</style>


