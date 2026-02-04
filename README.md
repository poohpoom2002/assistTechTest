# System Functionality Summary

## 1. System Overview
This document provides an overview of the Service Type Management System, a web-based application designed to manage service types and their scheduling configurations for specific offices (e.g., Department of Transport offices). The system comprises:
- **Frontend**: A React-based web interface (using Vite) for users to view and manage service types.
- **Backend**: A NestJS-based REST API that handles data persistence and business logic.

## 2. API Endpoints Overview
The backend provides a set of RESTful API endpoints. Below is a detailed list of the supported operations:

### Offices
*   **GET** `/offices`  
    Retrieves a list of all available offices.

### Work Groups
*   **GET** `/work-groups`  
    Retrieves a list of work groups.  
    *   *Query Parameters*: `officeId` (optional, filter by office).

### Service Types
*   **GET** `/service-types/office/:officeId`  
    Retrieves all service types associated with a specific office.
    *   *Query Parameters*: `search` (optional, for filtering results).
*   **GET** `/service-types/:id`  
    Retrieves detailed information for a specific service type by its ID.
*   **POST** `/service-types`  
    Creates a new Service Type.
    *   *Payload*:
        *   `officeId` (number): ID of the office.
        *   `workGroupId` (number): ID of the work group.
        *   `name` (string): Name of the service.
        *   `startBookingDate` (string/date): The date from which booking starts.
        *   `note` (string, optional): Additional instructions or notes.
        *   `schedule` (array): Configuration of working days and time slots.
*   **POST** `/service-types/:id`  
    Updates an existing Service Type.
    *   *Payload*: Same structure as the Create endpoint.
    *   *Note*: This endpoint functions as an update operation.
*   **DELETE** `/service-types/:id`  
    Deletes a specific service type and its associated schedule configuration.

---

## 3. Supported User Operations
The frontend application supports the following key user operations:

### 3.1. Dashboard View
*   **View Service Types**: Users are presented with a dashboard displaying a list of "Service Types" (job types) available for the selected office.
*   **Office Selection**: Users can switch between five offices:
    1.  สำนักงานขนส่งเขตพื้นที่ 1 (บางขุนเทียน)
    2.  สำนักงานขนส่งเขตพื้นที่ 2 (ตลิ่งชัน)
    3.  สำนักงานขนส่งเขตพื้นที่ 3 (พระโขนง)
    4.  สำนักงานขนส่งเขตพื้นที่ 4 (มีนบุรี)
    5.  สำนักงานขนส่งเขตพื้นที่ 5 (จตุจักร)
*   **Search**: A search bar is available in the UI to filter service types.

### 3.2. Manage Service Types
*   **Create Service Type**: Users can click the "+ เพิ่มประเภทงาน" (Add Service Type) button to open a modal form.
    *   **Input Fields**:
        *   **Work Group**: Select from available work groups.
        *   **Service Name**: Select from a predefined list of service names (e.g., "ชำระภาษีรถประจำปี").
        *   **Start Booking Date**: Select a date.
        *   **Note**: Add optional suggestions/notes.
    *   **Schedule Configuration**:
        *   Enable specific days of the week (Sunday - Saturday).
        *   For each enabled day, define one or more **Time Slots**.
        *   Set **Capacity** (number of people) for each time slot.
*   **Edit Service Type**: Users can click on an existing service type row in the dashboard to open the "Edit" modal.
    *   The form is pre-filled with the existing data.
    *   Users can modify all fields, including the complex schedule configuration (adding/removing days or time slots).
    *   Changes are saved back to the system.
*   **Delete Service Type**: Users can delete an existing service type by clicking the trash icon (🗑️) in the dashboard action column. A confirmation prompt is shown before permanent deletion.

## 4. Database Design (Schema)
The system uses a relational database (managed via Prisma ORM). The core entities and their relationships are defined as follows:

### 4.1. Core Entities
*   **Office**: Represents an organizational unit or branch (e.g., "Transport Office District 5").
    *   *Fields*: `id`, `name`, `code`, `isActive`.
    *   *Relationships*: Parent to `WorkGroup` and `ServiceType`.
*   **WorkGroup**: Represents a logical grouping of tasks or departments within an office.
    *   *Fields*: `id`, `name`, `description`, `officeId`.
    *   *Relationships*: Belongs to an `Office`; has many `ServiceTypes`.
*   **ServiceType**: Represents a specific service offered to the public (e.g., "Annual Tax Payment").
    *   *Fields*: `id`, `name`, `startBookingDate`, `note`, `isActive`, `workGroupId`, `officeId`.
    *   *Relationships*: Belongs to an `Office` and `WorkGroup`. Has many `ServiceWorkingDay` configurations.
*   **ServiceWorkingDay**: Defines the weekly schedule for a service.
    *   *Fields*: `weekday` (e.g., "MONDAY"), `isOpen`, `serviceTypeId`.
    *   *Relationships*: Belongs to a `ServiceType`. Has many `ServiceTimeSlot`s.
*   **ServiceTimeSlot**: specific time intervals available for booking on a working day.
    *   *Fields*: `startTime`, `endTime`, `capacity`, `workingDayId`.
    *   *Relationships*: Belongs to a `ServiceWorkingDay`.
*   **Booking**: Records a citizen's appointment.
    *   *Fields*: `date`, `citizenId`, `status` (PENDING, etc.), `serviceTypeId`, `timeSlotId`.
*   **DailyClosure**: Records specific dates when a service operates differently or is closed.
*   **Announcement**: General announcements related to an office.

### 4.2. Entity Relationship Diagram (ERD) Overview
*   **Office** `1 -- N` **WorkGroup**
*   **WorkGroup** `1 -- N` **ServiceType**
*   **ServiceType** `1 -- N` **ServiceWorkingDay**
*   **ServiceWorkingDay** `1 -- N` **ServiceTimeSlot**

