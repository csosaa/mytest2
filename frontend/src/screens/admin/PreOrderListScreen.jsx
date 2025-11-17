import { Link } from 'react-router-dom';
import { Table, Button, Badge, Form } from 'react-bootstrap';
import { FaTimes, FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import {
  useGetAllPreOrdersQuery,
  useUpdatePreOrderStatusMutation,
  useDeletePreOrderMutation,
} from '../../slices/preOrdersApiSlice';

const PreOrderListScreen = () => {
  const { data: preOrders, isLoading, error, refetch } = useGetAllPreOrdersQuery();

  const [updateStatus, { isLoading: loadingUpdate }] =
    useUpdatePreOrderStatusMutation();

  const [deletePreOrder, { isLoading: loadingDelete }] =
    useDeletePreOrderMutation();

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

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this pre-order?')) {
      try {
        await deletePreOrder(id).unwrap();
        refetch();
        toast.success('Pre-order deleted');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const updateStatusHandler = async (id, newStatus) => {
    try {
      await updateStatus({ id, status: newStatus }).unwrap();
      refetch();
      toast.success('Status updated successfully');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <h1>Pre-Orders</h1>
      {loadingDelete && <Loader />}
      {loadingUpdate && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          {preOrders.length === 0 ? (
            <Message>No pre-orders found</Message>
          ) : (
            <Table striped bordered hover responsive className='table-sm'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>USER</th>
                  <th>PRODUCT</th>
                  <th>QTY</th>
                  <th>DEPOSIT</th>
                  <th>DEPOSIT PAID</th>
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
                      {preOrder.user && preOrder.user.name ? (
                        <>
                          {preOrder.user.name}
                          <br />
                          <small className='text-muted'>
                            {preOrder.user.email}
                          </small>
                        </>
                      ) : (
                        'N/A'
                      )}
                    </td>
                    <td>
                      {preOrder.product ? (
                        <Link to={`/product/${preOrder.product._id}`}>
                          {preOrder.productName}
                        </Link>
                      ) : (
                        preOrder.productName
                      )}
                    </td>
                    <td>{preOrder.quantity}</td>
                    <td>${preOrder.depositAmount.toFixed(2)}</td>
                    <td>
                      {preOrder.depositPaid ? (
                        <Badge bg='success'>Paid</Badge>
                      ) : (
                        <Badge bg='danger'>Unpaid</Badge>
                      )}
                    </td>
                    <td>
                      <Form.Select
                        size='sm'
                        value={preOrder.status}
                        onChange={(e) =>
                          updateStatusHandler(preOrder._id, e.target.value)
                        }
                        disabled={loadingUpdate}
                      >
                        <option value='pending'>Pending</option>
                        <option value='confirmed'>Confirmed</option>
                        <option value='available'>Available</option>
                        <option value='fulfilled'>Fulfilled</option>
                        <option value='cancelled'>Cancelled</option>
                      </Form.Select>
                    </td>
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
                        <Button variant='light' className='btn-sm mx-1'>
                          <FaEye />
                        </Button>
                      </Link>
                      <Button
                        variant='danger'
                        className='btn-sm'
                        onClick={() => deleteHandler(preOrder._id)}
                      >
                        <FaTrash style={{ color: 'white' }} />
                      </Button>
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

export default PreOrderListScreen;
