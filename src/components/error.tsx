export const ErrorComponent = ({ error }: { error: Error }) => {
  return <div>{JSON.stringify(error)}</div>;
};
