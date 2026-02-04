import './Dashboard.css';

type ServiceType = {
    id: number;
    name: string;
};

type Office = {
    id: number;
    name: string;
    code: string;
};

type Props = {
    serviceTypes: ServiceType[];
    loading: boolean;
    error: string;
    offices: Office[];
    selectedOfficeId: number;
    onOfficeChange: (officeId: number) => void;
    onAddClick: () => void;
    onEdit: (service: ServiceType) => void;
    onDelete: (service: ServiceType) => void;
};

export function Dashboard({ serviceTypes, loading, error, offices, selectedOfficeId, onOfficeChange, onAddClick, onEdit, onDelete }: Props) {
    return (
        <div className="dashboard">
            <header className="dashboard-header">
                <h1>ประเภทงานที่สามารถจองผ่านเว็บไซต์</h1>
                <div className="user-info">
                    <span className="user-label">user : </span>
                    <span className="user-id">7777777777777</span>
                </div>
            </header>

            <div className="card">
                <div className="card-filters">
                    <div className="filter-group">
                        <select
                            className="office-select"
                            value={selectedOfficeId}
                            onChange={(e) => onOfficeChange(Number(e.target.value))}
                        >
                            {offices.map(office => (
                                <option key={office.id} value={office.id}>
                                    {office.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="search-group">
                        <div className="search-box">
                            <span className="search-icon">🔍</span>
                            <input type="text" placeholder="ค้นหา" />
                        </div>
                    </div>
                </div>

                <div className="action-bar">
                    <button className="btn-add" onClick={onAddClick}>
                        + เพิ่มประเภทงาน
                    </button>
                </div>

                <div className="content-area">
                    {loading && <p className="loading-text">กำลังโหลดข้อมูล...</p>}
                    {error && <p className="error-text">{error}</p>}

                    {!loading && !error && (
                        <div className="table-container">
                            <h2 className="section-title">ประเภทงาน</h2>
                            <table className="service-table">
                                <tbody>
                                    {serviceTypes.map(st => (
                                        <tr key={st.id}>
                                            <td onClick={() => onEdit(st)} className="clickable-cell">{st.name}</td>
                                            <td className="actions-cell">
                                                <button
                                                    className="delete-btn"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        if (window.confirm(`ต้องการลบ "${st.name}" หรือไม่?`)) {
                                                            onDelete(st);
                                                        }
                                                    }}
                                                    title="ลบ"
                                                >
                                                    🗑️
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {serviceTypes.length === 0 && (
                                        <tr className="empty-row">
                                            <td colSpan={2}>ไม่พบข้อมูล</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>

                            <div className="pagination">
                                <span className="page-info">รายการที่ 1 ถึง {serviceTypes.length} จากทั้งหมด {serviceTypes.length} รายการ</span>
                                <div className="page-controls">
                                    <select className="page-size">
                                        <option>10</option>
                                    </select>
                                    <span className="label">รายการต่อหน้า</span>

                                    <div className="page-nav">
                                        <span className="nav-info">หน้าที่ 1 จากทั้งหมด 1 หน้า</span>
                                        <button className="nav-btn" disabled>«</button>
                                        <button className="nav-btn" disabled>‹</button>
                                        <button className="nav-btn" disabled>›</button>
                                        <button className="nav-btn" disabled>»</button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
