import uuid from 'uuid/v1';

const KEY_PREFIX = 'minutero:';

function setTimeEntry(id, value) {
  localStorage.setItem(id, JSON.stringify(value));
}

export function getTimeEntry(id) {
  return JSON.parse(localStorage.getItem(id));
}

export function removeTimeEntry(id) {
  return localStorage.removeItem(id);
}

export function updateTimeEntry(id, timeEntryAttrs) {
  const oldTimeEntry = getTimeEntry(id);
  const newTimeEntry = Object.assign(oldTimeEntry, timeEntryAttrs);

  setTimeEntry(id, newTimeEntry);
}

export function createTimeEntry(timeEntry) {
  const id = `${KEY_PREFIX}${uuid()}`;

  setTimeEntry(id, timeEntry);
  return id;
}

export function fetchTimeEntries() {
  const allTimeEntries = [];

  function sortByStartDate(a,b){
    if (a.startTime > b.startTime)
      return -1;
    if (a.startTime < b.startTime)
      return 1;
    return 0;
  }

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < localStorage.length; i++) {
    const id = localStorage.key(i);
    if (!id.includes(KEY_PREFIX)) continue; // eslint-disable-line no-continue

    const entry = getTimeEntry(id);
    allTimeEntries.push(entry);
  }

  allTimeEntries.sort(sortByStartDate);

  return allTimeEntries;
}
