import { RequestCounterBadge } from "./RequestCounter";
import { ListRequest } from "./ListRequest";
import { RequestStatus } from "../../const";
import { useRequest } from "../../hooks/useRequest";

const RequestSpecialist = () => {
  const { updateRequestAPI } = useRequest();
  const updateRequest = (
    action: RequestStatus.APPROVED | RequestStatus.DENIED,
    idRequest: string
  ) => {
    updateRequestAPI({ action, idRequest });
  };
  return (
    <>
      <RequestCounterBadge />
      <ListRequest handleAprove={updateRequest} handleDenied={updateRequest} />
    </>
  );
};

export default RequestSpecialist;
