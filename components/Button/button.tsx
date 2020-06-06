import React, { ReactNode, FC, ButtonHTMLAttributes, AnchorHTMLAttributes, forwardRef, MutableRefObject } from 'react';
import classnames from 'classnames';

export type ButtonSize = 'lg' | 'sm'

export type ButtonType = 'primary' | 'default' | 'danger' | 'link'

interface BaseButtonProps  {
  children: ReactNode
  disabled?: boolean;
  href?: string;
  size?: ButtonSize;
  type?: ButtonType;
  ref?: MutableRefObject<HTMLButtonElement> &  MutableRefObject<HTMLAnchorElement> ;
}

type NativeButtonProps = BaseButtonProps & Omit<ButtonHTMLAttributes<HTMLElement>, 'type'>
type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>

type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>


const Button: FC<ButtonProps> = forwardRef((props, ref) => {
  const {
    children,
    className,
    disabled,
    href,
    size,
    type,
    ...restProps
  } = props;
  const classes = classnames('btn', className, {
    [`btn-${type}`]: type,
    [`btn-${size}`]: size,
    'disabled': (type === 'link') && disabled
  })
  if (type === 'link' && href) {
    return (
    <a
      className={classes}
      href={href}
      ref={ref}
      {...restProps}
    >
      {children}
    </a>)
  } else {
    return (
    <button
      className={classes}
      disabled={disabled}
      ref={ref}
      {...restProps}
    >
      {children}
    </button>)
  }
})

Button.defaultProps = {
  type: 'default',
  disabled: false,
}


export default Button