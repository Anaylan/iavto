import { EmailStep } from 'modules/elements/formStep/EmailStep';
import { KeyStep } from 'modules/elements/formStep/KeyStep';
import { PasswordStep } from 'modules/elements/formStep/PasswordStep';
import { useRouter } from 'next/router';
import { Fragment, useState } from 'react';
import { useSelector } from 'react-redux';

export const ForgotPassword: React.FC = () => {
  // const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(1);
  // const dispatch = useDispatch()
  const router = useRouter();

  const user = useSelector(({ header }: { header: any }) => header.title);

  if (user) {
    router.push('/');
  }

  return (
    <Fragment>
      {step === 1 ? (
        <>
          <EmailStep step={step} setStep={setStep} />
        </>
      ) : null}

      {step === 2 ? (
        <>
          <KeyStep step={step} setStep={setStep} />
        </>
      ) : null}
      {step === 3 ? (
        <>
          <PasswordStep step={step} setStep={setStep} />
        </>
      ) : null}
    </Fragment>
  );
};

export default ForgotPassword;
