<script lang="ts">
    import TimeInput from "./TimeInput.svelte";
    import { workDuration } from "../store/store";
</script>

<div class="d-flex justify-content-center p-2">
    <TimeInput value={$workDuration} />
</div>
