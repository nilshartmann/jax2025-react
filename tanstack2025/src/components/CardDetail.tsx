import { Link } from "@tanstack/react-router";
import { CardDto } from "@/types.ts";
import Card from "@/components/Card.tsx";

type CardDetailProps = {
  card: CardDto;
};
export default function CardDetail({ card }: CardDetailProps) {
  return (
    <div
      className={
        "container mx-auto mt-8 flex flex-col items-center justify-center"
      }
    >
      <Card {...card} />
    </div>
  );
}
