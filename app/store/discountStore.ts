// app/store/discountStore.ts
import { create } from "zustand";

type DiscountMap = {
  [gameId: string]: {
    percent: number;
    endTime: string;
  };
};

type DiscountStore = {
  discounts: DiscountMap;
  setDiscount: (gameId: string, percent: number, endTime: string) => void;
  clearDiscount: (gameId: string) => void;
};

export const useDiscountStore = create<DiscountStore>((set) => ({
  discounts: {},
  setDiscount: (gameId, percent, endTime) =>
    set((state) => ({
      discounts: {
        ...state.discounts,
        [gameId]: { percent, endTime },
      },
    })),
  clearDiscount: (gameId) =>
    set((state) => {
      const { [gameId]: _, ...rest } = state.discounts;
      return { discounts: rest };
    }),
}));
