<script lang="ts">
    import type { Time } from "../types/Time";
    import { onMount } from "svelte";

    export let from: number;
    export let duration: number;
    let timer: Time;

    onMount(() => {});

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

    function fillWithLeadingZero(time: Time): Time {
        let t: Time = time;
        t.hoursWithL0 =
            t.hours < 9 ? "0" + t.hours.toString() : t.hours.toString();
        t.minutesWithL0 =
            t.minutes < 9 ? "0" + t.minutes.toString() : t.minutes.toString();
        t.secondsWithL0 =
            t.seconds < 9 ? "0" + t.seconds.toString() : t.seconds.toString();
        return t;
    }

    function initializeClock() {
        const timeinterval = setInterval(() => {
            timer = getTimeRemaining(from, duration);
            if (timer.total <= 0) {
                clearInterval(timeinterval);
            }
        }, 1000);
    }
</script>

<main>
    {#if timer && from && duration}
        <h1>
            {timer.hoursWithL0} : {timer.minutesWithL0} : {timer.secondsWithL0}
        </h1>
    {:else}
        <h1>-- : -- : --</h1>
    {/if}
</main>

<style scoped>
    h1 {
        color: #ff3e00;
        text-transform: uppercase;
        font-size: 4em;
        font-weight: 100;
        width: 300px;
    }
</style>
