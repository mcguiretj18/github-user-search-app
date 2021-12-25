import React from 'react'

function useLocalStorage(
  key: string,
  defaultValue = "",
  { serialize = JSON.stringify, deserialize = JSON.parse } = {}
) {
  const [state, setState] = React.useState(() => {
    const valueInLocalStorage = window.localStorage.getItem(key);

    if (valueInLocalStorage) {
      return deserialize(valueInLocalStorage);
    }

    // TODO: Fix this typescript type
    // return typeof defaultValue === 'function' ? defaultValue() : defaultValue
    return defaultValue;
  });

  const prevKeyRef = React.useRef(key);

  React.useEffect(() => {
    const prevKey = prevKeyRef.current;

    if (prevKey !== key) {
      window.localStorage.removeItem(prevKey);
    }

    prevKeyRef.current = key;
    window.localStorage.setItem(key, serialize(state));
  }, [key, state]);

  return [state, setState];
}

export default useLocalStorage
export { useLocalStorage }