import React from 'react';
import { XCircle, AlertCircle, CheckCircle } from 'lucide-react';

const CustomAlert = ({ variant = 'default', title, children }) => {
  const variants = {
    default: {
      container: 'bg-blue-50 border-blue-400 text-blue-700',
      icon: <AlertCircle className="h-5 w-5 text-blue-400" />
    },
    destructive: {
      container: 'bg-red-50 border-red-400 text-red-700',
      icon: <XCircle className="h-5 w-5 text-red-400" />
    },
    success: {
      container: 'bg-green-50 border-green-400 text-green-700',
      icon: <CheckCircle className="h-5 w-5 text-green-400" />
    }
  };

  const style = variants[variant] || variants.default;

  return (
    <div className={`rounded-lg border p-4 ${style.container}`}>
      <div className="flex items-center gap-3">
        {style.icon}
        <div>
          {title && <h4 className="font-semibold mb-1">{title}</h4>}
          <div className="text-sm opacity-90">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default CustomAlert;
