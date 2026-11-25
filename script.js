/**
 * NutriCare – Nutritionist Client Management Platform
 * Main JavaScript Controller (js/script.js)
 * Clean, readable, beginner-friendly Vanilla JavaScript using LocalStorage.
 */

// =============================================================================
// 1. STORAGE KEYS & INITIAL SEED DATA
// =============================================================================

const STORAGE_KEYS = {
    CLIENTS: 'nutricare_clients',
    CONSULTATIONS: 'nutricare_consultations',
    MEAL_PLANS: 'nutricare_mealplans',
    FOLLOW_UPS: 'nutricare_followups'
};

// Initial realistic dataset seeded only on first load
const SEED_DATA = {
    clients: [
        {
            id: 'CLI-101',
            name: 'Priya Sharma',
            age: 32,
            gender: 'Female',
            phone: '+91 98765 43210',
            email: 'priya.sharma@example.com',
            height: 162,
            currentWeight: 68,
            targetWeight: 58,
            goal: 'Weight management & thyroid support',
            preferences: 'Vegetarian, whole grains, warm soups, fiber-rich',
            allergies: 'Lactose intolerant',
            activityLevel: 'Moderate (Yoga 4x/week)',
            notes: 'Diagnosed with Hypothyroidism 2 years ago. Experiences afternoon fatigue. Prefers warm cooked meals.',
            createdAt: '2026-11-01'
        },
        {
            id: 'CLI-102',
            name: 'Rahul Verma',
            age: 28,
            gender: 'Male',
            phone: '+91 98111 22334',
            email: 'rahul.verma@example.com',
            height: 178,
            currentWeight: 72,
            targetWeight: 78,
            goal: 'Muscle gain & athletic endurance',
            preferences: 'Non-vegetarian (eggs, chicken breast, fish, oats)',
            allergies: 'None',
            activityLevel: 'High (Strength training 5x/week)',
            notes: 'Preparing for a half marathon in spring. Needs high-protein meal timing and electrolyte balance.',
            createdAt: '2026-11-05'
        },
        {
            id: 'CLI-103',
            name: 'Ananya Patel',
            age: 45,
            gender: 'Female',
            phone: '+91 98222 33445',
            email: 'ananya.patel@example.com',
            height: 158,
            currentWeight: 76,
            targetWeight: 65,
            goal: 'Type 2 diabetes blood sugar control',
            preferences: 'Lacto-vegetarian, millets, sprouts, green leafy vegetables',
            allergies: 'Peanuts',
            activityLevel: 'Light (Daily 30-min morning brisk walk)',
            notes: 'Recent HbA1c is 7.2%. Needs low glycemic index meals and portion discipline for dinner.',
            createdAt: '2026-11-10'
        },
        {
            id: 'CLI-104',
            name: 'Vikram Singh',
            age: 39,
            gender: 'Male',
            phone: '+91 98333 44556',
            email: 'vikram.singh@example.com',
            height: 175,
            currentWeight: 84,
            targetWeight: 74,
            goal: 'Cholesterol management & heart health',
            preferences: 'Eggetarian, plant-forward, soluble fiber, olive oil',
            allergies: 'Shellfish',
            activityLevel: 'Moderate (Cycling on weekends & gym)',
            notes: 'Elevated LDL (142 mg/dL). Frequent business travel requires restaurant-friendly food guidelines.',
            createdAt: '2026-11-15'
        },
        {
            id: 'CLI-105',
            name: 'Sneha Rao',
            age: 24,
            gender: 'Female',
            phone: '+91 98444 55667',
            email: 'sneha.rao@example.com',
            height: 165,
            currentWeight: 62,
            targetWeight: 55,
            goal: 'PCOS dietary management & gut health',
            preferences: 'Vegetarian, anti-inflammatory herbs, seeds cycling',
            allergies: 'Soy',
            activityLevel: 'Sedentary (Desk job software engineer)',
            notes: 'Experiences bloating and irregular cycles. Motivated to adopt anti-inflammatory meal routine.',
            createdAt: '2026-11-18'
        }
    ],

    consultations: [
        {
            id: 'CON-201',
            clientId: 'CLI-101',
            date: '2026-11-20',
            prevWeight: 70,
            currentWeight: 68,
            concerns: 'Afternoon energy slump and slow metabolism.',
            habits: 'Often skips breakfast, relies on 3 cups of tea with sugar.',
            progress: 'Down 2kg over past 3 weeks. Digestion has normalized with warm soups.',
            observations: 'Thyroid medication taken regularly. Hydration level is slightly below target.',
            recommendations: 'Shift to steel-cut oats with chia seeds. Increase daily water intake to 2.5L. Add brazil nuts for selenium.',
            nextDate: '2026-12-05'
        },
        {
            id: 'CON-202',
            clientId: 'CLI-102',
            date: '2026-11-19',
            prevWeight: 71,
            currentWeight: 72,
            concerns: 'Difficulty hitting 140g protein without heavy stomach feeling.',
            habits: 'Consumes 3 very large meals, no mid-day snacks.',
            progress: 'Gained 1kg of lean muscle mass. Workout recovery is quicker.',
            observations: 'Good energy, excellent workout dedication. Blood pressure normal.',
            recommendations: 'Spread protein evenly into 5 smaller meals. Add boiled eggs and sprouts for mid-morning snack.',
            nextDate: '2026-12-10'
        },
        {
            id: 'CON-203',
            clientId: 'CLI-103',
            date: '2026-11-18',
            prevWeight: 77,
            currentWeight: 76,
            concerns: 'Post-dinner glucose spikes above 160 mg/dL.',
            habits: 'Eats dinner very late (around 9:30 PM) with white rice.',
            progress: 'Fasting glucose improved from 128 to 118 mg/dL.',
            observations: 'Very compliant with morning walks. Needs family support on earlier dinner timing.',
            recommendations: 'Shift dinner to 7:30 PM. Replace white rice with foxtail millet or quinoa khichdi with mixed vegetables.',
            nextDate: '2026-12-02'
        },
        {
            id: 'CON-204',
            clientId: 'CLI-104',
            date: '2026-11-15',
            prevWeight: 85,
            currentWeight: 84,
            concerns: 'Dining out during corporate client meetings.',
            habits: 'Frequent hotel buffets, high sodium intake.',
            progress: 'Down 1kg. Waist circumference reduced by 1.5 cm.',
            observations: 'Understands nutritional label reading well now.',
            recommendations: 'Pick grilled/tandoori starters over fried items. Add 2 tablespoons of isabgol (psyllium husk) before sleep.',
            nextDate: '2026-12-01'
        }
    ],

    mealPlans: [
        {
            id: 'PLN-301',
            clientId: 'CLI-101',
            name: 'Thyroid Care & Metabolic Reset',
            startDate: '2026-11-20',
            endDate: '2026-12-20',
            breakfast: 'Steel-cut oats cooked in almond milk, topped with 1 tbsp chia seeds, pumpkin seeds, and 1 fresh pear.',
            morningSnack: '1 cup herbal green tea + 4 soaked almonds + 1 selenium-rich brazil nut.',
            lunch: '1 bowl yellow moong dal + 2 multigrain rotis + warm stir-fried bottle gourd & cucumber salad + fresh curd.',
            eveningSnack: '1 small bowl of lightly roasted makhana (foxnuts) with turmeric and a pinch of pink salt.',
            dinner: 'Warm clear vegetable soup + grilled paneer (100g) with steamed carrots, beans, and bell peppers.',
            waterIntake: '2.5 to 3.0 Litres daily (warm or room temperature)',
            instructions: 'Take thyroid medication at 6:30 AM with plain water. Keep a 45-minute gap before breakfast. Avoid raw cruciferous vegetables.'
        },
        {
            id: 'PLN-302',
            clientId: 'CLI-102',
            name: 'Lean Muscle & High Endurance Fuel',
            startDate: '2026-11-19',
            endDate: '2026-12-19',
            breakfast: '3 egg whites + 1 whole egg scrambled with baby spinach, 2 slices 100% whole grain bread + 1 banana.',
            morningSnack: 'Greek yogurt (150g) topped with mixed berries and a drizzle of organic honey.',
            lunch: 'Grilled chicken breast (150g) or grilled paneer + 1 cup brown rice + yellow lentil soup + steamed green beans.',
            eveningSnack: '1 cup boiled sprouted black chana chaat with lemon juice + tender coconut water.',
            dinner: 'Baked fish fillet or tofu curry + 2 fresh jowar rotis + large seasonal green salad with olive oil dressing.',
            waterIntake: '3.5 to 4.0 Litres daily',
            instructions: 'Consume post-workout protein within 40 minutes of finishing exercise. Keep hydration steady on heavy endurance days.'
        },
        {
            id: 'PLN-303',
            clientId: 'CLI-103',
            name: 'Glycemic Balance & Low-GI Wellness',
            startDate: '2026-11-18',
            endDate: '2026-12-18',
            breakfast: 'Besan (chickpea flour) cheela stuffed with grated carrots and zucchini + homemade mint coriander chutney.',
            morningSnack: '1 crisp green apple + 5 whole walnut halves.',
            lunch: 'Foxtail millet vegetable pulao + palak dal (spinach lentils) + 1 small bowl of probiotic homemade curd.',
            eveningSnack: 'Steamed sprouted moong chaat with chopped tomatoes, cucumber, lemon, and roasted cumin.',
            dinner: '1 methi (fenugreek) missi roti + 1 cup lauki (bottle gourd) sabzi + 1 bowl warm tomato vegetable broth.',
            waterIntake: '2.5 Litres daily',
            instructions: 'Take a gentle 15-minute stroll after lunch and dinner. Strictly complete dinner by 7:30 PM.'
        }
    ],

    followUps: [
        {
            id: 'FOL-401',
            clientId: 'CLI-101',
            date: '2026-11-28',
            type: 'Meal Plan Review',
            reason: 'Assess tolerance to breakfast oat recipe and verify morning energy.',
            prevWeight: 70,
            currentWeight: 68,
            notes: 'Check digestion improvements and compliance with warm evening meals.',
            nextSteps: 'Adjust afternoon snack portion if late-day hunger persists.',
            status: 'Scheduled'
        },
        {
            id: 'FOL-402',
            clientId: 'CLI-102',
            date: '2026-11-29',
            type: 'Weight Progress Review',
            reason: 'Mid-phase weigh-in and evaluate strength workout recovery.',
            prevWeight: 71,
            currentWeight: 72,
            notes: 'Track bench and sprint performance markers.',
            nextSteps: 'Review training calorie surplus if weight gain stalls.',
            status: 'Scheduled'
        },
        {
            id: 'FOL-403',
            clientId: 'CLI-103',
            date: '2026-11-26',
            type: 'General Consultation',
            reason: 'Review self-monitored blood glucose log for the past 7 days.',
            prevWeight: 77,
            currentWeight: 76,
            notes: 'Check post-dinner sugar readings with millet dinner.',
            nextSteps: 'Fine-tune carbohydrate portion if evening readings remain above 140 mg/dL.',
            status: 'Scheduled'
        },
        {
            id: 'FOL-404',
            clientId: 'CLI-104',
            date: '2026-11-22',
            type: 'Lifestyle Progress Review',
            reason: 'Check dietary choices during corporate trip to Mumbai.',
            prevWeight: 85,
            currentWeight: 84,
            notes: 'Client successfully chose grilled fish and salads at hotels.',
            nextSteps: 'Continue psyllium husk fiber routine and schedule lipid profile retest.',
            status: 'Completed'
        },
        {
            id: 'FOL-405',
            clientId: 'CLI-105',
            date: '2026-11-20',
            type: 'General Consultation',
            reason: 'Initial 48-hour dietary compliance check.',
            prevWeight: 62,
            currentWeight: 62,
            notes: 'Client was on sudden business travel and missed call window.',
            nextSteps: 'Follow up via email to reschedule at earliest convenience.',
            status: 'Missed'
        }
    ]
};

