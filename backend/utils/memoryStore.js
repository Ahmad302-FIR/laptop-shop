import { initialProducts } from './initialProducts.js';

let memoryProducts = JSON.parse(JSON.stringify(initialProducts));

export const getMemoryProducts = () => {
  return memoryProducts;
};

export const setMemoryProducts = (products) => {
  memoryProducts = products;
};
