import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="toast-container" role="region" aria-label="Notifications">
      {toasts.map(toast => {
        const icon = {
          success: <CheckCircle2 size={18} color="#10b981" />,
          error: <AlertCircle size={18} color="#ef4444" />,
          info: <Info size={18} color="#3b82f6" />
        }[toast.type || 'info'];

        return (
          <div key={toast.id} className="toast" role="status">
            {icon}
            <span style={{ flex: 1, fontSize: '0.88rem' }}>{toast.message}</span>
            <button 
              onClick={() => removeToast(toast.id)}
              style={{ background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer', padding: 0 }}
              aria-label="Dismiss alert"
            >
              <X size={15} />
            </button>
          </div>
        );
      })}
    </div>
  );
};
