import { QuizCategoryOptions, QuizStatus, VisibilityOptions } from "@api/quiz";
import {
  IconCategoryArt,
  IconCategoryBusiness,
  IconCategoryEntertainment,
  IconCategoryFashion,
  IconCategoryFood,
  IconCategoryFunny,
  IconCategoryGeography,
  IconCategoryHealth,
  IconCategoryHistory,
  IconCategoryLanguages,
  IconCategoryLiterature,
  IconCategoryMythology,
  IconCategoryNature,
  IconCategoryOther,
  IconCategoryPolitics,
  IconCategoryPopCulture,
  IconCategoryScience,
  IconCategorySports,
  IconCategoryTechnology,
  IconCategoryTravel,
} from "@app/assets/icons";
import { SvgIconProps } from "@mui/material";

export const quizVisibilityOptions: Record<VisibilityOptions, string> = {
  PRIVATE: "Private",
  PUBLIC: "Public",
  LINK: "Accessible with link",
};

export const quizCategoryOptions: Record<
  QuizCategoryOptions,
  {
    label: string;
    Icon: (props: SvgIconProps) => JSX.Element;
    color: string;
  }
> = {
  ART: { label: "Art", Icon: IconCategoryArt, color: "#FF69B4" },
  BUSINESS: { label: "Business", Icon: IconCategoryBusiness, color: "#2F4F4F" },
  ENTERTAINMENT: {
    label: "Entertainment",
    Icon: IconCategoryEntertainment,
    color: "#FF6347",
  },
  FASHION: { label: "Fashion", Icon: IconCategoryFashion, color: "#C71585" },
  FOOD_AND_DRINK: {
    label: "Food and Drink",
    Icon: IconCategoryFood,
    color: "#FF8C00",
  },
  FUNNY: { label: "Funny", Icon: IconCategoryFunny, color: "#FFDAB9" },
  GEOGRAPHY: {
    label: "Geography",
    Icon: IconCategoryGeography,
    color: "#32CD32",
  },
  HEALTH: {
    label: "Health and Medicine",
    Icon: IconCategoryHealth,
    color: "#3CB371",
  },
  HISTORY: { label: "History", Icon: IconCategoryHistory, color: "#8B4513" },
  LANGUAGES: {
    label: "Languages",
    Icon: IconCategoryLanguages,
    color: "#6A5ACD",
  },
  LITERATURE: {
    label: "Literature",
    Icon: IconCategoryLiterature,
    color: "#800080",
  },
  MYTHOLOGY: {
    label: "Mythology",
    Icon: IconCategoryMythology,
    color: "#DAA520",
  },
  NATURE: {
    label: "Nature and Environment",
    Icon: IconCategoryNature,
    color: "#228B22",
  },
  OTHER: { label: "Other", Icon: IconCategoryOther, color: "#A9A9A9" },
  POLITICS: { label: "Politics", Icon: IconCategoryPolitics, color: "#B22222" },
  POP_CULTURE: {
    label: "Pop Culture",
    Icon: IconCategoryPopCulture,
    color: "#FF4500",
  },
  SCIENCE: { label: "Science", Icon: IconCategoryScience, color: "#1E90FF" },
  SPORTS: { label: "Sports", Icon: IconCategorySports, color: "#91f086" },
  TECHNOLOGY: {
    label: "Technology",
    Icon: IconCategoryTechnology,
    color: "#4682B4",
  },
  TRAVEL: { label: "Travel", Icon: IconCategoryTravel, color: "#20B2AA" },
};

export const quizStatusOptions: Record<QuizStatus, string> = {
  DRAFT: "Draft",
  READY: "Ready",
};
