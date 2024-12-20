import { AdminNavigationCreate, withNoSSR } from "@/features";
import { AdminNavigations } from "@/widgets";

function PagesPage() {
  return (
    <section className="h-full">
      <AdminNavigationCreate />
      <AdminNavigations />
    </section>
  );
}
export default withNoSSR(PagesPage);
