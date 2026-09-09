import type { Product } from "../types/productType";

export const getProducts = () => {
  const mockData: Product[] = [
    {
      id: 1,
      name: "선풍기",
      price: 35000,
      quantity: 10,
    },
    {
      id: 2,
      name: "마우스",
      price: 20000,
      quantity: 32,
    },
    {
      id: 3,
      name: "꽉티슈",
      price: 4000,
      quantity: 12,
    },
    {
      id: 4,
      name: "치킨",
      price: 15000,
      quantity: 23,
    },
  ];

  return mockData;
};
