import {
  AlertTriangle,
  CheckLine,
  FolderKanban,
  Package,
  PenBox,
  PlusSquare,
  Trash2,
  Workflow,
} from "lucide-react";
import { Card } from "../types/type";
import SummaryCard from "./component/Card";
import Welcome from "./component/Welcome";

const summary: Card[] = [
  {
    className: "bg-green-400",
    property: "Total component:",
    value: 1642,
    icon: <Package />,
  },
  {
    className: "bg-blue-400",
    property: "Active Projects:",
    value: 12,
    icon: <FolderKanban />,
  },
  {
    className: "bg-red-400",
    property: "Low stock:",
    value: 2,
    icon: <AlertTriangle />,
  },
];

function page() {
  const lowStock = 2;
  return (
    <div className="px-10 py-3 shadow-xl w-full max-w-6xl h-full rounded-2xl bg-gray-50 mx-auto">
      <div className="flex justify-between items-center">
        <Welcome />
        <button className="shadow cursor-pointer rounded border border-green-400 px-5 text-gray-100 bg-green-400 py-2 font-medium flex gap-3">
          <span>
            <PlusSquare />
          </span>
          <span>Add component</span>
        </button>
      </div>
      <div className="flex gap-8">
        {summary.map((card, id) => (
          <SummaryCard
            className={card.className}
            property={card.property}
            value={card.value}
            icon={card.icon}
            key={card.property + id}
          />
        ))}
      </div>
      <section className="mt-10 grid grid-cols-2 w-full">
        {lowStock >= 1 && (
          <section>
            <h3 className="text-lg font-medium text-gray-800">
              Low stock components
            </h3>
            <table className="text-start my-5 border-gray-400">
              <thead className="capitalize">
                <tr className="shadow-sm border-gray-400 h-10 border-b bg-gray-100 ">
                  <th className="px-3">component</th>
                  <th className="px-3">category</th>
                  <th className="px-3">location</th>
                  <th className="px-3">quantities</th>
                </tr>
              </thead>
              <tbody>
                <tr className="shadow-sm border-gray-300 border-y text-center h-10">
                  <td>Resistor</td>
                  <td>Resistor</td>
                  <td>Shelf D4</td>
                  <td>4</td>
                </tr>
              </tbody>
            </table>
          </section>
        )}
        <aside className="w-full">
          <h3 className="text-lg font-medium text-gray-800 ml-5">
            Active Projects
          </h3>
          <div>
            <table className="text-start my-5 border-gray-400 shadow">
              <thead className="capitalize">
                <tr className="shadow-sm border-gray-400 bg-gray-100 border-b">
                  <th className=" w-auto text-left px-3 py-2">Project name</th>
                  <th className=" py-2 text-left px-3">status</th>
                  <th className=" py-2 text-left px-3">components</th>
                </tr>
              </thead>
              <tbody>
                <tr className="shadow-sm border-gray-300 border-y text-center">
                  <td className=" w-auto py-2 text-left pl-5 font-medium">
                    LED Blinker
                  </td>
                  <td className=" w-32 py-2 text-yellow-400 text-sm font-medium flex gap-2 items-center">
                    <span>In progress</span>
                    <Workflow className="w-4 h-4" />
                  </td>
                  <td className="  py-2">12</td>
                </tr>
                <tr className="shadow border-gray-300 border-y text-center">
                  <td className=" w-auto py-2 text-left pl-5 font-medium text-ellipsis max-w-[20ch]">
                    ESP-32 temperature sensor
                  </td>
                  <td className=" w-32 py-2 text-orange-400 text-sm font-medium  flex gap-2 items-center">
                    <span>Planning</span>
                    <PenBox className="w-4 h-4" />
                  </td>
                  <td className="  py-2">12</td>
                </tr>
                <tr className="shadow border-gray-300 border-y text-center">
                  <td className=" w-auto py-2 text-left pl-5 font-medium">
                    LED Blinker
                  </td>
                  <td className=" w-32 py-2 text-green-400 text-sm font-medium flex gap-2 items-center">
                    <span>Completed</span>
                    <CheckLine className="w-4 h-4" />
                  </td>
                  <td className="  py-2">12</td>
                </tr>
              </tbody>
            </table>
          </div>
        </aside>
      </section>
    </div>
  );
}

export default page;
