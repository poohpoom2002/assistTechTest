import React, { useEffect, useState } from 'react';
import './AddServiceTypeModal.css';

type WorkGroup = {
    id: number;
    name: string;
};

type ServiceType = {
    id: number;
    name: string;
    workGroupId?: number;
    startBookingDate?: string;
    note?: string;
    workingDays?: {
        weekday: string;
        timeSlots: { startTime: string; endTime: string; capacity: number }[];
    }[];
};

type Props = {
    workGroups: WorkGroup[];
    onClose: () => void;
    onCreated: (service: ServiceType) => void;
    onUpdated?: (service: ServiceType) => void;
    apiBase: string;
    officeId: number;
    axios: any;
    editData?: ServiceType | null;
};

export function AddServiceTypeModal({ workGroups, onClose, onCreated, onUpdated, apiBase, officeId, axios, editData }: Props) {
    const serviceNameOptions = [
        'ชำระภาษีรถประจำปี',
        'จักรยานยนต์ - การโอนกรรมสิทธิ์',
        'จักรยานยนต์ - การชำระภาษีล่วงหน้า 3 ปี',
        'รถตู้, กระบะ 2 ประตู - การจดทะเบียนรถใหม่/เปลี่ยนประเภท/ย้ายเข้า',
        'รถเก๋ง, กระบะ 4 ประตู - การจดทะเบียนรถใหม่/เปลี่ยนประเภท/ย้ายเข้า',
        'ใบแทนแผ่นป้ายทะเบียน',
    ];

    const [groupId, setGroupId] = useState<number | ''>('');
    const [name, setName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [note, setNote] = useState('');
    const [days, setDays] = useState([
        { key: 'SUNDAY', label: 'อาทิตย์', checked: false },
        { key: 'MONDAY', label: 'จันทร์', checked: false },
        { key: 'TUESDAY', label: 'อังคาร', checked: false },
        { key: 'WEDNESDAY', label: 'พุธ', checked: false },
        { key: 'THURSDAY', label: 'พฤหัสบดี', checked: false },
        { key: 'FRIDAY', label: 'ศุกร์', checked: false },
        { key: 'SATURDAY', label: 'เสาร์', checked: false },
    ]);

    const [slotsByDay, setSlotsByDay] = useState<Record<string, { startTime: string; endTime: string; capacity: number }[]>>({});
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (editData) {
            setGroupId(editData.workGroupId || '');
            setName(editData.name);
            setStartDate(editData.startBookingDate ? new Date(editData.startBookingDate).toISOString().split('T')[0] : '');
            setNote(editData.note || '');

            if (editData.workingDays) {
                const newSlots: Record<string, any[]> = {};
                const activeDays = new Set(editData.workingDays.map(d => d.weekday));

                editData.workingDays.forEach(d => {
                    newSlots[d.weekday] = d.timeSlots.map(s => ({
                        startTime: s.startTime,
                        endTime: s.endTime,
                        capacity: s.capacity
                    }));
                });

                setSlotsByDay(newSlots);
                setDays(prev => prev.map(d => ({
                    ...d,
                    checked: activeDays.has(d.key)
                })));
            }
        }
    }, [editData]);

    const handleDayToggle = (index: number) => {
        setDays((prev) =>
            prev.map((d, i) => {
                if (i !== index) return d;
                const checked = !d.checked;
                if (checked && !slotsByDay[d.key]) {
                    setSlotsByDay((prevSlots) => ({
                        ...prevSlots,
                        [d.key]: [{ startTime: '', endTime: '', capacity: 10 }],
                    }));
                }
                return { ...d, checked };
            }),
        );
    };

    const handleSlotChange = (dayKey: string, index: number, field: string, value: string) => {
        setSlotsByDay((prev) => {
            const daySlots = prev[dayKey] ?? [];
            return {
                ...prev,
                [dayKey]: daySlots.map((slot, i) =>
                    i === index
                        ? { ...slot, [field]: field === 'capacity' ? Number(value || 0) : value }
                        : slot,
                ),
            };
        });
    };

    const addSlot = (dayKey: string) => {
        setSlotsByDay((prev) => ({
            ...prev,
            [dayKey]: [...(prev[dayKey] ?? []), { startTime: '', endTime: '', capacity: 10 }],
        }));
    };

    const removeSlot = (dayKey: string, index: number) => {
        setSlotsByDay((prev) => ({
            ...prev,
            [dayKey]: (prev[dayKey] ?? []).filter((_, i) => i !== index),
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // Validation
        if (!groupId || !name || !startDate) {
            setError('กรุณากรอกข้อมูลที่จำเป็นให้ครบ');
            return;
        }

        const activeDays = days.filter(d => d.checked);
        if (activeDays.length === 0) {
            setError('กรุณาเลือกวันที่เปิดทำงานอย่างน้อย 1 วัน');
            return;
        }

        setSubmitting(true);
        try {
            const schedule = activeDays.map((d) => ({
                weekday: d.key,
                timeSlots: (slotsByDay[d.key] ?? []).filter((s) => s.startTime && s.endTime),
            }));

            const payload = {
                officeId,
                workGroupId: groupId,
                name,
                startBookingDate: startDate,
                note,
                schedule,
            };

            let res;
            if (editData) {
                res = await axios.post(`${apiBase}/service-types/${editData.id}`, payload); // Using POST based on controller update
                if (onUpdated) onUpdated(res.data);
            } else {
                res = await axios.post(`${apiBase}/service-types`, payload);
                onCreated(res.data);
            }

            onClose();
        } catch (err) {
            console.error(err);
            setError('บันทึกไม่สำเร็จ กรุณาลองใหม่');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <div className="modal-header">
                    <h2>เพิ่มประเภทงาน</h2>
                    <button className="close-btn" onClick={onClose}>×</button>
                </div>

                <form className="modal-body" onSubmit={handleSubmit}>

                    <div className="form-group row">
                        <label className="col-label">กลุ่มงาน <span className="req">*</span></label>
                        <div className="col-input">
                            <select value={groupId} onChange={(e) => setGroupId(e.target.value ? Number(e.target.value) : '')} className="full-width">
                                <option value="">--กรุณาเลือกกลุ่มงาน--</option>
                                {workGroups.map((g) => (
                                    <option key={g.id} value={g.id}>{g.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-label">ชื่อประเภทงาน <span className="req">*</span></label>
                        <div className="col-input">
                            <select
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="full-width"
                                disabled={!groupId}
                            >
                                <option value="">--กรุณาเลือกประเภทงาน--</option>
                                {serviceNameOptions.map((opt) => (
                                    <option key={opt} value={opt}>{opt}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-label">เริ่มจองได้ตั้งแต่วันที่ <span className="req">*</span></label>
                        <div className="col-input">
                            <div className="date-input-wrapper">
                                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                                {/* Icon could be added via CSS or adjacent element */}
                            </div>
                        </div>
                    </div>

                    <div className="form-group row top-align">
                        <label className="col-label">วันที่เปิดทำงาน <span className="req">*</span></label>
                        <div className="col-input">
                            <div className="days-list">
                                {days.map((d, idx) => (
                                    <div key={d.key} className="day-item">
                                        <label className={`day-checkbox-label ${d.checked ? 'checked-day' : ''}`}>
                                            <input
                                                type="checkbox"
                                                checked={d.checked}
                                                onChange={() => handleDayToggle(idx)}
                                                className="custom-checkbox"
                                            />
                                            <span className="day-name">{d.label}</span>
                                        </label>

                                        {/* Slots for this day */}
                                        {d.checked && (
                                            <div className="time-slots-container">
                                                {(slotsByDay[d.key] ?? []).map((slot, slotIdx) => (
                                                    <div key={slotIdx} className="slot-row">
                                                        <span className="slot-label">ช่วงเวลา</span>
                                                        <input
                                                            type="time"
                                                            className="time-input"
                                                            value={slot.startTime}
                                                            onChange={(e) => handleSlotChange(d.key, slotIdx, 'startTime', e.target.value)}
                                                        />
                                                        <span className="slot-sep">ถึง</span>
                                                        <input
                                                            type="time"
                                                            className="time-input"
                                                            value={slot.endTime}
                                                            onChange={(e) => handleSlotChange(d.key, slotIdx, 'endTime', e.target.value)}
                                                        />
                                                        <span className="slot-label">จำนวน</span>
                                                        <input
                                                            type="number"
                                                            className="capacity-input"
                                                            value={slot.capacity}
                                                            min="0"
                                                            onChange={(e) => handleSlotChange(d.key, slotIdx, 'capacity', e.target.value)}
                                                        />
                                                        <span className="unit-label">คน</span>

                                                        {slotIdx === (slotsByDay[d.key] ?? []).length - 1 ? (
                                                            <button type="button" className="action-btn add-btn" onClick={() => addSlot(d.key)}>+</button>
                                                        ) : (
                                                            <button type="button" className="action-btn remove-btn" onClick={() => removeSlot(d.key, slotIdx)}>−</button>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="form-group row top-align">
                        <label className="col-label">คำแนะนำ</label>
                        <div className="col-input">
                            <textarea rows={4} value={note} onChange={(e) => setNote(e.target.value)} className="full-width"></textarea>
                        </div>
                    </div>

                    {error && <div className="error-message">{error}</div>}

                    <div className="modal-footer">
                        <button type="submit" className="save-btn" disabled={submitting}>
                            {submitting ? 'กำลังบันทึก...' : 'บันทึก'}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}
