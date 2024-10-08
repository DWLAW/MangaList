import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { deleteManga } from '../api/mangaData';

function MangaCard({ mangaObj, onUpdate }) {
  const deleteThisManga = () => {
    if (window.confirm(`Delete ${mangaObj.title}?`)) {
      deleteManga(mangaObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={mangaObj.image} alt={mangaObj.title} style={{ height: '400px' }} />
      <Card.Body>
        {/* DYNAMIC LINK TO VIEW THE Manga DETAILS  */}
        <Link href={`/manga/${mangaObj.firebaseKey}`} passHref>
          <Button variant="primary" className="m-2">VIEW</Button>
        </Link>
        {/* DYNAMIC LINK TO EDIT THE Manga DETAILS  */}
        <Link href={`/manga/edit/${mangaObj.firebaseKey}`} passHref>
          <Button variant="info"> <FaEdit /></Button>
        </Link>
        <Button variant="danger" onClick={deleteThisManga} className="m-2">
          <FaTrash />
        </Button>
      </Card.Body>
    </Card>
  );
}

MangaCard.propTypes = {
  mangaObj: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default MangaCard;
