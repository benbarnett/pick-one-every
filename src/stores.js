import { writable } from "svelte/store";

export const options = writable([
  { text: "One" },
  { text: "Two" },
  { text: "Three" },
]);
