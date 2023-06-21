import { useEffect, useState } from "react";
// todo
export function useDBFolder(path) {
  const [list, setList] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/db/${path}`);
      const json = await res.json();
      setList(json);
    })();
  }, [path]);

  return list;
}

export const tree = async(path='', depth=1) => {
  let res = await fetch(`/api/tree/?path=${path}&depth=${depth}`)
  res = await res.json()
  return res
}