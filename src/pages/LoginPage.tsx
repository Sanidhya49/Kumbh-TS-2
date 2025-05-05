
import { LoginForm } from '@/components/auth/LoginForm';
import { QuickLoginButtons } from '@/components/auth/QuickLoginButtons';

export const LoginPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <LoginForm />
      <div className="mt-8">
        <QuickLoginButtons />
      </div>
    </div>
  );
};
