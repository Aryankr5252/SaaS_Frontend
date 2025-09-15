import React, { useState } from 'react';
import api from '../api/api';

const UpgradeButton = ({ user, notesCount, tenantSlug, onUpgraded }) => {
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [upgraded, setUpgraded] = useState(false);

  const handleUpgrade = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const res = await api.post(`/tenant/${tenantSlug}/upgrade`);
      setMessage(res.data.message || 'Upgraded successfully!');
      setShowForm(false);
      setUpgraded(true);
      if (onUpgraded) onUpgraded();
    } catch (err) {
      setMessage(err.response?.data?.message || 'Upgrade failed');
    }
    setLoading(false);
  };

  if (notesCount < 3 || upgraded) return null;

  if (user.role === 'Admin') {
    return (
      <div className="mb-6">
        {showForm ? (
          <form onSubmit={handleUpgrade} className="flex flex-col gap-2 max-w-sm">
            <div className="text-lg font-semibold mb-2">Upgrade Tenant to Pro Now you can add notes</div>
            <div className="mb-2">Tenant Slug: <span className="font-mono bg-gray-100 px-2 py-1 rounded">{tenantSlug}</span></div>
            <button type="submit" className="bg-yellow-400 text-white px-4 py-2 rounded hover:bg-yellow-500 transition" disabled={loading}>
              {loading ? 'Upgrading...' : 'Confirm Upgrade'}
            </button>
            {message && <div className="mt-2 text-green-600">{message}</div>}
          </form>
        ) : (
          <button onClick={() => setShowForm(true)} className="bg-yellow-400 text-white px-4 py-2 rounded hover:bg-yellow-500 transition">Upgrade to Pro</button>
        )}
      </div>
    );
  }

  // For Member
  return (
    <div className="mb-6 text-yellow-700 font-semibold">Ask your admin to upgrade to Pro for more notes.</div>
  );
};

export default UpgradeButton;
