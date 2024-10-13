import React from "react";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import logo from "../../images/logo.png";
import {
  Add,
  Dashboard,
  ExpandMore,
  ImportExport,
  ListAlt,
  People,
  PostAdd,
  RateReview,
} from "@mui/icons-material";
const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/">
        <img src={logo} alt="Ecommerce" />
      </Link>
      <Link to="/admin/dashboard">
        <p>
          <Dashboard /> Dashboard
        </p>
      </Link>
      <Link>
        <SimpleTreeView
          defaultCollapseIcon={<ExpandMore />}
          defaultExpandIcon={<ImportExport />}
        >
          <TreeItem nodeId="1" label="Products" itemId="products">
            <Link to="/admin/products">
              <TreeItem
                nodeId="2"
                label="All"
                icon={<PostAdd />}
                itemId="products-all"
              />
            </Link>

            <Link to="/admin/product">
              <TreeItem
                nodeId="3"
                label="Create"
                icon={<Add />}
                itemId="products-create"
              />
            </Link>
          </TreeItem>
        </SimpleTreeView>
      </Link>
      <Link to="/admin/orders">
        <p>
          <ListAlt />
          Orders
        </p>
      </Link>
      <Link to="/admin/users">
        <p>
          <People /> Users
        </p>
      </Link>
      <Link to="/admin/reviews">
        <p>
          <RateReview /> Reviews
        </p>
      </Link>
    </div>
  );
};

export default Sidebar;
