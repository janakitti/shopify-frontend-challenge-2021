interface ICardProps {
  children: React.ReactNode;
}

const Card = ({ children }: ICardProps) => {
  return <div className="card">{children}</div>;
};

export default Card;
