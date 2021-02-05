<script lang="ts">
    import Timer from "./components/Timer.svelte";
    import PunchIn from "./components/PunchIn.svelte";
    import { onMount } from "svelte";

    let punchInTime: number = getPunchInTime();
    let duration: number = (8 * 60 + 30) * 60 * 1000;

    onMount(() => {});

    function getPunchInTime(): number {
        const punchIn = localStorage.getItem("punchIn");
        if (punchIn) {
            return parseInt(punchIn);
        } else {
            return Date.now();
        }
    }
</script>

<div style="height:100%" class="d-flex justify-content-center align-items-center">
    <div class="d-flex flex-column">
        <div class="d-flex justify-content-center p-2">
            <PunchIn bind:punchInTime />
        </div>
        <div class="d-flex justify-content-center p-2">
            <Timer bind:from={punchInTime} {duration} />
        </div>
        <div class="d-flex justify-content-center p-2">
            {new Date(punchInTime).toLocaleTimeString()}
        </div>
    </div>
</div>

<style>
    @import url("https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css");
</style>
