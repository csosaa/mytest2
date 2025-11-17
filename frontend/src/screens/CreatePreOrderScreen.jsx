import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { useGetProductDetailsQuery } from '../slices/productsApiSlice';
import { useCreatePreOrderMutation } from '../slices/preOrdersApiSlice';

const CreatePreOrderScreen = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);
  const [expectedDate, setExpectedDate] = useState('');
  const [depositAmount, setDepositAmount] = useState(0);
  const [customerPhone, setCustomerPhone] = useState('');
  const [notes, setNotes] = useState('');

  const {
    data: product,
    isLoading: loadingProduct,
    error: errorProduct,
  } = useGetProductDetailsQuery(productId);

  const [createPreOrder, { isLoading: loadingCreate }] =
    useCreatePreOrderMutation();

  useEffect(() => {
    if (product) {
      // Set default deposit as 20% of product price
      setDepositAmount((product.price * 0.2 * quantity).toFixed(2));
    }
  }, [product, quantity]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!expectedDate) {
      toast.error('Please select expected availability date');
      return;
    }

    try {
      const res = await createPreOrder({
        productId,
        quantity,
        expectedAvailabilityDate: expectedDate,
        depositAmount: parseFloat(depositAmount),
        customerPhone,
        notes,
      }).unwrap();

      toast.success('Pre-order created successfully');
      navigate(`/preorder/${res._id}`);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <Link to='/' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Create Pre-Order</h1>
        {loadingProduct ? (
          <Loader />
        ) : errorProduct ? (
          <Message variant='danger'>
            {errorProduct?.data?.message || errorProduct.error}
          </Message>
        ) : (
          <>
            <Card className='mb-4'>
              <Card.Body>
                <Row>
                  <Col md={4}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className='img-fluid rounded'
                    />
                  </Col>
                  <Col md={8}>
                    <h4>{product.name}</h4>
                    <p className='text-muted'>{product.description}</p>
                    <h5 className='text-primary'>${product.price}</h5>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            <Form onSubmit={submitHandler}>
              <Form.Group className='my-2' controlId='quantity'>
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  type='number'
                  placeholder='Enter quantity'
                  value={quantity}
                  min='1'
                  onChange={(e) => setQuantity(Number(e.target.value))}
                ></Form.Control>
              </Form.Group>

              <Form.Group className='my-2' controlId='expectedDate'>
                <Form.Label>Expected Availability Date *</Form.Label>
                <Form.Control
                  type='date'
                  value={expectedDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setExpectedDate(e.target.value)}
                  required
                ></Form.Control>
              </Form.Group>

              <Form.Group className='my-2' controlId='depositAmount'>
                <Form.Label>Deposit Amount ($)</Form.Label>
                <Form.Control
                  type='number'
                  placeholder='Enter deposit amount'
                  value={depositAmount}
                  step='0.01'
                  min='0'
                  onChange={(e) => setDepositAmount(e.target.value)}
                ></Form.Control>
                <Form.Text className='text-muted'>
                  Suggested: 20% of total price = $
                  {(product.price * 0.2 * quantity).toFixed(2)}
                </Form.Text>
              </Form.Group>

              <Form.Group className='my-2' controlId='customerPhone'>
                <Form.Label>Phone Number (Optional)</Form.Label>
                <Form.Control
                  type='tel'
                  placeholder='Enter phone number'
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group className='my-2' controlId='notes'>
                <Form.Label>Notes (Optional)</Form.Label>
                <Form.Control
                  as='textarea'
                  rows={3}
                  placeholder='Any special requests or notes'
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Button
                disabled={loadingCreate}
                type='submit'
                variant='primary'
                className='mt-2'
              >
                {loadingCreate ? 'Creating...' : 'Create Pre-Order'}
              </Button>
            </Form>
          </>
        )}
      </FormContainer>
    </>
  );
};

export default CreatePreOrderScreen;
