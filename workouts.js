// ==========================================
// ⚒ FORGE50 v0.2
// Workout Builder
// ==========================================

let currentDay = "sunday";

function loadWorkout(day = currentDay) {

    currentDay = day;

    const workout = appData.workouts[day];

    const container = document.getElementById("workoutContainer");

    if (!container) return;

    let html = "";

    // Header

    html += `
    <div class="card">

        <h2>${workout.title}</h2>

        <p class="small">
            ${workout.focus.join(" • ")}
        </p>

    </div>
    `;

    // Day selector

    html += `
    <div class="card">

        <h3>Select Workout</h3>

        <div class="day-buttons">

            <button class="day-btn" data-day="sunday">Sunday</button>

            <button class="day-btn" data-day="tuesday">Tuesday</button>

            <button class="day-btn" data-day="wednesday">Wednesday</button>

            <button class="day-btn" data-day="friday">Friday</button>

        </div>

    </div>
    `;

    // Exercises

    workout.exercises.forEach((exercise, index) => {

        html += `

        <div class="exercise-card">

            <h3>${index + 1}. ${exercise.name}</h3>

            <p>

                <strong>Sets:</strong> ${exercise.sets}<br>

                <strong>Reps:</strong> ${exercise.reps}<br>

                <strong>RIR:</strong> ${exercise.rir}<br>

                <strong>Rest:</strong> ${exercise.rest}

            </p>

            <button
                class="primary-btn start-exercise"
                data-exercise="${index}">

                Start Exercise

            </button>

        </div>

        `;

    });

    container.innerHTML = html;

    activateDayButtons();

}

// ==========================================
// Day Buttons
// ==========================================

function activateDayButtons() {

    document.querySelectorAll(".day-btn").forEach(button => {

        if (button.dataset.day === currentDay) {

            button.style.background = "#ff7a00";
            button.style.color = "white";

        }

        button.addEventListener("click", () => {

            loadWorkout(button.dataset.day);

        });

    });

}

// ==========================================
// Exercise Buttons
// ==========================================

document.addEventListener("click", function(e){

    if(e.target.classList.contains("start-exercise")){

        const card = e.target.closest(".exercise-card");

        if(card){

            card.classList.add("completed");

            e.target.textContent = "✓ Exercise Complete";

            e.target.disabled = true;

        }

    }

});

// ==========================================
// Auto Load
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    loadWorkout("sunday");

});