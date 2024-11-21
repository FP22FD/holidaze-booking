import { PiXLight } from 'react-icons/pi';
import Button from '../../../shared/components/Button';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { usePersistContext } from '../../../store/usePersistContext';
import { useUpdateProfile } from '../hooks/useUpdateProfile';

interface ProfileFormProps {
  onClose: () => void;
}

const validationSchema = Yup.object({
  avatarUrl: Yup.string().url().required('Please enter your avatar url'),
  avatarAlt: Yup.string().required('Please enter your xxx').min(8, 'Password must be at least 8 characters'),
  bio: Yup.string().required('Please enter your password').min(8, 'Password must be at least 8 characters'),
}).required();

const ProfileForm = ({ onClose }: ProfileFormProps) => {
  const { profileData, setProfileData } = usePersistContext();
  const { updateProfile } = useUpdateProfile();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<{ avatarUrl: string; avatarAlt: string; bio: string }> = async (data, e) => {
    e?.preventDefault();

    if (!profileData) return;

    const newProfile = { ...profileData };
    newProfile.avatar = { url: data.avatarUrl, alt: data.avatarAlt };
    newProfile.bio = data.bio;

    const { success, data: updatedProfileData } = await updateProfile(newProfile);

    if (!success) {
      return;
    }

    if (success && updatedProfileData) {
      setProfileData(updatedProfileData);
      onClose();
    }
  };

  return (
    <>
      <form className="p-2 bg-white border my-2 rounded-lg" onSubmit={handleSubmit(onSubmit)}>
        <div className="p-6 flex justify-end">
          <button aria-label="Close menu" onClick={onClose} className="focus:outline-none bg-pink-gradient rounded p-1">
            <PiXLight className="w-6 h-6 text-white" aria-hidden="true" />
          </button>
        </div>

        <div className="place-self-start w-full space-y-4 md:space-y-6 lg:space-y-8 text-body-medium sm:text-body-large">
          <div>
            <label htmlFor="avatarUrl" className="block text-typography-primary-blue">
              Your profile image
            </label>
            <input
              id="avatarUrl"
              type="name"
              {...register('avatarUrl')}
              placeholder="Enter the image url"
              className="w-full border rounded-md p-2 mt-1 focus:outline-none focus:ring-1 focus:ring-offset-primary-light-blue"
            />
            {errors.avatarUrl && <div className="text-status-error-red">{errors.avatarUrl.message}</div>}
          </div>

          <div>
            <label htmlFor="avatarAlt" className="block text-typography-primary-blue">
              Your image name
            </label>
            <input
              id="avatarAlt"
              type="text"
              {...register('avatarAlt')}
              placeholder="Enter your image name"
              className="w-full border rounded-md p-2 mt-1 focus:outline-none focus:ring-1 focus:ring-offset-primary-light-blue"
            />
            {errors.avatarAlt && <div className="text-status-error-red">{errors.avatarAlt.message}</div>}
          </div>

          <div>
            <label htmlFor="bio" className="block text-typography-primary-blue">
              Your bio
            </label>
            <input
              id="bio"
              type="text"
              {...register('bio')}
              placeholder="Enter your bio"
              className="w-full border rounded-md p-2 mt-1 focus:outline-none focus:ring-1 focus:ring-offset-primary-light-blue"
            />

            {errors.bio && <div className="text-status-error-red">{errors.bio.message}</div>}
          </div>

          <div className="flex space-x-8 place-self-center">
            <Button type="submit" label="Update" size="medium" variant="primary" />
          </div>
        </div>
      </form>
    </>
  );
};

export default ProfileForm;
