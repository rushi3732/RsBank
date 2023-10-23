import React from "react";
import { useSelector } from "react-redux";
import { selectDetails, selectAddress } from "../../formSlice";

const Review = () => {
  const details = useSelector(selectDetails);
  const address = useSelector(selectAddress);

  return (
    <div className="mt-3">
      <table className="w-full table-auto border-collapse">
        <tbody>
          <tr className="bg-blue-500 text-white">
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Age</th>
            <th className="px-4 py-2">Profession</th>
            <th className="px-4 py-2">Address 1</th>
            <th className="px-4 py-2">Address 2</th>
            <th className="px-4 py-2">City</th>
          </tr>
          <tr className="hover:bg-gray-100">
            <td className="border px-4 py-2">{details.name}</td>
            <td className="border px-4 py-2">{details.age}</td>
            <td className="border px-4 py-2">{details.profession}</td>
            <td className="border px-4 py-2">{address.address1}</td>
            <td className="border px-4 py-2">{address.address2}</td>
            <td className="border px-4 py-2">{address.city}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Review;
