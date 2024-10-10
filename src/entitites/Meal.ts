/* eslint-disable semi */
/* eslint-disable quotes */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/member-delimiter-style */
import { type Recipe } from "./Recipe";

export interface Meal {
  icon: string;
  id: string;
  name: string;
  user: {
    birth: string;
    email: string;
    firstName: string;
    id: string;
    lastName: string;
    password: string;
    phone: string;
    profilePhoto: string;
  };
  recipes: Recipe[];
}
