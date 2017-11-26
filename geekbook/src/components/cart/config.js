import React from 'react';
import { animateScroll } from 'react-scroll';

import type {
  GenerateProductKey,
  DefaultLinkComponentProps,
} from './types';

/** @ */
export type ReactStatelessComponent = (props: Object) => React$Element<*>;

/**
 * @memberof config
 */
export const configure = (
  Component: Function,
  configuration: Object,
): ReactStatelessComponent => {
  const Configured: ReactStatelessComponent =
    props =>
      <Component {...configuration} {...props} />;
  Configured.displayName = `Configured(${
    Component.name || Component.displayName
  })`;
  return Configured;
};

/**
 * @memberof config
 */
export const isNaturalNumber = (num: number): boolean =>
  Number.isSafeInteger(num) && num > -1;

/**
 * @memberof config
 */
export const parseInteger = (num: string): number => {
  if (/^\d*$/.test(num))
    return Number.parseInt(num, 10) || 0;
  else return NaN;
};

/* eslint-disable no-redeclare */
declare function IsObject(value: Object): true;
declare function IsObject(value: any): false;
/* eslint-enable no-redeclare */

/**
 * @memberof config
 */
export const isObject: IsObject =
  (value: mixed): boolean => value != null && typeof value === 'object';

/**
 * @memberof config
 */
export const getAbsoluteOffsetTop = (
  { offsetTop, offsetParent, }: HTMLElement = {},
): number =>
  offsetTop + (
    offsetParent
    && offsetParent instanceof HTMLElement
    && getAbsoluteOffsetTop(offsetParent)
  );

/*
 * key in format id/_property1-valueOfProperty1 etc
 */
export const generateProductKey: GenerateProductKey = (
  id,
  properties,
) =>
  Object
    .entries(properties)
    .reduce(
      (acc: string, [ propName, propValue, ]) =>
        `${acc}_${propName}-${String(propValue)}`
      , `${id}/`,
    );

/**
 * @memberof config
 */
export const DefaultLinkComponent = (
  { to, ...otherProps }: DefaultLinkComponentProps,
): React$Element<*> =>
  <a {...otherProps} href={to} />;

/**
 * @memberof config
 */
export const fixInputValueStartingWithZero = (
  target: HTMLInputElement, quantity: number,
) => {
  if (/^0+\d+$/.test(target.value))
    target.value = String(quantity);
};

/**
 * @memberof config
 */
export const scrollFunction = (
  target: EventTarget,
  scrollPosition: number | (currentTarget: Element) => number,
  scrollAnimationConfig: Object,
) => void (
  target instanceof Element
  && animateScroll.scrollTo(
    typeof scrollPosition === 'function'
      ? scrollPosition(target)
      : scrollPosition,
    scrollAnimationConfig,
  )
);
