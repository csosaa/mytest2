import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <Container>
        <Row className='bg-primary'>
          <Col className='text-center py-3'>
            <p>OnRoad &copy; {currentYear} Powered by LensunSolar CR</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};
export default Footer;
