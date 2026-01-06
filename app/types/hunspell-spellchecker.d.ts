declare module "hunspell-spellchecker" {
  interface Dictionary {
    check(word: string): boolean;
    suggest(word: string): string[];
  }

  class SpellChecker {
    parse(aff: string, dic: string): void;
    getDictionary(locale: string): Dictionary;
  }

  export = SpellChecker;
}
