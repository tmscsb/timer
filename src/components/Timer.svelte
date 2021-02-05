<script lang="ts">
    import type { Time } from "../types/Time";
    import { onMount } from "svelte";

    export let from: number;
    export let duration: number;
    let timer: Time;
    let uptimer: Time;

    let clock: number;
    let upclock: number;

    onMount(() => {
        if (from + +duration > Date.now()) {
            clock = startClock();
        } else {
            upclock = starUpClock();
        }
    });

    function getTimeRemaining(fromTime: number, duration: number): Time {
        const total = fromTime + duration - Date.now();
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
        const days = Math.floor(total / (1000 * 60 * 60 * 24));

        const t = fillWithLeadingZero({
            total,
            days,
            hours,
            minutes,
            seconds,
        });
        return t;
    }

    function getTimeFromUp(fromTime: number, duration: number): Time {
        const total = -(fromTime + +duration - +Date.now());
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
        const days = Math.floor(total / (1000 * 60 * 60 * 24));

        const t = fillWithLeadingZero({
            total,
            days,
            hours,
            minutes,
            seconds,
        });
        return t;
    }

    function fillWithLeadingZero(time: Time): Time {
        let t: Time = time;
        t.hoursWithL0 = t.hours < 10 ? "0" + t.hours.toString() : t.hours.toString();
        t.minutesWithL0 = t.minutes < 10 ? "0" + t.minutes.toString() : t.minutes.toString();
        t.secondsWithL0 = t.seconds < 10 ? "0" + t.seconds.toString() : t.seconds.toString();
        return t;
    }

    function startClock(): number {
        const timeinterval = setInterval(() => {
            timer = getTimeRemaining(from, duration);
            if (timer.total <= 0) {
                clearInterval(timeinterval);
            }
        }, 1000);
        return timeinterval;
    }
    function stopClock(interval: number) {
        clearInterval(interval);
    }

    function starUpClock(): number {
        const timeinterval = setInterval(() => {
            uptimer = getTimeFromUp(from, duration);
            if (uptimer.total <= 0) {
                clearInterval(timeinterval);
            }
        }, 1000);
        return timeinterval;
    }
</script>

<div>
    <button on:click={() => (clock = startClock())}> START</button>
    <button on:click={() => stopClock(clock)}> STOP</button>

    {#if timer && from && duration}
        <h1>
            - {timer.hoursWithL0} : {timer.minutesWithL0} : {timer.secondsWithL0}
        </h1>
    {:else if uptimer && from && duration}
        <h1>
            + {uptimer.hoursWithL0} : {uptimer.minutesWithL0} : {uptimer.secondsWithL0}
        </h1>
    {:else}
        <h1>-- : -- : --</h1>
    {/if}
</div>

<style scoped>
    div {
        width: 400px;
        margin: 0 auto;
    }

    h1 {
        color: #ff3e00;
        margin: 0 auto;
        text-transform: uppercase;
        font-size: 4em;
        font-weight: 100;
    }
</style>
