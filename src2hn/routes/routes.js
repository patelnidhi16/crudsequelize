export const appRoutes = {
  label: "Mind Pulse",
  children: [
    {
      name: "Dashboard",
      icon: "chart-pie",
      to: "/admin/dashboard",
      active: true,
    },
    {
      name: "EatWell Type",
      icon: "file-alt",
      to: "/eatwellType",
      active: true,
    },
    {
      name: "Eat Well",
      icon: ["fab", "trello"],
      to: "/eatwell",
      active: true,
    },
    {
      name: "Exercise Type",
      icon: "file-alt",
      to: "/exersiseType",
      active: true,
    },
    {
      name: "Exercise",
      icon: "puzzle-piece",
      to: "/exersise",
      active: true,
    },
    {
      name: "EAP",
      icon: "thumbtack",
      to: "/ead",
      active: true,
    },
    
    {
      name: "Mindfulness",
      icon: ["fab", "trello"],
      to: "/mindfulness",
      active: true,
    },

    {
      name: "Manager",
      icon: "user",
      to: "/manager",
      active: true,
    },
    {
      name: "Employee",
      icon: "users",
      to: "/employee",
      active: true,
    },
    {
      name: "CMS",
      icon: "question-circle",
      to: "/cms",
      active: true,
    },
    {
      name: "Setting",
      icon: "share-alt",
      to: "/setting",
      active: true,
    },
  ],
};

export default [appRoutes];
