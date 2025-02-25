import Profile from '../../components/common/Profile';
export default function ProfilePage() {
  return (
    <div className="sticky flex">
      <Profile isMyProfile={false} />
    </div>
  );
}
