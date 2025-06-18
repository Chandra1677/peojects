ocument.addEventListener('DOMContentLoaded', function() {
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    const messageElement = document.getElementById('message');

    // Set the target date and time (Year, Month (0-11), Day, Hour, Minute, Second)
    // Example: December 25, 2025, 10:00:00 AM
    const targetDate = new Date('December 25, 2025 10:00:00').getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        // Calculate time units
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the results
        daysElement.textContent = formatTime(days);
        hoursElement.textContent = formatTime(hours);
        minutesElement.textContent = formatTime(minutes);
        secondsElement.textContent = formatTime(seconds);

        // If the countdown is finished, display a message
        if (distance < 0) {
            clearInterval(countdownInterval);
            messageElement.textContent = "The event has started!";
            daysElement.textContent = "00";
            hoursElement.textContent = "00";
            minutesElement.textContent = "00";
            secondsElement.textContent = "00";
        }
    }

    function formatTime(time) {
        return time < 10 ? `0${time}` : time;
    }

    // Update the countdown every 1 second
    const countdownInterval = setInterval(updateCountdown, 1000);

    // Initial call to display the countdown immediately
    updateCountdown();
});