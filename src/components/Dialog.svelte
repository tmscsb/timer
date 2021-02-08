<script lang="ts">
    import Punch from "../components/Punch.svelte";

    let durationTime: number = getDuration();

    function getDuration(): number {
        const duration = localStorage.getItem("duration");
        if (duration) {
            return parseInt(duration);
        } else {
            return 0;
        }
    }
</script>

<div class="d-flex justify-content-center p-2">
    <Punch bind:punchTime={durationTime} type="duration" />
</div>
