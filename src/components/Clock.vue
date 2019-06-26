<template>
    <div class="clock">
        <p class="date" v-text="date"></p>
        <p class="time">{{ time }}</p>
        <p class="lunch">{{lunch}}</p>
    </div>
</template>
<script>
export default {
    name: 'clock',
    data() {
        return {
            time: '',
            date: '',
            lunch: '',
            counter: 0
        }
    },
    methods: {
        updateClock: function() {
            let week = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
            let cd = new Date();
            this.time = this.zeroPadding(cd.getHours(), 2) + ':' + this.zeroPadding(cd.getMinutes(), 2) + ':' + this.zeroPadding(cd.getSeconds(), 2);
            this.date = this.zeroPadding(cd.getFullYear(), 4) + '-' + this.zeroPadding(cd.getMonth()+1, 2) + '-' + this.zeroPadding(cd.getDate(), 2) + ' ' + week[cd.getDay()];
            if(cd.getHours() < 12){
                let lunchtime = new Date();
                lunchtime.setHours(12)
                lunchtime.setMinutes(0);
                lunchtime.setSeconds(0);
                let secondsleft = (lunchtime - cd)/1000;
                let hours = parseInt(secondsleft/3600);
                let minutes = parseInt((secondsleft%3600)/60);
                let seconds = parseInt((secondsleft%3600)%60);
                this.lunch = `${this.zeroPadding(hours, 2)}:${this.zeroPadding(minutes,2)}:${this.zeroPadding(seconds,2)} until lunch`;
            }else if(cd.getHours() == 12) {
                this.lunch = 'Time for lunch';
            } else {
                this.lunch = 'How was lunch?';
            }
        },
        zeroPadding: function(num, digit) {
            var zero = '';
            for(var i = 0; i < digit; i++) {
                zero += '0';
            }
            return (zero + num).slice(-digit);
        }
    },
    created() {
        setInterval(() => {
            this.updateClock();
        }, 1000);
    }
}
</script>

<style scoped>
.clock{
    grid-row: span 2;
    grid-column: span 2;
    color: white;
    height: 100%;
    width: 100%;
    background-image: linear-gradient(to top right, #3834AE, #4947B5);
    font-family: monospace;
    font-weight: 100;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center; 
}
.clock:hover > .date{
    font-size: 35px
}
.clock:hover > .time{
    font-size: 70px
}
.clock:hover > .lunch{
    font-size: 35px
}
.date{
    transition: 0.4s;
    display: block;
    font-size: 30px;
}
.time{
    transition: 0.4s;
    display: block;
    font-size: 60px;
}
.lunch{
    transition: 0.4s;
    display: block;
    font-size: 30px;
}
</style>