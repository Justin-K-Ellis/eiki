import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { useTranslations } from "next-intl";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import LanguageSwitcher from "./LanguageSwitcher";

export default function SigninSignup() {
  const t = useTranslations("LandingPage");

  return (
    <section className="flex flex-col items-center justify-center gap-8 md:gap-10 mt-8">
      <h1 className="text-6xl md:text-9xl font-bold">{t("title")}</h1>
      <h2 className="text-4xl md:text-5xl text-center">{t("subtitle")}</h2>
      <Card className="flex flex-col justify-center w-11/12 md:w-5/10">
        <CardHeader>
          <CardTitle className="text-center">{t("blurb")}</CardTitle>
        </CardHeader>
        <div className="flex justify-center items-center">
          <div className="flex gap-2 justify-center items-center">
            <div className="shadow border p-2 rounded">
              <SignInButton>{t("sign-in")}</SignInButton>
            </div>
            <div className="shadow border p-2 rounded">
              <SignUpButton>{t("sign-up")}</SignUpButton>
            </div>
          </div>
        </div>
      </Card>
      <LanguageSwitcher />
    </section>
  );
}
