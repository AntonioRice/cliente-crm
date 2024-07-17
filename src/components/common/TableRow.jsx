import { IoIosArrowForward } from "react-icons/io";
import { StatusIndicator } from "../../components";

const renderCellContent = (item, col) => {
  if (col.key === "guest_status" || col.key === "status") {
    return <StatusIndicator status={item[col.key]} />;
  }

  if (col.key === "profile_picture") {
    return <img className="w-8 h-8 rounded-full" src={item[col.key]} alt="user photo" />;
  }

  return item[col.key];
};

const TableRow = ({ item, columns, editAction }) => (
  <tr
    key={item.id}
    className="border-b-[1px] border-b-gray-500 hover:bg-gray-500 hover:text-white hover:cursor-pointer"
    onClick={() => editAction(item)}
  >
    {columns.map((col) => (
      <td key={col.key} className="px-6 py-4">
        {renderCellContent(item, col)}
      </td>
    ))}
    <td className="px-6 py-2 text-right">
      <button className="font-medium">
        <IoIosArrowForward />
      </button>
    </td>
  </tr>
);

export default TableRow;
