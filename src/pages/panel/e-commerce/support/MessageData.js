import User from "../../../../images/avatar/b-sm.jpg";
import User2 from "../../../../images/avatar/c-sm.jpg";
import User3 from "../../../../images/avatar/d-sm.jpg";

export const messageData = [
  {
    id: 1,
    name: "Abu Ibn Ishtiak",
    theme: "primary",
    date: "12 Jan",
    attactchment: true,
    marked: false,
    closed: false,
    messageTitle: "Unable to select currency when order",
    message: "Hello team, I am facing problem as i can not select",
    messageMarkup: [
      "Hello team,",
      "I am facing problem as i can not select currency on buy order page. Can you guys let me know what i am doing doing wrong? Please check attached files.",
      "Thank you,",
      "Ishityak",
    ],
    reply: [
      {
        replyId: "rep_1",
        name: "Support Team",
        theme: "pink",
        date: "14 Jan, 2019",
        time: "11:32 AM",
        replyMarkup: [
          "Hello Ishtiyak,",
          "We are really sorry to hear that, you have face an unexpected experience. Our team urgently look this matter and get back to you asap. ",
          "Thank you very much. ",
        ],
      },
      {
        meta: {
          metaId: "meta_1",
          metaMarkup: `<div class="nk-reply-meta-info"><span class="who">Iliash Hossian</span> assigned user: <span class="whom">Saiful Islam</span> at 14 Jan, 2020 at 11:34 AM</div>`,
        },
      },
      {
        replyId: "rep_2",
        note: true,
        name: "Iliash Hossain",
        time: "11:32 AM",
        date: "14 Jan, 2020",
        replyMarkup: ["Devement Team need to check out the issues."],
      },
      {
        meta: {
          metaId: "meta_2",
          metaMarkup: `<div class="nk-reply-meta-info"><strong>15 January 2020</strong></div>`,
        },
      },
      {
        replyId: "rep_3",
        name: "Support Team",
        theme: "pink",
        date: "14 Jan, 2019",
        time: "11:32 AM",
        replyMarkup: [
          "Hello Ishtiyak,",
          "We are really sorry to hear that, you have face an unexpected experience. Our team urgently look this matter and get back to you asap. ",
          "Thank you very much. ",
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Jackelyn Dugas",
    image: User,
    date: "15 Jan",
    marked: true,
    closed: false,
    messageTitle: "Have not received bitcoins after payment",
    message: "Hey! I recently bought bitcoin from you. But still have not",
    messageMarkup: [
      "Hey!",
      "I recently bought bitcoin from you. But still have not recieved any of it yet",
      "Could you please send it as soon as possible",
      "Customer, ",
      " Thank you",
    ],
    reply: [],
  },
  {
    id: 3,
    name: "Mayme Johnston",
    theme: "purple",
    date: "11 Jan",
    marked: false,
    closed: false,
    messageTitle: "I can not submit kyc application",
    message: "Hello support! I can not upload my documents on kyc application.",
    messageMarkup: [
      "Hello Support!",
      "I can not upload my documents on kyc application.",
      "Could you please check what is the problem",
      "Customer, ",
      " Thank you",
    ],
    reply: [],
  },
  {
    id: 4,
    name: "Jake Smity",
    date: "30 Dec, 2019",
    image: User2,
    marked: false,
    closed: true,
    messageTitle: "I can not submit kyc application",
    message: "Hello support! I can not upload my documents on kyc application.",
    messageMarkup: [
      "Hello Support!",
      "I can not upload my documents on kyc application.",
      "Could you please check what is the problem",
      "Customer, ",
      " Thank you",
    ],
    reply: [],
  },
  {
    id: 5,
    name: "Amanda Moore",
    date: "28 Dec, 2019",
    image: User3,
    marked: false,
    closed: false,
    messageTitle: "Wallet needs to verify.",
    message: "Hello, I already varified my Wallet but it still showing",
    messageMarkup: [
      "Hello!",
      "I already varified my Wallet but it still showing that the wallet is not verified.",
      "Could you please check what is the problem",
      "Customer, ",
      " Thank you",
    ],
    reply: [],
  },
  {
    id: 6,
    name: "Rebecca Valdez",
    theme: "primary",
    date: "26 Dec, 2019",
    marked: false,
    closed: false,
    messageTitle: "I want my money back.",
    message: "Hey! I don't want to stay as your subscriber any more,",
    messageMarkup: [
      "Heey!",
      "I don't want to stay as your subscriber any more.",
      "Could you please return my money as soon as possible",
      "Customer, ",
      " Thank you",
    ],
    reply: [],
  },
  {
    id: 7,
    name: "Charles Greene",
    theme: "orange",
    date: "21 Dec, 2019",
    marked: false,
    closed: false,
    messageTitle: "Have not received bitcoins yet",
    message: "Hey! I recently bitcoin from you. But still have not",
    messageMarkup: [
      "Hey!",
      "I recently bought bitcoin from you. But still have not recieved any of it yet",
      "Could you please send it as soon as possible",
      "Customer, ",
      " Thank you",
    ],
    reply: [],
  },
  {
    id: 8,
    name: "Ethan Anderson",
    theme: "success",
    date: "21 Dec, 2019",
    marked: false,
    closed: false,
    messageTitle: "Unable to select currency when order",
    message: "Hello team, I am facing problem as i can not select",
    messageMarkup: [
      "Hello Team!",
      "I am facing problem as i can not select my specified team through the application",
      "Could you resolve ite as soon as possible",
      "Customer, ",
      " Thank you",
    ],
    reply: [],
  },
  {
    id: 9,
    name: "Jose Paterson",
    theme: "pink",
    image: User3,
    date: "14 Dec, 2019",
    marked: false,
    closed: true,
    messageTitle: "Unable to select currency when order",
    message: "Hello team, I am facing problem as i can not select",
    messageMarkup: [
      "Hello Team!",
      "I am facing problem as i can not select my specified team through the application",
      "Could you resolve ite as soon as possible",
      "Customer, ",
      " Thank you",
    ],
    reply: [],
  },
  {
    id: 10,
    name: "Amanda Moore",
    date: "28 Dec, 2019",
    image: User3,
    marked: false,
    closed: false,
    messageTitle: "Wallet needs to verify.",
    message: "Hello, I already varified my Wallet but it still showing",
    messageMarkup: [
      "Hello!",
      "I already varified my Wallet but it still showing that the wallet is not verified.",
      "Could you please check what is the problem",
      "Customer, ",
      " Thank you",
    ],
    reply: [],
  },
  {
    id: 11,
    name: "Mayme Johnston",
    theme: "purple",
    date: "11 Jan",
    marked: false,
    closed: false,
    messageTitle: "I can not submit kyc application",
    message: "Hello support! I can not upload my documents on kyc application.",
    messageMarkup: [
      "Hello Support!",
      "I can not upload my documents on kyc application.",
      "Could you please check what is the problem",
      "Customer, ",
      " Thank you",
    ],
    reply: [],
  },
];

export const assignMembers = [
  {
    id: 50,
    role: "User",
    name: "Alissa Kate",
    theme: "purple",
  },
  {
    id: 51,
    role: "User",
    name: "Jasper Jordan",
    theme: "orange",
  },
  {
    id: 52,
    role: "User",
    name: "Winter Rays",
    theme: "pink",
  },
  {
    id: 53,
    role: "User",
    name: "Kayla Brown",
    theme: "blue",
  },
  {
    id: 54,
    role: "User",
    name: "Ray Dobolin",
    theme: "red",
  },
];
