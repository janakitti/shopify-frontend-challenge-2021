interface ICardProps {
  children: React.ReactNode;
  className?: string;
  bgImage?: string;
  tint?: boolean;
}

const Card = ({ children, className, bgImage, tint }: ICardProps) => {
  return (
    <div
      className={`card ${className}`}
      style={{ backgroundImage: `url('${bgImage}')` }}
    >
      <div className={`inner-container ${tint && "tint"}`}>{children}</div>
    </div>
  );
};

export default Card;
