<script lang="ts">
    import type { Time } from "../types/Time";
    import { onMount } from "svelte";

    export let from: number;
    export let duration: number;
    let timer: Time;
    let clock: number;
    let clockIsWorking: boolean = false;

    onMount(() => {
        startClock();
    });

    function checkIfInPlus(): boolean {
        return from + +duration < Date.now();
    }

    function getTimeRemaining(): Time {
        let total = +from + +duration - Date.now();
        total = checkIfInPlus() ? -total : total;
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
        const days = Math.floor(total / (1000 * 60 * 60 * 24));

        return fillWithLeadingZero({
            total,
            days,
            hours,
            minutes,
            seconds,
        });
    }

    function fillWithLeadingZero(time: Time): Time {
        let t: Time = time;
        t.hoursWithL0 =
            t.hours < 10 ? "0" + t.hours.toString() : t.hours.toString();
        t.minutesWithL0 =
            t.minutes < 10 ? "0" + t.minutes.toString() : t.minutes.toString();
        t.secondsWithL0 =
            t.seconds < 10 ? "0" + t.seconds.toString() : t.seconds.toString();
        return t;
    }

    function startClock() {
        const timeinterval = setInterval(() => {
            timer = getTimeRemaining();
            if (timer.total <= 0) {
                clearInterval(timeinterval);
            }
        }, 1000);
        clockIsWorking = true;
        clock = timeinterval;
    }
    function stopClock() {
        clearInterval(clock);
        clockIsWorking = false;
    }
</script>

<div>
    <div class="d-flex justify-content-center pt-2">
        <button
            class="btn btn-secondary ml-2 mr-2"
            on:click={() => startClock()}
            disabled={clockIsWorking}
        >
            START</button
        >
        <button
            class="btn btn-secondary ml-2 mr-2"
            on:click={() => stopClock()}
            disabled={!clockIsWorking}
        >
            STOP</button
        >
    </div>
    <div>
        {#if timer && clockIsWorking}
            <h1>
                {#if checkIfInPlus()}+{:else}-{/if}
                {timer.hoursWithL0} : {timer.minutesWithL0} : {timer.secondsWithL0}
            </h1>
        {:else}
            <h1>-- : -- : --</h1>
        {/if}
    </div>
</div>

<style scoped>
    h1 {
        color: #ff3e00;
        text-transform: uppercase;
        font-weight: 100;
    }

    /* If the screen size is 601px wide or more, set the font-size of <div> to 80px */
    @media screen and (min-width: 601px) {
        h1 {
            font-size: 9vw;
        }
    }

    /* If the screen size is 600px wide or less, set the font-size of <div> to 30px */
    @media screen and (max-width: 600px) {
        h1 {
            font-size: 16vw;
        }
    }
</style>
