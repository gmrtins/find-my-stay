import { useTranslation } from "react-i18next";


export const getRatingMessage = (rating: number) => {
    const { t } = useTranslation();

    if (rating >= 0 && rating < 4)
        return t("rating_message_poor");
    if (rating < 6)
        return t("rating_message_passable");
    if (rating < 7.5)
        return t("rating_message_good");
    if (rating < 8.1)
        return t("rating_message_very_good");
    if (rating <= 10)
        return t("rating_message_excellent");
    return "";
}

export const getCurrencySymbol = (currency: string): string => {
    const currencySymbols: { [key: string]: string } = {
        USD: "$",
        EUR: "€",
        GBP: "£",
        JPY: "¥",
        INR: "₹",
        AUD: "A$",
        CAD: "C$",
        CHF: "CHF",
        CNY: "¥",
        SEK: "kr",
        NZD: "NZ$",
    };

    return currencySymbols[currency] || currency;
};

