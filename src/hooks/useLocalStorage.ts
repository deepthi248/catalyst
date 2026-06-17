import { useEffect, useState } from "react";

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const loadDataFromLocalStorage = (key: string) => {
    try {
      const value = localStorage.getItem(key);
      if (value) {
        const parsed_value = JSON.parse(value, (key, val) => {
          if (key === "createdAt") return new Date(val);
          return val;
        });
        return parsed_value;
      } else {
        return initialValue;
      }
    } catch (error) {
      console.log(error);
      return initialValue; // ← add this
    }
  };

  const saveDataInLocalStorage = (key: string, value: T) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  //on mounting - intial value setting
  const [data, setData] = useState<T>(() => loadDataFromLocalStorage(key));

  //on rerendering - we need to get the key and update the value given
  useEffect(() => {
    saveDataInLocalStorage(key, data);
  }, [data]);

  //it should return the data
  return [data, setData];
}
