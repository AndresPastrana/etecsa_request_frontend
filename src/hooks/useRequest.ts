import { toast } from "sonner";
import { RequestService } from "../services";
import { useAppStore } from "../store";
import useAuth from "./useAuth";
import { IResource } from "../types";
import { RequestStatus } from "../const";

export const useRequest = () => {
  const { loggedUser } = useAuth();
  const { requests, setRequests, updateRequest } = useAppStore(
    ({ requests, setRequests, addRequest, updateRequest }) => ({
      requests,
      addRequest,
      setRequests,
      updateRequest,
    })
  );

  // Migth be all the request or only the request of a producer
  const loadRequest = async () => {
    try {
      const requests = await RequestService.getAllRequests({
        headers: {
          Authorization: `Bearer ${loggedUser?.access_token}`,
        },
        params: {
          status: "all",
        },
      });

      if (requests) {
        setRequests(requests);
      }
    } catch (error) {
      toast.error("Error while loading the requets");
    }
  };

  const createRequestAPI = async (request: {
    destiny: string;
    resources: Array<Pick<IResource, "product" | "quantity">> | [];
  }) => {
    try {
      const req = await RequestService.createRequest(request, {
        headers: {
          Authorization: `Bearer ${loggedUser?.access_token}`,
        },
      });
      if (req) {
        return toast.success(`Request inserted successfully`);
      }
      return toast.error("Error creating the request");
    } catch (error) {
      return toast.error("Error creating the request");
    }
  };
  const updateRequestAPI = async (payload: {
    action: RequestStatus.APPROVED | RequestStatus.DENIED;
    idRequest: string;
  }) => {
    try {
      const { action, idRequest } = payload;
      const serviceToUse =
        (action === RequestStatus.APPROVED && RequestService.approveRequest) ||
        RequestService.denyRequest;

      const request = await serviceToUse(idRequest, {
        headers: {
          Authorization: `Bearer ${loggedUser?.access_token}`,
        },
      });
      if (request) {
        updateRequest(request);
      }
    } catch (error) {
      alert("Error");
      console.log(error);
    }
  };

  return { requests, loadRequest, createRequestAPI, updateRequestAPI };
};
