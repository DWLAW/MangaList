import { getSingleCategory } from './categoryData';
import { getCommentsByMangaId } from './commentData';
import { getSingleManga } from './mangaData';

const viewMangaDetails = (mangaFirebaseKey) => new Promise((resolve, reject) => {
  getSingleManga(mangaFirebaseKey)
    .then((mangaObject) => {
      getSingleCategory(mangaObject.category)
        .then((categoryObject) => {
          resolve({ categoryObject, ...mangaObject });
        });
    }).catch((error) => reject(error));
});

const viewMangaComments = (mangaFirebaseKey) => new Promise((resolve, reject) => {
  getSingleManga(mangaFirebaseKey)
    .then((mangaObject) => {
      getCommentsByMangaId(mangaObject.comments)
        .then((commentsObject) => {
          resolve({ commentsObject, ...mangaObject });
        });
    }).catch((error) => reject(error));
});

export { viewMangaComments, viewMangaDetails };
