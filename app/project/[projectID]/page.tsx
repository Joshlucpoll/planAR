export default async function Page({
  params,
}: {
  params: Promise<{ projectID: string }>;
}) {
  const projectID = (await params).projectID;
  return <div>ProjectID: {projectID}</div>;
}
