const ProfileCircle = ({ firstName, lastName }) => {
  const firstLetter = firstName ? firstName.charAt(0).toUpperCase() : "";
  const lastLetter = lastName ? lastName.charAt(0).toUpperCase() : "";

  return (
    <div className="w-12 h-12 rounded-full bg-[#F2994A] flex items-center justify-center text-white text-[22px] font-bold">
      {firstLetter}
      {lastLetter}
    </div>
  );
};

export default ProfileCircle;
