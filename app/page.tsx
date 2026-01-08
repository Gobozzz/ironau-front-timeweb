import IndexLayout from "@components/layout/IndexLayout";
import { Title } from "@components/features/welcome/Title/Title";
import { Subtitle } from "@components/features/welcome/Subtitle/Subtitle";
import { Social } from "@components/features/welcome/Social/Social";
import { Search } from "@components/features/welcome/Search/Search";
import { NewNews } from "@components/features/welcome/NewNews/NewNews";
import GlobalSearchModal from "@components/modals/GlobalSearchModal/GlobalSearchModal";
import { Mates } from "./components/shared/Mates/Mates";
import { NewsPaperWrapper } from "./components/features/welcome/Newspaper/NewsPaperWrapper";
import { Interesting } from "./components/features/IndexAside/Interesting/Interesting";

export default function Home() {
  return (
    <IndexLayout>
      <GlobalSearchModal />
      <div className="flex items-start gap-22 mb-20 flex-wrap max-[1497px]:gap-5 max-[800px]:mb-11">
        <div>
          <Title />
          <Subtitle />
        </div>
        <div className="max-[1497px]:flex max-[1497px]:items-start max-[1497px]:justify-between max-[1497px]:gap-3 max-[1497px]:w-full max-[1200px]:hidden">
          <Social />
          <Search />
        </div>
      </div>
      <div className="flex items-start justify-between gap-5 mb-20 max-[1400px]:flex-col-reverse max-[1400px]:gap-11 max-[800px]:mb-11">
        <div className="max-[1400px]:max-w-full max-[1400px]:w-full">
          <NewsPaperWrapper />
        </div>
        <div className="flex-auto max-w-[706px] max-[1400px]:max-w-full max-[1400px]:w-full">
          <NewNews />
        </div>
      </div>
      <div className="hidden max-[1200px]:block">
        <Interesting />
      </div>
      {/* <Mates /> */}
    </IndexLayout>
  );
}
