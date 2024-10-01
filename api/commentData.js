import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

// GET ALL COMMENTS
const getComments = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/comments`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

// GET COMMENTS BY POST ID
const getCommentsByMangaId = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/comments?manga_id=${firebaseKey}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

// GET ALL COMMENTS MADE BY A SINGLE USER
const getCommentsForSingleUser = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/comments?uid=${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

// GET A SINGLE COMMENT
const getSingleComment = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/comments/${firebaseKey}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

// CREATE COMMENT
const createComment = (userId, firebaseKey, comment) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/manga/${firebaseKey}/manga_comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user: userId,
      content: comment.content,
    }),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// UPDATE COMMENT
const updateComment = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/comments/${payload.firebaseKey}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// DELETE COMMENT
const deleteComment = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/comments/${firebaseKey}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response)
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  getComments, getCommentsByMangaId, getCommentsForSingleUser, getSingleComment, createComment, updateComment, deleteComment,
};
