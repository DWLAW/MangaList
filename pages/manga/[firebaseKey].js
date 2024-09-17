import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap';
import Link from 'next/link';
import { deleteManga } from '../../api/mangaData';
// import { getCommentsByMangaId } from '../../api/commentData';
// import CommentCard from '../../components/CommentCard';
// import CommentForm from '../../components/Forms/CommentForm';
import { useAuth } from '../../utils/context/authContext';
import viewMangaDetails from '../../api/mergedData';

const initialState = {
  title: '',
  image_url: '',
  description: '',
  category: '',
};
export default function ViewManga(onUpdate) {
  const router = useRouter();
  const { firebaseKey } = router.query;
  const [mangaDetails, setMangaDetails] = useState({});
  // const [comments, setComments] = useState([]);

  const { user } = useAuth();

  // const getCommentsBymanga = () => {
  //   getCommentsByMangaId(firebaseKey).then(setComments);
  // };

  useEffect(() => {
    viewMangaDetails(firebaseKey).then(setMangaDetails);
  }, [firebaseKey]);
  const deleteThisManga = () => {
    if (window.confirm(`Delete ${mangaDetails.title}?`)) {
      deleteManga(mangaDetails.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column">
        <img src={mangaDetails.image} alt={mangaDetails.title} style={{ width: '400px', maxHeight: '600px', marginBottom: '10px' }} />
        {user.uid === mangaDetails.user?.uid ? (
          <Link href={`/manga/edit/${firebaseKey}`} passHref>
            <Button className="manga-card-button" style={{ marginBottom: '15px' }}>Edit manga</Button>
          </Link>
        ) : ''}
        {user.uid === mangaDetails.user?.uid ? <Button onClick={deleteThisManga} className="manga-card-button delete-button">Delete manga</Button> : ''}
      </div>
      <div className="text-white ms-5 details" style={{ width: '400px' }}>
        <h3>{mangaDetails.title}</h3>
        <h5>Category: {mangaDetails.categoryObject?.category}</h5>
        <p>Description: {mangaDetails.description}</p>
        {/* <div>
          <p>Comments:</p>
          {comments.map((comment) => (
            <CommentCard key={comment.id} commentObj={comment} onUpdate={getCommentsBymanga} />
          ))}
          <Accordion style={{ width: '400px', margin: '15px', backgroundColor: 'black' }} flush>
            <Accordion.Item eventKey="0">
              <Accordion.Header><h5 style={{ color: 'black' }}>Leave a Comment</h5></Accordion.Header>
              <Accordion.Body>
                <CommentForm commentmangaId={firebaseKey} onSubmit={getCommentsBymanga} />
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div> */}
      </div>
    </div>
  );
}

ViewManga.propTypes = {
  mangaDetails: PropTypes.shape({
    description: PropTypes.string,
    image: PropTypes.string,
    favorite: PropTypes.bool,
    title: PropTypes.string,
    category: PropTypes.string,
  }),
};
ViewManga.defaultProps = {
  mangaDetails: initialState,
};
