import css from './Footer.module.css';
import Container from '../Container/Container';
import SupportList from './SupportList/SupportList';
import DownloadList from './DownloadList/DownloadList';
import FooterLogo from './FooterLogo/FooterLogo';

const aboutLinks = ['FAQ', 'Blog', 'Support', 'Contact us'];
const contactLinks = ['Discord', 'FaceBook', 'Linkedin', 'X(Twitter)'];

export default function Footer() {
  return (
    <footer className={css.footer}>
      <Container>
        <ul className={css.list}>
          <li className={css.item}>
            <FooterLogo />
          </li>
          <li className={css.item}>
            <SupportList items={aboutLinks} title="About" />
          </li>
          <li className={css.item}>
            <SupportList items={contactLinks} title="Stay tuned" />
          </li>
          <li className={css.item}>
            <DownloadList />
          </li>
        </ul>
      </Container>
    </footer>
  );
}
