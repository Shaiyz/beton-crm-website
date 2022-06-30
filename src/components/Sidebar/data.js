import {
  faUser,
  faList,
  faUserShield,
  faHouseUser,
  faWarehouse,
  faFileCircleCheck,
} from "@fortawesome/free-solid-svg-icons";

const dataList = {
  teamLeadData: [
    {
      title: "Users",
      url: "user",
      icon: faUser,
      list: [
        {
          title: "Team Leads",
          url: "teamlead",
          icon: faUser,
        },
        {
          title: "Digital Marketers",
          url: "digitalmarketer",
          icon: faUser,
        },
        {
          title: "Sales Reps",
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
          title: "Todo List",
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
      ],
    },
    {
      title: "Report",
      url: "reports",
      icon: faFileCircleCheck,
    },
    {
      title: "Inventory",
      icon: faWarehouse,
      list: [
        {
          title: "Projects",
          url: "projects",
        },
        {
          title: "Units",
          url: "units",
        },
      ],
    },
  ],
  salesRepData: [
    {
      title: "Leads",
      url: "leads",
      icon: faUserShield,
      list: [
        {
          title: "My Leads",
          url: "leads",
          icon: faList,
        },
        {
          title: "Todo List",
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
      ],
    },
    {
      title: "Reports",
      url: "reports",
      icon: faFileCircleCheck,
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
          title: "Todo List",
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
