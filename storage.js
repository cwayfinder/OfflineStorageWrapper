Storage = (function () {

  function createLSProvider() {
    function save(key, value) {
      localStorage.setItem(key, JSON.stringify(value));
    }

    function get(key) {
      return JSON.parse(localStorage.getItem(key));
    }

    function getAll() {
      var result = {};
      for (var key in localStorage) {
        console.log(key);
        result[key] = get(key);
      }

      return result;
    }

    return {
      save: save,
      get: get,
      getAll: getAll
    }
  }

  function createIDBProvider() {
    function save(key, value) {

    }

    function get(key) {

    }

    function getAll() {

    }

    return {
      save: save,
      get: get,
      getAll: getAll
    }
  }


  function getProvider(storageType) {
    return providers[storageType || LOCAL_STORAGE];
  }

  function save(key, value, storageType) {
    getProvider(storageType).save(key, value);
  }

  function get(key, storageType) {
    return getProvider(storageType).get(key);
  }

  function getAll(storageType) {
    return getProvider(storageType).getAll();
  }

  const LOCAL_STORAGE = 'localStorage'; // constant
  const INDEXED_DB = 'indexedDB'; // constant

  const providers = {};
  providers[LOCAL_STORAGE] = createLSProvider();
  providers[INDEXED_DB] = createIDBProvider();


  return {
    LOCAL_STORAGE: LOCAL_STORAGE,
    INDEXED_DB: INDEXED_DB,

    save: save,
    get: get,
    getAll: getAll
  }
})();
