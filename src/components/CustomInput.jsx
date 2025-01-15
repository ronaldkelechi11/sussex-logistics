import React from 'react';

const CustomInput = React.forwardRef(({ className = "", icon: Icon, ...props }, ref) => {
  return (
    <div className="relative w-full">
      {Icon && (
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          {Icon}
        </div>
      )}
      <input
        ref={ref}
        className={`
          w-full rounded-md border border-input bg-white px-3 py-2 text-sm
          placeholder:text-muted-foreground
          focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
          disabled:cursor-not-allowed disabled:opacity-50
          ${Icon ? 'pl-10' : 'pl-3'}
          ${className}
        `}
        {...props}
      />
    </div>
  );
});

CustomInput.displayName = 'CustomInput';

export default CustomInput;
