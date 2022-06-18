import React, { FunctionComponent } from "react";
import {
  FontAwesomeIcon as FAIcon,
  FontAwesomeIconProps as FAIconProps,
} from "@fortawesome/react-fontawesome";
import classnames from "classnames";

import "./Icon.scss";

import * as SOLID_ICONS from "@fortawesome/free-solid-svg-icons";
import * as REGULAR_ICONS from "@fortawesome/free-regular-svg-icons";
import * as BRANDS_ICONS from "@fortawesome/free-brands-svg-icons";

export const ICONS = {
  ...SOLID_ICONS,
  ...REGULAR_ICONS,
  ...BRANDS_ICONS,
};

export interface IconProps extends Omit<FAIconProps, "icon" | "size" | "name"> {
  name: keyof typeof ICONS;
  size?: FAIconProps["size"];
  wrapperClassName?: string;
}
export const Icon: FunctionComponent<IconProps> = ({
  name,
  color = "none",
  size,
  className,
  wrapperClassName,
  id,
  ...restProps
}) => {
  return (
    <span
      id={id}
      className={classnames("justui__icon-wrapper", wrapperClassName)}
    >
      <FAIcon
        // @ts-ignore
        icon={ICONS[name]}
        size={size}
        {...restProps}
      />
    </span>
  );
};
