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
    var db;
    var openRequest = indexedDB.open("myDb",1);

    openRequest.onupgradeneeded = function(e) {
      console.log("Upgrading DB");
      db = e.target.result;

      if(!db.objectStoreNames.contains("myObjectStore")) {
        db.createObjectStore("myObjectStore");
      }
    };

    openRequest.onsuccess = function(e) {
      console.log("Successfully connected to DB");
      db = e.target.result;
    };

    openRequest.onerror = function(e) {
      console.log("Error on connection to DB", e);
    };

    function save(key, value) {
      var transaction = db.transaction(["myObjectStore"],"readwrite");
      var store = transaction.objectStore("myObjectStore");

      var request = store.add(value,key);

      request.onerror = function(e) {
        console.log("Error",e.target.error.name);
      };
      request.onsuccess = function(e) {
        console.log("Woot! Saved it");
      };
    }

    function get(key) {
      var transaction = db.transaction(["myObjectStore"],"readonly");
      var store = transaction.objectStore("myObjectStore");

      var request = store.get(key);

      request.onsuccess = function(e) {
        var result = e.target.result;
        console.dir(result);
      }
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
