import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { Flex, Icon } from "@tremor/react";
import { FC, useEffect, useState } from "react";
// The slider componet will recive a list of images path
type Props = { images: Array<string>; styles?: string };

enum ArrowAction {
	next = "next",
	prev = "prev",
}

export const Slider: FC<Props> = ({ images, styles }) => {
	const [imagesPaths] = useState(images);
	const [currentIndex, setCurrentIndex] = useState(0);
	const currentImagePath = `../../assets/img/${imagesPaths[currentIndex]}`;

	const handleNextSlider = (type: ArrowAction) => {
		if (imagesPaths.length === 0) return;
		const lastIndex = imagesPaths.length - 1;
		if (type === ArrowAction.next) {
			return currentIndex === lastIndex
				? setCurrentIndex(0)
				: setCurrentIndex(currentIndex + 1);
		} else if (type === ArrowAction.prev) {
			currentIndex === 0
				? setCurrentIndex(lastIndex)
				: setCurrentIndex(currentIndex - 1);
		}
	};

	useEffect(() => {
		const timer = setTimeout(() => handleNextSlider(ArrowAction.next), 3000);

		return () => {
			clearTimeout(timer);
		};
	}, [currentIndex]);

	return (
		<div className="">
			<Flex>
				<Icon
					onClick={() => handleNextSlider(ArrowAction.prev)}
					icon={ChevronLeftIcon}
					variant="outlined"
					size="xs"
				/>

				{/* Slider Item */}
				<div className="transition ease-in-out delay-150">
					<img
						className="w-[200px] h-[200px] "
						src={`../assets/../img/${currentImagePath}`}
						alt=""
					/>
				</div>
				<Icon
					onClick={() => handleNextSlider(ArrowAction.next)}
					icon={ChevronRightIcon}
					variant="outlined"
					size="xs"
				/>
			</Flex>
		</div>
	);
};
