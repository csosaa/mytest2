import { Navbar, Nav, Container, NavDropdown, Badge, Dropdown, Image } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import SearchBox from './SearchBox';
import logo from '../assets/lensun-logo_300x300@2x.avif';
import { resetCart } from '../slices/cartSlice';
import ComboBoxWithIcon from './ComboBoxWithIcon';

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      // NOTE: here we need to reset cart state for when a user logs out so the next
      // user doesn't inherit the previous users cart and shipping
      dispatch(resetCart());
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header>
      <Navbar bg='primary' variant='dark' expand='lg' collapseOnSelect>
        <Container>
            <img class="img-10" src={logo} alt='OnRoad CR' />
            <span className='footer-label-secundary'>
              CR
            </span>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Inicio</Nav.Link>
              <NavDropdown href="/" title="Productos" id="collapsible-nav-dropdown">
                <NavDropdown.Item href="/">Panel para Capó</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/">Panel para Remolque</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/">Panel Flexible</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/">Panel para Cajuela</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/">Manta Solar Plegable</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/">Panel Portable</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav className="justify-content-end">
              {userInfo ? (
                  <>
                    <NavDropdown title={userInfo.name} id='username'>
                      <NavDropdown.Item as={Link} to='/profile'>
                        Perfil
                      </NavDropdown.Item>
                      <NavDropdown.Item onClick={logoutHandler}>
                        Salir
                      </NavDropdown.Item>
                    </NavDropdown>
                  </>
                ) : (
                  <Nav.Link as={Link} to='/login'>
                    <FaUser /> Ingreso
                  </Nav.Link>
                )}

                {/* Admin Links */}
                {userInfo && userInfo.isAdmin && (
                  <NavDropdown title='Administrador' id='adminmenu'>
                    <NavDropdown.Item as={Link} to='/admin/productlist'>
                      Productos
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to='/admin/orderlist'>
                      Pedidos
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to='/admin/preOrderlist'>
                      Pre Ordenes
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to='/admin/userlist'>
                      Usuarios
                    </NavDropdown.Item>
                  </NavDropdown>
                )}

                <Nav.Link as={Link} to='/cart'>
                  <FaShoppingCart /> Carrito
                  {cartItems.length > 0 && (
                    <Badge pill bg='success' style={{ marginLeft: '5px' }}>
                      {cartItems.reduce((a, c) => a + c.qty, 0)}
                    </Badge>
                  )}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Navbar bg='primary' variant='dark'>
        <Container>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <ComboBoxWithIcon />
          </Navbar.Collapse>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto w-100'>
              <SearchBox />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
