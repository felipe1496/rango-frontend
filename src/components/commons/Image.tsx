import {
	type FC,
	type ImgHTMLAttributes,
	type ReactNode,
	useState,
} from "react";

interface Props extends ImgHTMLAttributes<HTMLImageElement> {
	fallback?: ReactNode;
}

export const Image: FC<Props> = ({ src, fallback, alt, ...props }) => {
	const [hasError, setHasError] = useState(false);
	const [isLoaded, setIsLoaded] = useState(false);

	const handleLoad = () => {
		setIsLoaded(true);
	};

	const handleError = () => {
		setHasError(true);
	};

	if (hasError && fallback) {
		return <>{fallback}</>;
	}

	return (
		<>
			{!isLoaded && fallback}
			<img
				src={src}
				alt={alt}
				onLoad={handleLoad}
				onError={handleError}
				style={{
					display: !isLoaded ? "none" : "block",
				}}
				{...props}
			/>
		</>
	);
};
