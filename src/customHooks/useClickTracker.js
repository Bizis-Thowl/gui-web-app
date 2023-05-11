import { useState } from "react";
import { uploadClicks } from "../fetching";

function useClickTracker(initClicks, user) {
  const [clicks, setClicks] = useState(initClicks);

  const handleClickTracker = (id) => {
    setClicks((prevClicks) => {
      const newClick = {
        timestamp: Date.now(),
        id: id,
      }
      const newClicks = [
        ...prevClicks,
        newClick,
      ];
      uploadClicks(newClick, user)
      return newClicks;
    });
  };

  // const memo = useMemo(() => handleClickTracker())

  return { clicks, handleClickTracker };
}

export default useClickTracker;
