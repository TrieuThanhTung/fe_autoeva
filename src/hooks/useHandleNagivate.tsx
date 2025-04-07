import { useNavigate } from "react-router-dom";

const useHandleNagivate = () => {
  const navigate = useNavigate();
  const handleNavigate = (url: string) => {
    navigate(url);
  }

  return handleNavigate
}

export default useHandleNagivate
