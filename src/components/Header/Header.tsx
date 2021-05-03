interface IHeaderProps {
  children: React.ReactNode;
}
const Header = ({ children }: IHeaderProps) => {
  return <div className="header">{children}</div>;
};

export default Header;
