import { getTranslations } from "next-intl/server";

import { LoginForm } from "@/features";
import { Card, CardContent, CardTitle, Separator } from "@/shared/ui";

async function AdminLoginPage() {
  const t = await getTranslations("login");
  return (
    <section className="w-full h-screen flex items-center justify-center">
      <Card className="p-4">
        <CardTitle className="text-center mb-3">{t("title")}</CardTitle>
        <Separator />
        <CardContent className="p-4">
          <LoginForm />
        </CardContent>
      </Card>
    </section>
  );
}
export default AdminLoginPage;
