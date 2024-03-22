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
    currentTimeUTC = new Date().toISOString()
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


/*export function getDatesOfCurrentWeek() {
    const today = new Date(); // Get today's date
    const currentDay = today.getUTCDay(); // Get the day of the week (0 for Sunday, 1 for Monday, ..., 6 for Saturday)

    // Calculate the difference between the current day and Monday
    const daysToMonday = (currentDay + 6) % 7;

    const firstDayOfWeek = new Date(today); // Create a new date object for today
    firstDayOfWeek.setUTCDate(today.getUTCDate() - daysToMonday); // Subtract the difference to get the first day of the week (Monday)

    const datesOfCurrentWeek = [];

    // Loop to get all dates of the week
    for (let i = 0; i < 7; i++) {
        const date = new Date(firstDayOfWeek); // Create a new date object for the current date in the loop
        date.setUTCDate(firstDayOfWeek.getUTCDate() + i); // Add the index to get the date of the week
        datesOfCurrentWeek.push(date.toISOString().split('T')[0]); // Push the date to the array
    }

    return datesOfCurrentWeek;
}

// Example usage:
const datesOfCurrentWeek = getDatesOfCurrentWeek();
console.log(datesOfCurrentWeek);*/