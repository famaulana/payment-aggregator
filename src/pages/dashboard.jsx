import { DefaultButton } from "@/components/atoms/button/DefaultButton";
import { useModalStore } from "@/store/useModalStore";

const Dashboard = () => {
  const { openModal } = useModalStore();

  const handleSuccess = (e) => {
    e.preventDefault();
    openModal("SUCCESS", {
      title: "Success!",
      message: "The user has been removed.",
    });
  };
  return (
    <>
      This is Dashboard Page
      <DefaultButton onClick={handleSuccess}>Success</DefaultButton>
    </>
  );
};

export default Dashboard;
