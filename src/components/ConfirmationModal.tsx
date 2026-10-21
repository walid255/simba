import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isDestructive?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  title,
  message,
  confirmLabel = 'Confirm Action',
  cancelLabel = 'Cancel',
  isDestructive = true,
  onConfirm,
  onCancel
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onCancel} role="alertdialog" aria-modal="true" aria-labelledby="confirm-dialog-title">
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '440px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: isDestructive ? 'var(--primary-light)' : 'var(--bg-secondary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: isDestructive ? 'var(--primary)' : 'var(--text-main)'
            }}>
              <AlertTriangle size={20} />
            </div>
            <h3 id="confirm-dialog-title" style={{ fontSize: '1.15rem', fontWeight: 700, margin: 0 }}>
              {title}
            </h3>
          </div>
          <button className="btn-icon" onClick={onCancel} aria-label="Close dialog" style={{ width: '32px', height: '32px' }}>
            <X size={18} />
          </button>
        </div>

        <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '1.5rem' }}>
          {message}
        </p>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
          <button className="btn btn-outline" onClick={onCancel}>
            {cancelLabel}
          </button>
          <button 
            className="btn btn-primary" 
            onClick={onConfirm}
            style={isDestructive ? { backgroundColor: 'var(--primary)', borderColor: 'var(--primary)' } : {}}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};
