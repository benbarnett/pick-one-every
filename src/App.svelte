<script>
  import { onMount } from "svelte";

  import List from "./List.svelte";
  import Frequency from "./Frequency.svelte";
  import Picker from "./Picker.svelte";

  import { options } from "./stores";

  onMount(() => {
    if (window.location.hash?.length > 1) {
      const duHashedMich = atob(window.location.hash.slice(1))
        .split("||")
        .map((option) => ({ text: option }));
      options.set(duHashedMich);
    }

    options.subscribe((options) => {
      const hashedOptions = btoa(options.map(({ text }) => text).join("||"));
      window.location.hash = hashedOptions;
    });
  });

  let seconds = 2;
  let mode = "edit";
  let limit = "once";
</script>

<svelte:head>
  <title>Pick one every...</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Mochiy+Pop+P+One&family=Outfit:wght@300&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<main>
  {#if mode === "edit"}
    <div class="content">
      <h1>Randomly pick one of these:</h1>
      <List />

      <div class="columns">
        <div class="column">
          <h2>Every:</h2>
          <Frequency bind:seconds />
        </div>

        <div class="column">
          <h2>Until:</h2>

          <select bind:value={limit}>
            <option value="once">Each has been picked once</option>
            <option value="forever">Forever</option>
          </select>
        </div>
      </div>
    </div>

    <div class="cta">
      <button on:click={() => (mode = "view")} class="large">GO!</button>
    </div>
  {:else}
    <div class="content picker">
      <Picker interval={seconds * 1000} {limit} />
    </div>
    <div class="cta">
      <button on:click={() => (mode = "edit")}>Change options</button>
    </div>
  {/if}
</main>

<style>
  * {
    font-family: "Outfit", sans-serif;
  }
  :global(body) {
    background: #861657;
    color: white;
  }
  main {
    text-align: center;
    padding: 0 1em;
    height: 100%;
    margin: 0 auto;
    display: grid;
    grid-template-rows: 4fr 1fr;
    grid-template-areas:
      "content"
      "cta";
  }

  .content {
    grid-area: content;
  }

  .picker {
    align-self: center;
  }
  .cta {
    grid-area: cta;
    align-self: flex-end;
  }
  h1,
  h2 {
    color: #fcf0cc;
    text-transform: uppercase;
    font-size: 3em;
    margin: 1em 0 0.5em;
  }

  h2 {
    font-size: 1.6em;
  }

  :global(button) {
    margin: 30px;
    padding: 20px;
    font-size: 1em;
    color: #fcf0cc;
    background-color: #d56aa0;
    font-weight: bold;
    border: none;
    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
    border-radius: 3px;
  }

  :global(*:focus) {
    outline: 2px solid #bbdbb4;
  }

  button.large {
    font-size: 2em;
    padding-left: 60px;
    padding-right: 60px;
  }

  @media (min-width: 640px) {
    h1,
    h2 {
      margin-bottom: 1em;
    }
    .columns {
      display: flex;
      max-width: 60%;
      margin: 0 auto;
    }
    .column {
      flex: 1 1 50%;
      justify-content: flex-start;
    }
  }
</style>
