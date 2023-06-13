import { useState, useEffect } from 'react'

const useFormattedDate = (date: number) => {
  const [formattedDate, setFormattedDate] = useState<null | number>(null)

  useEffect(() => {
    setFormattedDate(date)
  }, [])
  if (formattedDate) return new Date(formattedDate)
}

export default useFormattedDate
