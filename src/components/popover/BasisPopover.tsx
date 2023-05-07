import { useState } from "react";
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useDismiss,
  useRole,
  useClick,
  useInteractions,
  FloatingFocusManager,
  useId
} from "@floating-ui/react";


function Popover() {
  const [isOpen, setIsOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [
      offset(10),
      flip({ fallbackAxisSideDirection: "end" }),
      shift()
    ],
    whileElementsMounted: autoUpdate
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role
  ]);

  const headingId = useId();

  return (
    <>
      <button ref={refs.setReference} {...getReferenceProps()}>
        Add review
      </button>
      {isOpen && (
        <FloatingFocusManager context={context} modal={false}>
          <div
            className="Popover"
            ref={refs.setFloating}
            style={floatingStyles}
            aria-labelledby={headingId}
            {...getFloatingProps()}
          >
            <h2 id={headingId}>Review balloon</h2>
            <textarea placeholder="Write your review..." />
            <br />
            <button
              style={{ float: "right" }}
              onClick={() => {
                console.log("Added review.");
                setIsOpen(false);
              }}
            >
              Add
            </button>
          </div>
        </FloatingFocusManager>
      )}
    </>
  );
}

export default function BasisPopover() {
  return (
    <div className="App" style={{marginTop:100}}>
      <h1>Floating UI Popover</h1>
      <Popover />
      <div>

        Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, dolorem quos nulla nisi ducimus ipsam magnam harum blanditiis, maiores culpa vero deleniti in cupiditate perspiciatis eos adipisci magni eum deserunt maxime et mollitia fugiat voluptatem. Optio blanditiis inventore sapiente culpa consequatur ipsa aspernatur dolore neque, nostrum harum facere eaque vitae.
      </div>
    </div>
  );
}
