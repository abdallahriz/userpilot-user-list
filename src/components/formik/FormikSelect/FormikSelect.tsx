import React, { useState, useRef, useEffect } from "react";
import {
  Button,
  ClickAwayListener,
  Grow,
  Paper,
  Popper,
  MenuItem,
  MenuList,
} from "@material-ui/core";
import { useSelectStyle } from "./FormikSelect.style";

export const FormikSelect = (props: any) => {
  const classes = useSelectStyle();
  const [open, setOpen] = useState(false);
  const [buttonLabel, setButtonLabel] = useState(props.label);
  const anchorRef = useRef<HTMLButtonElement>(null);
  const prevOpen = useRef(open);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: React.MouseEvent<EventTarget>) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  const handleClickItem = (option: { label: string; value: string }) => {
    setButtonLabel(option.label);
    setOpen(false);
    props.setFieldValue(props.name, option.value);
    props.setFieldTouched(props.name, true, false);
  };

  const handleButtonLabel = () => {
    if (!buttonLabel || buttonLabel === "None") {
      return props.label;
    }
    return buttonLabel;
  };

  // return focus to the button when we transitioned from !open -> open
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div className={classes.root}>
      <div>
        <Button
          ref={anchorRef}
          aria-controls={open ? "menu-list-grow" : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
          className={props.buttonStyles}
        >
          {handleButtonLabel()}
        </Button>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
          className={classes.popper}
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom",
              }}
            >
              <Paper className={props.paperStyles}>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} id="menu-list-grow">
                    {props.options &&
                      props.options.map(
                        (
                          option: { label: string; value: string },
                          index: number
                        ) => (
                          <MenuItem
                            onClick={() => handleClickItem(option)}
                            key={index}
                            value={option.value}
                          >
                            {option.label}
                          </MenuItem>
                        )
                      )}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </div>
  );
};
