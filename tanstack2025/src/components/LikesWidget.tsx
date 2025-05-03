import { LikeIcon, LikeIndicator } from "@/components/LoadingIndicator";
import { saveLike } from "@/queries";
import LikeButton from "@/components/LikeButton";

type LikesWidgetProps = {
  cardId: string;
  currentLikes: number;
};

export function LikesWidget({ cardId, currentLikes }: LikesWidgetProps) {
  async function handleSave() {
    "use server";

    await saveLike(cardId);
  }

  return (
    <form className={"inline-block"} action={handleSave}>
      <LikeButton currentLikes={currentLikes} />
    </form>
  );
}
