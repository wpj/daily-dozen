import { UpgradeDB } from 'idb';

import { Entry, StoredEntry } from '../types';

interface Api {
  Entry: {
    save(entry: Entry): Promise<StoredEntry>;
    getByDate(date: string): Promise<StoredEntry>;
  };
}

function create(): Api {
  const { openDb } = require('idb');
  const dbPromise = openDb('daily-dozen', 1, (upgradeDB: UpgradeDB) => {
    upgradeDB.createObjectStore('entries');
  });

  const idbEntries = {
    async get(key: string): Promise<StoredEntry> {
      const db = await dbPromise;
      return db
        .transaction('entries')
        .objectStore('entries')
        .get(key);
    },
    async set(key: string, val: StoredEntry) {
      const db = await dbPromise;
      const tx = db.transaction('entries', 'readwrite');
      tx.objectStore('entries').put(val, key);
      return tx.complete;
    },
    async delete(key: string): Promise<void> {
      const db = await dbPromise;
      const tx = db.transaction('entries', 'readwrite');
      tx.objectStore('entries').delete(key);
      return tx.complete;
    },
    async clear(): Promise<void> {
      const db = await dbPromise;
      const tx = db.transaction('entries', 'readwrite');
      tx.objectStore('entries').clear();
      return tx.complete;
    },
    async keys() {
      const db = await dbPromise;
      return db
        .transaction('entries')
        .objectStore('entries')
        .getAllKeys();
    },
  };

  return {
    Entry: {
      save(entry: Entry) {
        const { date, completed } = entry;
        return idbEntries.set(date, { completed });
      },
      getByDate(date: string) {
        return idbEntries.get(date);
      },
    },
  };
}

let db: Api;
export default function lazyCreateSingleton() {
  db = db || create();
  return db;
}
