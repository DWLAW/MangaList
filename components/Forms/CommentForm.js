import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createComment, updateComment } from '../../api/commentData';

const initialState = {
  id: '',
  content: '',
  manga: '',
  user: '',
  created_on: '',
};

export default function CommentForm({
  obj, commentMangaId, onSubmit, onCancel,
}) {
  const [formInput, setFormInput] = useState(initialState);
  const { user } = useAuth();

  // IF WE ARE EDITING A COMMENT, THIS WILL SET THE FORMINPUT STATE TO THE VALUES OF THE COMMENT, BUT IF WE ARE CREATING A NEW COMMENT, IT WILL SET THE manga_ID OF THE INITAL STATE TO THE manga_ID ON WHICH WE ARE COMMENTING
  useEffect(() => {
    if (obj.firebaseKey) {
      setFormInput(obj);
    } else {
      initialState.manga = commentMangaId;
      setFormInput(initialState);
    }
  }, [obj, commentMangaId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      const updatedComment = {
        id: obj.firebaseKey,
        content: formInput.content,
        created_on: obj.created_on,
        manga: obj.manga,
      };
      updateComment(updatedComment).then(onSubmit);
    } else {
      const payload = {
        user: user.id,
        content: formInput.content,
        manga: commentMangaId,
      };
      createComment(user.id, commentMangaId, payload).then(() => {
        setFormInput(initialState);
        onSubmit();
      });
    }
  };

  return (
    <Form
      style={
        {
          width: '400px', display: 'flex',
        }
      }
      onSubmit={handleSubmit}
    >

      {/* CONTENT TEXTAREA  */}
      <FloatingLabel controlId="floatingTextarea" label={obj.firebaseKey ? 'Update your comment' : 'Enter your comment'} className="mb-3">
        <Form.Control
          as="textarea"
          placeholder={obj.firebaseKey ? 'Update your comment' : 'Enter your comment'}
          style={{ height: '100px', width: '360px' }}
          name="content"
          value={formInput.content}
          onChange={handleChange}
          required
        />

        {/* SUBMIT BUTTON  */}
        <Button style={{ marginTop: '10px' }} type="submit">{obj.firebaseKey ? 'Update' : 'Add'} Comment</Button>
        {obj.firebaseKey ? <Button style={{ marginTop: '10px' }} onClick={onCancel}>Cancel</Button> : ''}
      </FloatingLabel>

    </Form>
  );
}

CommentForm.propTypes = {
  obj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    content: PropTypes.string,
    manga: PropTypes.string,
    created_on: PropTypes.string,
  }),
  commentMangaId: PropTypes.number.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

CommentForm.defaultProps = {
  obj: initialState,
};
