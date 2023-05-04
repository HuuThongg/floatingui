import React, { useMemo, forwardRef } from 'react'
import { useFloating, autoUpdate, offset, flip, shift, useHover, useFocus, useDismiss, useInteractions, useMergeRefs, FloatingPortal, useRole } from '@floating-ui/react'

import type {Placement} from '@floating-ui/react'

interface ToolTipOptions {
  intialOpen?: boolean;
  placement?: Placement;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function useToolTip({
  intialOpen = false,
  placement = 'top',
  open: controlledOpen,
  onOpenChange: setControlledOpen,
}:ToolTipOptions ={} ) {
  const [uncontrolledOPen, setUncontrolledOpen] = React.useState(intialOpen)

  const open = controlledOpen ?? uncontrolledOPen;
  const setOpen = setControlledOpen ?? setUncontrolledOpen;

  const data = useFloating({
    placement,
    open,
    onOpenChange: setOpen,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(5),
      flip({
        fallbackAxisSideDirection: 'start',
      }),
      shift({padding:5}),
    ]
  })
  const context = data.context;
  const hover = useHover(context, {move:false,enabled: controlledOpen== null});

  const focus = useFocus(context, {enabled: controlledOpen== null});

  const dismiss = useDismiss(context);
  const role = useRole(context, {role:'tooltip'});
  const interactions = useInteractions([hover, focus, dismiss, role]);


  return useMemo(
    () => ({
      open,
      setOpen,
      ...interactions,
      ...data
    }),
    [open, setOpen, interactions, data]
  );
}

type ContextType = ReturnType<typeof useToolTip> | null;

const ToolTipContext = React.createContext<ContextType>(null);

export const useTooltipContext  = () => {
  const context = React.useContext(ToolTipContext);
  if (context == null) {
    throw new Error('Tooltip components must be wrapped in <TollTip></TollTip>');
  }
  return context;
}

export function Tooltip({ children,...options} :{children:React.ReactNode} & ToolTipOptions) {
  const tooltip = useToolTip(options);
  return(
    <ToolTipContext.Provider value={tooltip}>
      {children}
    </ToolTipContext.Provider>
  )
}

export const TooltipTrigger = React.forwardRef<
  HTMLElement,
  React.HTMLProps<HTMLElement> & { asChild?: boolean }
>(function TooltipTrigger({ children, asChild = false, ...props }, propRef) {
  const context = useTooltipContext();
  const childrenRef = (children as any).ref;
  const ref = useMergeRefs([context.refs.setReference, propRef, childrenRef]);

  // `asChild` allows the user to pass any element as the anchor
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(
      children,
      context.getReferenceProps({
        ref,
        ...props,
        ...children.props,
        "data-state": context.open ? "open" : "closed"
      })
    );
  }

  return (
    <button
      ref={ref}
      // The user can style the trigger based on the state
      data-state={context.open ? "open" : "closed"}
      {...context.getReferenceProps(props)}
    >
      {children}
    </button>
  );
});




export const TooltipContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLProps<HTMLDivElement>
>(function TooltipContent(props, propRef) {
  const context = useTooltipContext();
  const ref = useMergeRefs([context.refs.setFloating, propRef]);

  if (!context.open) return null;

  return (
    <FloatingPortal>
      <div
        ref={ref}
        style={context.floatingStyles}
        {...context.getFloatingProps(props)}
      />
    </FloatingPortal>
  );
});

const MyInput = forwardRef(function MyInput(props, ref) {
  return (
    <label >
      {props.label}
      <input ref={ref} />
    </label>
  );
});