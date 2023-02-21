import vector from "../images/Vector.svg";
function Header({ email, children }) {
	return (
		<header className='header'>
			<img src={vector} alt='Логотип' className='header__logo'></img>
			<div style={{ display: "flex" }}>
				{email && <p className='header__email'>{email}</p>}
				{children}
			</div>
		</header>
	);
}
export default Header;
