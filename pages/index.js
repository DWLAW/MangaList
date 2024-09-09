import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../utils/context/authContext';
import { getManga } from '../api/mangaData';
import MangaCard from '../components/MangaCard';

function Home() {
  const [mangas, setManga] = useState([]);

  const { user } = useAuth();

  const getAllManga = () => {
    getManga(user.uid).then(setManga);
  };

  useEffect(() => {
    getAllManga();
  });

  return (
    <div className="text-center my-4">
      <Link href="/book/new" passHref>
        <Button>Add A Book</Button>
      </Link>
      <div className="d-flex flex-wrap">
        {/* TODO: map over books here using BookCard component */}
        {mangas.map((manga) => (
          <MangaCard key={manga.firebaseKey} mangaObj={manga} onUpdate={getAllManga} />
        ))}
      </div>

    </div>
  );
}

export default Home;
