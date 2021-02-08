<script lang="ts">
    import Timer from "./components/Timer.svelte";
    import Punch from "./components/Punch.svelte";

    import Content from "./components/Content.svelte";
    import Modal from "svelte-simple-modal";

    import { onMount } from "svelte";

    let punchInTime: number = getPunchInTime();
    let duration: number = getDurationTime();

    onMount(() => {});

    function getPunchInTime(): number {
        const punchIn = localStorage.getItem("punchIn");
        if (punchIn) {
            return parseInt(punchIn);
        } else {
            return Date.now();
        }
    }

    function getDurationTime(): number {
        const duration = localStorage.getItem("duration");
        if (duration) {
            return parseInt(duration);
        } else {
            localStorage.setItem("duration", ((8 * 60 + 30) * 60 * 1000).toString());
            return (8 * 60 + 30) * 60 * 1000;
        }
    }
</script>

<div style="height:100%" class="d-flex justify-content-center align-items-center">
    <div class="d-flex flex-column">
        <div class="d-flex justify-content-center p-2">
            <Modal>
                <Content />
            </Modal>
        </div>
        <div class="d-flex justify-content-center p-2">
            <Punch bind:punchTime={punchInTime} type="punchIn" />
        </div>
        <div class="d-flex justify-content-center p-2">
            <Timer bind:from={punchInTime} {duration} />
        </div>
        <div class="d-flex justify-content-center p-2">
            Punch In Time: {new Date(punchInTime).toLocaleTimeString()}
        </div>
        <div class="d-flex justify-content-center">
            Punch Out TIme: {new Date(punchInTime + +duration).toLocaleTimeString()}
        </div>
    </div>
</div>

<style>
    @import url("https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css");
</style>
