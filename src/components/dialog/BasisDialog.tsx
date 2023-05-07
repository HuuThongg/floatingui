import { useState } from "react";
import {
  useFloating,
  useDismiss,
  useRole,
  useClick,
  useInteractions,
  useId,
  FloatingFocusManager,
  FloatingOverlay,
  FloatingPortal
} from "@floating-ui/react";


const BasisDialog = () => {
  const [isOpen, setIsOpen] = useState(false);

  const {refs,context} = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
  })

  const click = useClick(context)
  const role = useRole(context)
  const dismiss = useDismiss(context,{
    outsidePressEvent:"mousedown"
  })
  console.log(role);
  const {getFloatingProps,getReferenceProps} = useInteractions([click,role,dismiss])
  console.log(getFloatingProps());
  console.log(getReferenceProps());
  const headingId = useId();
  const descriptionId = useId();
  return (
    <div>
      <h1>
        BasisDialog
      </h1>
      <div>
        <button ref={refs.setReference} {...getReferenceProps()}>
          Delete ballon
        </button>
      </div>
      <FloatingPortal>
        {isOpen && (
          <FloatingOverlay className="Dialog-overlay" lockScroll>
            <FloatingFocusManager  context={context}>
              <div className="Dialog"
              ref={refs.setFloating}
              aria-labelledby={headingId}
              aria-describedby={descriptionId}
              {...getFloatingProps()}>
                <h2 id={headingId}>Delete balloon</h2>
                <p id={descriptionId}>This action cannot be undone.</p>
                <button
                  onClick={() => {
                    console.log("Deleted.");
                    setIsOpen(false);
                  }}
                >
                  Confirm
                </button>
                <button onClick={() => setIsOpen(false)}>Cancel</button>
              </div>
            </FloatingFocusManager>
          </FloatingOverlay>
        )}
      </FloatingPortal>
    </div>
  )
}

export default BasisDialog