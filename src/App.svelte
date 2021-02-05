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

<main>
    <PunchIn bind:punchInTime />
    <Timer bind:from={punchInTime} {duration} />
    {new Date(punchInTime).toLocaleTimeString()}
</main>

<style>
    @import url("https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css");
    main {
        text-align: center;
    }

    /* h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	} */
</style>
