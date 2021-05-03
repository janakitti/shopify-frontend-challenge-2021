interface ICardProps {
  children: React.ReactNode;
  bgImage?: string;
}

const Card = ({ children, bgImage }: ICardProps) => {
  return (
    <div className="card" style={{ backgroundImage: `url('${bgImage}')` }}>
      {children}
    </div>
  );
};

export default Card;
