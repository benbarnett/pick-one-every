<script>
  export let seconds;
</script>

<div>
  <input placeholder="how many?" bind:value={seconds} />
  seconds
</div>

<style>
  input {
    max-width: 100px;
  }
</style>
