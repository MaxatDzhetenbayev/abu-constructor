import Accordion from "./constructor/Accordion/Accordion";
import { AccordionEditOptions } from "./constructor/Accordion/config";
import Cards from "./constructor/Cards/Cards";
import { CardEditOptions } from "./constructor/Cards/config";
import Carousel from "./constructor/Carousel";
import { CarouselEditOptions } from "./constructor/Carousel/config";
import { GalleryEditOptions } from "./constructor/Gallery/config";
import Gallery from "./constructor/Gallery/Gallery";
import { InfoEditOptions } from "./constructor/Info/config";
import Info from "./constructor/Info/Info";
import { LinkEditOptions } from "./constructor/Links/config";
import Links from "./constructor/Links/Links";
import { ListEditOptions } from "./constructor/List/config";
import List from "./constructor/List/List";
import { PersonProfilesEditOptions } from "./constructor/PersonProfiles/config";
import PersonProfiles from "./constructor/PersonProfiles/PersonProfiles";
import StepSwitcher from "./constructor/StepSwitcher";
import { StepSwitcherEditOptions } from "./constructor/StepSwitcher/config";
import Tabs from "./constructor/Tabs";
import { TabsEditOptions } from "./constructor/Tabs/config";
import { TextEditOptions } from "./constructor/Text/config";
import Text from "./constructor/Text/Text";

export { EditWidget } from "./common/EditWidget/EditWidget";
export { AdminNavigations } from "./common/admin-navigation";
export { AdminSidebar } from "./common/AdminSidebar/AdminSidebar";
export { BreadCrumbs } from "./common/BreadCrumbs";
export { BurgerMenu } from "./common/BurgerMenu/BurgerMenu";
export { Header } from "./common/Header/ui/Header";
export { NavigationPageContent } from "./common/NavigationPageContent";
export { SearchWidget } from "./common/search-widget/search-widget";

export { Counter } from "./common/Animations";

export {
  Accordion,
  Cards,
  Carousel,
  Gallery,
  Info,
  Links,
  List,
  Text,
  StepSwitcher,
  Tabs,
};

export const widgetsList = [
  Cards,
  StepSwitcher,
  Carousel,
  List,
  Text,
  Links,
  Info,
  Accordion,
  Gallery,
  Tabs,
  PersonProfiles,
];

export const WidgetOptionList = [
  AccordionEditOptions,
  CardEditOptions,
  ListEditOptions,
  CarouselEditOptions,
  InfoEditOptions,
  TextEditOptions,
  LinkEditOptions,
  TabsEditOptions,
  GalleryEditOptions,
  StepSwitcherEditOptions,
  PersonProfilesEditOptions,
];

export const getWidgetByName = (
  name: string,
  props: any
): React.JSX.Element | null => {
  const widget = widgetsList.find((w) => {
    return w.displayName == name;
  });

  if (widget) {
    return widget({ ...props });
  }
  return null;
};
