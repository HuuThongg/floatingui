import {
  useFloating,
  flip,
  size,
  autoUpdate,
  SideObject,
  useInteractions,
  inner,
  useInnerOffset,
  useClick,
  useListNavigation,
  useDismiss,
  useRole,
  useTypeahead,
  FloatingFocusManager,
  FloatingOverlay,
  FloatingPortal,
  offset,
  shift
} from "@floating-ui/react";

import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";

const MacOSSelect = () => {
  return (
    <div>Select</div>
  )
}

export default MacOSSelect