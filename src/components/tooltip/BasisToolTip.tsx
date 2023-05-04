import { useState, useLayoutEffect } from 'react'
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useHover,
  useFocus,
  useDismiss,
  useRole,
  useInteractions,
  FloatingPortal,
  safePolygon
} from "@floating-ui/react";
import { setRequestMeta } from 'next/dist/server/request-meta';

const BasisToolTip = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: "top",
    // make sure the tooltop stays on the screen
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(5),
      flip({
        fallbackAxisSideDirection: "start",
      }),
      shift()
    ]
  })

  // event listeners to change the open state

  const hover = useHover(context, {
    move: false,

    //  default:  delay = 0

    // both open and close in ms
    // delay: 500, 

    // configure them individually
    // if their cursor never rests, open it after 1000 ms (fallback)
    delay: {
      open: 100,
      close: 0,
    },
    //default: true
    // Conditionally enable/disable the hook.
    enabled: true,
    //default: false
    //Whether the logic only runs for mouse input, ignoring both touch and pen pointer inputs.
    mouseOnly: false,
    //default: restMs = 0
    // waits 150 ms once the user's cursor is at rest
    restMs: 150,
    // handleClose: safePolygon(),
  })
  const focus = useFocus(context)
  const dismiss = useDismiss(context);

  // role props for screen readers
  const role = useRole(context, { role: "tooltip" });

  // merge all the interactions into props getters

  const { getFloatingProps, getReferenceProps } = useInteractions([
    hover,
    focus,
    dismiss,
    role,
  ])
  return (
    <div>
      <button ref={refs.setReference} {...getReferenceProps()}>Hover or focus me</button>
      <FloatingPortal>
        {isOpen && (
          <div className='tooltip'
            ref={refs.setFloating}
            style={floatingStyles}
            {...getFloatingProps()}
          >
            I'm a tooltip!
          </div>
        )}
      </FloatingPortal>
    </div>
  )
}

export default BasisToolTip