// =============================================================================
// 2. DATA ACCESS LAYER (LOCALSTORAGE HELPERS)
// =============================================================================

const Storage = {
    init() {
        if (!localStorage.getItem(STORAGE_KEYS.CLIENTS)) {
            localStorage.setItem(STORAGE_KEYS.CLIENTS, JSON.stringify(SEED_DATA.clients));
        }
        if (!localStorage.getItem(STORAGE_KEYS.CONSULTATIONS)) {
            localStorage.setItem(STORAGE_KEYS.CONSULTATIONS, JSON.stringify(SEED_DATA.consultations));
        }
        if (!localStorage.getItem(STORAGE_KEYS.MEAL_PLANS)) {
            localStorage.setItem(STORAGE_KEYS.MEAL_PLANS, JSON.stringify(SEED_DATA.mealPlans));
        }
        if (!localStorage.getItem(STORAGE_KEYS.FOLLOW_UPS)) {
            localStorage.setItem(STORAGE_KEYS.FOLLOW_UPS, JSON.stringify(SEED_DATA.followUps));
        }
    },

    getClients() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEYS.CLIENTS)) || [];
        } catch (e) {
            console.error('Error reading clients from LocalStorage', e);
            return [];
        }
    },

    saveClients(data) {
        localStorage.setItem(STORAGE_KEYS.CLIENTS, JSON.stringify(data));
    },

    getConsultations() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEYS.CONSULTATIONS)) || [];
        } catch (e) {
            console.error('Error reading consultations from LocalStorage', e);
            return [];
        }
    },

    saveConsultations(data) {
        localStorage.setItem(STORAGE_KEYS.CONSULTATIONS, JSON.stringify(data));
    },

    getMealPlans() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEYS.MEAL_PLANS)) || [];
        } catch (e) {
            console.error('Error reading meal plans from LocalStorage', e);
            return [];
        }
    },

    saveMealPlans(data) {
        localStorage.setItem(STORAGE_KEYS.MEAL_PLANS, JSON.stringify(data));
    },

    getFollowUps() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEYS.FOLLOW_UPS)) || [];
        } catch (e) {
            console.error('Error reading follow-ups from LocalStorage', e);
            return [];
        }
    },

    saveFollowUps(data) {
        localStorage.setItem(STORAGE_KEYS.FOLLOW_UPS, JSON.stringify(data));
    },

    getClientById(id) {
        const clients = this.getClients();
        return clients.find(c => c.id === id) || null;
    },

    // Generates human-friendly sequential ID e.g. CLI-106, CON-205, PLN-304, FOL-406
    generateId(prefix, list) {
        let maxNum = 100;
        if (prefix === 'CON-') maxNum = 200;
        if (prefix === 'PLN-') maxNum = 300;
        if (prefix === 'FOL-') maxNum = 400;

        list.forEach(item => {
            if (item.id && item.id.startsWith(prefix)) {
                const num = parseInt(item.id.replace(prefix, ''), 10);
                if (!isNaN(num) && num > maxNum) {
                    maxNum = num;
                }
            }
        });
        return `${prefix}${maxNum + 1}`;
    },

    // Cascading delete: deletes client and all linked consultations, meal plans, follow-ups
    deleteClientSafely(clientId) {
        const clients = this.getClients().filter(c => c.id !== clientId);
        const consultations = this.getConsultations().filter(c => c.clientId !== clientId);
        const mealPlans = this.getMealPlans().filter(m => m.clientId !== clientId);
        const followUps = this.getFollowUps().filter(f => f.clientId !== clientId);

        this.saveClients(clients);
        this.saveConsultations(consultations);
        this.saveMealPlans(mealPlans);
        this.saveFollowUps(followUps);
    }
};

// =============================================================================
// 3. UTILITIES & UI HELPERS
// =============================================================================

function formatDate(dateStr) {
    if (!dateStr) return 'N/A';
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return d.toLocaleDateString('en-US', options);
}

function getTodayISO() {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
}

function calculateBMI(weightKg, heightCm) {
    if (!weightKg || !heightCm || heightCm <= 0) return { bmi: 'N/A', category: 'Unknown' };
    const heightM = heightCm / 100;
    const bmiVal = (weightKg / (heightM * heightM)).toFixed(1);
    let category = 'Normal weight';
    if (bmiVal < 18.5) category = 'Underweight';
    else if (bmiVal >= 25 && bmiVal < 30) category = 'Overweight';
    else if (bmiVal >= 30) category = 'Obese';
    return { bmi: bmiVal, category };
}

function getPlanStatus(startDate, endDate) {
    const today = getTodayISO();
    if (endDate && endDate < today) {
        return { label: 'Completed', cls: 'status-completed' };
    }
    if (startDate && startDate > today) {
        return { label: 'Upcoming', cls: 'status-upcoming' };
    }
    return { label: 'Active', cls: 'status-active' };
}

function getFollowUpStatus(item) {
    const today = getTodayISO();
    if (item.status === 'Completed') {
        return { label: 'Completed', cls: 'status-completed' };
    }
    if (item.status === 'Missed') {
        return { label: 'Missed', cls: 'status-missed' };
    }
    if (item.date && item.date < today && item.status === 'Scheduled') {
        return { label: 'Overdue', cls: 'status-overdue' };
    }
    return { label: 'Scheduled', cls: 'status-scheduled' };
}

