import { useCallback, useEffect, useMemo, useState } from "react";

export type UseBooleanOutput = {
  isTrue: boolean;
  isFalse: boolean;
  setTrue: () => void;
  setFalse: () => void;
  toggle: () => void;
};

export const useBoolean = (initialValue?: boolean): UseBooleanOutput => {
  const [isTrue, setIsTrue] = useState(initialValue ?? false);

  useEffect(() => {
    setIsTrue(initialValue ?? false);
  }, [initialValue]);

  const setTrue = useCallback(() => {
    setIsTrue(true);
  }, []);

  const setFalse = useCallback(() => {
    setIsTrue(false);
  }, []);

  const toggle = useCallback(() => {
    setIsTrue((previousIsTrue) => !previousIsTrue);
  }, []);

  return useMemo(() => {
    return {
      isTrue,
      isFalse: !isTrue,
      setTrue,
      setFalse,
      toggle,
    };
  }, [isTrue, setFalse, setTrue, toggle]);
};
