import { createPolymorphicComponent, mergeDefaultProps, mergeRefs } from "@kobalte/utils";
import { JSX, Show, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";

import { useDialogContext, useDialogPortalContext } from "../dialog";
import { usePopoverContext } from "./popover-context";
import { DialogPositioner, DialogPositionerProps } from "../dialog/dialog-positioner";

export interface PopoverPositionerProps extends DialogPositionerProps {
  /** The HTML styles attribute (object form only). */
  style?: JSX.CSSProperties;
}

/**
 * The element that positions the popover.
 */
export const PopoverPositioner = createPolymorphicComponent<"div", PopoverPositionerProps>(
  props => {
    const popoverContext = usePopoverContext();

    props = mergeDefaultProps({ as: "div" }, props);

    const [local, others] = splitProps(props, ["ref", "style"]);

    return (
      <DialogPositioner
        ref={mergeRefs(popoverContext.setPositionerRef, local.ref)}
        role="presentation"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          ...local.style,
        }}
        {...others}
      />
    );
  }
);
