export function date(str) {
    const utcDateString = str;

    // Create a Date object from the UTC date string
    const utcDate = new Date(utcDateString);

    // Convert UTC time to Indian time
    utcDate.setHours(utcDate.getHours() + 5); // Add 5 hours for IST
    utcDate.setMinutes(utcDate.getMinutes() + 30); // Add 30 minutes for IST

    // Format the date as "dd/mm/yy"
    const day = utcDate.getDate().toString().padStart(2, '0');
    const month = (utcDate.getMonth() + 1).toString().padStart(2, '0');
    const year = utcDate.getFullYear().toString().substr(-2); // Get last two digits of the year

    // Formatted date string in "dd/mm/yy" format
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
}


export function getPastThreeDaysIST() {
    // Parse the current time in UTC
    const currentTimeUTC = new Date().toISOString()
    const currentTime = new Date(currentTimeUTC);

    // Array to store past three days in IST
    const pastThreeDays = [];

    // Loop through each day from today to three days ago
    for (let i = 0; i < 4; i++) {
        // Subtract days from the current date to get the past dates
        const pastDate = new Date(currentTime);
        pastDate.setDate(currentTime.getDate() - i);

        // Adjust the time to Indian Standard Time (IST)
        pastDate.setHours(pastDate.getHours() + 5); // Add 5 hours for IST
        pastDate.setMinutes(pastDate.getMinutes() + 30); // Add 30 minutes for IST

        // Format the date as "dd/mm/yy"
        const formattedDate = pastDate.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "2-digit",
            year: "2-digit"
        });

        // Push the formatted date to the array
        pastThreeDays.push(formattedDate);
    }

    return pastThreeDays;
}


export function getDatesOfWeek() {
    const today = new Date();
    const currentDay = today.getDay(); // 0 for Sunday, 1 for Monday, ..., 6 for Saturday
    const IST_offset = 5.5; // IST is 5 hours and 30 minutes ahead of UTC

    // Adjust the current date to IST
    const IST_currentTime = today.getTime() + (IST_offset * 60 * 60 * 1000);
    const IST_currentDate = new Date(IST_currentTime);

    // Calculate the start date of the current week (Monday)
    const firstDayOfWeek = new Date(IST_currentDate);
    const offsetToMonday = currentDay === 0 ? 6 : currentDay - 1; // Adjust offset for Monday
    firstDayOfWeek.setDate(IST_currentDate.getDate() - offsetToMonday);

    // Array to store the dates of the week
    const datesOfWeek = [];

    // Loop to get dates of all seven days in the week
    for (let i = 0; i < 7; i++) {
        const currentDate = new Date(firstDayOfWeek);
        currentDate.setDate(firstDayOfWeek.getDate() + i);
        datesOfWeek.push(currentDate);
    }

    // Return array of formatted dates
    return datesOfWeek.map(date => {
        const dd = String(date.getDate()).padStart(2, '0');
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const yy = String(date.getFullYear()).slice(-2);
        return `${dd}/${mm}/${yy}`;
    });
}