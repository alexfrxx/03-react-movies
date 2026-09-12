import css from './FooterLogo.module.css';

export default function FooterLogo() {
  return (
    <a href="./index.html" className={css.logo}>
      <svg width="40" height="40" className={css.icon}>
        <use href="./sprite.svg#tv"></use>
      </svg>
      <p>
        Movi<span className={css.red}>X</span>
      </p>
    </a>
  );
}
