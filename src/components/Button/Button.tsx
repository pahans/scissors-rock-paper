export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: () => void;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ onClick, children, ...props }) => {
  return (
    <button
      className="mt-6 rounded-full border-2 border-gold-500 bg-black p-4 px-8 text-lg text-gold-500 hover:opacity-70 disabled:cursor-not-allowed disabled:opacity-25"
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};
