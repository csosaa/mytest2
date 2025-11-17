import { Link } from 'react-router-dom';
import { Table, Button, Badge } from 'react-bootstrap';
import { FaTimes, FaEye } from 'react-icons/fa';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useGetMyPreOrdersQuery } from '../slices/preOrdersApiSlice';

const MyPreOrdersScreen = () => {
  const { data: preOrders, isLoading, error } = useGetMyPreOrdersQuery();

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

  return (
    <>
      <h1>My Pre-Orders</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          {preOrders.length === 0 ? (
            <Message>
              You have no pre-orders.{' '}
              <Link to='/'>Browse products to create a pre-order</Link>
            </Message>
          ) : (
            <Table striped hover responsive className='table-sm'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>PRODUCT</th>
                  <th>QTY</th>
                  <th>DEPOSIT</th>
                  <th>STATUS</th>
                  <th>EXPECTED DATE</th>
                  <th>CREATED</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {preOrders.map((preOrder) => (
                  <tr key={preOrder._id}>
                    <td>{preOrder._id.substring(0, 8)}...</td>
                    <td>
                      <Link to={`/product/${preOrder.product._id}`}>
                        {preOrder.productName}
                      </Link>
                    </td>
                    <td>{preOrder.quantity}</td>
                    <td>
                      ${preOrder.depositAmount.toFixed(2)}{' '}
                      {preOrder.depositPaid ? (
                        <Badge bg='success'>Paid</Badge>
                      ) : (
                        <Badge bg='warning'>Unpaid</Badge>
                      )}
                    </td>
                    <td>{getStatusBadge(preOrder.status)}</td>
                    <td>
                      {new Date(
                        preOrder.expectedAvailabilityDate
                      ).toLocaleDateString()}
                    </td>
                    <td>
                      {new Date(preOrder.createdAt).toLocaleDateString()}
                    </td>
                    <td>
                      <Link to={`/preorder/${preOrder._id}`}>
                        <Button variant='light' className='btn-sm'>
                          <FaEye />
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </>
      )}
    </>
  );
};

export default MyPreOrdersScreen;
