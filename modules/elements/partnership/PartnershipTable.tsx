import { THead, TCell } from 'modules/UI/tables/table';
import { dbFormatDate, month } from 'libs/functions';
import { IRefModel } from 'app/models';
import Link from 'next/link';
import { Row, Container } from 'react-bootstrap';
import { Pagination, PaginationItem } from 'modules/UI';
import { useState, useEffect } from 'react';
import { useFetching } from 'app/hooks';
import axios from 'axios';
import { getUserReviews } from 'api/Review';

const THeadRow = [
  'Логин',
  'Дата регистрации',
  'Процент',
  'Платежи',
  'Прибыль',
  'Статус',
];

export const PartnershipTable = ({
  referrals,
  THeadRow,
}: {
  referrals: IRefModel[];
  THeadRow: string[];
}) => {
  const pageLimit = 26;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(5);

  const [fake, setFake] = useState<any>([]);

  // useEffect(() => {
  //   // getUserReviews().then((res) => console.log(res));
  //   axios
  //     .get(
  //       `https://jsonplaceholder.typicode.com/todos?_page=${currentPage}&_limit=${pageLimit}`,
  //     )
  //     .then((res) => {
  //       setFake(res.data);
  //       setTotalPage(
  //         Math.ceil(Number(res.headers['x-total-count']) / pageLimit),
  //       );
  //     });
  // }, [currentPage, totalPage]);

  return (
    <>
      <Row>
        <section className={`tables__tab`}>
          <div className={`table-responsive`}>
            <table className={`table`}>
              <THead row={THeadRow} />
              <tbody>
                {referrals &&
                  referrals.map((referral: any, key: number) => (
                    <tr key={key}>
                      <TCell>
                        <Link href='#'>
                          {referral.firstname
                            ? referral.firstname
                            : referral.company_name}
                        </Link>
                      </TCell>
                      <TCell>{dbFormatDate(referral.created, month)}</TCell>
                      <TCell>10%</TCell>
                      <TCell>0</TCell>
                      <TCell>0</TCell>
                      <TCell className={'table__wait'}>Ожидание</TCell>
                    </tr>
                  ))}
              </tbody>
              {/* <tbody>
                {referrals.map((referral, key) => (
                  <tr key={key}>
                    <TCell>
                      <Link href='#'>
                        {referral.firstname && referral.lastname ? (
                          <>
                            {referral.firstname} {referral.lastname}
                          </>
                        ) : (
                          <>{referral.company_name}</>
                        )}
                      </Link>
                    </TCell>
                    <TCell>{dbFormatDate(referral.created, month)}</TCell>
                    <TCell>10%</TCell>
                    <TCell>0</TCell>
                    <TCell>0</TCell>
                    <TCell className={'table__wait'}>Ожидание</TCell>
                  </tr>
                ))}
              </tbody> */}
            </table>
          </div>
        </section>
      </Row>
      <Pagination>
        <PaginationItem>
          <button
            onClick={() => {
              currentPage > 1 && setCurrentPage(currentPage - 1);
            }}
            className={'page-link'}
            aria-label='Previous'>
            <span aria-hidden='true'>&laquo;</span>
          </button>
        </PaginationItem>
        <li className={`pagination-value`}>
          <span>{currentPage}</span> из <span>{totalPage}</span>
        </li>
        <PaginationItem>
          <button
            onClick={() => {
              currentPage < totalPage && setCurrentPage(currentPage + 1);
            }}
            className={'page-link'}
            aria-label='Next'>
            <span aria-hidden='true'>&raquo;</span>
          </button>
        </PaginationItem>
      </Pagination>
    </>
  );
};
