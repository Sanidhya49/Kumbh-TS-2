
import { RegisterForm } from '@/components/auth/RegisterForm';
import { QuickRegisterButton } from '@/components/auth/QuickRegisterButton';

export const RegisterPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <RegisterForm />
      <div className="mt-8">
        <QuickRegisterButton />
      </div>
    </div>
  );
};
