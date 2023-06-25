import { useEffect, useState } from "react";

export const tree = async(path='', depth=1) => {
  let res = await fetch(`/api/tree/?path=${path}&depth=${depth}`)
  res = await res.json()
  return res
}