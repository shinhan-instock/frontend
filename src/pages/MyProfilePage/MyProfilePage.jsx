import Profile from '../../components/common/Profile';
export default function MyProfilePage() {
  return (
    <div className="sticky flex">
      <Profile isMyProfile={true} />
    </div>
  );
}
