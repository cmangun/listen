/**
 * @name useCSSVar
 * @file useCSSVar.ts
 * @description useful to get element css variable value.
 */

// Modules
import { useState, useEffect } from 'react'

/**
 *
 * Get css variable value from it's name.
 * @param name
 * @param el
 * @returns
 */
const useCSSVar = (name: string, el?: HTMLElement) => {
  const [style, setStyle] = useState<string>()

  useEffect(() => {
    if (!el) el = document.documentElement

    const value = getComputedStyle(el).getPropertyValue('--bs-' + name)
    setStyle(value)
  }, [name])

  return style
}

export default useCSSVar
