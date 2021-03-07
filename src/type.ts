export interface USER {
  uid?: string;
  displayName: string | null;
  photoUrl: any;
}

export interface POST {
  id?: string;
  avatar: any;
  image: string;
  text: string;
  timestamp: any;
  username: string | null;
}

export interface COMMENT {
  id: string;
  avatar: string;
  text: string;
  timestamp: any;
  username: string;
}
