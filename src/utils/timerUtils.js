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
  //create an array to store and then sort entries
  const allTimeEntries = [];
  const allTimeKeys = [];
  let identifier = 'id';

  //sort by start time function
  function sortByStartDate(a,b){
    if (a.startTime > b.startTime)
      return -1;
    if (a.startTime < b.startTime)
      return 1;
    return 0;
  }

  // eslint-disable-next-line no-plusplus
  //Put all the values into an array, excluding everything without the prefix
  for (let i = 0; i < localStorage.length; i++) {
    const id = localStorage.key(i);
    if (!id.includes(KEY_PREFIX)) continue; // eslint-disable-line no-continue

    let entry = getTimeEntry(id);
    //manually add the id so that it is incudled in the sort
    entry[identifier] = id;
    allTimeEntries.push(entry);
  }

  //sort entries
  allTimeEntries.sort(sortByStartDate);

  //put the sorted entries back into an object
  let sortedTimeEntries = {};
  for (let j=0; j < allTimeEntries.length; j++){
    const id = allTimeEntries[j].id;
    const sortedEntry = getTimeEntry(id);
    sortedTimeEntries[id] = sortedEntry;
  }

  return sortedTimeEntries;
}
