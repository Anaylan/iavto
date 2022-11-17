import { OptionHTMLAttributes } from 'react'

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
    <option className={`search-form__input ${className}`} {...props}>
      {children}
    </option>
  )
}
