type PluralRulesKeys = 'one' | 'few' | 'many' | 'other';

export type WordsDictionary = {
    [key in PluralRulesKeys]: string;
};

export const useWordPlural = (locale: string) => {

    const pluralRules = new Intl.PluralRules(locale)

    const getWord = (number: number, words: WordsDictionary): string => {
        const rule = pluralRules.select(number) as PluralRulesKeys;
        return words[rule];
    };

    return {
        getWord
    }
}