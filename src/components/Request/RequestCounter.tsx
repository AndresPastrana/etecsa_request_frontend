import { Card, Text, Metric, Flex, Icon } from "@tremor/react";
import {
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { RequestService } from "../../services";
import useAuth from "../../hooks/useAuth";
import { RequestCounter } from "../../types";
import { toast } from "sonner";

export const RequestCounterBadge = () => {
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

  return (
    <div className="flex justify-around h-full items-center">
      <Card className="max-w-fit max-h-[105px]">
        <Flex className="space-x-6">
          <Icon
            icon={CheckCircleIcon}
            color="green"
            variant="solid"
            tooltip="Total de solicitudes aprovadas"
            size="sm"
          />
          <div>
            <Text>Aproved request</Text>
            <Metric>{requestCounter.approved}</Metric>
          </div>
        </Flex>
      </Card>
      <Card className="max-w-fit max-h-[105px]">
        <Flex className="space-x-6">
          <Icon
            icon={XCircleIcon}
            color="red"
            variant="solid"
            tooltip="Total de solicitudes aprovadas"
            size="sm"
          />
          <div>
            <Text>Denied request</Text>
            <Metric> {requestCounter.denied}</Metric>
          </div>
        </Flex>
      </Card>
      <Card className="max-w-fit max-h-[105px]">
        <Flex className="space-x-6">
          <Icon
            icon={ClockIcon}
            color="amber"
            variant="solid"
            tooltip="Total de solicitudes aprovadas"
            size="sm"
          />
          <div>
            <Text>Pending request</Text>
            <Metric>{requestCounter.pending}</Metric>
          </div>
        </Flex>
      </Card>
    </div>
  );
};
