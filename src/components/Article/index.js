import moment from 'moment';
import { useState } from 'react';
import LazyLoad from 'react-lazyload';
import styles from './styles.module.css';

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

const Article = ({ article }) => {
  const author = parseNull(article.source.name) || parseNull(article.author) || 'Unknown';
  let title = parseNull(article.title);

  const date = moment(parseNull(article.publishedAt) || new Date().toISOString(), moment.ISO_8601).calendar();
  const imageURL = parseNull(article.urlToImage);
  const url = parseNull(article.url);
  const description = parseNull(article.description) || parseNull(contentToPreview(article.content)) || 'No description provided for this article.';

  if (title) {
    title = removeSourceFromTitle(title);
  }

  // title and url are required
  if (!title || !url || title.trim().length === 0 || url.trim().length === 0) {
    return <></>;
  }

  const [imageFailed, setImageFailed] = useState(false);

  return (
    <a
      className={styles.article}
      rel='noreferrer'
      href={url}
      target='_blank'
      image={imageURL ? 'true' : 'false'}
      image-failed={imageFailed ? 'true' : 'false'}
    >
      <div className={styles.imageContainer}>
        {imageURL ? (
          <LazyLoad once={true}>
            <img
              src={imageURL}
              alt={title + ' - Next.js News'}
              onError={() => {
                setImageFailed(true);
              }}
            />
          </LazyLoad>
        ) : null}
      </div>
      <div className={styles.contentContainer}>
        <h1>{title}</h1>
        <p>{description}</p>
        <div className={styles.contentBottomArea}>
          <p>
            By&nbsp;<strong>{author}</strong>
          </p>
          <p>{date}</p>
        </div>
      </div>
    </a>
  );
};

export default Article;
