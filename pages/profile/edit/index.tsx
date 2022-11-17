import { getUserByToken } from 'api/User';
import { TITLE } from 'app/config';
import { UserModel } from 'app/models/user/UserModel';
import { EditInfo } from 'modules/elements';
import { FormVerification } from 'modules/elements/profile/verification/FormVerification';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';

const EditProfile = () => {
  const [user, setUser] = useState<UserModel>({ data: null, status: 200 });
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    getUserByToken()
      .then(({ data }: { data: UserModel }) => {
        setUser(data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, []);

  const router = useRouter();

  useEffect(() => {
    if (user.status === 403) {
      router.push('auth/asign');
    }
  }, [user, router]);

  return (
    <>
      <Head>
        <title>Редактировать профиль | {TITLE}</title>
      </Head>

      {user.data && (
        <>
          <EditInfo user={user.data} />
          {user.data.u_status === '0' && (
            <section className={`verification`}>
              <Container>
                <Row className={'verification__body'}>
                  <h2 className={`info-profile__title title title`}>
                    Верификация аккаунта
                  </h2>
                  <h3 className={`subtitle subtitle`}>
                    Данная информация будет передаваться автопаркам при заказе
                    автомобиля. На основе информации, указанной ниже, мы
                    составляем договор на аренду автомобиля.
                  </h3>
                  <FormVerification user={user.data} />
                </Row>
              </Container>
            </section>
          )}
          {user.data.u_status === '2' && (
            <section className={`verification`}>
              <Container>
                <h3 className='title'>Ваша заявка находится на модерации</h3>
                <p>Пожалуйста, ожидайте</p>
              </Container>
            </section>
          )}
        </>
      )}
    </>
  );
};

export default EditProfile;
