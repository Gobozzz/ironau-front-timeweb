import { PageTitle } from "@components/ui/PageTitle/PageTitle";
import { Metadata } from "next";
import ShortLayout from "@components/layout/ShortLayout";
import AuthLayout from "@components/layout/AuthLayout";
import { CreatedBilinguals } from "@components/features/bilinguals/CreatedBilinguals/CreatedBilinguals";
import Link from "next/link";
import Image from "next/image";
import PlusIcon from "@/public/icons/plus-white.svg";
import { BILINGUALS_CREATE } from "@navigate";

export const metadata: Metadata = {
  title: "Мои билингвы",
};

export default function Page() {
  return (
    <ShortLayout>
      <AuthLayout>
        <PageTitle>Билингвы</PageTitle>
        <Link
          href={BILINGUALS_CREATE}
          className="min-w-50 max-w-max h-16 rounded-xl flex items-center justify-center gap-2 bg-blue! text-white! text-[14px] mb-6 select-none max-[1200px]:h-11 max-[1200px]:max-w-full"
        >
          <Image src={PlusIcon} alt="Добавить билингву" />
          Добавить билингву
        </Link>
        <CreatedBilinguals />
      </AuthLayout>
    </ShortLayout>
  );
}
