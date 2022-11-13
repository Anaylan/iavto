import { THead, TCell } from 'modules/UI/tables/table';
import { dbFormatDate, month } from 'libs/functions';
import { IRefModel } from 'app/models';
import Link from 'next/link';
import { Row, Container } from 'react-bootstrap';
import { Pagination, PaginationItem } from 'modules/UI';

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
  return (
    <>
      <Row>
        <section className={`tables__tab`}>
          <div className={`table-responsive`}>
            <table className={`table`}>
              <THead row={THeadRow} />
              <tbody>
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
              </tbody>
            </table>
          </div>
        </section>
      </Row>
      <Pagination>
        <PaginationItem>
          <Link href={'#'} className={'page-link'} aria-label='Previous'>
            <span aria-hidden='true'>&laquo;</span>
          </Link>
        </PaginationItem>
        <li className={`tables__pagination-value`}>
          {/* <span>{currentPage}</span> из <span>{totalPage}</span> */}
        </li>
        <PaginationItem>
          <Link href={'#'} className={'page-link'} aria-label='Next'>
            <span aria-hidden='true'>&raquo;</span>
          </Link>
        </PaginationItem>
      </Pagination>
    </>
  );
};
