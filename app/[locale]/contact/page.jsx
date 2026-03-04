import { useTranslations } from "next-intl";

export default function ContactPage() {
  const t = useTranslations("contact");

  return (
    <div>
      <h1>{t("title")}</h1>
    </div>
  );
}
