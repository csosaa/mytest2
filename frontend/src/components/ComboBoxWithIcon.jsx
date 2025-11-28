import { Dropdown } from "react-bootstrap";
import { BsList } from "react-icons/bs";

function ComboBoxWithIcon() {
  return (
    <Dropdown className="btn-combo">
      <Dropdown.Toggle variant="light" className="btn-combo-toggle">
        <span className="text-left text-white">Categorías</span>
        <BsList size={22} className="text-white" />
      </Dropdown.Toggle>

      <Dropdown.Menu className="btn-combo-menu w-100">
        <Dropdown.Item>4x4 / 4WD</Dropdown.Item>
        <Dropdown.Item>Camper</Dropdown.Item>
        <Dropdown.Item>Marítima</Dropdown.Item>
        <Dropdown.Item>Portable</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default ComboBoxWithIcon;


/*import { Dropdown, ButtonGroup } from 'react-bootstrap';

function ComboBoxWithIcon() {
  return (
    <Dropdown as={ButtonGroup} className="combo-btn">
      <Dropdown.Toggle variant="success" className="combo-toggle btn btn-combo">
        Action
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item>Option 1</Dropdown.Item>
        <Dropdown.Item>Option 2</Dropdown.Item>
        <Dropdown.Item>Option 3</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default ComboBoxWithIcon;*/




/*export default function ComboBoxWithIcon() {
  return (
    <button
      className="nav-bar categories_main_link btn btn-combo flex items-center gap-2"
      aria-expanded="false"
      aria-haspopup="true"
    >
      <span>Category</span>
      <svg
        className="icon icon--hamburger-mobile w-5 h-5"
        viewBox="0 0 20 16"
        role="presentation"
      >
        <path
          d="M0 14h20v2H0v-2zM0 0h20v2H0V0zm0 7h20v2H0V7z"
          fill="currentColor"
          fillRule="evenodd"
        />
      </svg>
    </button>
  );
}/*


/*import Form from "react-bootstrap/Form";

function ComboBoxWithIcon() {
  return (
    <Form.Select
      className="nav-combobox"
      aria-label="Categories"
    >
      <option value="">Categories</option>
      <option value="1">Option 1</option>
      <option value="2">Option 2</option>
      <option value="3">Option 3</option>
    </Form.Select>
  );
}

export default ComboBoxWithIcon;*/

/*import { Dropdown } from "react-bootstrap";
import { BsList } from "react-icons/bs"; // hamburger icon

export default function ComboBoxWithIcon() {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="outline-dark" id="menu-dropdown">
        <BsList  style={{
          position: "absolute",
          right: "10px",
          top: "50%",
          transform: "translateY(-50%)",
          pointerEvents: "none", // allows clicking the select
          fontSize: "1.2rem",
          color: "#000",
        }} /> 
      </Dropdown.Toggle>

      <Dropdown.Menu style={{ minWidth: "220px" }}>
        <Dropdown.Item href="/">Home</Dropdown.Item>
        <Dropdown.Item href="/">Products</Dropdown.Item>
        <Dropdown.Item href="/">About</Dropdown.Item>

        <Dropdown.Divider />

        <div className="p-2 d-flex flex-column gap-2">
          <a href="https://google.com" target="_blank" rel="noreferrer">
            <img
              src="/images/google.png"
              alt="Google"
              style={{ width: "100%", borderRadius: "6px" }}
            />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noreferrer">
            <img
              src="/images/facebook.png"
              alt="Facebook"
              style={{ width: "100%", borderRadius: "6px" }}
            />
          </a>
        </div>
      </Dropdown.Menu>
    </Dropdown>
  );
}*/