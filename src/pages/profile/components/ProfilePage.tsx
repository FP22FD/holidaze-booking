import Button from '../../../shared/components/Button';
import PageSection from '../../../shared/components/PageSection';
import { useUpdateProfile } from '../hooks/useUpdateProfile';
import { usePersistContext } from '../../../store/usePersistContext';
import { useState } from 'react';
import ProfileSection from './ProfileSection';
import ProfileForm from './ProfileForm';

function ProfilePage() {
  const { userType, profileData, requireUserLevel } = usePersistContext();
  const { loading, error } = useUpdateProfile();

  const [isEditing, setIsEditing] = useState(false);

  requireUserLevel('customer');

  if (!profileData) {
    return;
  }

  const { name, avatar, bio } = profileData;

  return (
    <PageSection
      title="Profile"
      seoTitle="Profile | Holidaze Booking"
      seoDescription="Browse our wide range of venues and find what you're looking for!"
      searchBar={false}
    >
      {loading && <div className="text-typography-primary-blue">Updating profile...</div>}
      {error && <div className="text-status-error-red">{error}</div>}

      <div className="w-full mx-auto flex flex-col md:flex-row md:space-x-8 lg:space-x-16 rounded-lg py-2 ">
        <div className="w-full md:w-1/3 flex flex-col h-fit">
          <div className="w-fit p-2 bg-white border my-2 rounded-lg">
            <div className="place-self-end">
              {!isEditing && (
                <div>
                  <Button
                    type="button"
                    label="Edit profile"
                    size="medium"
                    variant="secondary"
                    onClick={() => setIsEditing(true)}
                  />
                </div>
              )}
            </div>

            <div className="avatar-section">
              <div className="flex items-center space-x-2">
                <div className="w-24 h-24">
                  <img src={avatar?.url} alt="Profile Avatar" className="w-full h-full object-cover rounded-full" />
                </div>

                <div className="flex flex-col text-md">
                  <span className="font-semibold text-primary-dark-blue">{name}</span>
                  <span className="text-typography-primary-grey text-body-medium">{userType}</span>
                </div>
              </div>
            </div>
            <div className="text-typography-primary-blue">
              {bio || 'Bio not available yet. Update your profile to add a bio.'}
            </div>
          </div>
          {isEditing && <ProfileForm onClose={() => setIsEditing(false)} />}
        </div>
        <div className="w-full md:w-2/3 border rounded-lg p-2">
          <ProfileSection />
        </div>
      </div>
    </PageSection>
  );
}

export default ProfilePage;
