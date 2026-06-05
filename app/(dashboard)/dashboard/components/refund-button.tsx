"use client";

import { useState } from 'react';
import { toast } from 'sonner';

export default function RefundButton({ paymentId, stripePaymentIntentId, currentStatus } : { paymentId: string, stripePaymentIntentId?: string | null, currentStatus: string }) {
  const [loading, setLoading] = useState(false);

  const handleRefund = async () => {
    if (!confirm('Refund this payment? This will attempt to refund via Stripe.')) return;
    setLoading(true);
    try {
      const res = await fetch('/api/v1/stripe/refund', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paymentId }),
      });
      const data = await res.json();
      if (data?.success) {
        toast.success('Refund initiated');
        // simple page refresh to reflect status
        setTimeout(() => location.reload(), 800);
      } else {
        toast.error(data?.error || 'Refund failed');
      }
    } catch (err) {
      console.error(err);
      toast.error('Network error');
    } finally {
      setLoading(false);
    }
  };

  const disabled = loading || currentStatus === 'REFUNDED' || currentStatus === 'FAILED';

  return (
    <button
      onClick={handleRefund}
      disabled={disabled}
      className={`px-3 py-2 rounded text-sm ${disabled ? 'opacity-50 cursor-not-allowed' : 'bg-red-600 text-white hover:bg-red-700'}`}
    >
      {loading ? 'Processing...' : (currentStatus === 'REFUNDED' ? 'Refunded' : 'Refund')}
    </button>
  );
}
