import "../Sidebar Header/Sidebar-header.css";

function SidebarHeader({ userEmail }) {
  return (
    <div className="sidebar-header">
      <h2>Welcome {userEmail}</h2>
    </div>
  );
}

export default SidebarHeader;
