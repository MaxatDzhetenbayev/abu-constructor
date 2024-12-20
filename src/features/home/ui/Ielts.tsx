import { Container, Heading } from "@/shared/ui";

const ielts = [
  { img: "/icons/ielts-1.jpg", link: "https://ielts.kz/" },
  { img: "/icons/ielts-2.jpg", link: "https://ielts.idp.com/book" },
];
export const IELTS = () => {
  return (
    <Container>
      <Heading>Экзамен IELTS</Heading>
      <section className="flex flex-col items-center  md:flex-row md:justify-center gap-10">
        {ielts.map((i) => (
          <a href={i.link} target="_blank" key={i.link}>
            <img className="max-w-[300px]" src={i.img} alt="ielts" />
          </a>
        ))}
      </section>
    </Container>
  );
};
