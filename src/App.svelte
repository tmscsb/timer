<script lang="ts">
    import Timer from "./components/Timer.svelte";
    import TimeInput from "./components/TimeInput.svelte";

    import Content from "./components/Content.svelte";
    import Modal from "svelte-simple-modal";

    import { punchInTime, workDuration } from "./store/store";
    import {
        dateFormatter,
        numberToHour,
        dateFromTimeMilis,
        dateMiliSecondsFromTimeMilis,
    } from "./helper/dateHelper";

    let punchInDateTime: number = dateMiliSecondsFromTimeMilis($punchInTime);

    punchInTime.subscribe((value) => {
        punchInDateTime = dateMiliSecondsFromTimeMilis(value);
    });
</script>

<div
    style="height:100%"
    class="d-flex justify-content-center align-items-center"
>
    <div class="d-flex flex-column">
        <div class="d-flex justify-content-center p-2">
            <Modal>
                <Content />
            </Modal>
        </div>
        <div class="d-flex justify-content-center p-2">
            <TimeInput id="punchInTime" bind:value={$punchInTime} />
        </div>
        <div class="d-flex justify-content-center p-2">
            <Timer bind:from={punchInDateTime} bind:duration={$workDuration} />
        </div>
        <div class="d-flex justify-content-center p-2">
            Punch In Time: {dateFormatter.format(
                dateFromTimeMilis($punchInTime)
            )}
        </div>
        <div class="d-flex justify-content-center">
            Punch Out Time: {dateFormatter.format(
                dateFromTimeMilis($punchInTime + +$workDuration)
            )}
        </div>
        <div class="d-flex justify-content-center">
            Work time: {numberToHour($workDuration)}
        </div>
    </div>
</div>

<style>
    @import url("https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css");
</style>
