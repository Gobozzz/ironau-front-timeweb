import IndexLayout from "@components/layout/IndexLayout";
import { Title } from "@components/features/welcome/Title/Title";
import { Subtitle } from "@components/features/welcome/Subtitle/Subtitle";
import { Social } from "@components/features/welcome/Social/Social";
import { Search } from "@components/features/welcome/Search/Search";
import { Newspaper } from "@components/features/welcome/Newspaper/Newspaper";
import { NewNews } from "@components/features/welcome/NewNews/NewNews";
import GlobalSearchModal from "@components/modals/GlobalSearchModal/GlobalSearchModal";
import { Mates } from "./components/shared/Mates/Mates";

export default function Home() {
  return (
    <IndexLayout>
      <GlobalSearchModal />
      <div className="flex items-start gap-22 mb-20">
        <div>
          <Title />
          <Subtitle />
        </div>
        <div>
          <Social />
          <Search />
        </div>
      </div>
      <div className="flex items-start justify-between gap-40 mb-20">
        <div className="flex-1">
          <Newspaper />
        </div>
        <div className="flex-1">
          <NewNews />
        </div>
      </div>
      <Mates />
    </IndexLayout>
  );
}
