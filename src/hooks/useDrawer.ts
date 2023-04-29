import { useState } from "react";

type Anchor = "left" | "right"

export const useDrawer = (): [any, (anchor: Anchor, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent)=>void] => {
  const [state, setState] = useState({left: false, right: false})

  const toggleDrawer = (anchor: Anchor, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if(
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  return [state, toggleDrawer]
}