// Toast notification helper
function showToast(message, type = 'success') {
    let container = document.getElementById('toastContainer');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toastContainer';
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <span>${message}</span>
        <button style="background:none;border:none;cursor:pointer;color:inherit;font-size:1.1rem;line-height:1;" aria-label="Close">&times;</button>
    `;

    toast.querySelector('button').onclick = () => {
        toast.remove();
    };

    container.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(-10px)';
        setTimeout(() => toast.remove(), 250);
    }, 3500);
}

// Confirm dialog modal
function showConfirmDialog(title, message, onConfirm) {
    let modal = document.getElementById('confirmModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'confirmModal';
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-dialog modal-sm">
                <div class="modal-header">
                    <h3 id="confirmModalTitle">${title}</h3>
                    <button type="button" class="modal-close-btn" onclick="closeConfirmDialog()">&times;</button>
                </div>
                <div class="modal-body">
                    <p id="confirmModalMessage" style="color:var(--text-main); font-size:0.95rem;">${message}</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" onclick="closeConfirmDialog()">Cancel</button>
                    <button type="button" class="btn btn-danger" id="confirmModalProceedBtn">Confirm</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    } else {
        document.getElementById('confirmModalTitle').textContent = title;
        document.getElementById('confirmModalMessage').textContent = message;
    }

    const proceedBtn = document.getElementById('confirmModalProceedBtn');
    proceedBtn.onclick = () => {
        closeConfirmDialog();
        if (typeof onConfirm === 'function') onConfirm();
    };

    modal.classList.add('active');
}

function closeConfirmDialog() {
    const modal = document.getElementById('confirmModal');
    if (modal) modal.classList.remove('active');
}

// Setup common mobile navigation & date display
function initCommonLayout() {
    // Current date display in header
    const dateElements = document.querySelectorAll('.js-current-date');
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
    dateElements.forEach(el => {
        el.textContent = formattedDate;
    });

    // Mobile nav toggle
    const toggleBtn = document.getElementById('mobileNavToggle');
    const sidebar = document.getElementById('mainSidebar');
    const backdrop = document.getElementById('mobileBackdrop');

    if (toggleBtn && sidebar && backdrop) {
        toggleBtn.addEventListener('click', () => {
            sidebar.classList.toggle('open');
            backdrop.classList.toggle('active');
        });

        backdrop.addEventListener('click', () => {
            sidebar.classList.remove('open');
            backdrop.classList.remove('active');
        });
    }
}

// =============================================================================
// 4. PAGE 1: DASHBOARD (index.html)
// =============================================================================

function initDashboard() {
    const clients = Storage.getClients();
    const consultations = Storage.getConsultations();
    const mealPlans = Storage.getMealPlans();
    const followUps = Storage.getFollowUps();

    // 1. Dynamic Greeting based on time of day
    const greetingEl = document.getElementById('greetingTitle');
    if (greetingEl) {
        const hour = new Date().getHours();
        let greeting = 'Good morning, Nutritionist!';
        if (hour >= 12 && hour < 17) greeting = 'Good afternoon, Nutritionist!';
        else if (hour >= 17) greeting = 'Good evening, Nutritionist!';
        greetingEl.textContent = greeting;
    }

    // 2. Summary Statistics
    const statTotalClients = document.getElementById('statTotalClients');
    const statConsultations = document.getElementById('statConsultations');
    const statActiveMealPlans = document.getElementById('statActiveMealPlans');
    const statUpcomingFollowups = document.getElementById('statUpcomingFollowups');

    const todayStr = getTodayISO();

    if (statTotalClients) statTotalClients.textContent = clients.length;
    if (statConsultations) statConsultations.textContent = consultations.length;
    
    // Active meal plans: startDate <= today <= endDate
    const activePlansCount = mealPlans.filter(p => (!p.endDate || p.endDate >= todayStr) && (!p.startDate || p.startDate <= todayStr)).length;
    if (statActiveMealPlans) statActiveMealPlans.textContent = activePlansCount;

    // Upcoming follow-ups: scheduled & date >= today
    const upcomingFollowUpsCount = followUps.filter(f => f.status === 'Scheduled' && (!f.date || f.date >= todayStr)).length;
    if (statUpcomingFollowups) statUpcomingFollowups.textContent = upcomingFollowUpsCount;

    // 3. Recent Clients Table (latest 5 registered)
    const recentClientsTable = document.getElementById('recentClientsBody');
    if (recentClientsTable) {
        const sortedClients = [...clients].reverse().slice(0, 5);
        if (sortedClients.length === 0) {
            recentClientsTable.innerHTML = `
                <tr>
                    <td colspan="4" class="empty-state">
                        <p>No clients registered yet. Click "Add New Client" below to get started.</p>
                    </td>
                </tr>
            `;
        } else {
            recentClientsTable.innerHTML = sortedClients.map(c => {
                // Find latest consultation date
                const clientConsults = consultations.filter(con => con.clientId === c.id);
                const lastConsult = clientConsults.length > 0 ? clientConsults[clientConsults.length - 1].date : null;
                const lastConsultText = lastConsult ? formatDate(lastConsult) : 'Not yet consulted';

                return `
                    <tr>
                        <td>
                            <strong><a href="clients.html?view=${c.id}">${escapeHtml(c.name)}</a></strong>
                            <div style="font-size:0.75rem; color:var(--text-muted);">${c.id}</div>
                        </td>
                        <td>${escapeHtml(c.goal || 'General Health')}</td>
                        <td>${c.currentWeight ? `${c.currentWeight} kg` : 'N/A'}</td>
                        <td>${lastConsultText}</td>
                    </tr>
                `;
            }).join('');
        }
    }

    // 4. Upcoming Follow-ups Table (nearest upcoming first)
    const upcomingFollowUpsTable = document.getElementById('upcomingFollowupsBody');
    if (upcomingFollowUpsTable) {
        const scheduledFollowups = followUps
            .filter(f => f.status === 'Scheduled')
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .slice(0, 5);

        if (scheduledFollowups.length === 0) {
            upcomingFollowUpsTable.innerHTML = `
                <tr>
                    <td colspan="4" class="empty-state">
                        <p>No upcoming follow-ups scheduled.</p>
                    </td>
                </tr>
            `;
        } else {
            upcomingFollowUpsTable.innerHTML = scheduledFollowups.map(f => {
                const client = Storage.getClientById(f.clientId);
                const clientName = client ? client.name : (f.clientId || 'Unknown');
                const statusMeta = getFollowUpStatus(f);

                return `
                    <tr>
                        <td>
                            <strong>${escapeHtml(clientName)}</strong>
                            <div style="font-size:0.75rem; color:var(--text-muted);">${f.id}</div>
                        </td>
                        <td>${formatDate(f.date)}</td>
                        <td>${escapeHtml(f.reason || f.type)}</td>
                        <td><span class="status-badge ${statusMeta.cls}">${statusMeta.label}</span></td>
                    </tr>
                `;
            }).join('');
        }
    }
}

// =============================================================================
// 5. PAGE 2: CLIENT MANAGEMENT (clients.html)
// =============================================================================

function initClientsPage() {
    let clients = Storage.getClients();

    // 1. Overview counts
    updateClientsOverview(clients);

    // 2. Render table
    renderClientsTable(clients);

    // 3. Search listener
    const searchInput = document.getElementById('clientSearchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            const filtered = clients.filter(c => 
                (c.name && c.name.toLowerCase().includes(query)) ||
                (c.id && c.id.toLowerCase().includes(query)) ||
                (c.goal && c.goal.toLowerCase().includes(query)) ||
                (c.phone && c.phone.toLowerCase().includes(query))
            );
            renderClientsTable(filtered);
        });
    }

    // 4. Modal form submit
    const clientForm = document.getElementById('clientForm');
    if (clientForm) {
        clientForm.addEventListener('submit', handleClientFormSubmit);
    }

    // 5. Check URL parameters e.g. ?action=new or ?view=CLI-101
    const params = new URLSearchParams(window.location.search);
    if (params.get('action') === 'new') {
        openClientModal();
    } else if (params.get('view')) {
        viewClientProfile(params.get('view'));
    }
}

function updateClientsOverview(clients) {
    const totalEl = document.getElementById('totalClientsCount');
    const activeEl = document.getElementById('activeClientsCount');
    const newEl = document.getElementById('newClientsCount');

    if (totalEl) totalEl.textContent = clients.length;

    // Active clients: have active plan or recent follow-up
    if (activeEl) activeEl.textContent = clients.length; // all registered under active care

    // New clients: registered within last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const newClients = clients.filter(c => {
        if (!c.createdAt) return false;
        return new Date(c.createdAt) >= thirtyDaysAgo;
    });
    if (newEl) newEl.textContent = newClients.length;
}

function renderClientsTable(clientList) {
    const tbody = document.getElementById('clientsTableBody');
    if (!tbody) return;

    if (clientList.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="8" class="empty-state">
                    <div class="empty-state-icon">
                        <svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle></svg>
                    </div>
                    <p>No clients found matching your search. Add a new client or clear search filter.</p>
                </td>
            </tr>
        `;
        return;
    }

    tbody.innerHTML = clientList.map(c => `
        <tr>
            <td><strong>${c.id}</strong></td>
            <td><strong>${escapeHtml(c.name)}</strong></td>
            <td>${c.age || '—'}</td>
            <td>${escapeHtml(c.phone || '—')}</td>
            <td>${c.currentWeight ? `${c.currentWeight} kg` : '—'}</td>
            <td>${c.targetWeight ? `${c.targetWeight} kg` : '—'}</td>
            <td><span style="font-size:0.85rem; color:var(--text-secondary);">${escapeHtml(c.goal || 'General Health')}</span></td>
            <td>
                <div class="table-actions">
                    <button class="btn btn-peach btn-sm" onclick="viewClientProfile('${c.id}')" title="View Detailed Profile">View</button>
                    <button class="btn btn-secondary btn-sm" onclick="editClient('${c.id}')" title="Edit Client">Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteClientPrompt('${c.id}')" title="Delete Client">Delete</button>
                </div>
            </td>
        </tr>
    `).join('');
}

function openClientModal(clientToEdit = null) {
    const modal = document.getElementById('clientModal');
    const form = document.getElementById('clientForm');
    const title = document.getElementById('clientModalTitle');
    if (!modal || !form) return;

    form.reset();
    document.getElementById('clientId').value = '';

    if (clientToEdit) {
        title.textContent = `Edit Client – ${clientToEdit.name}`;
        document.getElementById('clientId').value = clientToEdit.id;
        document.getElementById('clientName').value = clientToEdit.name || '';
        document.getElementById('clientAge').value = clientToEdit.age || '';
        document.getElementById('clientGender').value = clientToEdit.gender || 'Female';
        document.getElementById('clientPhone').value = clientToEdit.phone || '';
        document.getElementById('clientEmail').value = clientToEdit.email || '';
        document.getElementById('clientHeight').value = clientToEdit.height || '';
        document.getElementById('clientCurrentWeight').value = clientToEdit.currentWeight || '';
        document.getElementById('clientTargetWeight').value = clientToEdit.targetWeight || '';
        document.getElementById('clientGoal').value = clientToEdit.goal || '';
        document.getElementById('clientPreferences').value = clientToEdit.preferences || '';
        document.getElementById('clientAllergies').value = clientToEdit.allergies || '';
        document.getElementById('clientActivityLevel').value = clientToEdit.activityLevel || 'Moderate';
        document.getElementById('clientNotes').value = clientToEdit.notes || '';
    } else {
        title.textContent = 'Add New Client';
    }

    modal.classList.add('active');
}

function closeClientModal() {
    const modal = document.getElementById('clientModal');
    if (modal) modal.classList.remove('active');
}

