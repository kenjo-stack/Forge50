const Timer = {

    duration:120,
    remaining:120,
    interval:null,

    format(seconds){

        const m = Math.floor(seconds/60);
        const s = seconds%60;

        return `${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`;

    },

    update(){

        const display=document.getElementById("timerDisplay");

        if(display){

            display.textContent=this.format(this.remaining);

        }

    },

    start(){

        if(this.interval) return;

        this.interval=setInterval(()=>{

            this.remaining--;

            this.update();

            if(this.remaining<=0){

                this.finish();

            }

        },1000);

    },

    pause(){

        clearInterval(this.interval);

        this.interval=null;

    },

    reset(){

        this.pause();

        this.remaining=this.duration;

        this.update();

    },

    finish(){

        this.pause();

        this.remaining=0;

        this.update();

        if(navigator.vibrate){

            navigator.vibrate([300,150,300,150,600]);

        }

        this.playAlarm();

        alert("Rest Time Complete!");

    },

    playAlarm(){

        const ctx=new(window.AudioContext||window.webkitAudioContext)();

        const osc=ctx.createOscillator();

        const gain=ctx.createGain();

        osc.type="sine";

        osc.frequency.value=880;

        osc.connect(gain);

        gain.connect(ctx.destination);

        gain.gain.value=0.2;

        osc.start();

        osc.stop(ctx.currentTime+0.8);

    }

};

window.Timer=Timer;