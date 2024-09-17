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
  category: '',
};
// initial state of the form
function MangaForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  // handles the form input and sets the state to the initial state
  const [categories, setCategories] = useState([]);
  // sets the initial state of categories to an empty array
  const router = useRouter();
  // lets you navigate the pages without refreshing
  const { user } = useAuth();
  // gets users info
  useEffect(() => {
    // hook that updates when the component mounts
    getCategories().then(setCategories);
    // fetches the data for categories
    if (obj.firebaseKey) setFormInput(obj);
    // chekcks if there is a obj being passed with a firebaseKey and sets the formInput to pass in the obj.
  }, [obj, user]);
  // updates when obj or user is changed

  const handleChange = (e) => {
    // handles user changes to the input of the form and takes the object e
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  // changes state by only changing the value that the user selects and keeps the rest of info
  // sets the state of forminput to get info the user inputs and keeps previously entered inputs
  const handleSubmit = (e) => {
    e.preventDefault();
    // if the event does not happen default action should not be taken
    if (obj.firebaseKey) {
      // checks obj for firebasekey
      updateManga(formInput).then(() => router.push('/'));
      // calls updateManga function and then routes to that manga's info in the form
    } else {
      const payload = { ...formInput, uid: user.uid };
      createManga(payload).then(({ name }) => {
        // creates a new manga and gets the firebasekey
        const patchPayload = { firebaseKey: name };
        // this updates the new manga with the firebasekey
        updateManga(patchPayload).then(() => {
          router.push('/');
          // routes to homepage
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Manga</h2>

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

      <FloatingLabel controlId="floatingInput2" label="Manga Image" className="mb-3">
        <Form.Control
          type="url"
          placeholder="Enter the Manga Cover"
          name="image"
          value={formInput.image}
          // sets the current value to the current state of formInput so if it is updating it will have a url if not it will be blank
          onChange={handleChange}
          // when a change happens to this input it will run the handleChange function
          required
        />
      </FloatingLabel>

      {/* category select  */}
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
          {/* sets default value of option to empty string */}
          {
            categories.map((category) => (
              // maps through the categories array and displays them as seperate options
              <option
                key={category.firebaseKey}
                value={category.firebaseKey}
              >
                {category.category}
                {/* displays the name and value of each category from the array on the options */}
              </option>
            ))
          }
        </Form.Select>
      </FloatingLabel>

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

      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Manga</Button>
    </Form>
  );
}

MangaForm.propTypes = {
  obj: PropTypes.shape({
    description: PropTypes.string,
    image: PropTypes.string,
    favorite: PropTypes.bool,
    title: PropTypes.string,
    category: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

MangaForm.defaultProps = {
  obj: initialState,
};

export default MangaForm;
