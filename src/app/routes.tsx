import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Dashboard } from "./components/Dashboard";
import { Inventory } from "./components/Inventory";
import { SalesOrders } from "./components/SalesOrders";
import { PurchaseOrders } from "./components/PurchaseOrders";
import { Finance } from "./components/Finance";
import { Reports } from "./components/Reports";
import { Settings } from "./components/Settings";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Dashboard },
      { path: "inventory", Component: Inventory },
      { path: "sales-orders", Component: SalesOrders },
      { path: "purchase-orders", Component: PurchaseOrders },
      { path: "finance", Component: Finance },
      { path: "reports", Component: Reports },
      { path: "settings", Component: Settings },
    ],
  },
]);
