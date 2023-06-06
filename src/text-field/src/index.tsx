'use client'

import Input from '@lotus-ux/input'
import Label from '@lotus-ux/label'
import { cn } from '@lotus-ux/utils'
import { cva } from 'class-variance-authority'
import { HTMLAttributes, forwardRef, useRef } from 'react'
import { AriaTextFieldOptions, useTextField } from 'react-aria'

const variants = cva(
  [
    'box-border',
    'rounded-lg',
    'border',
    'bg-gradient-to-b',
    'from-slate-50/10',
    'to-slate-50/20',
    'px-3',
    'py-2',
    'focus-within:mb-[1px]',
    'focus-within:rounded-t-lg',
    'focus-within:rounded-b-sm',
    'focus-within:border-b-0',
    'focus-within:shadow-[0_2px]',
    'focus-within:from-white',
    'focus-within:to-white',
  ],
  {
    variants: {
      error: {
        true: ['border-red-700', 'focus-within:shadow-red-700'],
        false: ['border-slate-200', 'focus-within:shadow-indigo-500'],
      },
    },
  }
)

type TextFieldProps = AriaTextFieldOptions<'input'> &
  HTMLAttributes<HTMLInputElement> & {
    label: string
    errorMessage?: string
  }

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (props, forwardedRef) => {
    const { label, errorMessage } = props
    const ref = useRef<HTMLInputElement>(null)
    const { labelProps, inputProps, descriptionProps, errorMessageProps } =
      useTextField(
        {
          ...props,
          label,
        },
        ref
      )

    return (
      <div ref={forwardedRef} className={cn('group relative')}>
        <Label
          {...labelProps}
          className={cn([errorMessage && '!text-red-700'])}
        >
          {label}
        </Label>
        <div className={cn(variants({ error: !!errorMessage }))}>
          <Input ref={ref} {...inputProps} />
        </div>
        {errorMessage && (
          <span
            {...errorMessageProps}
            className="pt-1 text-xs font-medium tracking-wide text-red-700"
          >
            {errorMessage}
          </span>
        )}
      </div>
    )
  }
)

export default TextField
