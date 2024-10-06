/* eslint-disable @typescript-eslint/member-delimiter-style */
export interface Meal {
  icon: string
  id: string
  name: string
  user: {
    birth: string
    email: string
    firstName: string
    id: string
    lastName: string
    password: string
    phone: string
    profilePhoto: string
  }
}
