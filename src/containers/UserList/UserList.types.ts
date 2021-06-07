export interface ApiOPtions {
  gender: string;
  nat: string;
  page: number;
  results: number;
}

export interface UserId {
  name: string;
  value: string;
}

export interface Street {
  number: number;
  name: string;
}
export interface Location {
  city: string;
  country: string;
  postcode: number;
  state: string;
  street: Street;
}

export interface LoginInfo {
  uuid: string;
}
export interface UserName {
  title: string;
  first: string;
  last: string;
}

export interface UserPicture {
  large: string;
  medium: string;
  thumbnail: string;
}

export interface RegisteredInfo {
  date: string;
  age: number;
}
export interface UserResponse {
  cell: string;
  email: string;
  gender: string;
  id: UserId;
  location: Location;
  login: LoginInfo;
  name: UserName;
  nat: string;
  phone: string;
  picture: UserPicture;
  registered: RegisteredInfo;
}
