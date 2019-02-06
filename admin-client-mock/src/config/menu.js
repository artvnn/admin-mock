import React from "react";
import Inbox from "../components/dashboard/mail/Inbox";
import ComposeMail from "../components/dashboard/mail/ComposeMail";
import SentMails from "../components/dashboard/mail/SentMails";

export default {
  name: "ROOT",
  route: "",
  dontGenerateRoute: true,
  children: [
    {
      name: "Dashboards",
      route: "dashboards",
    },
    {
      name: "Layouts",
      route: "layouts",
    },
    {
      name: "Graphs",
      route: "graphs",
    },
    {
      name: "Mailbox",
      route: "mailbox",
      icon: "mail",
      tag: "mail", // Will be used to rendered additonal details
      dontGenerateRoute: true,
      children: [
        {
          name: "Inbox",
          route: "inbox",
          render: () => <Inbox />,
        },
        {
          name: "Compose Mail",
          route: "compose",
          render: () => <ComposeMail />,
        },
        {
          name: "Sent Mails",
          route: "sent-mails",
          render: () => <SentMails />,
        },
        {
          name: "Email Templates",
          route: "templates",
        },
      ],
    },
    {
      name: "Metrics",
      route: "metrics",
    },
    {
      name: "Widgets",
      route: "widgets",
    },
    {
      name: "Forms",
      route: "forms",
    },
    {
      name: "App Views",
      route: "app-views",
    },
  ],
};
