import { cn, mergeProps } from '@lotus-ux/utils'
import { VariantProps, cva } from 'class-variance-authority'
import { useRef } from 'react'
import {
  AriaCheckboxProps,
  VisuallyHidden,
  useCheckbox,
  useFocusRing,
} from 'react-aria'
import { useToggleState } from 'react-stately'

const variants = cva(
  [
    'stroke-white',
    'border-2',
    'border-slate-300',
    'rounded',
    'bg-slate-50',
    'data-[selected=true]:bg-indigo-500',
    'data-[focus-visible=true]:ring-indigo-500/70',
    'data-[focus-visible=true]:ring-2',
    'data-[focus-visible=true]:ring-offset-2',
    'transition-all',
  ],
  {
    variants: {
      error: {
        true: ['border-red-700'],
        false: ['border-slate-200'],
      },
    },
  }
)

type CheckboxProps = AriaCheckboxProps & VariantProps<typeof variants> & {}

const Checkbox = (props: CheckboxProps) => {
  const { children, error } = props
  const ref = useRef<HTMLInputElement>(null)
  const state = useToggleState(props)
  const { inputProps } = useCheckbox(props, state, ref)
  const { focusProps, isFocusVisible } = useFocusRing()

  return (
    <label className="flex items-center group cursor-pointer">
      <VisuallyHidden>
        <input {...mergeProps(inputProps, focusProps)} ref={ref} />
      </VisuallyHidden>
      <div
        aria-hidden="true"
        className={cn(variants({ error }))}
        data-selected={state.isSelected || undefined}
        data-focus-visible={isFocusVisible || undefined}
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24">
          <polyline
            strokeLinecap="round"
            strokeLinejoin="round"
            points="4 12 10 18 19 6"
            fill="none"
            strokeWidth={1.5}
            strokeDasharray={24}
            strokeDashoffset={state.isSelected ? 24 * 2 : 24 * 3}
            className="transition-all duration-300 ease-in-out"
          />
        </svg>
      </div>
      <span className="ml-2">{children}</span>
    </label>
  )
}

export default Checkbox
export type { CheckboxProps }
