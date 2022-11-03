import { RefObject, useEffect, useMemo, useRef } from 'react'
import xss from 'xss'

/**
 * Hook that fetch new post from server
 */
export const useObserver = (
  ref: RefObject<any>,
  canLoad: boolean,
  isLoading: boolean,
  callback: CallableFunction
) => {
  let observer: React.RefObject<any> = useRef()

  useEffect(() => {
    if (isLoading) {
      return
    }

    if (observer.current) observer.current.disconnect()

    const cb = function (entries: any, observer: any) {
      if (entries[0].isIntersecting) {
        callback()
      }
    }
    // @ts-ignore
    observer.current = new IntersectionObserver(cb)
    observer.current.observe(ref.current)
  }, [isLoading])
}

/**
 * Hook that cleaning html from server
 */
export const useSanitize = (dirty: string) => {
  return {
    __html: xss(dirty)
  }
}

/**
 * Hook that alerts clicks outside of the passed ref
 */
export const useOutsideAlerter = (
  ref: RefObject<any>,
  onClose: CallableFunction
) => {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: Event) {
      if (ref.current && !ref.current.contains(event.target)) {
        onClose()
      }
    }

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref, onClose])
}

/**
 * Hook that alerts scroll of the document
 */
export const useScroll = (ref: RefObject<any>, onScroll: CallableFunction) => {
  // Bind the event listener
  function handleClickOutside(event: Event) {
    if (ref.current && !ref.current.contains(event.target)) {
      onScroll()
    }
  }
  useEffect(() => {
    window.addEventListener('scroll', handleClickOutside, false)
    return () => {
      // Unbind the event listener on clean up
      window.removeEventListener('scroll', handleClickOutside, false)
    }
  }, [ref, onScroll])
}

/**
 * Hook that alerts width of the document
 */
export const useWidth = (ref: RefObject<any>, onSize: CallableFunction) => {
  function handleChangeSize(event: Event) {
    onSize()
  }

  useEffect(() => {
    window.addEventListener('resize', handleChangeSize, false)
    return () => {
      // Unbind the event listener on clean up
      window.removeEventListener('resize', handleChangeSize, false)
    }
  }, [ref, onSize])
}

/**
 * Hook that alerts loading of the document
 */
export const useLoaded = (onLoaded: CallableFunction) => {
  function handleLoaded(event: Event) {
    onLoaded()
  }
  useEffect(() => {
    window.addEventListener('load', handleLoaded, false)
    return () => {
      // Unbind the event listener on clean up
      window.removeEventListener('load', handleLoaded, false)
    }
  }, [onLoaded])
}

/**
 * Hook that alerts loading of the document
 */
export const useLoading = () => {}

/**
 * Hook that verify window's width
 */
export const useDesktop = (ref: RefObject<any>, onWidth: CallableFunction) => {
  useEffect(() => {
    onWidth()
    window.addEventListener('resize', onWidth(), false)
    return () => {
      // Unbind the event listener on clean up
      window.removeEventListener('resize', onWidth(), false)
    }
  }, [ref, onWidth])
}

export const useSearch = (value: string, array: any[]) => {
  const filteredArray = useMemo(() => {
    return array.filter((item) =>
      item.name?.toLowerCase().includes(value.toLowerCase())
    )
  }, [value, array])
  return filteredArray
}

export const useChange = (value:any, onChange: CallableFunction) => {
  function handleChange(event: Event) {
    onChange()
  }
  
  useEffect(()=>{
    window.addEventListener('change', handleChange, false)
    return () => {
      // Unbind the event listener on clean up
      window.removeEventListener('change', handleChange, false)
    }
  }, [value, onChange])
}