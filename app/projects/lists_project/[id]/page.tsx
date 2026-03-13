import BackButton from "@/components/button/BackButton";


export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;


  return (
    <div>
      <BackButton className="border px-1 py-0.5 rounded-sm" >
        Go Back
      </BackButton>
      <div>Product ID: {id}</div>
    </div>
  );
}