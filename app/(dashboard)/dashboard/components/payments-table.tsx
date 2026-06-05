"use client";

import RefundButton from './refund-button';

export default function PaymentsTable({ payments }: { payments: any[] }) {
  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-sm">
      <table className="w-full table-fixed">
        <thead className="bg-slate-50 text-left">
          <tr>
            <th className="p-3">When</th>
            <th className="p-3">Student</th>
            <th className="p-3">Course</th>
            <th className="p-3">Amount</th>
            <th className="p-3">Status</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((p) => (
            <tr key={p.id} className="border-t">
              <td className="p-3 text-sm">{new Date(p.createdAt).toLocaleString()}</td>
              <td className="p-3 text-sm">{p.enrollment?.student ? `${p.enrollment.student.firstName} ${p.enrollment.student.lastName}` : '—'}</td>
              <td className="p-3 text-sm">{p.enrollment?.cohort?.course?.title ?? '—'}</td>
              <td className="p-3 text-sm">{(p.amount/100).toFixed(2)} {p.currency.toUpperCase()}</td>
              <td className="p-3 text-sm">{p.status}</td>
              <td className="p-3 text-sm">
                <div className="flex gap-2">
                  <RefundButton paymentId={p.id} stripePaymentIntentId={p.stripePaymentIntentId} currentStatus={p.status} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
