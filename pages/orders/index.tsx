// import { SearchBlock } from 'modules/templates'
import { Container, Row } from 'react-bootstrap';
import { TITLE } from 'app/config';
import Head from 'next/head';
import { Fragment, useEffect, useState } from 'react';
import { getUserOrders } from 'api/Orders';
import { OrderCard } from 'modules/elements';
import { IOrderModel } from 'app/models/order/Order';
import { EmptyComponent } from 'modules/elements';
import { useRouter } from 'next/router';

import { UserDataModel } from 'app/models';
import { useSelector } from 'react-redux';

interface IMark {
  mark: string;
}

interface IModel {
  model: string;
}

export default function Orders() {
  const [orders, setOrders] = useState<IOrderModel[]>();
  const router = useRouter();

  const user = useSelector(
    ({ header }: { header: UserDataModel }) => header.user,
  );

  useEffect(() => {
    if (user) {
      getUserOrders(router.query).then(({ data }: { data: IOrderModel[] }) => {
        setOrders(data);
      });
    } else {
      router.push('/auth/signin');
    }
  }, [router, user]);

  const sendInvoke = () => {
    if (user) {
      getUserOrders(router.query).then(({ data }: { data: IOrderModel[] }) => {
        setOrders(data);
      });
    } else {
      router.push('/auth/signin');
    }
  };

  return (
    <>
      <Head>
        <title>Мои заказы | {TITLE}</title>
      </Head>
      {/* <SearchBodyOrders/> */}
      <section className='cars orders'>
        <Container>
          <h1 className='title'>Мои заказы</h1>
          <Row>
            {orders ? (
              <>
                {orders.length > 0 ? (
                  orders.map((order, key) => (
                    <Fragment key={key}>
                      <OrderCard
                        order={order}
                        user={user}
                        changeInvoke={sendInvoke}
                      />
                    </Fragment>
                  ))
                ) : (
                  <EmptyComponent />
                )}
              </>
            ) : (
              <EmptyComponent />
            )}
          </Row>
        </Container>
      </section>
    </>
  );
}
