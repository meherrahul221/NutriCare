# NutriCare – Nutritionist Client Management Platform

NutriCare is a modern, simple, and professional website designed for individual nutritionists to manage client directories, consultation visits, personalized meal plans, and ongoing follow-up schedules.

Built from scratch using pure native web technologies: **HTML5, CSS3, and Vanilla JavaScript**, leveraging browser **LocalStorage** for 100% frontend client data persistence without external dependencies, build tools, or databases.

---

## 1. Visual Design Identity

NutriCare is styled with a warm-neutral visual aesthetic tailored for an independent clinical nutritionist practice:

- **Main Background:** Warm Ivory (`#F6F1EB`)
- **Sidebar:** Dark Charcoal (`#30302E`)
- **Primary Accent:** Terracotta (`#A65D46` / hover `#8F4C37`)
- **Secondary Accent:** Muted Warm Sand (`#C58A70`)
- **Soft Peach:** Light Accent (`#F3E5DC`)
- **Beige:** Neutral Warm Border & Shading (`#E8D9CA`)
- **Content Panels:** Pure White (`#FFFFFF`) with subtle warm borders (`#E7DED5`)
- **Typography:** Georgia for headings, clean system sans-serif for comfortable reading
- **Status Indicators:** Muted Sage Green (`#66816B`), Warm Amber (`#C28A45`), Terracotta Brick (`#B85C55`)

---

## 2. Project Folder Structure

```
NutriCare/
│
├── index.html          # Practice Dashboard & Summary Overview
├── clients.html        # Client Directory & 8-Part Clinical Profiles
├── consultations.html  # Consultation Logs & Visit Records
├── meal-plans.html     # Meal Plan Creator & Daily Meal Schedules
├── follow-ups.html     # Follow-up Tracker, Tabs & Overdue Detector
│
├── css/
│   └── style.css       # Unified design tokens, responsive layout & components
│
├── js/
│   └── script.js       # LocalStorage data layer, validation, modals & dynamic stats
│
└── README.md           # Documentation & local running instructions
```

---

## 3. Core Pages & Functionalities

### 1. Dashboard (`index.html`)
- **Personalized Header:** Dynamic greeting (*"Good morning / afternoon / evening, Nutritionist!"*) with date pill.
- **4 Real-time Summary Cards:**
  1. *Total Clients* (calculated from LocalStorage)
  2. *Consultations* (total recorded)
  3. *Active Meal Plans* (valid for the current calendar date)
  4. *Upcoming Follow-ups* (scheduled on or after today)
- **Recent Clients Table:** Displays the 5 latest registered clients with direct links to their detailed profiles.
- **Upcoming Follow-ups Table:** Nearest upcoming appointments sorted by date with semantic status tags.
- **Quick Actions Bar:** Soft peach container with 4 shortcut buttons that navigate directly to client, consultation, meal plan, and follow-up creation modals.

### 2. Client Management (`clients.html`)
- **Overview Metrics:** Total Clients, Active Clients, and New Clients registered within the last 30 days.
- **Add / Edit Client Modal:**
  - *Personal Information:* Full Name, Age, Gender, Phone, Email
  - *Body Measurements:* Height (cm), Current Weight (kg), Target Weight (kg)
  - *Nutrition & Lifestyle:* Main Goal, Food Preferences, Food Allergies, Activity Level, Clinical Notes
- **Interactive Directory Table:** Search by client name, client ID, or health goal.
- **Detailed 8-Part Client Profile Modal:**
  1. Personal & Contact Information
  2. Body Measurements with automatic BMI calculation & category
  3. Main Nutrition Goals
  4. Food Preferences & Known Allergies
  5. Consultation Visit History
  6. Current Assigned Meal Plan
  7. Follow-up Tracking History
  8. Nutritionist Clinical Notes
- **Safe Cascading Deletion:** When a client is deleted, all linked consultations, meal plans, and follow-ups are safely removed to prevent orphaned records.

### 3. Consultation Records (`consultations.html`)
- **Consultation Overview:** Total Consultations, Visits This Month, and Upcoming Scheduled Visits.
- **Add / Edit Consultation Modal:**
  - Client selector (dynamically loads registered clients from LocalStorage)
  - Consultation Date
  - Previous Weight & Current Weight
  - Main Concerns Discussed, Eating Habits, Observed Progress, Nutritionist Observations, Recommendations
  - Next Consultation Date picker
- **History Table & Filters:** Search by concern, client name, or filter by specific client dropdown.
- **Consultation Details Modal:** Detailed clinical breakdown for each visit.

