const Heading = ({ title, subtitle }: { title: string; subtitle: string }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="font-light text-neutral-500 mt-2">{subtitle}</p>
    </div>
  );
};

export default Heading;
