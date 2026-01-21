import { StarIcon } from "lucide-react";
import { Button } from "../ui/button";

function StarRatingComponent({ rating, handleRatingChange }) {
  return [1, 2, 3, 4, 5].map((star) => (
    <Button
      key={star}
      className={`p-2 rounded-full transition-all duration-300 border-none bg-transparent shadow-none hover:bg-black/5 active:scale-95 ${
        star <= rating ? "text-orange-400" : "text-gray-200"
      }`}
      variant="ghost"
      size="icon"
      onClick={handleRatingChange ? () => handleRatingChange(star) : null}
    >
      <StarIcon
        className={`w-6 h-6 transition-all duration-300 ${
          star <= rating
            ? "fill-orange-400 scale-110"
            : "fill-transparent hover:fill-gray-100"
        }`}
      />
    </Button>
  ));
}

export default StarRatingComponent;
