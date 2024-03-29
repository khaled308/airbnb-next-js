type Props = {
  onClick: () => void;
  label: string;
};

const MenuItem = ({ onClick, label }: Props) => {
  return (
    <div
      className="p-4 hover:bg-neutral-100 transition font-semibold"
      onClick={onClick}
    >
      {label}
    </div>
  );
};

export default MenuItem;
