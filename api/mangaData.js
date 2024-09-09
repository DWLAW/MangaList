import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getManga = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/Mangas.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const deleteManga = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/Mangas/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

const getSingleManga = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/Mangas/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const createManga = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/Mangas.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateManga = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/Mangas/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getMangaByCategory = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/Mangas.json?orderBy="category_id"&equalTo="${firebaseKey}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const favoriteManga = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/Mangas.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const onSale = Object.values(data).filter((item) => item.sale);
      resolve(onSale);
    })
    .catch(reject);
});

export {
  getManga,
  createManga,
  favoriteManga,
  deleteManga,
  getSingleManga,
  updateManga,
  getMangaByCategory,
};
