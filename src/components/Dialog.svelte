<script lang="ts">
    import TimeInput from "./TimeInput.svelte";
    import { workDuration } from "../store/store";
    let duration: number = $workDuration;
    let message: string = "";
    function setNewWordDuration() {
        workDuration.set(duration);
        message = "New vaue has been set!";
    }
</script>

<div class="d-flex flex-column">
    <div class="d-flex justify-content-center p-2">
        <TimeInput id="workduration" bind:value={duration} />
    </div>
    <div class="d-flex justify-content-center p-2">
        <button class="btn btn-secondary ml-2 mr-2" on:click={() => setNewWordDuration()}> SAVE</button>
    </div>
    {message}
</div>
