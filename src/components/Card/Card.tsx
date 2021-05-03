interface ICardProps {
  children: React.ReactNode;
  className?: string;
  bgImage?: string;
}

const Card = ({ children, className, bgImage }: ICardProps) => {
  return (
    <div
      className={`card ${className}`}
      style={{ backgroundImage: `url('${bgImage}')` }}
    >
      {children}
    </div>
  );
};

export default Card;
