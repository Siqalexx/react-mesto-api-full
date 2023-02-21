function Footer() {
	const date = new Date();
	return (
		<footer className='footer'>
			<h2 className='footer__copyright'>{`© ${date.getFullYear()} Mesto Russia`}</h2>
		</footer>
	);
}
export default Footer;
