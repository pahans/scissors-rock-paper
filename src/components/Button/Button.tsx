export interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ onClick, children }) => {
  return (
    <button
      className="mt-6 rounded-full border-2 border-gold-500 bg-black p-4 px-8 text-lg text-gold-500 hover:opacity-70"
      onClick={onClick}
    >
      {children}
    </button>
  );
};
