const Flex = ({
  alignItems = "center",
  justifyContent = "center",
  gap = "",
  className = "",
  dir = "",
  children,
}) => {
  const classes = `align-items-${alignItems} justify-content-${justifyContent} gap-${gap} flex-${dir} ${className}`;
  return <div className={classes}>{children}</div>;
};
export default Flex;
