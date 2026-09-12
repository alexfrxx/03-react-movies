import css from './DownloadList.module.css';

export default function DownloadList() {
  return (
    <ul className={css.download}>
      <h3>Get the App</h3>
      <li>
        <a href="#" target="blank">
          <svg width="160" height="50">
            <use href="./sprite.svg#appstore"></use>
          </svg>
        </a>
      </li>
      <li>
        <a href="#" target="blank">
          <svg width="160" height="51">
            <use href="./sprite.svg#market"></use>
          </svg>
        </a>
      </li>
    </ul>
  );
}
