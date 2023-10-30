import { useEffect } from "react";
import { useCCostos, useDestinies, useStates } from "../hooks";

const Test = () => {
  const { loadCCostos, ccostos } = useCCostos();
  const { loadStates, states } = useStates();
  const { destinies, loadDestinies } = useDestinies();
  useEffect(() => {
    loadCCostos();
    loadStates();
    loadDestinies();
  }, []);

  return (
    <div>
      <p>{JSON.stringify(ccostos)}</p>
      <br />
      <p>{JSON.stringify(states)}</p>
      <br />
      <p>{JSON.stringify(destinies)}</p>
    </div>
  );
};

export default Test;
