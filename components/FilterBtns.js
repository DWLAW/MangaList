import Dropdown from 'react-bootstrap/Dropdown';

function ReadFilter() {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Dropdown Button
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Finished</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Reading</Dropdown.Item>
        <Dropdown.Item href="#/action-3">To Read</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default ReadFilter;
