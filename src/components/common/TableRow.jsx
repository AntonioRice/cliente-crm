import { IoIosArrowForward } from "react-icons/io";
import { StatusIndicator } from "../../components";
import { formatDateTime, formatPhoneNumber } from "../../utils/standardMethods";

const renderCellContent = (item, col) => {
  if (col.key === "guest_status" || col.key === "status") {
    return <StatusIndicator status={item[col.key]} />;
  }

  if (col.key === "profile_picture") {
    return <img className="size-8 rounded-full" src={item[col.key]} alt="user photo" />;
  }

  if (col.key === "check_in" || col.key === "check_out" || col.key === "created_date") {
    return formatDateTime(item[col.key]);
  }

  if (col.key === "room_numbers") {
    return Array.isArray(item[col.key]) ? item[col.key].join(", ") : item[col.key];
  }

  // TODO: fix formatPhoneNumber to account for different country codes
  // if (col.key === "phone_number") {
  //   return formatPhoneNumber(item[col.key]);
  // }

  return item[col.key];
};

const TableRow = ({ item, columns, editAction }) => (
  <tr key={item.id} className="border-b-[1px] hover:cursor-pointer hover:bg-neutral-700 hover:text-white dark:border-b-neutral-600" onClick={() => editAction(item)}>
    {columns.map((col) => (
      <td key={col.key} className="px-6 py-4">
        {renderCellContent(item, col)}
      </td>
    ))}
    <td className="px-6 text-right">
      <button className="font-medium">
        <IoIosArrowForward />
      </button>
    </td>
  </tr>
);

export default TableRow;
