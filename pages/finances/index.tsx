import { TITLE } from 'app/config';
import Head from 'next/head';
import Image from 'next/image';
import { Col, Container, Nav, Row, Tab } from 'react-bootstrap';
import { dbFormatDate, month } from 'libs/functions';
import dynamic from 'next/dynamic';
import { useEffect, useState, Fragment } from 'react';
import { IRefModel, UserDataModel, UserModel, ITransaction } from 'app/models';
import { getTransactions } from 'api/Transaction';
import { THead, TCell } from 'modules/UI';
import { checkUser } from 'libs/functions/auth';

const THeadFinances = ['ID', 'BillID', 'Дата', 'Сумма', 'Тип'];

export default function Finances() {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);

  checkUser();

  useEffect(() => {
    getTransactions()
      .then(({ data }: { data: ITransaction[] }) => {
        setTransactions(data);
        console.log(data);
      })
      .catch((err) => console.log(err.data));
  }, []);

  return (
    <>
      <Head>
        <title>Финансы | {TITLE}</title>
      </Head>

      <section className={`tables`}>
        <Tab.Container id='left-tabs-example' defaultActiveKey='first'>
          <Container>
            <div className={'charts__header'}>
              <h1 className='title'>Информация о финансах</h1>
            </div>
            <section className={`tables__tab`}>
              <div className={`table-responsive`}>
                <table className={`table`}>
                  <THead row={THeadFinances} />
                  <tbody>
                    {transactions.length > 0 &&
                      transactions.map((transaction, key) => (
                        <tr key={key}>
                          <TCell>{transaction.id}</TCell>
                          <TCell>{transaction.token}</TCell>
                          <TCell>
                            {dbFormatDate(transaction.created_at, month)}
                          </TCell>
                          {transaction.system_id == 2 ? (
                            <TCell className="text-success">
                                +{transaction.amount}
                                
                            </TCell>
                          ) : (
                            <TCell className="text-danger">
                                -{transaction.amount}
                            </TCell>
                          )}
                          <TCell>{transaction.system_name}</TCell>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </section>
          </Container>
        </Tab.Container>
      </section>
    </>
  );
}
