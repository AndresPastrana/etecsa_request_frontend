import { StateService } from "../services";
import { useAppStore } from "../store";

// TODO: Refactor the useState hook to use the common store
export const useStates = () => {
  const { states, setStates } = useAppStore(({ states, setStates }) => ({
    states,
    setStates,
  }));
  const loadStates = async () => {
    try {
      // We load by defualt the states of PR by now
      const states = await StateService.getStatesByprovinceId({
        params: {
          provinceId: "6515db3395d07765b85524d8",
        },
      });
      if (states) {
        setStates(states);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return { states, loadStates };
};
