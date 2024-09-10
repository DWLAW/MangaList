import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import Link from 'next/link';
// import { useAuth } from '../utils/context/authContext';
import { getManga } from '../api/mangaData';
import MangaCard from '../components/MangaCard';

function Home() {
  const [mangas, setManga] = useState([]);

  // const { user } = useAuth();

  const getAllManga = () => {
    getManga().then(setManga);
  };

  useEffect(() => {
    getAllManga();
  });

  return (
    <div className="text-center my-4">
      <Link href="/book/new" passHref>
        <Button>Add A Manga</Button>
      </Link>
      <div className="d-flex flex-wrap">

        {mangas.map((manga) => (
          <MangaCard key={manga.firebaseKey} mangaObj={manga} onUpdate={getAllManga} />
        ))}
      </div>

    </div>
  );
}

export default Home;
