import React, { useState } from 'react';
import { X, Copy, Eye, Edit3, Check } from 'lucide-react';

interface ShareModalProps {
  canvasId: string;
  onClose: () => void;
}

export function ShareModal({ canvasId, onClose }: ShareModalProps) {
  const [copied, setCopied] = useState<string | null>(null);

  const baseUrl = window.location.origin;
  const editUrl = `${baseUrl}/canvas/${canvasId}`;
  const viewUrl = `${baseUrl}/canvas/${canvasId}?viewOnly=true`;

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(type);
      setTimeout(() => setCopied(null), 2000);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg mx-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Share Canvas</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-md transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          {/* Edit Link */}
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Edit3 size={16} className="text-blue-600" />
              <label className="text-sm font-medium text-gray-700">
                Edit Link (Full Access)
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={editUrl}
                readOnly
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm bg-gray-50"
              />
              <button
                onClick={() => copyToClipboard(editUrl, 'edit')}
                className="px-3 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition-colors flex items-center space-x-1"
              >
                {copied === 'edit' ? <Check size={16} /> : <Copy size={16} />}
                <span>{copied === 'edit' ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Anyone with this link can view and edit the canvas
            </p>
          </div>

          {/* View Link */}
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Eye size={16} className="text-green-600" />
              <label className="text-sm font-medium text-gray-700">
                View-Only Link
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={viewUrl}
                readOnly
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm bg-gray-50"
              />
              <button
                onClick={() => copyToClipboard(viewUrl, 'view')}
                className="px-3 py-2 bg-green-600 text-white rounded-md text-sm hover:bg-green-700 transition-colors flex items-center space-x-1"
              >
                {copied === 'view' ? <Check size={16} /> : <Copy size={16} />}
                <span>{copied === 'view' ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Anyone with this link can only view the canvas
            </p>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            <strong>Note:</strong> No login is required. Anyone with these links can access 
            your canvas. Share responsibly.
          </p>
        </div>
      </div>
    </div>
  );
}