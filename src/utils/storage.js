class Storage {
  get(key) {
    return window.localStorage.getItem(key);
  }

  set(key, data) {
    const value = JSON.stringify(data);
    window.localStorage.setItem(key, value);
  }

  remove(key) {
    window.localStorage.removeItem(key);
  }
}

export default Storage;
