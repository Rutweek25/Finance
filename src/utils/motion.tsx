import { createElement, forwardRef, type ComponentPropsWithoutRef, type JSX } from 'react'

type AnyProps = Record<string, unknown>

export type HTMLMotionProps<Tag extends keyof JSX.IntrinsicElements> =
  ComponentPropsWithoutRef<Tag> & AnyProps

const MOTION_PROP_KEYS = new Set([
  'initial',
  'animate',
  'exit',
  'transition',
  'variants',
  'whileHover',
  'whileTap',
  'whileFocus',
  'whileInView',
  'viewport',
  'layout',
  'layoutId',
  'drag',
  'dragConstraints',
  'dragElastic',
  'dragMomentum',
  'dragSnapToOrigin',
  'onAnimationStart',
  'onAnimationComplete',
  'onUpdate',
  'custom'
])

const createMotionComponent = (tag: string) =>
  forwardRef<HTMLElement, AnyProps>((props, ref) => {
    const domProps: AnyProps = {}

    for (const key in props) {
      if (!MOTION_PROP_KEYS.has(key)) {
        domProps[key] = props[key]
      }
    }

    return createElement(tag, { ...domProps, ref })
  })

type MotionMap = Record<string, ReturnType<typeof createMotionComponent>>

export const motion: MotionMap = new Proxy({}, {
  get(_, tag: string) {
    return createMotionComponent(tag)
  }
})
