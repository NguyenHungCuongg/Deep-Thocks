import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import BillManagementForm from "../../pages/admin/BillManagementForm";
import UserManagementForm from "../../pages/admin/UserManagementForm";
import SaleMangementForm from "../../pages/admin/SaleManagementForm";
import ProductManagementForm from "../../pages/admin/ProductManagementForm";
import IncomeManagementForm from "../../pages/admin/IncomeManagementForm";

function Dashboard() {
  const [selectForm, setSelectedForm] = useState("income");

  let content;
  switch (selectForm) {
    case "bill":
      content = <BillManagementForm />;
      console.log("bill");
      break;
    case "user":
      content = <UserManagementForm />;
      console.log("user");
      break;
    case "sale":
      content = <SaleMangementForm />;
      console.log("sale");
      break;
    case "product":
      content = <ProductManagementForm />;
      console.log("product");
      break;
    case "income":
      content = <IncomeManagementForm />;
      break;
    default:
      content = <IncomeManagementForm />;
      break;
  }

  return (
    <div className="bg-[var(--dark-white)] flex">
      <Sidebar setSelectedForm={setSelectedForm} />
      <div id="dashboard-content" className="bg-[var(--dark-white)]">
        {content}
      </div>
    </div>
  );
}

export default Dashboard;