function handleClientFormSubmit(e) {
    e.preventDefault();
    const id = document.getElementById('clientId').value.trim();
    const name = document.getElementById('clientName').value.trim();
    const age = parseInt(document.getElementById('clientAge').value, 10);
    const gender = document.getElementById('clientGender').value;
    const phone = document.getElementById('clientPhone').value.trim();
    const email = document.getElementById('clientEmail').value.trim();
    const height = parseFloat(document.getElementById('clientHeight').value);
    const currentWeight = parseFloat(document.getElementById('clientCurrentWeight').value);
    const targetWeight = parseFloat(document.getElementById('clientTargetWeight').value);
    const goal = document.getElementById('clientGoal').value.trim();
    const preferences = document.getElementById('clientPreferences').value.trim();
    const allergies = document.getElementById('clientAllergies').value.trim();
    const activityLevel = document.getElementById('clientActivityLevel').value;
    const notes = document.getElementById('clientNotes').value.trim();

    // Validation
    if (!name) {
        showToast('Please enter the client full name.', 'warning');
        return;
    }
    if (isNaN(age) || age < 1 || age > 120) {
        showToast('Please enter a valid age between 1 and 120.', 'warning');
        return;
    }
    if (height && (height < 40 || height > 260)) {
        showToast('Please enter a realistic height in cm (40-260).', 'warning');
        return;
    }
    if (currentWeight && (currentWeight < 20 || currentWeight > 300)) {
        showToast('Please enter a realistic current weight in kg (20-300).', 'warning');
        return;
    }

    let clients = Storage.getClients();

    if (id) {
        // Edit existing
        const index = clients.findIndex(c => c.id === id);
        if (index !== -1) {
            clients[index] = {
                ...clients[index],
                name, age, gender, phone, email, height, currentWeight, targetWeight,
                goal, preferences, allergies, activityLevel, notes
            };
            Storage.saveClients(clients);
            showToast(`Client ${name} updated successfully!`);
        }
    } else {
        // Create new
        const newId = Storage.generateId('CLI-', clients);
        const newClient = {
            id: newId,
            name, age, gender, phone, email, height, currentWeight, targetWeight,
            goal, preferences, allergies, activityLevel, notes,
            createdAt: getTodayISO()
        };
        clients.push(newClient);
        Storage.saveClients(clients);
        showToast(`Client ${name} registered successfully with ID ${newId}!`);
    }

    closeClientModal();
    clients = Storage.getClients();
    updateClientsOverview(clients);
    renderClientsTable(clients);
}

function editClient(id) {
    const client = Storage.getClientById(id);
    if (client) {
        openClientModal(client);
    }
}

function deleteClientPrompt(id) {
    const client = Storage.getClientById(id);
    if (!client) return;

    showConfirmDialog(
        'Delete Client',
        `Are you sure you want to permanently delete "${client.name}" (${client.id})? All connected consultation records, meal plans, and follow-ups will also be safely removed.`,
        () => {
            Storage.deleteClientSafely(id);
            showToast(`Client ${client.name} and associated records deleted.`, 'danger');
            const clients = Storage.getClients();
            updateClientsOverview(clients);
            renderClientsTable(clients);
        }
    );
}

