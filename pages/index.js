import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import MangaCard from '../components/MangaCard';
import { getManga } from '../api/mangaData';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const [mangas, setManga] = useState([]);
  const { user } = useAuth();

  const getAllTheManga = () => {
    getManga(user.uid).then(setManga);
  };

  useEffect(() => {
    getAllTheManga();
  });

  return (
    <div className="text-center my-4">
      <Link href="/manga/new" passHref>
        <Button>Add A Manga</Button>
      </Link>
      <div className="d-flex flex-wrap">

        {mangas.map((manga) => (
          <MangaCard key={manga.firebaseKey} mangaObj={manga} onUpdate={getAllTheManga} />
        ))}
      </div>

    </div>
  );
}

export default Home;
