import React, { FunctionComponent, useEffect, useState } from "react";
import classnames from "classnames";
import {
  IconDefinition,
  IconName,
  IconPrefix,
} from "@fortawesome/fontawesome-common-types";
import {
  FontAwesomeIcon as FAIcon,
  FontAwesomeIconProps as FAIconProps,
} from "@fortawesome/react-fontawesome";

import FreeRegularSVGIcons from "./IconPackMaps/FreeRegularSVGIcons";
import FreeBrandsSVGIcons from "./IconPackMaps/FreeBrandsSVGIcons";
import FreeSolidSVGIcons from "./IconPackMaps/FreeSolidSVGIcons";
import CustomIcons from "./IconPackMaps/Custom";

import "./Icon.scss";

type DynamicImportedIcon = {
  definition: IconDefinition;
  prefix: IconPrefix;
  iconName: IconName;
  width: number;
  height: number;
  ligatures: string[];
  unicode: string;
  svgPathData: string;
};

type IconPackMap = {
  lib: string;
  prefix: string;
  iconsNameMap: Record<string, () => Promise<any>>;
};
export const iconPacks: IconPackMap[] = [
  FreeRegularSVGIcons,
  FreeBrandsSVGIcons,
  FreeSolidSVGIcons,
  CustomIcons,
];

const preloadedIconMap: Partial<Record<ICONS, DynamicImportedIcon>> = {};

export function registerPreloadedIcons(iconNames: ICONS[]) {
  iconNames.forEach((iconName) => {
    const pack = iconPacks.find((pack) => iconName in pack.iconsNameMap);
    const importFn = pack?.iconsNameMap[iconName];
    if (!importFn) return;
    return importFn().then((icon) => {
      if (!icon) return;
      preloadedIconMap[iconName] = icon;
    });
  });
}

export type ICONS =
  | keyof typeof FreeRegularSVGIcons.iconsNameMap
  | keyof typeof FreeBrandsSVGIcons.iconsNameMap
  | keyof typeof FreeSolidSVGIcons.iconsNameMap
  | keyof typeof CustomIcons.iconsNameMap;

export interface IconProps extends Omit<FAIconProps, "icon" | "size" | "name"> {
  name: ICONS;
  size?: FAIconProps["size"];
  wrapperClassName?: string;
}
export const Icon: FunctionComponent<IconProps> = ({
  name,
  size,
  wrapperClassName,
  id,
  ...restProps
}) => {
  const [icon, setIcon] = useState<DynamicImportedIcon | null>();

  useEffect(() => {
    const preloadedIcon = preloadedIconMap[name as ICONS];
    if (preloadedIcon) {
      setIcon(preloadedIcon);
      return;
    }
    const pack = iconPacks.find((pack) => name in pack.iconsNameMap);
    const importFn = pack?.iconsNameMap[name];
    if (!importFn) return;
    importFn().then(setIcon);
  }, [name]);

  return (
    <span
      id={id}
      className={classnames("justui__icon-wrapper", wrapperClassName)}
    >
      {icon?.definition && (
        <FAIcon icon={icon.definition} size={size} {...restProps} />
      )}
    </span>
  );
};
