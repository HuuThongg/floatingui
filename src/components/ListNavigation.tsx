import { useListNavigation, useFloating, useInteractions } from '@floating-ui/react';
import { useRef, useState } from 'react';

const ListNavigation = () => {
  const [activeIndex, setActiveIndex] = useState<number|null>(null)
  const {context,refs, floatingStyles} = useFloating({
    open: true,
  })
  const listRef = useRef<HTMLDivElement[] | []>([]);
  const ListNavigation = useListNavigation(context,{
    listRef,
    activeIndex,
    onNavigate: setActiveIndex
  })

  const {getReferenceProps,getFloatingProps,getItemProps} = useInteractions([ListNavigation])

  const  items = ['one','two','three','four','five','six','seven','eight','nine','ten']
  return (
    <div>
      <h2>List Navigation</h2>
      <div ref={refs.setReference} {...getReferenceProps()}>
        Reference Element
      </div>
      <div
        ref={refs.setFloating}
        style={floatingStyles}
        {...getFloatingProps()}
      >
        {items.map((item,index) => (
          <div key={item}
          // make these elements focusable using a roving tabindex
            tabIndex={activeIndex === index ? 0 : -1}
            ref={(node) => {
              if(listRef.current){
                listRef.current[index] = node as HTMLDivElement;
              }
            }}
            {...getItemProps()}
          >
            {item}
          </div>
        ))}
      
      </div>
    </div>
  )
}

export default ListNavigation
