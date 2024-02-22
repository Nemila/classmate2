import { SignOutButton } from "@clerk/nextjs";

const page = async () => {
  return (
    <main>
      <p>Dashboard</p>

      <SignOutButton />
    </main>
  );
};

export default page;
