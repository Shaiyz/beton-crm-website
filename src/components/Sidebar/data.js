import {
  faUser,
  faList,
  faAddressBook,
  faUserShield,
  faHouseUser,
} from "@fortawesome/free-solid-svg-icons";

const dataList = {
  teamLeadData: [
    {
      title: "Users",
      url: "user",
      icon: faUser,
      list: [
        {
          title: "Team Lead",
          url: "teamlead",
          icon: faUser,
        },
        {
          title: "Digital Marketer",
          url: "digitalmarketer",
          icon: faUser,
        },
        {
          title: "Sales Rep",
          url: "salesrep",
          icon: faUser,
        },
      ],
    },
    {
      title: "Leads",
      url: "leads",
      icon: faUserShield,
      list: [
        {
          title: "All Leads",
          url: "leads",
          icon: faList,
        },
        {
          title: "My Leads",
          url: "leads",
          icon: faList,
        },
        {
          title: "TODO List",
          url: "todos",
          icon: faList,
        },
      ],
    },
    {
      title: "Clients",
      url: "clients",
      icon: faHouseUser,
      list: [
        {
          title: "All Clients",
          url: "clients",
        },
        {
          title: "My Clients",
          url: "Clients",
        },
      ],
    },
    {
      title: "Report",
      url: "reports",
      icon: faAddressBook,
    },
  ],
  salesRepData: [
    {
      title: "Leads",
      url: "leads",
      icon: faUserShield,
      list: [
        {
          title: "All Leads",
          url: "leads",
          icon: faList,
        },
        {
          title: "My Leads",
          url: "leads",
          icon: faList,
        },
        {
          title: "TODO List",
          url: "todos",
          icon: faList,
        },
      ],
    },
    {
      title: "Clients",
      url: "clients",
      icon: faHouseUser,
      list: [
        {
          title: "All Clients",
          url: "clients",
        },
        {
          title: "My Clients",
          url: "Clients",
        },
      ],
    },
    {
      title: "Reports",
      url: "reports",
      icon: faAddressBook,
    },
  ],

  digitalMarketerData: [
    {
      title: "Users",
      url: "user",
      icon: faUser,
      list: [
        {
          title: "Digital Marketer",
          url: "digitalmarketer",
          icon: faUser,
        },
        {
          title: "Sales Rep",
          url: "salesrep",
          icon: faUser,
        },
      ],
    },
    {
      title: "Leads",
      url: "leads",
      icon: faUserShield,
      list: [
        {
          title: "All Leads",
          url: "leads",
        },
        {
          title: "My Leads",
          url: "leads",
        },
        {
          title: "TODO List",
          url: "todos",
        },
      ],
    },
    {
      title: "Clients",
      url: "clients",
      icon: faHouseUser,
      list: [
        {
          title: "All Clients",
          url: "clients",
        },
        {
          title: "My Clients",
          url: "clients",
        },
      ],
    },
  ],

  saveList: (list, userId) => {
    if (!localStorage.getItem(userId)) {
      localStorage.removeItem(userId);
      localStorage.setItem(userId, JSON.stringify(list));
    }
    localStorage.setItem(userId, JSON.stringify(list));
  },
  getList: function (userId, userRole) {
    if (userRole == "teamLead") {
      return this.teamLeadData;
    } else if (userRole === "salesRep") {
      return this.salesRepData;
    } else if (userRole === "digitalMarketer") {
      return this.digitalMarketerData;
    }
  },
};
export default dataList;
