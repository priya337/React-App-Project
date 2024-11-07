// utils.js (new file)
export const formatTitleForUrl = (title) => {
    return title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
  };
  