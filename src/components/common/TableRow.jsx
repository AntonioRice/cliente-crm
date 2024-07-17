import { IoIosArrowForward } from "react-icons/io";
import { StatusIndicator } from "../../components";

const renderCellContent = (item, col) => {
  if (col.key === "guest_status") {
    return <StatusIndicator status={item[col.key]} />;
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
