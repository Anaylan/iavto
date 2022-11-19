import { EmailStep } from 'modules/elements/formStep/EmailStep';
import { KeyStep } from 'modules/elements/formStep/KeyStep';
import { PasswordStep } from 'modules/elements/formStep/PasswordStep';
import { useRouter } from 'next/router';
import { Container } from 'react-bootstrap';
import { Fragment, useState } from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import Head from 'next/head';
import { TITLE } from 'app/config';
export const ForgotPassword: React.FC = () => {
  const [step, setStep] = useState(1);
  const [token, setToken] = useState('');
  const [code, setCode] = useState('');
  const router = useRouter();

  const user = useSelector(({ header }: { header: any }) => header.title);

  if (user) {
    router.push('/');
  }

  return (
    <Fragment>
      <Head>
        <title>Восстановление пароля | {TITLE}</title>
      </Head>

      <section className={`auth reg`}>
        <Container>
          <div className='auth__wrapper'>
            <div className={'auth__body'}>
              <div className='auth__header'>
                <Link className={'header-top__logo'} href={'/'}>
                  яавто.рф
                </Link>
              </div>
              <h1 className='auth__title'>Восстановление пароля</h1>
              {step === 1 ? (
                <EmailStep step={step} setStep={setStep} setToken={setToken} />
              ) : null}
              {step === 2 ? (
                <KeyStep
                  setCode={setCode}
                  token={token}
                  step={step}
                  setStep={setStep}
                />
              ) : null}
              {step === 3 ? (
                <PasswordStep
                  token={token}
                  code={code}
                  step={step}
                  setStep={setStep}
                />
              ) : null}
            </div>
          </div>
        </Container>
      </section>
    </Fragment>
  );
};

export default ForgotPassword;
