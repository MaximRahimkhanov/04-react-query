import css from './ErrorMessage.module.css';

interface Props {
  message?: string;
}

function ErrorMessage({ message = "Something went wrong. Please try again." }: Props) {
  return (
    <div className={css.wrapper}>
      <span className={css.icon}>❌</span>
      <p className={css.text}>{message}</p>
    </div>
  );
}

export default ErrorMessage;
