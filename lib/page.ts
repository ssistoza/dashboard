export const totalPages = (stack: number, count: number) => {
  return Math.ceil(count / stack);
};

export const currentPage = (stack: number, index: number) => {
  return Math.floor(index / stack);
};

export const calculatePages = (options: {
  stack: number;
  index: number;
  count: number;
}) => {
  return {
    currentPage: currentPage(options.stack, options.index),
    pages: totalPages(options.stack, options.count),
  };
};
