import { DetailedHTMLProps, OptionHTMLAttributes } from 'react'
import styles from 'assets/sass/components/blocks/search.module.scss'

interface SelectOption extends OptionHTMLAttributes<HTMLOptionElement> {
  children: React.ReactNode
  className?: string | undefined
  props?: OptionHTMLAttributes<HTMLOptionElement>
}

export const SearchSelectOption: React.FC<SelectOption> = ({
  children,
  className,
  ...props
}) => {
  return (
    <option
      className={`${styles['search-form__input']} ${className}`}
      {...props}
    >
      {children}
    </option>
  )
}
