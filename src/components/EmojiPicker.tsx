import { useState, useRef, useEffect, forwardRef } from "react";
import {
  useFloating,
  useInteractions,
  useListNavigation,
  useClick,
  useDismiss,
  FloatingFocusManager,
  FloatingPortal,
  useRole,
  offset,
  flip,
  autoUpdate,
  useId,
  shift 
} from "@floating-ui/react";
import type { Placement } from "@floating-ui/react";



const emojis = [
  {
    name: "apple",
    emoji: "🍎"
  },
  {
    name: "orange",
    emoji: "🍊"
  },
  {
    name: "watermelon",
    emoji: "🍉"
  },
  {
    name: "strawberry",
    emoji: "🍓"
  },
  {
    name: "pear",
    emoji: "🍐"
  },
  {
    name: "banana",
    emoji: "🍌"
  },
  {
    name: "pineapple",
    emoji: "🍍"
  },
  {
    name: "cherry",
    emoji: "🍒"
  },
  {
    name: "peach",
    emoji: "🍑"
  }
];

type OptionProps = React.HTMLAttributes<HTMLDivElement> &{
  name: string;
  active: boolean;
  selected: boolean;
  children: React.ReactNode;
}
const Option = forwardRef<HTMLDivElement, OptionProps>(function Option(
  { name, active, selected, children, ...props },
  ref
) {
  const id = useId();
  return (
    <div
      {...props}
      ref={ref}
      id={id}
      role="option"
      aria-selected={selected}
      style={{
        background: active
          ? "rgba(0, 255, 255, 0.5)"
          : selected
            ? "rgba(0, 10, 20, 0.1)"
            : "none",
        border: active
          ? "1px solid rgba(0, 225, 255, 1)"
          : "1px solid transparent",
        borderRadius: 4,
        fontSize: 30,
        textAlign: "center",
        cursor: "default",
        userSelect: "none",
        padding: 0
      }}
    >
      {children}
    </div>
  );
});

const EmojiPicker = () => {

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState<number|null>(null);
  const [placement,setPlacement] = useState<Placement | null>(null)

  const listRef = useRef<HTMLDivElement[]|null>([]);

  const noResultsId = useId();
  const buttonId = useId();
  const listboxId = useId();

  const {refs, floatingStyles,context,placement: resultantPlacement } = useFloating({
    open,
    placement: placement?? "bottom-start",
    onOpenChange: setOpen,
    middleware:[
      offset(4),
      flip(),
      shift(),
    ],
    whileElementsMounted: autoUpdate
  })
  // handles opening the floating element via the choose Emjpoji button

  const {getReferenceProps,getFloatingProps}= useInteractions([
    useClick(context),
    useDismiss(context),
    useRole(context)
  ])

  // handles the list navigation where the reference is the inner input, not the button that opens the floating element.

  const {
    getReferenceProps: getInputProps,
    getFloatingProps: getListFloatingProps,
    getItemProps
  } = useInteractions([
    useListNavigation(context, {
      listRef,
      onNavigate: open ? setActiveIndex : undefined,
      activeIndex,
      cols: 3,
      orientation: "horizontal",
      loop: true,
      focusItemOnOpen: false,
      virtual: true,
      allowEscape: true
    })
  ]);

  useEffect(() => {
    if(open){
      setPlacement(resultantPlacement)
    } else{
      setSearch("");
      setActiveIndex(null);
      setPlacement(null);
    }
  }, [open,resultantPlacement])

  const filteredEmojis = emojis.filter(({name}) =>
    name.toLowerCase().includes(search.toLowerCase()))
  
  const handleEmojiClick = (index:number) => {
    setSelectedEmoji(filteredEmojis[index].emoji);
    setOpen(false);
  }

  const handleKeydown = (event: React.KeyboardEvent) =>{
    if(event.key === "Enter" && activeIndex !== null){
      event.preventDefault();
      handleEmojiClick(activeIndex);
    }  
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setActiveIndex(null);
    setSearch(event.target.value);
  }

  // prevent input losing focus on FIrefox voiceOver

  const {
    "aria-activedescendant": ignoreAria,
    ...floatingProps
  } = getFloatingProps(getListFloatingProps());

  return (
    <div>
      <h1>Floating UI Emoji Picker</h1>
      <div>
        <button  
          ref={refs.setReference}
          id={buttonId}
          aria-label="choose emoji"
          aria-describedby="emoji-label"
          style ={{
            background: open ? "red" : "transparent",
          }}
          {...getReferenceProps()}
        >
          ☻
        </button>
        <br/>
        {selectedEmoji&&(
          <span id="emoji-label">
            <span 
              style={{fontSize: "30"}}
              aria-label={
                emojis.find(({emoji}) => emoji === selectedEmoji)?.name
              }
            >
              {selectedEmoji}
            </span>
            {" "} selected
          </span>
        )}
        <FloatingPortal>
          {open &&(
            <FloatingFocusManager context={context} modal={false}>
              <div
                ref={refs.setFloating}
                style={floatingStyles}
                aria-labelledby={buttonId}
                {...floatingProps}
              >
                <span
                  style={{
                    opacity: 0.4,
                    fontSize: 12,
                    textTransform: "uppercase"
                  }}
                >
                  Emoji Picker
                </span>
                <input type="text" placeholder="Search emoji" 
                role="combobox"
                value={search}
                aria-controls={filteredEmojis.length === 0 ? noResultsId : listboxId}
                aria-expanded="true"
                aria-autocomplete="list"
                {...getInputProps({
                  onKeyDown: handleKeydown,
                  onChange: handleInputChange
                })}
                />
                {filteredEmojis.length === 0 && (
                  <p
                  key={search}
                  id={noResultsId}
                  className=""
                  role="region"
                  aria-atomic="true"
                  aria-live="assertive"
                  >
                    No results
                  </p>
                )}
                {filteredEmojis.map(({name, emoji}, index) => (
                <Option
                  key={name}
                  name={name}
                  ref={(node) => {
                    if (listRef.current) {
                      listRef.current[index] = node as HTMLDivElement;
                    }
                  }}
                  selected={selectedEmoji === emoji}
                  active={activeIndex === index}
                  {...getItemProps({
                    onClick: () => handleEmojiClick(index)
                  })}
                >
                  {emoji}
                </Option>
                    ))}
              </div>
            </FloatingFocusManager>
          )}
        </FloatingPortal>
      </div>
    </div>
  )
}

export default EmojiPicker