import { useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Card, Button, Badge } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {
  useGetPreOrderDetailsQuery,
  usePayPreOrderDepositMutation,
  useDeletePreOrderMutation,
} from '../slices/preOrdersApiSlice';

const PreOrderScreen = () => {
  const { id: preOrderId } = useParams();
  const navigate = useNavigate();

  const {
    data: preOrder,
    refetch,
    isLoading,
    error,
  } = useGetPreOrderDetailsQuery(preOrderId);

  const [payDeposit, { isLoading: loadingPay }] =
    usePayPreOrderDepositMutation();

  const [deletePreOrder, { isLoading: loadingDelete }] =
    useDeletePreOrderMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { variant: 'warning', text: 'Pending' },
      confirmed: { variant: 'info', text: 'Confirmed' },
      available: { variant: 'success', text: 'Available' },
      fulfilled: { variant: 'primary', text: 'Fulfilled' },
      cancelled: { variant: 'danger', text: 'Cancelled' },
    };

    const config = statusConfig[status] || statusConfig.pending;
    return <Badge bg={config.variant}>{config.text}</Badge>;
  };

  const payDepositHandler = async () => {
    if (
      window.confirm(
        `Pay deposit of $${preOrder.depositAmount.toFixed(2)}? (Demo)`
      )
    ) {
      try {
        await payDeposit({ id: preOrderId, details: {} }).unwrap();
        refetch();
        toast.success('Deposit paid successfully');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const deleteHandler = async () => {
    if (window.confirm('Are you sure you want to cancel this pre-order?')) {
      try {
        await deletePreOrder(preOrderId).unwrap();
        toast.success('Pre-order cancelled');
        navigate('/profile/preorders');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error?.data?.message || error.error}</Message>
  ) : (
    <>
      <Link to='/profile/preorders' className='btn btn-light my-3'>
        Back to My Pre-Orders
      </Link>
      <h1>Pre-Order {preOrder._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Product Information</h2>
              <Row>
                <Col md={3}>
                  <Image
                    src={preOrder.productImage}
                    alt={preOrder.productName}
                    fluid
                    rounded
                  />
                </Col>
                <Col md={9}>
                  <Link to={`/product/${preOrder.product._id}`}>
                    <h4>{preOrder.productName}</h4>
                  </Link>
                  <p>
                    <strong>Unit Price:</strong> ${preOrder.productPrice}
                  </p>
                  <p>
                    <strong>Quantity:</strong> {preOrder.quantity}
                  </p>
                  <p>
                    <strong>Total Price:</strong> $
                    {(preOrder.productPrice * preOrder.quantity).toFixed(2)}
                  </p>
                </Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Pre-Order Details</h2>
              <p>
                <strong>Status: </strong>
                {getStatusBadge(preOrder.status)}
              </p>
              <p>
                <strong>Expected Availability:</strong>{' '}
                {new Date(preOrder.expectedAvailabilityDate).toLocaleDateString(
                  'en-US',
                  {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  }
                )}
              </p>
              <p>
                <strong>Created:</strong>{' '}
                {new Date(preOrder.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
              {preOrder.notes && (
                <p>
                  <strong>Notes:</strong> {preOrder.notes}
                </p>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Contact Information</h2>
              <p>
                <strong>Email:</strong>{' '}
                <a href={`mailto:${preOrder.customerEmail}`}>
                  {preOrder.customerEmail}
                </a>
              </p>
              {preOrder.customerPhone && (
                <p>
                  <strong>Phone:</strong> {preOrder.customerPhone}
                </p>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Deposit Status</h2>
              {preOrder.depositPaid ? (
                <Message variant='success'>
                  Deposit Paid on{' '}
                  {new Date(preOrder.depositPaidAt).toLocaleDateString()}
                </Message>
              ) : (
                <Message variant='warning'>Deposit Not Paid</Message>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Deposit Amount</Col>
                  <Col>${preOrder.depositAmount.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total Pre-Order</Col>
                  <Col>
                    ${(preOrder.productPrice * preOrder.quantity).toFixed(2)}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Remaining Balance</Col>
                  <Col>
                    $
                    {(
                      preOrder.productPrice * preOrder.quantity -
                      preOrder.depositAmount
                    ).toFixed(2)}
                  </Col>
                </Row>
              </ListGroup.Item>

              {!preOrder.depositPaid &&
                preOrder.status !== 'cancelled' &&
                preOrder.status !== 'fulfilled' && (
                  <ListGroup.Item>
                    <Button
                      type='button'
                      className='btn btn-block'
                      onClick={payDepositHandler}
                      disabled={loadingPay}
                    >
                      {loadingPay ? 'Processing...' : 'Pay Deposit (Demo)'}
                    </Button>
                  </ListGroup.Item>
                )}

              {preOrder.status === 'pending' &&
                userInfo &&
                preOrder.user._id === userInfo._id && (
                  <ListGroup.Item>
                    <Button
                      type='button'
                      className='btn btn-block btn-danger'
                      onClick={deleteHandler}
                      disabled={loadingDelete}
                    >
                      {loadingDelete ? 'Cancelling...' : 'Cancel Pre-Order'}
                    </Button>
                  </ListGroup.Item>
                )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PreOrderScreen;
