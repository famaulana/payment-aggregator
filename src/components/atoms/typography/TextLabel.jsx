export const TextLabel = ({ children, className, ...restProps }) => {
  return (
    <p className={"font-semibold text-base my-2"} {...restProps}>
      {children}
    </p>
  );
};
