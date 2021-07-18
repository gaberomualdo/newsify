const ErrorMessage = ({ displayed, children }) => {
  return <p style={{ textAlign: 'center', fontSize: '1.15rem', color: 'var(--red-color)', fontWeight: 600, marginTop: '1.5rem' }}>{children}</p>;
};
export default ErrorMessage;
