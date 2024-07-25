import { CreateTemplateDialog, PageEditorContent } from "@/features";
import { withNoSSR } from "@/shared/hooks/useWithNoSSR";
import { TemplatesListTable } from "@/widgets";

function TemplatesPage() {
  return (
    <section>
      <CreateTemplateDialog />
      <TemplatesListTable />
    </section>
  );
}

export default withNoSSR(TemplatesPage);
