type Props = {
  className?: string;
  text: string;
  onClick: () => void;
  heroBtn?: boolean;
};

const Button = ({ className, text, onClick, heroBtn }: Props) => {
  return (
    <button
      onClick={onClick}
      className={`${className} uppercase text-base ${
        heroBtn
          ? "bg-gray-400 text-gray-50 hover:bg-black hover:text-white"
          : "bg-black text-white hover:bg-gray-400 hover:text-gray-50"
      } transition-colors ease-in duration-200 font-semibold px-8 py-3 rounded-md shadow-md`}
    >
      {text}
    </button>
  );
};

export default Button;
