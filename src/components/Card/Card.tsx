interface ICardProps {
  children: React.ReactNode;
  className?: string;
  bgImage?: string;
  tint?: boolean;
  onClick?: () => void;
}

const Card = ({ children, className, bgImage, tint, onClick }: ICardProps) => {
  return (
    <div
      className={`card ${className}`}
      style={{ backgroundImage: `url('${bgImage}')` }}
      onClick={onClick}
    >
      <div className={`inner-container ${tint && "tint"}`}>{children}</div>
    </div>
  );
};

export default Card;
