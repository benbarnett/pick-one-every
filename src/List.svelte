<script>
  import { tick } from "svelte";
  import { options } from "./stores";

  async function add() {
    options.update((o) => o.concat({ text: "" }));

    await tick();

    const inputs = document.querySelectorAll(".option");
    if (inputs.length) {
      inputs[inputs.length - 1].focus();
    }
  }

  function remove(i) {
    options.update((o) => o.filter((_, index) => i !== index));
  }
</script>

{#each $options as option, i}
  <div>
    <button
      disabled={$options.length === 1}
      on:click={() => {
        remove(i);
      }}>Remove</button
    >
    <input
      placeholder="Option to be picked?"
      bind:value={option.text}
      class="option"
    />
  </div>
{/each}

<button on:click={add}>Add new</button>

<style>
  button {
    font-size: 1em;
    margin: 0;
    padding: 7px;
  }
</style>
