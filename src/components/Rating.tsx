import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

const stars = [
  { wholeNum: 1, decimalNum: 0.5 },
  { wholeNum: 2, decimalNum: 1.5 },
  { wholeNum: 3, decimalNum: 2.5 },
  { wholeNum: 4, decimalNum: 3.5 },
  { wholeNum: 5, decimalNum: 4.5 },
];

type Props = {
  value: number;
};

const Rating = ({ value }: Props) => {
  return (
    <div className='flex gap-1 text-yellow-400'>
      {stars.map((star) => (
        <span key={star.wholeNum}>
          {value >= star.wholeNum ? (
            <FaStar size={24} />
          ) : value >= star.decimalNum ? (
            <FaStarHalfAlt size={24} />
          ) : (
            <FaRegStar size={24} />
          )}
        </span>
      ))}
    </div>
  );
};

export default Rating;
