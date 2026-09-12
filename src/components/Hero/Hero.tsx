import css from './Hero.module.css';
import Container from '../Container/Container';

export default function Hero() {
  return (
    <section className={css.hero}>
      <Container>
        <h1 className={css.title}>
          Discover great movies for every mood tonight
        </h1>
        <p className={css.subtitle}>
          Explore thousands of movies, discover hidden gems, and find something
          worth watching.
        </p>
      </Container>
    </section>
  );
}
