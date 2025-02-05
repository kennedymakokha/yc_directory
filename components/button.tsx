import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;  // Add the `asChild` prop to your button component
};

const Button: React.FC<ButtonProps> = ({ asChild, children, className, ...props }) => {
  // Your custom button component logic
  if (asChild) {
    return <>{children}</>; // If asChild is true, render children without a button wrapper
  }
  
  return (
    <button className={className} {...props}>
      {children}
    </button>
  );
};

export default Button;
