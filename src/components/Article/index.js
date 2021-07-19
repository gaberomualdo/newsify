import {
  Fragment,
  useState,
} from 'react';

import moment from 'moment';
import LazyLoad from 'react-lazyload';

import {
  Menu,
  Transition,
} from '@headlessui/react';

import styles from './styles.module.css';

const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ');
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

  // IMPORTANT: whenever a Tailwind.css class is used, add it to the purge safelist in tailwind.config.js
  const menuItemClassnames = (active) =>
    classNames(active ? 'bg-gray-100' : 'bg-white', 'cursor-pointer transition-all block px-4 py-2 text-sm text-gray-700 w-full text-left truncate');

  return (
    <div className={styles.articleContainer}>
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
                alt={title + ' - Newsify'}
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
      <Menu as='div' className={classNames(styles.menuContainer, 'ml-3 absolute top-0 right-0 p-2')}>
        {({ open }) => (
          <>
            <div>
              <Menu.Button className='cursor-pointer transition-all max-w-xs bg-white border rounded-full flex items-center text-sm outline-none p-2 md:hover:bg-gray-100'>
                {open ? (
                  <svg className='h-5 w-5 p-0.5' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
                    <path d='M23 20.168l-8.185-8.187 8.185-8.174-2.832-2.807-8.182 8.179-8.176-8.179-2.81 2.81 8.186 8.196-8.186 8.184 2.81 2.81 8.203-8.192 8.18 8.192z' />
                  </svg>
                ) : (
                  <svg className='h-5 w-5' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
                    <path d='M12 18c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3zm0-9c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3zm0-9c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3z' />
                  </svg>
                )}
                <span className='hidden ml-0 text-gray-700 text-sm font-medium lg:block'>
                  <span className='sr-only'>Open menu for this article</span>
                </span>
              </Menu.Button>
              <Transition
                show={open}
                as={Fragment}
                enter='transition ease-out duration-100'
                enterFrom='transform opacity-0 scale-95'
                enterTo='transform opacity-100 scale-100'
                leave='transition ease-in duration-75'
                leaveFrom='transform opacity-100 scale-100'
                leaveTo='transform opacity-0 scale-95'
              >
                <Menu.Items
                  static
                  className={classNames(styles.menu, 'origin-top-right absolute right-2 mt-2 w-48 rounded-md py-1 bg-white focus:outline-none z-50')}
                >
                  <Menu.Item>
                    {({ active }) => (
                      <a href={url} target='_blank' className={menuItemClassnames(active)}>
                        Open In New Tab
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={menuItemClassnames(active)}
                        onClick={() => {
                          navigator.clipboard.writeText(url);
                        }}
                      >
                        Copy Link
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href={(() => {
                          const sourceURL = new URL(url);
                          return `${sourceURL.protocol}//${sourceURL.hostname}`;
                        })()}
                        target='_blank'
                        className={menuItemClassnames(active)}
                      >
                        View Source: {author}
                      </a>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </div>
          </>
        )}
      </Menu>
    </div>
  );
};

export default Article;
