import * as cloneDeep from 'lodash.clonedeep';
import moment from 'moment';
import {
  ButtonBack,
  ButtonNext,
  CarouselProvider,
  DotGroup,
  Slide,
  Slider,
} from 'pure-react-carousel';

import styles from './styles.module.css';

const shuffleArray = (passedArray) => {
  const array = cloneDeep(passedArray);
  var currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
};

const parseNull = (str) => {
  if (str === 'null') {
    return null;
  }
  return str;
};

const contentToPreview = (text) => {
  text = text || '';

  const delimeter = '…';
  text = text.split(delimeter);

  if (text.length === 1) {
    return text;
  }

  // remove preset overflow text (ex: ' [+3883 chars]')
  text.pop();
  return text.join(delimeter).trim() + delimeter;
};

const removeSourceFromTitle = (title) => {
  const delimeter = ' - ';
  const titleArr = title.split(delimeter);
  if (titleArr.length === 1) {
    return title;
  }
  titleArr.pop();
  return titleArr.join(delimeter);
};

const ArticleCarousel = ({ articles }) => {
  articles = shuffleArray(articles);
  const ARTICLES_COUNT = 7;
  let articleIdx = 0;
  const articleElms = articles
    .map((article) => {
      const author = parseNull(article.source.name) || parseNull(article.author) || 'Unknown';
      let title = parseNull(article.title);

      const date = moment(parseNull(article.publishedAt) || new Date().toISOString(), moment.ISO_8601).calendar();
      const imageURL = parseNull(article.urlToImage);
      const url = parseNull(article.url);
      const description =
        parseNull(article.description) || parseNull(contentToPreview(article.content)) || 'No description provided for this article.';

      if (title) title = removeSourceFromTitle(title);

      // title and url are required
      if (!title || !url || title.trim().length === 0 || url.trim().length === 0 || imageURL === null) return null;

      // new slide with the article
      const res = (
        <Slide index={articleIdx} className={styles.slide} style={{ '--bg-image': `url('${imageURL}')` }}>
          <a rel='noreferrer' href={url} target='_blank'>
            <div className={styles.contentContainer}>
              <h1>{title}</h1>
              <div className={styles.meta}>
                <p>
                  By&nbsp;<strong>{author}</strong> &nbsp;&bull;&nbsp; {date}
                </p>
              </div>
              <p>{description}</p>
            </div>
          </a>
        </Slide>
      );
      return res;
    })
    .filter((e) => e !== null)
    .slice(0, ARTICLES_COUNT);

  return (
    <>
      <CarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={40}
        totalSlides={articleElms.length}
        className={styles.carousel}
        isPlaying={true}
        infinite={true}
        visibleSlides={1}
      >
        <Slider>{articleElms}</Slider>
        <DotGroup className={styles.dots} />
        <ButtonBack className={`${styles.button} ${styles.back}`}>
          <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
            <path d='M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z' />
          </svg>
        </ButtonBack>
        <ButtonNext className={`${styles.button} ${styles.next}`}>
          <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
            <path d='M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z' />
          </svg>
        </ButtonNext>
      </CarouselProvider>
    </>
  );
};

export default ArticleCarousel;
