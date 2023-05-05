import { forwardRef, useRef, useState } from "react";
import {
  autoUpdate,
  size,
  flip,
  useId,
  useDismiss,
  useFloating,
  useInteractions,
  useListNavigation,
  useRole,
  FloatingFocusManager,
  FloatingPortal
} from "@floating-ui/react";
import { data } from "../data";
interface ItemsProps {
  children: React.ReactNode;
  active: boolean;
}

const Item = forwardRef<HTMLDivElement,ItemsProps & React.HTMLProps<HTMLDivElement>>(({ children, active, ...props }, ref) => {

  const id = useId();

  return(
    <div
      ref={ref}
      role={"option"}
      id={id}
      aria-selected={active}
      {...props}
      style={{
        background: active ? "lightblue" : "none",
        padding: 4,
        cursor: "default",
        ...props.style
      }}
    >
      {children}
    </div>
  )
})

const Combobox = () => {
  const [open, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [activeIndex, setActiveIndex] = useState<number|null>(null);

  const listRef = useRef<Array<HTMLDivElement | null>>([]);
  const { context, refs, floatingStyles } = useFloating<HTMLDivElement>({
    whileElementsMounted:autoUpdate,
    open,
    onOpenChange: setIsOpen,
    middleware:[
      flip({padding:10 }),
      size({
        apply({ rects, availableHeight, elements }) {
          Object.assign(elements.floating.style, {
            width: `${rects.reference.width}px`,
            maxHeight: `${availableHeight}px`
          });
        },
        padding: 10
      })
    ]
  });

  const role = useRole(context,{role:"listbox"})

  const dismiss = useDismiss(context, {});
  const listNav = useListNavigation(context, {
    listRef,
    activeIndex,
    onNavigate: setActiveIndex,
    // Use this if you need focus to remain on the reference element(such as an input), but allow arrow keys to navigate list items.This is common in autocomplete listbox components.
    virtual: true,
    loop: true
  });

  const {getFloatingProps,getItemProps,getReferenceProps}= useInteractions([dismiss, listNav,role]);
  console.log(getReferenceProps());
  function onChange(event: React.ChangeEvent<HTMLInputElement>){
    const value = event.target.value;
    setInputValue(value);

    if(value){
      setIsOpen(true);
      setActiveIndex(0);
    }else{
      setIsOpen(false);
      // setActiveIndex(null);
    }
  }
  const items = data.filter((item) => item.toLowerCase().startsWith(inputValue.toLowerCase()));
  return (
    <div>
      <h1>Listbox</h1>
      <input type="text" 
        // ref={refs.setReference}
        {...getReferenceProps({
          ref:refs.setReference,
          onChange,
          value:inputValue,
          placeholder:"Type to filter",
          "aria-autocomplete":"list",
          // all props can be passed to the props of input element, only exception is onKeyDown
          onKeyDown(event){
            if (
              event.key === "Enter" &&
              activeIndex != null &&
              items[activeIndex]
            ) {
              setInputValue(items[activeIndex]);
              setActiveIndex(null);
              setIsOpen(false);
            }
          },
        })}
        // value={inputValue}
        // onChange={onChange}
      />
      <FloatingPortal>
        {open && (
          <FloatingFocusManager context={context} initialFocus={-1} visuallyHiddenDismiss
          >
            <div
              {...getFloatingProps({
                ref: refs.setFloating,
                style: {
                  ...floatingStyles,
                  background: "#eee",
                  color: "black",
                  overflowY: "auto"
                }
              })}
            >
              {items.map((item, index) => (
                <Item
                  {...getItemProps({
                    key: item,
                    ref(node) {
                      if (listRef.current) {
                        listRef.current[index] = node as HTMLDivElement;
                      }
                    },
                    onClick() {
                      setInputValue(item);
                      setIsOpen(false);
                      refs.domReference.current?.focus();
                    }
                  })}
                  active={activeIndex === index}
                >
                  {item}
                </Item>
              ))}

            </div>
          </FloatingFocusManager>
        )}
      </FloatingPortal>
    </div>
  )
}

export default Combobox


