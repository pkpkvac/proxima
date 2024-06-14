import React from 'react';

type ButtonProps = {
	onClick: () => void;
	className: string;
	children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({
	onClick,
	className,
	children,
	...props
}) => {
	return (
		<button onClick={onClick} className={className} {...props}>
			{children}
		</button>
	);
};

export default Button;
