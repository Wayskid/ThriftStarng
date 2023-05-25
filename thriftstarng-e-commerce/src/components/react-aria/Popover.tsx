import type { OverlayTriggerState } from "react-stately";
import type { AriaPopoverProps } from "@react-aria/overlays";
import * as React from "react";
import { usePopover, DismissButton, Overlay } from "@react-aria/overlays";
import "./reactArialStyle.scss"

interface PopoverProps extends Omit<AriaPopoverProps, "popoverRef"> {
  children: React.ReactNode;
  state: OverlayTriggerState;
  className?: string;
  popoverRef?: React.RefObject<HTMLDivElement>;
}

export function Popover(props: PopoverProps) {
  let ref = React.useRef<HTMLDivElement>(null);
  let { popoverRef = ref, state, children, isNonModal } = props;

  let { popoverProps, underlayProps } = usePopover(
    {
      ...props,
      popoverRef,
    },
    state
  );

  return (
    <Overlay>
      {!isNonModal && <div {...underlayProps} className="overlay" />}
      <div
        {...popoverProps}
        ref={popoverRef}
        className={`popover`}
      >
        {!isNonModal && <DismissButton onDismiss={state.close} />}
        {children}
        <DismissButton onDismiss={state.close} />
      </div>
    </Overlay>
  );
}
