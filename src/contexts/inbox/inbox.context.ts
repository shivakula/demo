import React from "react";
export interface ThirdPartyInterface {
  logo?: string;
  Integration?: string;
  gender?: string;
  age?: any;
  country?:string;
  expanded?: boolean;
}
export interface InboxInterface {
  contact: {
    firstName: string;
    lastName: string;
    mobile?: {
      mnumber?: any;
    };
  };
  unread: string[];
  lastMessage: {
    message: string;
  };
  created: {
    at: string;
  };
  type: string;
  userId: number;
  block: boolean;
  archive:boolean;
  showArchive:boolean;
  contacts:any
}

const InboxContext = React.createContext<InboxInterface[] | []>([]);

export default InboxContext;

