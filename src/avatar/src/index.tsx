import { cn } from '@lotus-ux/utils'
import type {
  AvatarFallbackProps,
  AvatarImageProps,
  AvatarProps as RadixAvatarProps,
} from '@radix-ui/react-avatar'
import * as RadixAvatar from '@radix-ui/react-avatar'
import { VariantProps, cva } from 'class-variance-authority'

const variants = cva(['rounded-full overflow-hidden inline-flex'], {
  variants: {
    size: {
      small: ['text-sm h-6 w-6'],
      default: ['text-base h-8 w-8'],
      large: ['text-lg h-12 w-12'],
    },
  },
  defaultVariants: {
    size: 'default',
  },
})

type AvatarProps = RadixAvatarProps & VariantProps<typeof variants> & {}

const Avatar = (props: AvatarProps) => {
  const { children, className } = props
  return (
    <RadixAvatar.Root className={cn(variants({ className }))}>
      {children}
    </RadixAvatar.Root>
  )
}

export const AvatarImage = (props: AvatarImageProps) => {
  const { className, ...rest } = props
  return <RadixAvatar.Image className={cn('w-full h-full')} {...rest} />
}

export const AvatarFallback = (props: AvatarFallbackProps) => {
  const { children, className } = props
  return (
    <RadixAvatar.AvatarFallback
      className={cn(
        'h-full w-full flex items-center justify-center align-middle',
        className
      )}
    >
      {children}
    </RadixAvatar.AvatarFallback>
  )
}

Avatar.Image = AvatarImage
Avatar.Fallback = AvatarFallback

export default Avatar
export type { AvatarFallbackProps, AvatarImageProps, AvatarProps }
