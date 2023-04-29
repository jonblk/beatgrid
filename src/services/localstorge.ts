import { Reducer, Store } from "@reduxjs/toolkit";

// load store from local storage
export function load(key: string): any | undefined {
  try {
    const serializedState = localStorage.getItem(key);
    if (!serializedState) {
      return undefined;
    } else {
      return JSON.parse(serializedState);
    }
  } catch (err) {
    console.error(err);
    return undefined;
  }
}

// auto save to local storage on store change
export function autoSave(key: string, store: Store): void {
  store.subscribe(() => {
    const newState = store.getState();
    try {
      const serializedState = JSON.stringify(newState)
      localStorage.setItem(key, serializedState);
    } catch (err) {
      console.log(err)
    }
  });
}

// save state
export function saveState(name: string, state: any): void {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem(name, serializedState);
  } catch (err) {
    console.log(err)
  }
}