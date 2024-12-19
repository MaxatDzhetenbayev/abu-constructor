import { withNoSSR } from "@/features";
import { NavigationCreateModal } from "@/features";
import { AdminNavigations } from "@/widgets";

function PagesPage() {
  return (
    <section className="h-full">
      <NavigationCreateModal />
      <AdminNavigations />
    </section>
  );
}
export default withNoSSR(PagesPage);
