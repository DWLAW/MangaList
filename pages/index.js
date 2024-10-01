import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import Link from 'next/link';
import { ImSearch } from 'react-icons/im';
import { getManga, searchManga } from '../api/mangaData';
import { useAuth } from '../utils/context/authContext';
import MangaCard from '../components/MangaCard';

function Home() {
  const [mangas, setManga] = useState([]);
  const { user } = useAuth();

  const getAllTheManga = () => {
    getManga(user.uid).then(setManga);
  };

  useEffect(() => {
    getAllTheManga();
  });

  const searchForManga = (e) => {
    e.preventDefault();
    searchManga(e.target.value).then((filteredManga) => {
      if (filteredManga.length === 0 && !e) {
        getAllTheManga();
      } else {
        setManga(filteredManga);
      }
    });
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ display: 'flex', marginBottom: '30px', width: '75%' }}>
          <ImSearch style={{ marginTop: '10px', marginRight: '5px' }} />
          <Form style={{ width: '100%' }}>
            <Form.Control
              type="text"
              placeholder="Search Manga"
              name="search"
            // value={searchValue}
              onChange={searchForManga}
              required
            />
          </Form>
        </div>
      </div>
      <div
        className="d-flex flex-wrap"
        style={{
          width: '100%', height: '100%', gap: '20px', justifyContent: 'space-evenly', paddingBottom: '20px',
        }}
      >
        {(mangas.length > 0) ? mangas.map((manga) => (
          <MangaCard key={manga.firebaseKey} mangaObj={manga} onUpdate={getAllTheManga} />
        )) : <div style={{ display: 'flex', width: '800px', justifyContent: 'center' }}><h5 style={{ marginRight: '5px' }}>No mangas match your search.</h5><Link passHref href="/manga/edit/new"><h5 className="clickableLink">Create a Manga?</h5></Link></div>}
      </div>
    </>
  );
}

export default Home;
