import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import getCategories from '../../api/categoryData';
import { createManga, updateManga } from '../../api/mangaData';

const initialState = {
  description: '',
  image: '',
  favorite: false,
  title: '',
  category: {},
};

function MangaForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [categories, setCategories] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getCategories().then(setCategories);

    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);

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
      updateManga(formInput).then(() => router.push(`/manga/${obj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createManga(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateManga(patchPayload).then(() => {
          router.push('/');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Manga</h2>

      {/* TITLE INPUT  */}
      <FloatingLabel controlId="floatingInput1" label="Manga Title" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter a title"
          name="title"
          value={formInput.title}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* IMAGE INPUT  */}
      <FloatingLabel controlId="floatingInput2" label="Manga Image" className="mb-3">
        <Form.Control
          type="url"
          placeholder="Enter the Manga Cover"
          name="image"
          value={formInput.image}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* category SELECT  */}
      <FloatingLabel controlId="floatingSelect" label="category">
        <Form.Select
          // aria-label="category"
          name="category"
          onChange={handleChange}
          className="mb-3"
          value={formInput.category}
          required
        >
          <option value="">Select a category</option>
          {
            categories.map((category) => (
              <option
                key={category.firebaseKey}
                value={category.firebaseKey}
              >
                {category.category}
              </option>
            ))
          }
        </Form.Select>
      </FloatingLabel>

      {/* DESCRIPTION TEXTAREA  */}
      <FloatingLabel controlId="floatingTextarea" label="Description" className="mb-3">
        <Form.Control
          as="textarea"
          placeholder="Description"
          style={{ height: '100px' }}
          name="description"
          value={formInput.description}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* A WAY TO HANDLE UPDATES FOR TOGGLES, RADIOS, ETC  */}
      <Form.Check
        className="text-white mb-3"
        type="switch"
        id="favorite"
        name="favorite"
        label="favorite?"
        checked={formInput.favorite}
        onChange={(e) => {
          setFormInput((prevState) => ({
            ...prevState,
            favorite: e.target.checked,
          }));
        }}
      />

      {/* SUBMIT BUTTON  */}
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Book</Button>
    </Form>
  );
}

MangaForm.propTypes = {
  obj: PropTypes.shape({
    description: PropTypes.string,
    image: PropTypes.string,
    favorite: PropTypes.bool,
    title: PropTypes.string,
    category: PropTypes.shape({
      id: PropTypes.number,
      label: PropTypes.string,
    }),
    firebaseKey: PropTypes.string,
  }),
};

MangaForm.defaultProps = {
  obj: initialState,
};

export default MangaForm;
