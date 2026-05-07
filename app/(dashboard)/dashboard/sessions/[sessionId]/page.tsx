import ManageCoursePage from "../../courses/[id]/page";

export const dynamic = "force-dynamic";

export default async function SessionDetailPage({
  params,
}: {
  params: Promise<{ sessionId: string }>;
}) {
  const { sessionId } = await params;
  return await ManageCoursePage({
    params: Promise.resolve({ id: sessionId }),
  });
}
