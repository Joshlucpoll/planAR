"use client";

import { ARView } from "@/app/widgets/ar-view";
import { Anchor } from "@/app/widgets/test-xr";
import { VariantAR } from "@/app/widgets/variant";

export default function Page({ params }: { params: { projectID: string } }) {
  // const projectID = (await params).projectID;

  return (
    <div>
      {/* in arProjectID: {params.projectID} */}
      <ARView></ARView>
      {/* <Anchor></Anchor> */}
      {/* <VariantAR></VariantAR> */}
    </div>
  );
}
