import { IoIosArrowForward } from "react-icons/io";

const DataTableRows = ({ item, columns, editAction }) => (
  <tr
    key={item.id}
    className="border-b-[1px] border-b-gray-500 hover:bg-gray-500 hover:text-white hover:cursor-pointer"
    onClick={() => editAction(item)}
  >
    {columns.map((col) => (
      <td key={col.key} className="px-6 py-4">
        {item[col.key]}
      </td>
    ))}
    {editAction && (
      <td className="px-6 py-2 text-right">
        <button className="font-medium">
          <IoIosArrowForward />
        </button>
      </td>
    )}
  </tr>
);

export default DataTableRows;
