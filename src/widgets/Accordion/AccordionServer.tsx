import { AccordionClient } from "@/widgets/Accordion/AccordionClient";
import { AccordionProps } from "./model/Accordion.interface";
function Accordion(props: AccordionProps) {
    return <AccordionClient {...props} />;
}

Accordion.displayName = "Accordion";

export default Accordion;
