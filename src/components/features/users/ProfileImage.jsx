const ProfileImage = ({ img, firstName, lastName }) => {
  if (img) {
    return <img className="size-8 rounded-full" src={img} />;
  }

  const firstNameInitial = firstName[0] || "";
  const lastNameInitial = lastName[0] || "";

  return (
    <span className="flex size-8 items-center justify-center rounded-full p-5 font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300">
      {firstNameInitial}
      {lastNameInitial}
    </span>
  );
};

export default ProfileImage;
