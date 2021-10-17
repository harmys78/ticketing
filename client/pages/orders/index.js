import buildClient from "../../api/build-client";

const OrderIndex = ({ orders }) => {
  return (
    <ul>
      {orders && orders.map((order) => {
        return (
          <li key={order.id}>
            {order.ticket.title} - {order.status}
          </li>
        );
      })}
    </ul>
  );
};

/*OrderIndex.getInitialProps = async (context, client) => {
  const { data } = await client.get('/api/orders');

  return { orders: data };
};*/

export const getServerSideProps = async (context) => {
  const client = buildClient(context);
  let orders;
  try {
    const ordersResponse = await client.get(`/api/orders`);
    orders = ordersResponse.data;
  } catch (e) {
    console.log("error in get orders", e);
  }
  if (!orders) {
    orders = null;
  }
  return { props: { orders } };
};
export default OrderIndex;
