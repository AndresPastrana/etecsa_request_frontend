import { Slider } from "../components/Slider";
const Landing = () => {
	return (
		<>
			<h1>Landing</h1>
			{/* Header   */}
			<header>
				{/* Navigation */}
				<nav>
					<span>Log</span>
					<ul>
						<li>Link</li>
						<li>Link</li>
						<li>Link</li>
						<li>Link</li>
						<li>Link</li>
						<li>Link</li>
					</ul>
					<form action="">
						<input type="search" />
						<button type="button">Account</button>
					</form>
				</nav>
				{/* Photo name inside assets/img/ */}
				<Slider images={["foto-1.jpg", "foto-2.jpg", "foto-3.jpg"]} />
			</header>

			<main>
				<div>Card 1</div>
				<div>Card 2</div>
				<div>Card 3</div>
			</main>

			<footer>Fotter here</footer>
		</>
	);
};
export default Landing;
