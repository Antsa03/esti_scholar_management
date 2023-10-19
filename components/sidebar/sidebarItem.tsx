import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SidebarItemLink } from "@/constants/sidebarData";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import Sublink from "./sublink";
import { usePathname } from "next/navigation";
import Link from "next/link";

type SidebarItemProps = {
  item: SidebarItemLink;
};

export default function SidebarItem({ item }: SidebarItemProps) {
  const pathname = usePathname();
  const isActive = pathname === item.route;

  if (item.sublink) {
    return (
      <div
        className={`"text-md block"  ${
          isActive ? "border-l-4 border-blue-600 py-1" : ""
        }`}
      >
        <div className="flex flex-row items-center">
          <div className="flex flex-row items-center gap-4 w-full h-[40px] px-6 py-2">
            {item.icon && (
              <FontAwesomeIcon
                className="text-gray-600"
                icon={item.icon}
                width={16}
                height={16}
              />
            )}
            <Link
              href={item.route}
              scroll={true}
              className={`"text-gray-600 " ${isActive ? "font-semibold" : ""}`}
            >
              {item.label}
            </Link>
          </div>

          <FontAwesomeIcon
            className={`" text-gray-600 cursor-pointer justify-self-end" `}
            icon={isActive ? faChevronUp : faChevronDown}
            width={16}
            height={16}
          />
        </div>
        <div
          className={`"sidebar-content text-black" ${
            isActive === false ? "h-0 overflow-hidden" : "h-auto"
          }`}
        >
          <Sublink sublink={item.sublink}></Sublink>
        </div>
      </div>
    );
  } else {
    return (
      <li
        className={
          "sidebar-item p-4 text-sm text block border-b-2 border-white hover:bg-white/5 w-[260px] "
        }
      >
        <div className="sidebar-title flex content-between">
          <span>
            {item.icon && (
              <FontAwesomeIcon
                className="text-gray-200"
                icon={item.icon}
                width={16}
                height={16}
              />
            )}

            {item.label}
          </span>
        </div>
      </li>
    );
  }
}
