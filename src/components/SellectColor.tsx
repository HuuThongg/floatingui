import * as React from "react";
import {
  useFloating,
  useClick,
  useDismiss,
  useRole,
  useListNavigation,
  useInteractions,
  FloatingFocusManager,
  useTypeahead,
  offset,
  flip,
  size,
  autoUpdate,
  FloatingPortal
} from "@floating-ui/react";

const options = [
  "Red",
  "Orange",
  "Yellow",
  "Green",
  "Cyan",
  "Blue",
  "Purple",
  "Pink",
  "Maroon",
  "Black",
  "White"
];
const SellectColor = () => {

  const  [open, setIsOpen] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null);

  const { refs, floatingStyles, context } = useFloating({
    placement: "bottom-start",
    open: open,
    onOpenChange: setIsOpen,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(5),
      flip({ padding: 10 }),
      size({
        apply({ rects, elements, availableHeight }) {
          Object.assign(elements.floating.style, {
            maxHeight: `${availableHeight}px`,
            minWidth: `${rects.reference.width}px`
          });
        },
        padding: 10
      })
    ]
  });

  const listRef = React.useRef<Array<HTMLElement | null>>([]);
  const listContentRef = React.useRef(options);
  const isTypingRef = React.useRef(false);

  const click = useClick(context, { event: "mousedown" });
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: "listbox" });
  const listNav = useListNavigation(context, {
    listRef,
    activeIndex,
    selectedIndex,
    onNavigate: setActiveIndex,
    // This is a large list, allow looping.
    loop: true
  });
  
  const typeahead = useTypeahead(context, {
    listRef: listContentRef,
    activeIndex,
    selectedIndex,
    onMatch: open ? setActiveIndex : setSelectedIndex,
    onTypingChange(isTyping) {
      isTypingRef.current = isTyping;
    }
  });

  const {
    getReferenceProps,
    getFloatingProps,
    getItemProps
  } = useInteractions([dismiss, role, listNav, typeahead, click]);

  const handleSelect = (index: number) => {
    setSelectedIndex(index);
    setIsOpen(false);
  };

  const selectedItemLabel =
    selectedIndex !== null ? options[selectedIndex] : undefined;
  console.log(getFloatingProps())

  return (
    <div>
      <h1>Floatin UI Select  Color</h1>
      <label id="select-label" htmlFor=""> Select Ballon Color
      </label>
      <div 
        tabIndex={0}
        ref= {refs.setReference}
        aria-aria-labelledby="select-label"
        aria-autocomplete="none"
        style={{ width: 150, lineHeight: 2, margin: "auto", background: "red" }}
        {...getReferenceProps()}
      >
        {selectedItemLabel || "Select a color"}
      </div>
      {open && (
        <FloatingPortal>
          <FloatingFocusManager context={context} modal={false}>

            <div
              ref={refs.setFloating}
              style={{
                ...floatingStyles,
                overflowY: "auto",
                background: "#eee",
                minWidth: 100,
                borderRadius: 8,
                outline: 0
              }}
              {...getFloatingProps()}
            >
              
                  {options.map((value, i) => (
                    <div
                      key={value}
                      ref={(node) => {
                        listRef.current[i] = node;
                      }}
                      role="option"
                      tabIndex={i === activeIndex ? 0 : -1}
                      aria-selected={i === selectedIndex && i === activeIndex}
                      style={{
                        color:"black",
                        padding: 10,
                        cursor: "default",
                        background: i === activeIndex ? "cyan" : "white"
                      }}
                      {...getItemProps({
                        // Handle pointer select.
                        onClick() {
                          handleSelect(i);
                        },
                        // Handle keyboard select.
                        onKeyDown(event) {
                          if (event.key === "Enter") {
                            event.preventDefault();
                            handleSelect(i);
                          }

                          if (event.key === " " && !isTypingRef.current) {
                            event.preventDefault();
                            handleSelect(i);
                          }
                        }
                      })}
                    >
                      {value}
                      <span
                        aria-hidden
                        style={{
                          position: "absolute",
                          right: 10
                        }}
                      >
                        {i === selectedIndex ? " ✓" : ""}
                      </span>
                    </div>
                  ))}
                
            </div>
          </FloatingFocusManager>
        </FloatingPortal>
      )}
    </div>
  )
}

export default SellectColor