// Client Detailed Profile Modal
function viewClientProfile(id) {
    const client = Storage.getClientById(id);
    if (!client) {
        showToast('Client profile not found.', 'danger');
        return;
    }

    const modal = document.getElementById('clientProfileModal');
    if (!modal) return;

    // Body measurements BMI
    const bmiData = calculateBMI(client.currentWeight, client.height);

    // Consultations for this client
    const consultations = Storage.getConsultations().filter(c => c.clientId === client.id);

    // Active meal plan
    const mealPlans = Storage.getMealPlans().filter(m => m.clientId === client.id);
    const activePlan = mealPlans.length > 0 ? mealPlans[mealPlans.length - 1] : null;

    // Follow-ups for this client
    const followUps = Storage.getFollowUps().filter(f => f.clientId === client.id);

    const profileBody = document.getElementById('clientProfileModalBody');
    profileBody.innerHTML = `
        <div class="detail-banner">
            <div>
                <div class="detail-banner-name">${escapeHtml(client.name)}</div>
                <div style="font-size:0.85rem; color:var(--text-secondary); margin-top:2px;">
                    ${client.age} years old &bull; ${escapeHtml(client.gender)} &bull; Registered ${formatDate(client.createdAt)}
                </div>
            </div>
            <div style="text-align:right;">
                <div class="detail-banner-id">${client.id}</div>
                <button class="btn btn-secondary btn-sm" style="margin-top:6px;" onclick="closeClientProfileModal(); editClient('${client.id}');">Edit Profile</button>
            </div>
        </div>

        <!-- 1. Personal & Contact Information -->
        <h4 class="form-section-title">1. Personal & Contact Information</h4>
        <div class="detail-grid">
            <div class="detail-item">
                <span class="detail-label">Phone Number</span>
                <span class="detail-value">${escapeHtml(client.phone || 'N/A')}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">Email Address</span>
                <span class="detail-value">${escapeHtml(client.email || 'N/A')}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">Activity Level</span>
                <span class="detail-value">${escapeHtml(client.activityLevel || 'N/A')}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">Gender / Pronouns</span>
                <span class="detail-value">${escapeHtml(client.gender || 'N/A')}</span>
            </div>
        </div>

        <!-- 2. Body Measurements -->
        <h4 class="form-section-title" style="margin-top:20px;">2. Body Measurements & BMI</h4>
        <div class="detail-grid">
            <div class="detail-item">
                <span class="detail-label">Height</span>
                <span class="detail-value">${client.height ? `${client.height} cm` : 'N/A'}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">Current Weight</span>
                <span class="detail-value">${client.currentWeight ? `${client.currentWeight} kg` : 'N/A'}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">Target Weight</span>
                <span class="detail-value">${client.targetWeight ? `${client.targetWeight} kg` : 'N/A'}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">Body Mass Index (BMI)</span>
                <span class="detail-value">${bmiData.bmi} &nbsp;<small style="color:var(--primary-accent); font-weight:600;">(${bmiData.category})</small></span>
            </div>
        </div>

        <!-- 3. Nutrition Goals -->
        <h4 class="form-section-title" style="margin-top:20px;">3. Main Nutrition Goal</h4>
        <p style="color:var(--text-main); font-weight:500;">${escapeHtml(client.goal || 'General Health & Nutrition Maintenance')}</p>

        <!-- 4. Food Preferences and Allergies -->
        <h4 class="form-section-title" style="margin-top:20px;">4. Food Preferences & Allergies</h4>
        <div class="detail-grid">
            <div class="detail-item">
                <span class="detail-label">Food Preferences</span>
                <span class="detail-value">${escapeHtml(client.preferences || 'No specific restrictions noted.')}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">Known Allergies / Intolerances</span>
                <span class="detail-value" style="color:var(--status-danger); font-weight:600;">${escapeHtml(client.allergies || 'None reported')}</span>
            </div>
        </div>

        <!-- 5. Consultation History -->
        <h4 class="form-section-title" style="margin-top:20px;">5. Consultation History (${consultations.length})</h4>
        ${consultations.length === 0 ? '<p style="font-size:0.86rem; color:var(--text-secondary);">No consultation records found for this client.</p>' : `
            <div class="table-responsive" style="margin-top:8px;">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Weight</th>
                            <th>Main Concerns</th>
                            <th>Next Visit</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${consultations.map(con => `
                            <tr>
                                <td><strong>${formatDate(con.date)}</strong></td>
                                <td>${con.currentWeight ? `${con.currentWeight} kg` : 'N/A'}</td>
                                <td>${escapeHtml(con.concerns || 'Routine check')}</td>
                                <td>${con.nextDate ? formatDate(con.nextDate) : 'TBD'}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `}

        <!-- 6. Current Meal Plan -->
        <h4 class="form-section-title" style="margin-top:20px;">6. Current Meal Plan</h4>
        ${!activePlan ? '<p style="font-size:0.86rem; color:var(--text-secondary);">No active meal plan assigned. <a href="meal-plans.html?action=new&client=' + client.id + '">+ Create Meal Plan</a></p>' : `
            <div style="background-color:#FAF8F5; border:1px solid var(--border-color); border-radius:var(--radius-sm); padding:14px;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                    <strong style="color:var(--primary-accent); font-size:1rem;">${escapeHtml(activePlan.name)}</strong>
                    <span style="font-size:0.8rem; color:var(--text-secondary);">${formatDate(activePlan.startDate)} – ${formatDate(activePlan.endDate)}</span>
                </div>
                <div style="font-size:0.85rem; line-height:1.6;">
                    <div><strong>Breakfast:</strong> ${escapeHtml(activePlan.breakfast)}</div>
                    <div><strong>Lunch:</strong> ${escapeHtml(activePlan.lunch)}</div>
                    <div><strong>Dinner:</strong> ${escapeHtml(activePlan.dinner)}</div>
                    <div><strong>Water Intake:</strong> ${escapeHtml(activePlan.waterIntake || '2-3 Litres')}</div>
                </div>
            </div>
        `}

        <!-- 7. Follow-up History -->
        <h4 class="form-section-title" style="margin-top:20px;">7. Follow-up History (${followUps.length})</h4>
        ${followUps.length === 0 ? '<p style="font-size:0.86rem; color:var(--text-secondary);">No follow-ups recorded.</p>' : `
            <div class="table-responsive" style="margin-top:8px;">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Type</th>
                            <th>Status</th>
                            <th>Notes</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${followUps.map(f => {
                            const meta = getFollowUpStatus(f);
                            return `
                                <tr>
                                    <td>${formatDate(f.date)}</td>
                                    <td>${escapeHtml(f.type)}</td>
                                    <td><span class="status-badge ${meta.cls}">${meta.label}</span></td>
                                    <td>${escapeHtml(f.notes || '—')}</td>
                                </tr>
                            `;
                        }).join('')}
                    </tbody>
                </table>
            </div>
        `}

        <!-- 8. Nutritionist Notes -->
        <h4 class="form-section-title" style="margin-top:20px;">8. Nutritionist Clinical Notes</h4>
        <div style="background:#FAF7F2; border-left:3px solid var(--secondary-accent); padding:10px 14px; border-radius:var(--radius-sm); font-size:0.88rem; color:var(--text-main);">
            ${escapeHtml(client.notes || 'No confidential clinical observations recorded.')}
        </div>
    `;

    modal.classList.add('active');
}

function closeClientProfileModal() {
    const modal = document.getElementById('clientProfileModal');
    if (modal) modal.classList.remove('active');
}

// =============================================================================
// 6. PAGE 3: CONSULTATION RECORDS (consultations.html)
// =============================================================================

function initConsultationsPage() {
    let consultations = Storage.getConsultations();
    const clients = Storage.getClients();

    // 1. Overview counts
    updateConsultationsOverview(consultations);

    // 2. Populate client dropdown in add/edit modal
    populateClientSelect('consultationClientId', clients);
    populateClientSelect('consultationFilterClient', clients, true);

    // 3. Render table
    renderConsultationsTable(consultations);

    // 4. Form submission
    const form = document.getElementById('consultationForm');
    if (form) {
        form.addEventListener('submit', handleConsultationFormSubmit);
    }

    // 5. Search & Filter listeners
    const searchInput = document.getElementById('consultationSearchInput');
    const filterSelect = document.getElementById('consultationFilterClient');

    const applyFilter = () => {
        const query = (searchInput ? searchInput.value : '').toLowerCase().trim();
        const selectedClient = filterSelect ? filterSelect.value : '';

        const filtered = consultations.filter(con => {
            const client = Storage.getClientById(con.clientId);
            const clientName = client ? client.name.toLowerCase() : '';
            const matchQuery = !query || 
                (con.id && con.id.toLowerCase().includes(query)) ||
                (con.concerns && con.concerns.toLowerCase().includes(query)) ||
                clientName.includes(query);

            const matchClient = !selectedClient || con.clientId === selectedClient;
            return matchQuery && matchClient;
        });
        renderConsultationsTable(filtered);
    };

    if (searchInput) searchInput.addEventListener('input', applyFilter);
    if (filterSelect) filterSelect.addEventListener('change', applyFilter);

    // 6. Check URL parameters
    const params = new URLSearchParams(window.location.search);
    if (params.get('action') === 'new') {
        openConsultationModal(null, params.get('client'));
    } else if (params.get('view')) {
        viewConsultationDetails(params.get('view'));
    }
}

function updateConsultationsOverview(consultations) {
    const totalEl = document.getElementById('totalConsultationsCount');
    const thisMonthEl = document.getElementById('thisMonthConsultationsCount');
    const upcomingEl = document.getElementById('upcomingConsultationsCount');

    if (totalEl) totalEl.textContent = consultations.length;

    // This month
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();
    const thisMonthCount = consultations.filter(con => {
        if (!con.date) return false;
        const d = new Date(con.date);
        return d.getFullYear() === currentYear && d.getMonth() === currentMonth;
    }).length;
    if (thisMonthEl) thisMonthEl.textContent = thisMonthCount;

    // Upcoming (next consultation date >= today)
    const todayStr = getTodayISO();
    const upcomingCount = consultations.filter(con => con.nextDate && con.nextDate >= todayStr).length;
    if (upcomingEl) upcomingEl.textContent = upcomingCount;
}

function populateClientSelect(selectId, clients, isFilter = false) {
    const select = document.getElementById(selectId);
    if (!select) return;

    const currentVal = select.value;
    select.innerHTML = isFilter 
        ? '<option value="">All Clients</option>'
        : '<option value="">-- Choose a Client --</option>';

    clients.forEach(c => {
        const opt = document.createElement('option');
        opt.value = c.id;
        opt.textContent = `${c.name} (${c.id})`;
        select.appendChild(opt);
    });

    if (currentVal) select.value = currentVal;
}

function renderConsultationsTable(list) {
    const tbody = document.getElementById('consultationsTableBody');
    if (!tbody) return;

    if (list.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="7" class="empty-state">
                    <p>No consultation records found. Click "+ Add Consultation" to log a visit.</p>
                </td>
            </tr>
        `;
        return;
    }

    // Sort newest date first
    const sorted = [...list].sort((a, b) => new Date(b.date) - new Date(a.date));

    tbody.innerHTML = sorted.map(con => {
        const client = Storage.getClientById(con.clientId);
        const clientName = client ? client.name : (con.clientId || 'Unknown');

        return `
            <tr>
                <td><strong>${con.id}</strong></td>
                <td><strong>${escapeHtml(clientName)}</strong></td>
                <td>${formatDate(con.date)}</td>
                <td>${con.currentWeight ? `${con.currentWeight} kg` : '—'}</td>
                <td><span style="font-size:0.84rem; color:var(--text-secondary);">${escapeHtml(con.concerns || '—')}</span></td>
                <td>${con.nextDate ? formatDate(con.nextDate) : 'Not scheduled'}</td>
                <td>
                    <div class="table-actions">
                        <button class="btn btn-peach btn-sm" onclick="viewConsultationDetails('${con.id}')">View</button>
                        <button class="btn btn-secondary btn-sm" onclick="editConsultation('${con.id}')">Edit</button>
                        <button class="btn btn-danger btn-sm" onclick="deleteConsultationPrompt('${con.id}')">Delete</button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

function openConsultationModal(consultationToEdit = null, preselectedClientId = null) {
    const modal = document.getElementById('consultationModal');
    const form = document.getElementById('consultationForm');
    const title = document.getElementById('consultationModalTitle');
    if (!modal || !form) return;

    form.reset();
    document.getElementById('consultationId').value = '';

    // Auto set date to today if new
    document.getElementById('consultationDate').value = getTodayISO();

    if (consultationToEdit) {
        title.textContent = `Edit Consultation – ${consultationToEdit.id}`;
        document.getElementById('consultationId').value = consultationToEdit.id;
        document.getElementById('consultationClientId').value = consultationToEdit.clientId || '';
        document.getElementById('consultationDate').value = consultationToEdit.date || getTodayISO();
        document.getElementById('consultationPrevWeight').value = consultationToEdit.prevWeight || '';
        document.getElementById('consultationCurrentWeight').value = consultationToEdit.currentWeight || '';
        document.getElementById('consultationConcerns').value = consultationToEdit.concerns || '';
        document.getElementById('consultationHabits').value = consultationToEdit.habits || '';
        document.getElementById('consultationProgress').value = consultationToEdit.progress || '';
        document.getElementById('consultationObservations').value = consultationToEdit.observations || '';
        document.getElementById('consultationRecommendations').value = consultationToEdit.recommendations || '';
        document.getElementById('consultationNextDate').value = consultationToEdit.nextDate || '';
    } else {
        title.textContent = 'Add Consultation';
        if (preselectedClientId) {
            document.getElementById('consultationClientId').value = preselectedClientId;
            // Auto fill previous weight from client record
            const client = Storage.getClientById(preselectedClientId);
            if (client && client.currentWeight) {
                document.getElementById('consultationPrevWeight').value = client.currentWeight;
            }
        }
    }

    modal.classList.add('active');
}

function closeConsultationModal() {
    const modal = document.getElementById('consultationModal');
    if (modal) modal.classList.remove('active');
}

function handleConsultationFormSubmit(e) {
    e.preventDefault();
    const id = document.getElementById('consultationId').value.trim();
    const clientId = document.getElementById('consultationClientId').value;
    const date = document.getElementById('consultationDate').value;
    const prevWeight = parseFloat(document.getElementById('consultationPrevWeight').value) || null;
    const currentWeight = parseFloat(document.getElementById('consultationCurrentWeight').value) || null;
    const concerns = document.getElementById('consultationConcerns').value.trim();
    const habits = document.getElementById('consultationHabits').value.trim();
    const progress = document.getElementById('consultationProgress').value.trim();
    const observations = document.getElementById('consultationObservations').value.trim();
    const recommendations = document.getElementById('consultationRecommendations').value.trim();
    const nextDate = document.getElementById('consultationNextDate').value;

    if (!clientId) {
        showToast('Please select a client.', 'warning');
        return;
    }
    if (!date) {
        showToast('Please specify the consultation date.', 'warning');
        return;
    }

    let consultations = Storage.getConsultations();
    let clients = Storage.getClients();

    if (id) {
        // Edit existing
        const index = consultations.findIndex(c => c.id === id);
        if (index !== -1) {
            consultations[index] = {
                ...consultations[index],
                clientId, date, prevWeight, currentWeight,
                concerns, habits, progress, observations, recommendations, nextDate
            };
            Storage.saveConsultations(consultations);
            showToast('Consultation record updated successfully!');
        }
    } else {
        // Create new
        const newId = Storage.generateId('CON-', consultations);
        const newRecord = {
            id: newId,
            clientId, date, prevWeight, currentWeight,
            concerns, habits, progress, observations, recommendations, nextDate
        };
        consultations.push(newRecord);
        Storage.saveConsultations(consultations);

        // Update client currentWeight if entered
        if (currentWeight) {
            const clientIndex = clients.findIndex(c => c.id === clientId);
            if (clientIndex !== -1) {
                clients[clientIndex].currentWeight = currentWeight;
                Storage.saveClients(clients);
            }
        }

        showToast(`Consultation record saved as ${newId}!`);
    }

    closeConsultationModal();
    consultations = Storage.getConsultations();
    updateConsultationsOverview(consultations);
    renderConsultationsTable(consultations);
}

function editConsultation(id) {
    const list = Storage.getConsultations();
    const item = list.find(c => c.id === id);
    if (item) {
        openConsultationModal(item);
    }
}

function deleteConsultationPrompt(id) {
    showConfirmDialog(
        'Delete Consultation Record',
        `Are you sure you want to delete consultation record ${id}?`,
        () => {
            let consultations = Storage.getConsultations().filter(c => c.id !== id);
            Storage.saveConsultations(consultations);
            showToast(`Consultation ${id} deleted.`, 'danger');
            updateConsultationsOverview(consultations);
            renderConsultationsTable(consultations);
        }
    );
}

function viewConsultationDetails(id) {
    const con = Storage.getConsultations().find(c => c.id === id);
    if (!con) {
        showToast('Consultation record not found.', 'danger');
        return;
    }

    const client = Storage.getClientById(con.clientId);
    const clientName = client ? client.name : (con.clientId || 'Unknown');

    const modal = document.getElementById('consultationViewModal');
    if (!modal) return;

    const body = document.getElementById('consultationViewModalBody');
    body.innerHTML = `
        <div class="detail-banner">
            <div>
                <div class="detail-banner-name">${escapeHtml(clientName)}</div>
                <div style="font-size:0.85rem; color:var(--text-secondary); margin-top:2px;">
                    Consultation Visit on ${formatDate(con.date)}
                </div>
            </div>
            <div style="text-align:right;">
                <div class="detail-banner-id">${con.id}</div>
                <button class="btn btn-secondary btn-sm" style="margin-top:6px;" onclick="closeConsultationViewModal(); editConsultation('${con.id}');">Edit Visit</button>
            </div>
        </div>

        <div class="detail-grid">
            <div class="detail-item">
                <span class="detail-label">Previous Weight</span>
                <span class="detail-value">${con.prevWeight ? `${con.prevWeight} kg` : 'N/A'}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">Current Weight</span>
                <span class="detail-value" style="color:var(--primary-accent); font-weight:700;">${con.currentWeight ? `${con.currentWeight} kg` : 'N/A'}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">Next Scheduled Appointment</span>
                <span class="detail-value">${con.nextDate ? formatDate(con.nextDate) : 'Not scheduled'}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">Client ID</span>
                <span class="detail-value">${con.clientId}</span>
            </div>
        </div>

        <h4 class="form-section-title" style="margin-top:20px;">Main Concerns Discussed</h4>
        <p style="color:var(--text-main); font-size:0.92rem;">${escapeHtml(con.concerns || 'Routine check-in')}</p>

        <h4 class="form-section-title" style="margin-top:16px;">Current Eating Habits & Lifestyle</h4>
        <p style="color:var(--text-main); font-size:0.92rem;">${escapeHtml(con.habits || 'Standard dietary schedule.')}</p>

        <h4 class="form-section-title" style="margin-top:16px;">Progress Observed Since Last Visit</h4>
        <p style="color:var(--text-main); font-size:0.92rem;">${escapeHtml(con.progress || 'Positive ongoing trajectory.')}</p>

        <h4 class="form-section-title" style="margin-top:16px;">Nutritionist Clinical Observations</h4>
        <div style="background:#FAF8F5; border-left:3px solid var(--secondary-accent); padding:10px 14px; border-radius:var(--radius-sm); font-size:0.88rem;">
            ${escapeHtml(con.observations || 'No specific pathological markers observed.')}
        </div>

        <h4 class="form-section-title" style="margin-top:16px;">Recommendations & Interventions</h4>
        <div style="background:var(--primary-light); border:1px solid var(--beige); padding:12px 16px; border-radius:var(--radius-sm); font-size:0.9rem; color:var(--text-main);">
            ${escapeHtml(con.recommendations || 'Follow daily balanced whole-food meal schedule.')}
        </div>
    `;

    modal.classList.add('active');
}

function closeConsultationViewModal() {
    const modal = document.getElementById('consultationViewModal');
    if (modal) modal.classList.remove('active');
}

// =============================================================================
// 7. PAGE 4: MEAL PLAN MANAGEMENT (meal-plans.html)
// =============================================================================

function initMealPlansPage() {
    let mealPlans = Storage.getMealPlans();
    const clients = Storage.getClients();

    // 1. Overview counts
    updateMealPlansOverview(mealPlans);

    // 2. Populate client dropdown
    populateClientSelect('mealPlanClientId', clients);

    // 3. Render table
    renderMealPlansTable(mealPlans);

    // 4. Form submission
    const form = document.getElementById('mealPlanForm');
    if (form) {
        form.addEventListener('submit', handleMealPlanFormSubmit);
    }

    // 5. Search
    const searchInput = document.getElementById('mealPlanSearchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            const filtered = mealPlans.filter(p => {
                const client = Storage.getClientById(p.clientId);
                const clientName = client ? client.name.toLowerCase() : '';
                return (p.name && p.name.toLowerCase().includes(query)) ||
                       (p.id && p.id.toLowerCase().includes(query)) ||
                       clientName.includes(query);
            });
            renderMealPlansTable(filtered);
        });
    }

    // 6. Check URL parameters
    const params = new URLSearchParams(window.location.search);
    if (params.get('action') === 'new') {
        openMealPlanModal(null, params.get('client'));
    } else if (params.get('view')) {
        viewMealPlanDetails(params.get('view'));
    }
}

function updateMealPlansOverview(plans) {
    const totalEl = document.getElementById('totalMealPlansCount');
    const activeEl = document.getElementById('activeMealPlansCount');
    const completedEl = document.getElementById('completedMealPlansCount');

    if (totalEl) totalEl.textContent = plans.length;

    const todayStr = getTodayISO();
    const activeCount = plans.filter(p => (!p.endDate || p.endDate >= todayStr) && (!p.startDate || p.startDate <= todayStr)).length;
    const completedCount = plans.filter(p => p.endDate && p.endDate < todayStr).length;

    if (activeEl) activeEl.textContent = activeCount;
    if (completedEl) completedEl.textContent = completedCount;
}

function renderMealPlansTable(list) {
    const tbody = document.getElementById('mealPlansTableBody');
    if (!tbody) return;

    if (list.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="7" class="empty-state">
                    <p>No meal plans created yet. Click "+ Create Meal Plan" to design a nutrition guide.</p>
                </td>
            </tr>
        `;
        return;
    }

    tbody.innerHTML = list.map(plan => {
        const client = Storage.getClientById(plan.clientId);
        const clientName = client ? client.name : (plan.clientId || 'Unknown');
        const statusMeta = getPlanStatus(plan.startDate, plan.endDate);

        return `
            <tr>
                <td><strong>${plan.id}</strong></td>
                <td><strong>${escapeHtml(clientName)}</strong></td>
                <td>${escapeHtml(plan.name)}</td>
                <td>${formatDate(plan.startDate)}</td>
                <td>${formatDate(plan.endDate)}</td>
                <td><span class="status-badge ${statusMeta.cls}">${statusMeta.label}</span></td>
                <td>
                    <div class="table-actions">
                        <button class="btn btn-peach btn-sm" onclick="viewMealPlanDetails('${plan.id}')">View</button>
                        <button class="btn btn-secondary btn-sm" onclick="editMealPlan('${plan.id}')">Edit</button>
                        <button class="btn btn-danger btn-sm" onclick="deleteMealPlanPrompt('${plan.id}')">Delete</button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

function openMealPlanModal(planToEdit = null, preselectedClientId = null) {
    const modal = document.getElementById('mealPlanModal');
    const form = document.getElementById('mealPlanForm');
    const title = document.getElementById('mealPlanModalTitle');
    if (!modal || !form) return;

    form.reset();
    document.getElementById('mealPlanId').value = '';

    // Defaults
    const today = getTodayISO();
    const nextMonth = new Date();
    nextMonth.setDate(nextMonth.getDate() + 30);
    const nextMonthStr = nextMonth.toISOString().split('T')[0];

    document.getElementById('mealPlanStartDate').value = today;
    document.getElementById('mealPlanEndDate').value = nextMonthStr;
    document.getElementById('mealPlanWater').value = '2.5 to 3.0 Litres daily';

    if (planToEdit) {
        title.textContent = `Edit Meal Plan – ${planToEdit.name}`;
        document.getElementById('mealPlanId').value = planToEdit.id;
        document.getElementById('mealPlanClientId').value = planToEdit.clientId || '';
        document.getElementById('mealPlanName').value = planToEdit.name || '';
        document.getElementById('mealPlanStartDate').value = planToEdit.startDate || today;
        document.getElementById('mealPlanEndDate').value = planToEdit.endDate || nextMonthStr;
        document.getElementById('mealPlanBreakfast').value = planToEdit.breakfast || '';
        document.getElementById('mealPlanMorningSnack').value = planToEdit.morningSnack || '';
        document.getElementById('mealPlanLunch').value = planToEdit.lunch || '';
        document.getElementById('mealPlanEveningSnack').value = planToEdit.eveningSnack || '';
        document.getElementById('mealPlanDinner').value = planToEdit.dinner || '';
        document.getElementById('mealPlanWater').value = planToEdit.waterIntake || '';
        document.getElementById('mealPlanInstructions').value = planToEdit.instructions || '';
    } else {
        title.textContent = 'Create Meal Plan';
        if (preselectedClientId) {
            document.getElementById('mealPlanClientId').value = preselectedClientId;
        }
    }

    modal.classList.add('active');
}

function closeMealPlanModal() {
    const modal = document.getElementById('mealPlanModal');
    if (modal) modal.classList.remove('active');
}

function handleMealPlanFormSubmit(e) {
    e.preventDefault();
    const id = document.getElementById('mealPlanId').value.trim();
    const clientId = document.getElementById('mealPlanClientId').value;
    const name = document.getElementById('mealPlanName').value.trim();
    const startDate = document.getElementById('mealPlanStartDate').value;
    const endDate = document.getElementById('mealPlanEndDate').value;
    const breakfast = document.getElementById('mealPlanBreakfast').value.trim();
    const morningSnack = document.getElementById('mealPlanMorningSnack').value.trim();
    const lunch = document.getElementById('mealPlanLunch').value.trim();
    const eveningSnack = document.getElementById('mealPlanEveningSnack').value.trim();
    const dinner = document.getElementById('mealPlanDinner').value.trim();
    const waterIntake = document.getElementById('mealPlanWater').value.trim();
    const instructions = document.getElementById('mealPlanInstructions').value.trim();

    if (!clientId) {
        showToast('Please select a client for this meal plan.', 'warning');
        return;
    }
    if (!name) {
        showToast('Please enter a meal plan title.', 'warning');
        return;
    }
    if (!startDate || !endDate) {
        showToast('Please set both start and end dates.', 'warning');
        return;
    }
    if (endDate < startDate) {
        showToast('Plan end date cannot be earlier than start date.', 'danger');
        return;
    }

    let plans = Storage.getMealPlans();

    if (id) {
        // Edit existing
        const index = plans.findIndex(p => p.id === id);
        if (index !== -1) {
            plans[index] = {
                ...plans[index],
                clientId, name, startDate, endDate,
                breakfast, morningSnack, lunch, eveningSnack, dinner,
                waterIntake, instructions
            };
            Storage.saveMealPlans(plans);
            showToast('Meal plan updated successfully!');
        }
    } else {
        // Create new
        const newId = Storage.generateId('PLN-', plans);
        const newPlan = {
            id: newId,
            clientId, name, startDate, endDate,
            breakfast, morningSnack, lunch, eveningSnack, dinner,
            waterIntake, instructions
        };
        plans.push(newPlan);
        Storage.saveMealPlans(plans);
        showToast(`Meal plan "${name}" created successfully as ${newId}!`);
    }

    closeMealPlanModal();
    plans = Storage.getMealPlans();
    updateMealPlansOverview(plans);
    renderMealPlansTable(plans);
}

function editMealPlan(id) {
    const list = Storage.getMealPlans();
    const plan = list.find(p => p.id === id);
    if (plan) {
        openMealPlanModal(plan);
    }
}

function deleteMealPlanPrompt(id) {
    showConfirmDialog(
        'Delete Meal Plan',
        `Are you sure you want to delete meal plan ${id}?`,
        () => {
            let plans = Storage.getMealPlans().filter(p => p.id !== id);
            Storage.saveMealPlans(plans);
            showToast(`Meal plan ${id} deleted.`, 'danger');
            updateMealPlansOverview(plans);
            renderMealPlansTable(plans);
        }
    );
}

function viewMealPlanDetails(id) {
    const plan = Storage.getMealPlans().find(p => p.id === id);
    if (!plan) {
        showToast('Meal plan not found.', 'danger');
        return;
    }

    const client = Storage.getClientById(plan.clientId);
    const clientName = client ? client.name : (plan.clientId || 'Unknown');
    const statusMeta = getPlanStatus(plan.startDate, plan.endDate);

    const modal = document.getElementById('mealPlanViewModal');
    if (!modal) return;

    const body = document.getElementById('mealPlanViewModalBody');
    body.innerHTML = `
        <div class="detail-banner">
            <div>
                <div class="detail-banner-name">${escapeHtml(plan.name)}</div>
                <div style="font-size:0.85rem; color:var(--text-secondary); margin-top:3px;">
                    Assigned to <strong>${escapeHtml(clientName)}</strong> &bull; ${formatDate(plan.startDate)} to ${formatDate(plan.endDate)}
                </div>
            </div>
            <div style="text-align:right;">
                <span class="status-badge ${statusMeta.cls}" style="margin-bottom:6px;">${statusMeta.label}</span>
                <br>
                <button class="btn btn-secondary btn-sm" onclick="closeMealPlanViewModal(); editMealPlan('${plan.id}');">Edit Plan</button>
            </div>
        </div>

        <h4 class="form-section-title">Daily Meal Schedule</h4>
        <div class="meal-schedule-view">
            <div class="meal-block">
                <div class="meal-block-header">
                    <span>BREAKFAST</span>
                    <span>7:30 AM – 8:30 AM</span>
                </div>
                <div class="meal-block-content">${escapeHtml(plan.breakfast || 'Nutritious breakfast options as per dietary preferences.')}</div>
            </div>

            <div class="meal-block">
                <div class="meal-block-header">
                    <span>MORNING SNACK</span>
                    <span>10:30 AM – 11:00 AM</span>
                </div>
                <div class="meal-block-content">${escapeHtml(plan.morningSnack || 'Fresh whole fruit or nuts.')}</div>
            </div>

            <div class="meal-block">
                <div class="meal-block-header">
                    <span>LUNCH</span>
                    <span>1:00 PM – 2:00 PM</span>
                </div>
                <div class="meal-block-content">${escapeHtml(plan.lunch || 'Balanced protein, fiber-rich vegetables, and whole complex carbs.')}</div>
            </div>

            <div class="meal-block">
                <div class="meal-block-header">
                    <span>EVENING SNACK</span>
                    <span>4:30 PM – 5:30 PM</span>
                </div>
                <div class="meal-block-content">${escapeHtml(plan.eveningSnack || 'Light roasted seeds or herbal beverage.')}</div>
            </div>

            <div class="meal-block">
                <div class="meal-block-header">
                    <span>DINNER</span>
                    <span>7:30 PM – 8:30 PM</span>
                </div>
                <div class="meal-block-content">${escapeHtml(plan.dinner || 'Light easily digestible dinner soup, vegetables, and lean protein.')}</div>
            </div>
        </div>

        <h4 class="form-section-title" style="margin-top:20px;">Hydration & Daily Target</h4>
        <div style="background-color:var(--primary-light); border:1px solid var(--beige); border-radius:var(--radius-sm); padding:12px 16px; font-weight:600; color:var(--text-main);">
            💧 Daily Water Target: ${escapeHtml(plan.waterIntake || '2.5 to 3.0 Litres per day')}
        </div>

        <h4 class="form-section-title" style="margin-top:20px;">Personalized Instructions & Food Guidelines</h4>
        <div style="background:#FAF8F5; border-left:3px solid var(--primary-accent); padding:12px 16px; border-radius:var(--radius-sm); font-size:0.9rem; line-height:1.6;">
            ${escapeHtml(plan.instructions || 'Follow portion balance. Chew food thoroughly. Avoid carbonated or sugary beverages.')}
        </div>

        <div class="notice-disclaimer">
            Note: These nutritional guidelines are customized sample food examples designed by a qualified nutritionist. This plan does not claim to treat or cure medical conditions.
        </div>
    `;

    modal.classList.add('active');
}

function closeMealPlanViewModal() {
    const modal = document.getElementById('mealPlanViewModal');
    if (modal) modal.classList.remove('active');
}

// =============================================================================
// 8. PAGE 5: FOLLOW-UP MANAGEMENT (follow-ups.html)
// =============================================================================

function initFollowUpsPage() {
    let followUps = Storage.getFollowUps();
    const clients = Storage.getClients();

    // 1. Overview counts
    updateFollowUpsOverview(followUps);

    // 2. Populate client dropdown
    populateClientSelect('followUpClientId', clients);

    // 3. Render table
    renderFollowUpsTable(followUps);

    // 4. Form submission
    const form = document.getElementById('followUpForm');
    if (form) {
        form.addEventListener('submit', handleFollowUpFormSubmit);
    }

    // 5. Tabs / Status Filters
    const tabButtons = document.querySelectorAll('.tabs-nav .tab-btn');
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            tabButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.dataset.statusFilter;
            applyFollowUpFilter(filter);
        });
    });

    // 6. Search
    const searchInput = document.getElementById('followUpSearchInput');
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            const activeTab = document.querySelector('.tabs-nav .tab-btn.active');
            const filter = activeTab ? activeTab.dataset.statusFilter : 'all';
            applyFollowUpFilter(filter);
        });
    }

    // 7. Check URL parameters
    const params = new URLSearchParams(window.location.search);
    if (params.get('action') === 'new') {
        openFollowUpModal(null, params.get('client'));
    } else if (params.get('view')) {
        viewFollowUpDetails(params.get('view'));
    }
}

function updateFollowUpsOverview(followUps) {
    const upcomingEl = document.getElementById('upcomingFollowUpsCount');
    const completedEl = document.getElementById('completedFollowUpsCount');
    const missedEl = document.getElementById('missedFollowUpsCount');

    const todayStr = getTodayISO();

    const upcoming = followUps.filter(f => f.status === 'Scheduled' && (!f.date || f.date >= todayStr)).length;
    const completed = followUps.filter(f => f.status === 'Completed').length;
    const missed = followUps.filter(f => f.status === 'Missed' || (f.status === 'Scheduled' && f.date && f.date < todayStr)).length;

    if (upcomingEl) upcomingEl.textContent = upcoming;
    if (completedEl) completedEl.textContent = completed;
    if (missedEl) missedEl.textContent = missed;
}

function applyFollowUpFilter(statusFilter) {
    const followUps = Storage.getFollowUps();
    const searchInput = document.getElementById('followUpSearchInput');
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const todayStr = getTodayISO();

    const filtered = followUps.filter(f => {
        const client = Storage.getClientById(f.clientId);
        const clientName = client ? client.name.toLowerCase() : '';
        const matchSearch = !query || 
            (f.id && f.id.toLowerCase().includes(query)) ||
            (f.reason && f.reason.toLowerCase().includes(query)) ||
            (f.type && f.type.toLowerCase().includes(query)) ||
            clientName.includes(query);

        if (!matchSearch) return false;

        if (statusFilter === 'all') return true;
        if (statusFilter === 'upcoming') {
            return f.status === 'Scheduled' && (!f.date || f.date >= todayStr);
        }
        if (statusFilter === 'completed') {
            return f.status === 'Completed';
        }
        if (statusFilter === 'missed') {
            return f.status === 'Missed' || (f.status === 'Scheduled' && f.date && f.date < todayStr);
        }
        return true;
    });

    renderFollowUpsTable(filtered);
}

function renderFollowUpsTable(list) {
    const tbody = document.getElementById('followUpsTableBody');
    if (!tbody) return;

    if (list.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="8" class="empty-state">
                    <p>No follow-up records found. Click "+ Schedule Follow-up" to book a check-in.</p>
                </td>
            </tr>
        `;
        return;
    }

    // Sort by date
    const sorted = [...list].sort((a, b) => new Date(a.date) - new Date(b.date));

    tbody.innerHTML = sorted.map(f => {
        const client = Storage.getClientById(f.clientId);
        const clientName = client ? client.name : (f.clientId || 'Unknown');
        const statusMeta = getFollowUpStatus(f);

        return `
            <tr>
                <td><strong>${f.id}</strong></td>
                <td><strong>${escapeHtml(clientName)}</strong></td>
                <td>${formatDate(f.date)}</td>
                <td>${escapeHtml(f.type || 'Review')}</td>
                <td>${f.prevWeight ? `${f.prevWeight} kg` : '—'}</td>
                <td>${f.currentWeight ? `${f.currentWeight} kg` : '—'}</td>
                <td><span class="status-badge ${statusMeta.cls}">${statusMeta.label}</span></td>
                <td>
                    <div class="table-actions">
                        <button class="btn btn-peach btn-sm" onclick="viewFollowUpDetails('${f.id}')">View</button>
                        <button class="btn btn-secondary btn-sm" onclick="editFollowUp('${f.id}')">Edit</button>
                        <button class="btn btn-secondary btn-sm" onclick="toggleFollowUpStatusPrompt('${f.id}')" title="Quick Status Change">Status</button>
                        <button class="btn btn-danger btn-sm" onclick="deleteFollowUpPrompt('${f.id}')">Delete</button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

function openFollowUpModal(followUpToEdit = null, preselectedClientId = null) {
    const modal = document.getElementById('followUpModal');
    const form = document.getElementById('followUpForm');
    const title = document.getElementById('followUpModalTitle');
    if (!modal || !form) return;

    form.reset();
    document.getElementById('followUpId').value = '';

    // Default date is today + 7 days
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);
    const nextWeekStr = nextWeek.toISOString().split('T')[0];

    document.getElementById('followUpDate').value = nextWeekStr;
    document.getElementById('followUpStatus').value = 'Scheduled';

    if (followUpToEdit) {
        title.textContent = `Edit Follow-up – ${followUpToEdit.id}`;
        document.getElementById('followUpId').value = followUpToEdit.id;
        document.getElementById('followUpClientId').value = followUpToEdit.clientId || '';
        document.getElementById('followUpDate').value = followUpToEdit.date || nextWeekStr;
        document.getElementById('followUpType').value = followUpToEdit.type || 'Weight Progress Review';
        document.getElementById('followUpReason').value = followUpToEdit.reason || '';
        document.getElementById('followUpPrevWeight').value = followUpToEdit.prevWeight || '';
        document.getElementById('followUpCurrentWeight').value = followUpToEdit.currentWeight || '';
        document.getElementById('followUpProgressNotes').value = followUpToEdit.notes || '';
        document.getElementById('followUpNextSteps').value = followUpToEdit.nextSteps || '';
        document.getElementById('followUpStatus').value = followUpToEdit.status || 'Scheduled';
    } else {
        title.textContent = 'Schedule Follow-up';
        if (preselectedClientId) {
            document.getElementById('followUpClientId').value = preselectedClientId;
            const client = Storage.getClientById(preselectedClientId);
            if (client && client.currentWeight) {
                document.getElementById('followUpPrevWeight').value = client.currentWeight;
            }
        }
    }

    modal.classList.add('active');
}

function closeFollowUpModal() {
    const modal = document.getElementById('followUpModal');
    if (modal) modal.classList.remove('active');
}

function handleFollowUpFormSubmit(e) {
    e.preventDefault();
    const id = document.getElementById('followUpId').value.trim();
    const clientId = document.getElementById('followUpClientId').value;
    const date = document.getElementById('followUpDate').value;
    const type = document.getElementById('followUpType').value;
    const reason = document.getElementById('followUpReason').value.trim();
    const prevWeight = parseFloat(document.getElementById('followUpPrevWeight').value) || null;
    const currentWeight = parseFloat(document.getElementById('followUpCurrentWeight').value) || null;
    const notes = document.getElementById('followUpProgressNotes').value.trim();
    const nextSteps = document.getElementById('followUpNextSteps').value.trim();
    const status = document.getElementById('followUpStatus').value;

    if (!clientId) {
        showToast('Please select a client.', 'warning');
        return;
    }
    if (!date) {
        showToast('Please specify the follow-up date.', 'warning');
        return;
    }

    let followUps = Storage.getFollowUps();

    if (id) {
        // Edit existing
        const index = followUps.findIndex(f => f.id === id);
        if (index !== -1) {
            followUps[index] = {
                ...followUps[index],
                clientId, date, type, reason,
                prevWeight, currentWeight, notes, nextSteps, status
            };
            Storage.saveFollowUps(followUps);
            showToast('Follow-up record updated successfully!');
        }
    } else {
        // Create new
        const newId = Storage.generateId('FOL-', followUps);
        const newRecord = {
            id: newId,
            clientId, date, type, reason,
            prevWeight, currentWeight, notes, nextSteps, status
        };
        followUps.push(newRecord);
        Storage.saveFollowUps(followUps);
        showToast(`Follow-up scheduled successfully as ${newId}!`);
    }

    closeFollowUpModal();
    followUps = Storage.getFollowUps();
    updateFollowUpsOverview(followUps);
    const activeTab = document.querySelector('.tabs-nav .tab-btn.active');
    applyFollowUpFilter(activeTab ? activeTab.dataset.statusFilter : 'all');
}

function editFollowUp(id) {
    const list = Storage.getFollowUps();
    const item = list.find(f => f.id === id);
    if (item) {
        openFollowUpModal(item);
    }
}

function toggleFollowUpStatusPrompt(id) {
    const list = Storage.getFollowUps();
    const item = list.find(f => f.id === id);
    if (!item) return;

    const nextStatus = item.status === 'Scheduled' ? 'Completed' : (item.status === 'Completed' ? 'Missed' : 'Scheduled');
    item.status = nextStatus;
    Storage.saveFollowUps(list);
    showToast(`Status of ${id} updated to ${nextStatus}.`);

    updateFollowUpsOverview(list);
    const activeTab = document.querySelector('.tabs-nav .tab-btn.active');
    applyFollowUpFilter(activeTab ? activeTab.dataset.statusFilter : 'all');
}

function deleteFollowUpPrompt(id) {
    showConfirmDialog(
        'Delete Follow-up',
        `Are you sure you want to delete follow-up ${id}?`,
        () => {
            let list = Storage.getFollowUps().filter(f => f.id !== id);
            Storage.saveFollowUps(list);
            showToast(`Follow-up ${id} deleted.`, 'danger');
            updateFollowUpsOverview(list);
            const activeTab = document.querySelector('.tabs-nav .tab-btn.active');
            applyFollowUpFilter(activeTab ? activeTab.dataset.statusFilter : 'all');
        }
    );
}

function viewFollowUpDetails(id) {
    const item = Storage.getFollowUps().find(f => f.id === id);
    if (!item) {
        showToast('Follow-up not found.', 'danger');
        return;
    }

    const client = Storage.getClientById(item.clientId);
    const clientName = client ? client.name : (item.clientId || 'Unknown');
    const statusMeta = getFollowUpStatus(item);

    const modal = document.getElementById('followUpViewModal');
    if (!modal) return;

    const body = document.getElementById('followUpViewModalBody');
    body.innerHTML = `
        <div class="detail-banner">
            <div>
                <div class="detail-banner-name">${escapeHtml(clientName)}</div>
                <div style="font-size:0.85rem; color:var(--text-secondary); margin-top:2px;">
                    ${escapeHtml(item.type)} &bull; ${formatDate(item.date)}
                </div>
            </div>
            <div style="text-align:right;">
                <span class="status-badge ${statusMeta.cls}" style="margin-bottom:6px;">${statusMeta.label}</span>
                <br>
                <button class="btn btn-secondary btn-sm" onclick="closeFollowUpViewModal(); editFollowUp('${item.id}');">Edit</button>
            </div>
        </div>

        <div class="detail-grid">
            <div class="detail-item">
                <span class="detail-label">Follow-up Type</span>
                <span class="detail-value">${escapeHtml(item.type)}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">Status</span>
                <span class="detail-value">${item.status}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">Previous Weight</span>
                <span class="detail-value">${item.prevWeight ? `${item.prevWeight} kg` : 'N/A'}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">Current Weight</span>
                <span class="detail-value">${item.currentWeight ? `${item.currentWeight} kg` : 'N/A'}</span>
            </div>
        </div>

        <h4 class="form-section-title" style="margin-top:20px;">Reason for Follow-up</h4>
        <p style="color:var(--text-main); font-size:0.92rem;">${escapeHtml(item.reason || 'General check-in')}</p>

        <h4 class="form-section-title" style="margin-top:16px;">Progress Observations</h4>
        <p style="color:var(--text-main); font-size:0.92rem;">${escapeHtml(item.notes || 'No specific progress notes recorded.')}</p>

        <h4 class="form-section-title" style="margin-top:16px;">Action Items & Next Steps</h4>
        <div style="background:#FAF8F5; border-left:3px solid var(--primary-accent); padding:10px 14px; border-radius:var(--radius-sm); font-size:0.88rem;">
            ${escapeHtml(item.nextSteps || 'Maintain current nutritional plan and monitor energy levels.')}
        </div>
    `;

    modal.classList.add('active');
}

function closeFollowUpViewModal() {
    const modal = document.getElementById('followUpViewModal');
    if (modal) modal.classList.remove('active');
}

// =============================================================================
// 9. STRING ESCAPING (XSS PREVENTION)
// =============================================================================

function escapeHtml(str) {
    if (str === null || str === undefined) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

// =============================================================================
// 10. GLOBAL DOM INITIALIZATION
// =============================================================================

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize LocalStorage with seed data if clean
    Storage.init();

    // 2. Initialize common UI (date, mobile menu)
    initCommonLayout();

    // 3. Detect current page and invoke matching controller
    const path = window.location.pathname.toLowerCase();

    if (path.includes('clients.html')) {
        initClientsPage();
    } else if (path.includes('consultations.html')) {
        initConsultationsPage();
    } else if (path.includes('meal-plans.html')) {
        initMealPlansPage();
    } else if (path.includes('follow-ups.html')) {
        initFollowUpsPage();
    } else {
        // Default to dashboard (index.html or root)
        initDashboard();
    }
});
