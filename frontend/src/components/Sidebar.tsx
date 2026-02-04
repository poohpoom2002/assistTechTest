import './Sidebar.css';

export function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo-icon">
          {/* Department of Land Transport Logo */}
          <img src="/Emblem_of_the_Department_of_Land_Transport_of_Thailand.svg" alt="Logo" className="logo-img" />
        </div>
        <span className="logo-text">ระบบจัดการจอง</span>
      </div>
      <nav className="sidebar-nav">
        <a href="#" className="nav-item active">
          <span className="icon">📄</span>
          จัดการประเภทงาน
        </a>
        <a href="#" className="nav-item">
          <span className="icon">📅</span>
          ปิดประเภทงานรายวัน
        </a>
        <a href="#" className="nav-item">
          <span className="icon">📊</span>
          รายงานการจองคิว
        </a>
        <a href="#" className="nav-item">
          <span className="icon">📢</span>
          อัพโหลดประชาสัมพันธ์
        </a>
      </nav>
    </aside>
  );
}
