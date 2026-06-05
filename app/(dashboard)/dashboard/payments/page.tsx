import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import PaymentsTable from '../components/payments-table';

export default async function PaymentsPage() {
  const session = await auth();
  if (!session?.user || !['ADMIN','SUPER_ADMIN','ADMIN_STAFF'].includes((session.user as any).role)) {
    return <div className="p-8">Unauthorized</div>;
  }

  const payments = await prisma.payment.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      enrollment: {
        include: {
          student: true,
          cohort: { include: { course: true } },
        },
      },
    },
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Payments</h1>
      <p className="text-sm text-muted-foreground mb-6">Recent payments and refunds. Admin controls below.</p>
      <PaymentsTable payments={payments} />
    </div>
  );
}
