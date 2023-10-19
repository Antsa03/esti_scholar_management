import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import {
  faUser,
  faGraduationCap,
  faBook,
  faCalendarTimes,
  faLaptopCode,
  faCalendarAlt,
  faPen,
  faCog,
} from "@fortawesome/free-solid-svg-icons";

export interface Sublink {
  route: string;
  label: string;
}

export interface SidebarItemLink {
  icon: IconDefinition;
  route: string;
  label: string;
  sublink: Sublink[];
}

export const SidebarItemLinks: SidebarItemLink[] = [
  {
    icon: faUser,
    route: "/utilisateur/ajout",
    label: "Utilisateur",
    sublink: [
      { route: "/utilisateur/ajout", label: "Ajouter utilisateur" },
      { route: "/utilisateur/liste", label: "Liste des utilisateur" },
    ],
  },
  {
    icon: faGraduationCap,
    route: "/soutenance",
    label: "Soutenance",
    sublink: [
      { route: "/utilisateur/ajout", label: "Ajouter de soutenance" },
      { route: "/utilisateur/liste", label: "Liste des utilisateur" },
      { route: "/utilisateur/ajout", label: "Ajouter de soutenance" },
      { route: "/utilisateur/liste", label: "Liste des utilisateur" },
    ],
  },
  {
    icon: faBook,
    route: "/note",
    label: "Note",
    sublink: [
      { route: "/note/ajout", label: "Ajouter note" },
      { route: "/note", label: "Liste des notes" },
    ],
  },
  {
    icon: faCalendarTimes,
    route: "/absence/etudiant/ajout",
    label: "Absence",
    sublink: [
      { route: "/absence/ajout", label: "Ajout d'absence des étudiants" },
      { route: "/absence/etudiant", label: "Liste des absences des étudiants" },
    ],
  },
  {
    icon: faCalendarTimes,
    route: "/demande_absence",
    label: "Demande d'absence",
    sublink: [
      { route: "/demande_absence/ajout", label: "Ajout de demande d'absence" },
      { route: "/demande_absence", label: "Liste des demandes d'absence" },
    ],
  },
  {
    icon: faLaptopCode,
    route: "/cours",
    label: "Cours",
    sublink: [
      { route: "/utilisateur/ajout", label: "Ajouter utilisateur" },
      { route: "/utilisateur/liste", label: "Liste des utilisateur" },
    ],
  },
  {
    icon: faCalendarAlt,
    route: "/calendrier",
    label: "Calendrier",
    sublink: [
      { route: "/utilisateur/ajout", label: "Ajouter utilisateur" },
      { route: "/utilisateur/liste", label: "Liste des utilisateur" },
    ],
  },
  {
    icon: faPen,
    route: "/composition",
    label: "Composition",
    sublink: [
      { route: "/utilisateur/ajout", label: "Ajouter utilisateur" },
      { route: "/utilisateur/liste", label: "Liste des utilisateur" },
    ],
  },
];
