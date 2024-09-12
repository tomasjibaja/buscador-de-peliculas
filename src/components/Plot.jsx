import { API_URL } from "../services/endpoints"
import { useState } from "react"

/* eslint-disable react/prop-types */
export default function Plot({ id }) {
  const [plot, setPlot] = useState('')

  fetch(`${API_URL}&i=${id}`)
    .then(res => res.json())
    .then(res => setPlot(res.Plot))

  return <span>{plot}</span>
}
