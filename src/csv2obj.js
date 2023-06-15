import { useEffect, useState } from "react"
import { usePapaParse } from "react-papaparse"

const useCSVFromURL = (url) => {
  const { readString } = usePapaParse()
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(url)
      const csv = await res.text()
      setData(readString(csv))
    }
    fetchData()
  }, [])

  return data;
};

export { useCSVFromURL }