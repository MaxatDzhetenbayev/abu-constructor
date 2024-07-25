import { CreatePageDialog } from "@/features/PageDialog/CreatePageDialog";
import { withNoSSR } from "@/shared/hooks/useWithNoSSR";

import { PagesListTable } from "@/widgets";

function PagesPage() {
  return (
    <section className="h-full">
      <CreatePageDialog />
      <PagesListTable />
    </section>
  );
}

export default withNoSSR(PagesPage);