import Logo from "../assets/logo.png";

const Header = () => {
  return (
    <header
      style={{
        display: "flex",
        justifyContent: "start",
        padding: "1rem",
        borderBottom: "1px solid #e0e0e0",
        marginBottom: "1rem",
      }}
    >
      <img
        src={Logo}
        alt="Logo"
        style={{
          maxWidth: "110px",
          marginRight: "1rem",
        }}
      />
    </header>
  );
};
export default Header;
