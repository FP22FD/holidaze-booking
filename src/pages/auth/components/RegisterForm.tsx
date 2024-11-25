import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from '../../../shared/components/Button';
import { useRegisterUser } from '../hooks/useRegisterUser';

const validationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .required('Please enter your name')
    .min(3, 'Your first name should be at least 3 characters'),
  email: Yup.string()
    .trim()
    .required('Please enter your email address')
    .email('Please enter a valid email address')
    .matches(/^[\w-.]+@stud.noroff\.no$/, 'Email must end with @stud.noroff.no'),
  password: Yup.string().trim().required('Please enter your password').min(8, 'Password must be at least 8 characters'),
}).required();

function RegisterForm() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const { loading, error, registerUser } = useRegisterUser();

  const onSubmit: SubmitHandler<{ name: string; email: string; password: string }> = async (data, e) => {
    e?.preventDefault();

    const { success, data: userData } = await registerUser(data.name, data.email, data.password);

    if (success && userData) {
      navigate('/profile');
    }
  };

  return (
    <form
      className="space-y-8 flex flex-col place-items-center rounded-b-lg px-4"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <div className="text-center mt-4">
        <h1 className="text-primary-dark-blue font-bold text-heading-4 sm:text-heading-3 md:text-heading-2">
          Create an Account
        </h1>
        <p className="text-typography-primary-blue text-body-medium sm:text-base md:text-lg">
          Please fill this details to create an account
        </p>
      </div>

      <div className="place-self-start w-full space-y-4 md:space-y-6 lg:space-y-8 text-body-medium sm:text-body-large">
        <div>
          <label htmlFor="name" className="block text-typography-primary-blue">
            Name
          </label>
          <input
            id="name"
            type="name"
            {...register('name')}
            placeholder="Enter your name"
            aria-describedby={errors.name ? 'nameError' : undefined}
            className="w-full border rounded-md p-2 mt-1 focus:outline-none focus:ring-1 focus:ring-offset-primary-light-blue"
          />
          {errors.name && <div className="text-status-error-red">{errors.name.message}</div>}
        </div>

        <div>
          <label htmlFor="email" className="block text-typography-primary-blue">
            Email
          </label>
          <input
            id="email"
            type="text"
            {...register('email')}
            placeholder="Enter your email"
            aria-describedby={errors.email ? 'emailError' : undefined}
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
            aria-describedby={errors.password ? 'passwordError' : undefined}
            className="w-full border rounded-md p-2 mt-1 focus:outline-none focus:ring-1 focus:ring-offset-primary-light-blue"
          />

          {errors.password && <div className="text-status-error-red">{errors.password.message}</div>}
        </div>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-status-error-red">{error}</p>}

      <Button type="submit" label="Register" variant="default" className="w-4/5" />

      <div className="flex w-full space-x-6 place-content-center text-body-medium">
        <p className="text-primary-dark-blue">Already have an account?</p>

        <Link to={'/auth/login'}>
          <p className="text-accent-pink font-medium">Login</p>
        </Link>
      </div>
    </form>
  );
}

export default RegisterForm;
