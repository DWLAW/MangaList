import { getSingleCategory } from './categoryData';
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

export default viewMangaDetails;
