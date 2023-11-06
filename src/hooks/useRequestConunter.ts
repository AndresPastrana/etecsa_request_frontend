import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import { RequestService } from "../services";
import { toast } from "sonner";
import { RequestCounter } from "../types";

export const useRequestConunter = () => {
  const { loggedUser } = useAuth();
  const [requestCounter, setRequestCounter] = useState<RequestCounter>({
    approved: 0,
    denied: 0,
    pending: 0,
  });

  useEffect(() => {
    RequestService.getRequestCountsByStatus({
      headers: {
        Authorization: `Bearer ${loggedUser?.access_token}`,
      },
    })
      .then((c) => setRequestCounter(c))
      .catch((err) => {
        console.log(err);

        toast.error("Error");
      });
  }, []);

  return { requestCounter };
};
