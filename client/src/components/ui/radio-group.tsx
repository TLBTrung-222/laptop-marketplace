import React, { createContext, useContext, useState } from 'react'
import { cn } from "@/lib/utils"

interface RadioGroupContextType {
  value: string
  onChange: (value: string) => void
}

const RadioGroupContext = createContext<RadioGroupContextType | undefined>(undefined)

export interface RadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  defaultValue,
  value: controlledValue,
  onValueChange,
  className,
  children,
  ...props
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue || '')

  const contextValue = controlledValue !== undefined ? controlledValue : internalValue
  const onChange = (newValue: string) => {
    setInternalValue(newValue)
    onValueChange?.(newValue)
  }

  return (
    <RadioGroupContext.Provider value={{ value: contextValue, onChange }}>
      <div className={cn("space-y-2", className)} {...props}>
        {children}
      </div>
    </RadioGroupContext.Provider>
  )
}

export interface RadioGroupItemProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'value'> {
  value: string
}

export const RadioGroupItem: React.FC<RadioGroupItemProps> = ({ value, id, className, children, ...props }) => {
  const context = useContext(RadioGroupContext)
  if (!context) {
    throw new Error('RadioGroupItem must be used within a RadioGroup')
  }

  return (
    <div className="flex items-center space-x-2">
      <input
        type="radio"
        id={id}
        checked={context.value === value}
        onChange={() => context.onChange(value)}
        className={cn(
          "h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      />
      {children}
    </div>
  )
}