### 4. Meal Plan Management (`meal-plans.html`)
- **Meal Plan Overview:** Total Plans, Active Plans, Completed Plans.
- **Create Meal Plan Modal:**
  - Client selector, Plan Name, Start Date, End Date (validated so end date cannot precede start date)
  - 5-stage Daily Schedule: Breakfast, Morning Snack, Lunch, Evening Snack, Dinner
  - Daily Hydration Target (e.g. 2.5 - 3.0 Litres)
  - Additional preparation and dietary instructions
- **Interactive Meal Plan View:**
  - Styled with soft peach callouts and clean time-slotted meal blocks
  - Real-world wholesome Indian/whole food recommendations (steel-cut oats, yellow dal, rotis, curd, seeds, sprouts)
  - Automatic status calculation: *Active*, *Completed*, or *Upcoming* based on date
  - Qualified nutritionist medical disclaimer notice

### 5. Follow-up Management (`follow-ups.html`)
- **Follow-up Overview:** Upcoming, Completed, and Missed/Overdue counts.
- **Schedule Follow-up Modal:**
  - Client selector, date picker, type (Weight Progress, Meal Plan, General, Lifestyle)
  - Reason, Previous Weight, Current Weight, Notes, Next Steps, Status
- **Tabbed Status Filters:** Filter between *All Records*, *Upcoming*, *Completed*, and *Missed / Overdue*.
- **Automatic Overdue Detection:** Any follow-up past today's date that remains in "Scheduled" status is automatically highlighted as *Overdue*.
- **Quick Status Toggle:** Easily cycle status between Scheduled &rarr; Completed &rarr; Missed directly from the table action buttons.

---

## 4. LocalStorage Schema

All data is stored under four clean namespaces:

| LocalStorage Key | Description |
|---|---|
| `nutricare_clients` | Array of client objects (`id`, `name`, `age`, `gender`, `phone`, `email`, `height`, `currentWeight`, `targetWeight`, `goal`, `preferences`, `allergies`, `activityLevel`, `notes`, `createdAt`) |
| `nutricare_consultations` | Array of consultation records (`id`, `clientId`, `date`, `prevWeight`, `currentWeight`, `concerns`, `habits`, `progress`, `observations`, `recommendations`, `nextDate`) |
| `nutricare_mealplans` | Array of meal plans (`id`, `clientId`, `name`, `startDate`, `endDate`, `breakfast`, `morningSnack`, `lunch`, `eveningSnack`, `dinner`, `waterIntake`, `instructions`) |
| `nutricare_followups` | Array of follow-up check-ins (`id`, `clientId`, `date`, `type`, `reason`, `prevWeight`, `currentWeight`, `notes`, `nextSteps`, `status`) |

> **Note on Persistence:** NutriCare inspects LocalStorage upon first load. If empty, it populates realistic sample client records (Priya Sharma, Rahul Verma, Ananya Patel, etc.). Any new client or record you add or edit is permanently saved in browser LocalStorage across page reloads.

---

## 5. How to Run Locally

Because NutriCare uses standard Vanilla HTML, CSS, and JavaScript, **no installation, Node.js, build steps, or dependencies are required**.

### Option 1: Direct File Opening (Easiest)
1. Navigate to the `NutriCare` folder on your computer:
   ```
   C:\Users\Rahul Meher\.gemini\antigravity\scratch\NutriCare
   ```
2. Double-click `index.html` (or right-click and select **Open with Google Chrome**, **Microsoft Edge**, or **Firefox**).
3. The platform will immediately load with full functionality.

### Option 2: Local Static Server (Optional)
If you prefer running via a local development server:

Using Python:
```bash
cd "C:\Users\Rahul Meher\.gemini\antigravity\scratch\NutriCare"
python -m http.server 8000
```
Then open `http://localhost:8000` in your web browser.

Using Node `npx serve`:
```bash
npx serve .
```

---

## 6. Verification & Quality Checklist

- [x] Warm ivory (`#F6F1EB`) and dark charcoal (`#30302E`) design language matching reference
- [x] Terracotta buttons and highlights (`#A65D46`), soft peach accents (`#F3E5DC`), beige dividers (`#E8D9CA`)
- [x] 100% Vanilla JavaScript without external dependencies
- [x] Dynamic dashboard metrics updating automatically from LocalStorage
- [x] Fully functional Add/Edit/Delete/Search across all 5 modules
- [x] Safe cascading deletion of clients removing associated consultations, meal plans, and follow-ups
- [x] 8-part detailed Client Profile with automated BMI computation
- [x] Auto-detection of active/completed meal plans and overdue follow-ups
- [x] Responsive layout with collapsible mobile navigation drawer
- [x] Form input validation with friendly toast notifications
