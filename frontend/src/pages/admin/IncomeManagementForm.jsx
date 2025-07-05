import { useState } from "react";
import GraphAndChartSection from "../../components/GraphAndChartSection";
import AddExpenseDialog from "../../components/AddExpenseDialog";
function IncomeManagementForm() {
  const [showAddExpenseDialog, setShowAddExpenseDialog] = useState(false);

  return (
    <div className="bg-[var(--light-white)] h-full rounded-2xl border border-gray-300 pb-5 pt-5 sm:px-6 sm:pt-5 flex flex-col">
      <div
        id="table-header"
        className="flex gap-2 px-5 py-4 mb-4 flex-col md:flex-row md:items-center md:justify-between md:px-6"
      >
        <h3 class="text-lg font-title font-semibold text-gray-800">Quản lí doanh thu</h3>
        <div className="flex gap-2 md:flex-row flex-col">
          <button
            type="button"
            class="flex-shrink-0 shadow-sm px-4 py-2 rounded-lg cursor-pointer text-white text-sm tracking-wider font-medium outline-none bg-[var(--light-black)] hover:ring-1 hover:bg-[var(--dark-black)] active:bg-[var(--light-black)]"
            onClick={() => setShowAddExpenseDialog(true)}
          >
            Thêm chi phí
          </button>
          <AddExpenseDialog
            open={showAddExpenseDialog}
            onClose={() => setShowAddExpenseDialog(false)}
            onConfirm={() => setShowAddExpenseDialog(false)}
          />
        </div>
      </div>
      <GraphAndChartSection />
    </div>
  );
}

export default IncomeManagementForm;
