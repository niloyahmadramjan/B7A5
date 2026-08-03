import { getMyProfile } from "../_action/profile";
import ProfileForm from "../_components/ProfileForm";


export default async function ProfilePage() {
  const profileRes = await getMyProfile();

  if (!profileRes.success) {
    return (
      <div className="p-6 text-center text-red-500">
        Failed to load profile details: {profileRes.message}
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">Technician Profile</h1>
      <ProfileForm initialData={profileRes.data} />
    </div>
  );
}