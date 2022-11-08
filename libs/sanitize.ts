import xss from 'xss'

/**
 * Function that cleaning html from server
 */
export const sanitize = (dirty: string) => {
  return {
    __html: xss(dirty)
  }
}
