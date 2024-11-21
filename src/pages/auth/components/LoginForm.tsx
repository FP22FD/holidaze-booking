import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from '../../../shared/components/Button';
import { useLoginUser } from '../hooks/useLoginUser';
import { usePersistContext } from '../../../store/usePersistContext';

const validationSchema = Yup.object({
  email: Yup.string()
    .required('Please enter your email address')
    .email('Please enter a valid email address')
    .matches(/^[\w-.]+@stud.noroff\.no$/, 'Email must end with @stud.noroff.no'),
  password: Yup.string().required('Please enter your password').min(8, 'Password must be at least 8 characters'),
}).required();

function LoginForm() {
  const navigate = useNavigate();
  const { setProfileData, setAccessToken } = usePersistContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const { loading, error, loginUser } = useLoginUser();

  const onSubmit: SubmitHandler<{ email: string; password: string }> = async (data, e) => {
    e?.preventDefault();

    const { success, data: userData, accessToken } = await loginUser(data.email, data.password);

    if (success && userData && accessToken) {
      setProfileData(userData);
      setAccessToken(accessToken);
      navigate('/profile');
    }
  };

  return (
    <form className="space-y-12 flex flex-col place-items-center rounded-b-lg px-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="text-center mt-4">
        <h1 className="text-primary-dark-blue font-bold text-heading-4 sm:text-heading-3 md:text-heading-2">
          Welcome back!
        </h1>
        <p className="text-typography-primary-blue text-body-small sm:text-base md:text-lg">
          Use credentials to access your account
        </p>
      </div>

      <div className="place-self-start w-full space-y-4 min-h-[8rem] text-body-medium sm:text-body-large">
        <div>
          <label htmlFor="email" className="block text-typography-primary-blue">
            Email
          </label>
          <input
            id="email"
            type="text"
            {...register('email')}
            placeholder="Enter your email"
            className="w-full border rounded-md p-2 mt-1 focus:outline-none focus:ring-1 focus:ring-offset-primary-light-blue"
          />

          {errors.email && <div className="text-status-error-red">{errors.email.message}</div>}
        </div>
        <div>
          <label htmlFor="password" className="block text-typography-primary-blue">
            Password
          </label>
          <input
            id="password"
            type="password"
            autoComplete="off"
            {...register('password')}
            placeholder="Enter your password"
            className="w-full border rounded-md p-2 mt-1 focus:outline-none focus:ring-1 focus:ring-offset-primary-light-blue"
          />

          {errors.password && <div className="text-status-error-red">{errors.password.message}</div>}
        </div>
      </div>

      {loading && <p>Loading...</p>}

      {error && <p className="text-status-error-red text-body-medium">{error}</p>}

      <Button type="submit" label="Login" variant="default" className="w-4/5" />

      <div className="flex w-full space-x-6 place-content-center text-body-medium">
        <p className="text-primary-dark-blue">Don't have an account? </p>

        <Link to={'/auth/register'}>
          <p className="text-accent-pink">Register</p>
        </Link>
      </div>
    </form>
  );
}

export default LoginForm;
