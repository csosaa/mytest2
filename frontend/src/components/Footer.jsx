import { Container, Row, Col } from 'react-bootstrap';
import logo from '../assets/lensun-logo_300x300@2x.avif';
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <Container fluid className="p-0">
        <Row className="bg-primary">
          <Col className="text-center py-3">
            <p className="m-0">
              <span className='footer-label-primary'>
                OnRoad CR {" "}
              </span>
              <span>
                &copy; {currentYear} Powered by{" "}
              </span>
              <span className='footer-label-secundary'>
                <img src={logo} alt="Lensun Solar" className="footer-logo"
                /> CR</span>
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};
export default Footer;
