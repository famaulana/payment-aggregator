import { DefaultButton } from "@/components/atoms/button/DefaultButton";
import { useLogout } from "@/features/auth/hooks/useLogout";

const Dashboard = () => {
  const { mutate: logout } = useLogout();
  return (
    <>
      This is Dashboard Page
      <DefaultButton onClick={logout}>Logout</DefaultButton>
    </>
  );
};

export default Dashboard;
